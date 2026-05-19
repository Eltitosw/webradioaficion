/**
 * Materializa el banco principal: cribado (sin duplicados obsoletos) + todas las preguntas con figura.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import questions from "../data/questions.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import fedi from "../data/fediea-2011.js";
import fediBloques from "../data/fediea-bloques.js";
import quijotes from "../data/quijotes-ea3rcq.js";
import quijotesExplanations from "../data/quijotes-explanations.js";
import generatedExplanations from "../data/generated-explanations.js";
import figures from "../data/questions-figures.js";
import { CRIBADO_PREFERRED_IDS, CRIBADO_STATS } from "../data/question-cribado.js";
import { dedupeKey, writeQuestionModule, writeUtf8File } from "../lib/import-question-utils.mjs";
import { classifyQuestion } from "../lib/question-classification.mjs";
import { dedupeBankByStem } from "../lib/banco-dedupe.mjs";
import { fillBankToMinimum } from "../lib/banco-fill.mjs";
import { MIN_BANCO_QUESTIONS } from "../lib/question-recency.mjs";
import { isExcludedFromRadioaficionadoExam } from "../lib/question-pool.mjs";
import { enrichFromExisting } from "../lib/figure-import.mjs";
import { hasPedagogicalExplain, isTemplateOnlyExplain } from "../lib/explain-quality.mjs";
import { repairQuestionFields } from "../lib/text-encoding.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "questions-banco.js");
const FIGURE_IDS_OUT = path.join(__dirname, "..", "data", "question-figure-ids.js");
const FIGURES_OUT = path.join(__dirname, "..", "data", "questions-figures.js");

const all = [
  ...questions,
  ...propias,
  ...ure,
  ...ureExtra,
  ...ureReg,
  ...fedi,
  ...fediBloques,
  ...quijotes,
  ...figures,
];

const byId = new Map();
for (const q of all) {
  if (q?.id) byId.set(q.id, q);
}

/**
 * Fusiona explicación didáctica sin mezclar modos de feedback de Practicar:
 * - Estudio inmediato / confianza: `pedagogicalExplain(q)` lee `explain`.
 * - Estudio profundizar: `explain` didáctico + `explainSourceNote` (plantilla FEDI/Quijotes).
 */
function applyExamClassification(q) {
  const repaired = repairQuestionFields(q);
  const { part, topicId } = classifyQuestion({
    stem: repaired.stem,
    sourcePart: repaired.part,
    id: repaired.id,
  });
  if (part === repaired.part && topicId === repaired.topicId) return repaired;
  return repairQuestionFields({ ...repaired, part, topicId });
}

function withPedagogicalExplain(q) {
  const repaired = applyExamClassification(q);
  const text = quijotesExplanations[repaired.id] || generatedExplanations[repaired.id];
  if (!text) return repaired;
  const prev = typeof repaired.explain === "string" ? repaired.explain.trim() : "";
  /** @type {Record<string, unknown>} */
  const out = { ...repaired, explain: text };
  if (prev && isTemplateOnlyExplain(prev)) {
    out.explainSourceNote = prev;
  } else if (prev && !isTemplateOnlyExplain(prev) && !prev.includes(text.slice(0, 40))) {
    out.explain = `${text} ${prev}`;
  }
  return repairQuestionFields(out);
}

function mergeFigureWithTextSource(fq, byId) {
  let merged = repairQuestionFields(fq);
  const text = byId.get(merged.id);
  if (text) merged = repairQuestionFields(enrichFromExisting(merged, byId));
  return withPedagogicalExplain(merged);
}

function hasValidOptions(q) {
  if (!Array.isArray(q?.options) || q.options.length < 2) return false;
  return q.options.filter((o) => String(o ?? "").trim().length > 0).length >= 2;
}

const figureIdSet = new Set(figures.map((f) => f.id).filter(Boolean));

const missing = [];
const bankById = new Map();

for (const id of CRIBADO_PREFERRED_IDS) {
  const q = byId.get(id);
  if (!q) {
    missing.push(id);
    continue;
  }
  if (isExcludedFromRadioaficionadoExam(q)) continue;
  const merged = withPedagogicalExplain(q);
  if (!hasValidOptions(merged)) continue;
  bankById.set(id, merged);
}

const stemToId = new Map();
for (const [id, q] of bankById) {
  stemToId.set(dedupeKey(q.stem, q.options), id);
}

