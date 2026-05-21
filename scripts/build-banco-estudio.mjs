import path from "path";
import { fileURLToPath } from "url";

/**
 * Banco ampliado para Practicar / Tarjetas / repaso (memorizar con explicaciones).
 * Incluye el banco examen (481) + preguntas extra alineadas (URE, Quijotes 1, FEDI…) sin duplicar enunciado.
 *
 * Uso: node scripts/build-banco-estudio.mjs
 * (también se invoca al final de build:banco)
 */
import questions from "../data/questions.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import fedi from "../data/fediea-2011.js";
import fediBloques from "../data/fediea-bloques.js";
import quijotes from "../data/quijotes-ea3rcq.js";
import { isExamAlignedSourceId } from "../lib/exam-aligned-sources.mjs";
import figures from "../data/questions-figures.js";
import questionsBanco from "../data/questions-banco.js";
import quijotesExplanations from "../data/quijotes-explanations.js";
import generatedExplanations from "../data/generated-explanations.js";
import { dedupeKey, writeUtf8File } from "../lib/import-question-utils.mjs";
import { dedupeBankByParaphrase } from "../lib/banco-dedupe.mjs";
import { isPublishableBankQuestion, prepareBankQuestion } from "../lib/banco-quality.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { isExcludedFromRadioaficionadoExam } from "../lib/question-pool.mjs";
import { CRIBADO_PREFERRED_IDS } from "../data/question-cribado.js";
import { buildBestExplain } from "../lib/build-best-explain.mjs";
import { hasPedagogicalExplain } from "../lib/explain-quality.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { generatePedagogicalExplain } from "../lib/generate-pedagogical-explain.mjs";
import { repairQuestionFields } from "../lib/text-encoding.mjs";
import { enrichFromExisting } from "../lib/figure-import.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "questions-banco-estudio.js");

const fediBloquesExam = fediBloques.filter((q) => q?.id && isExamAlignedSourceId(q.id));

const byId = new Map();
for (const q of [
  ...questions,
  ...propias,
  ...ure,
  ...ureExtra,
  ...ureReg,
  ...fedi,
  ...fediBloquesExam,
  ...quijotes,
  ...figures,
]) {
  if (q?.id) byId.set(q.id, q);
}

/** @param {object} q */
function withExplain(q) {
  let out = repairQuestionFields(q);
  const curated =
    quijotesExplanations[out.id] || generatedExplanations[out.id] || "";

  if (curated && isExplainAcceptable(out, curated)) {
    return { ...out, explain: curated };
  }

  if (!isExplainAcceptable(out)) {
    if (curated) out = { ...out, explain: curated };
    else if (!hasPedagogicalExplain(out)) {
      const gen = generatePedagogicalExplain(out);
      if (gen && isExplainAcceptable(out, gen)) out = { ...out, explain: gen };
    }
    if (!isExplainAcceptable(out)) {
      const best = buildBestExplain(out);
      if (best && isExplainAcceptable(out, best)) out = { ...out, explain: best };
    }
  } else if (curated && (!out.explain || out.explain.length < 50)) {
    out = { ...out, explain: curated };
  }

  return out;
}

/** @type {Map<string, object>} */
const byKey = new Map();

for (const q of questionsBanco) {
  const enriched = withExplain(q);
  byKey.set(dedupeKey(enriched.stem, enriched.options), enriched);
}

let added = 0;
const sources = [...questions, ...propias, ...ure, ...ureExtra, ...ureReg, ...fedi, ...quijotes, ...figures];

for (const raw of sources) {
  if (!raw?.id || isExcludedFromRadioaficionadoExam(raw)) continue;
  let merged = repairQuestionFields(raw);
  const fig = figures.find((f) => f.id === merged.id);
  if (fig) merged = enrichFromExisting(fig, byId);
  const { question: classified } = prepareBankQuestion(merged);
  if (isOffTopicForRadioaficionadoExam(classified)) continue;
  if (
    !isPublishableBankQuestion(classified, {
      allowTierB: true,
      allowTierC: false,
      requireExplain: false,
      allowLowConfidence: false,
    })
  ) {
    continue;
  }
  const key = dedupeKey(classified.stem, classified.options);
  if (byKey.has(key)) continue;
  const enriched = withExplain(classified);
  if (!enriched.explain || String(enriched.explain).trim().length < 24) continue;
  byKey.set(key, enriched);
  added += 1;
}

const beforePara = byKey.size;
const { bankById: deduped, removed: paraRemoved } = dedupeBankByParaphrase(
  new Map([...byKey.values()].map((q) => [q.id, q])),
  CRIBADO_PREFERRED_IDS,
);
const bank = [...deduped.values()].sort((a, b) => a.id.localeCompare(b.id));
const examCount = questionsBanco.length;
const withFig = bank.filter((q) => q.stemFigure).length;
const withPed = bank.filter((q) => hasPedagogicalExplain(q)).length;
const generated = new Date().toISOString().slice(0, 10);
const studyOnlyCount = bank.filter(
  (q) => !questionsBanco.some((e) => dedupeKey(e.stem, e.options) === dedupeKey(q.stem, q.options)),
).length;

const lines = [
  "/**",
  " * Banco de ESTUDIO: repaso, memorización y explicaciones (Practicar, Tarjetas, Cuaderno).",
  " * Incluye el banco examen + preguntas extra sin duplicar enunciado+opciones.",
  ` * Generado: ${generated} · ${bank.length} preguntas · node scripts/build-banco-estudio.mjs`,
  ` * Examen estricto: ${examCount} preguntas en questions-banco.js (simulacro tipo test).`,
  ` * Añadidas solo estudio (antes dedupe): ${added}`,
  ` * Parafraseos eliminados: ${paraRemoved.length} (${beforePara} → ${bank.length})`,
  " */",
  "",
  `export const BANCO_ESTUDIO_GENERATED_AT = ${JSON.stringify(generated)};`,
  `export const BANCO_ESTUDIO_STATS = ${JSON.stringify({
    count: bank.length,
    examSubset: examCount,
    studyOnlyAdded: studyOnlyCount,
    paraphraseRemoved: paraRemoved.length,
    withFigure: withFig,
    withPedagogicalExplain: withPed,
  })};`,
  "",
  `export default ${JSON.stringify(bank, null, 2)};`,
  "",
];

writeUtf8File(OUT, lines.join("\n"));
process.stderr.write(
  `Escrito questions-banco-estudio.js: ${bank.length} (${examCount} examen + ${studyOnlyCount} solo estudio, ${paraRemoved.length} parafraseos quitados, ${withPed} con explicación útil)\n`,
);