for (const fq of figures) {
  if (!fq?.id) continue;
  const merged = mergeFigureWithTextSource(fq, byId);
  if (!hasValidOptions(merged)) continue;
  const key = dedupeKey(merged.stem, merged.options);
  const dupId = stemToId.get(key);
  if (dupId && dupId !== merged.id && !figureIdSet.has(dupId)) {
    bankById.delete(dupId);
  }
  bankById.set(merged.id, merged);
  stemToId.set(key, merged.id);
}

const { bankById: deduped, removed, duplicateGroups, paraphraseRemoved } = dedupeBankByStem(
  bankById,
  CRIBADO_PREFERRED_IDS,
);
bankById.clear();
for (const [id, q] of deduped) bankById.set(id, q);

const sourceList = [
  ...questions,
  ...propias,
  ...ure,
  ...ureExtra,
  ...ureReg,
  ...fedi,
  ...fediBloques,
  ...quijotes,
  ...figures,
];
const { added: fillAdded, finalCount: countAfterFill } = fillBankToMinimum(bankById, byId, sourceList);

const bank = [...bankById.values()].sort((a, b) => a.id.localeCompare(b.id));
const figureIds = bank.filter((q) => q.stemFigure).map((q) => q.id).sort();

if (bank.length < MIN_BANCO_QUESTIONS) {
  console.error(
    `build-banco: ${bank.length} preguntas (< ${MIN_BANCO_QUESTIONS}) tras relleno (${fillAdded.length} añadidas). Ejecuta: npm run build:banco`,
  );
  process.exit(1);
}

if (missing.length) {
  console.error(`build-banco: ${missing.length} id(s) del cribado no encontrados en fuentes:`);
  missing.slice(0, 20).forEach((id) => console.error(`  - ${id}`));
  process.exit(1);
}

const generated = new Date().toISOString().slice(0, 10);
const cribadoInBank = [...CRIBADO_PREFERRED_IDS].filter((id) => bankById.has(id)).length;
const cribadoReplacedByFigure = CRIBADO_PREFERRED_IDS.size - cribadoInBank;

const lines = [];
lines.push("/**");
lines.push(" * Banco principal: cribado (tier A+B+C) + figuras certificadas, un enunciado = una pregunta.");
lines.push(` * Generado: ${generated} · ${bank.length} preguntas · npm run build:banco`);
lines.push(` * Cribado: ${CRIBADO_PREFERRED_IDS.size} · En banco por id: ${cribadoInBank} · Sustituidas por versión con figura: ${cribadoReplacedByFigure}`);
lines.push(
  ` * Duplicados eliminados: ${removed.length} (${duplicateGroups} exactos, ${paraphraseRemoved ?? 0} parafraseados)`,
);
lines.push(` * Relleno hasta ≥${MIN_BANCO_QUESTIONS}: ${fillAdded.length} añadidas (total tras relleno: ${countAfterFill})`);
lines.push(` * Con figura: ${figureIds.length}`);
lines.push(" */");
lines.push("");
lines.push(`export const BANCO_GENERATED_AT = ${JSON.stringify(generated)};`);
lines.push(
  `export const BANCO_STATS = ${JSON.stringify({
    count: bank.length,
    cribadoPreferred: CRIBADO_PREFERRED_IDS.size,
    cribadoById: cribadoInBank,
    cribadoReplacedByFigure,
    withFigure: figureIds.length,
    dedupeRemoved: removed.length,
    dedupeGroups: duplicateGroups,
    paraphraseRemoved: paraphraseRemoved ?? 0,
    fillAdded: fillAdded.length,
    sourceEntries: CRIBADO_STATS.totalBank,
  })};`,
);
lines.push("");
lines.push(`export default ${JSON.stringify(bank, null, 2)};`);
lines.push("");

writeUtf8File(OUT, lines.join("\n"));

const idLines = [];
idLines.push("/** Generado por `npm run build:banco` — IDs con figura original certificada. */");
idLines.push(`export const EXACT_FIGURE_QUESTION_IDS = new Set(${JSON.stringify(figureIds, null, 2)});`);
idLines.push("");
writeUtf8File(FIGURE_IDS_OUT, idLines.join("\n"));

const bankIds = new Set(bank.map((q) => q.id));
const prunedFigures = figures.filter((f) => bankIds.has(f.id));
writeQuestionModule(
  FIGURES_OUT,
  "Preguntas con figura original (generado por `npm run build:banco`).\nUn enunciado = una entrada; sin duplicados quiz 1/83.",
  prunedFigures,
);

process.stderr.write(
  `Escrito ${OUT} (${bank.length} preguntas, ${figureIds.length} con figura, ${removed.length} duplicados quitados)\n`,
);
process.stderr.write(`Figuras sincronizadas: ${prunedFigures.length} entradas en questions-figures.js\n`);
