/**
 * Cribado por antigüedad: localiza preguntas recientes y genera lista para practicar.
 *
 * Uso:
 *   node scripts/cribado-recencia.mjs
 *   node scripts/cribado-recencia.mjs --ampliado   # tier A+B+C (banco ≥900; por defecto en build:banco)
 *   node scripts/cribado-recencia.mjs --normal     # solo tier A+B (~780)
 *   node scripts/cribado-recencia.mjs --estricto   # solo tier A
 *   node scripts/cribado-recencia.mjs --report     # escribe data/cribado-report.txt
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
import { dedupeKey, writeUtf8File } from "../lib/import-question-utils.mjs";
import { areParaphraseDuplicates } from "../lib/question-paraphrase.mjs";
import {
  getRecencyMeta,
  hasObsoleteHint,
  recencyScore,
  tierPassesCribado,
} from "../lib/question-recency.mjs";
import { pickDuplicateWinner } from "../lib/banco-dedupe.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "question-cribado.js");
const REPORT = path.join(ROOT, "data", "cribado-report.txt");

const args = process.argv.slice(2);
const mode = args.includes("--estricto")
  ? "estricto"
  : args.includes("--normal")
    ? "normal"
    : "ampliado";
const writeReport = args.includes("--report");

const all = [
  ...questions,
  ...propias,
  ...ure,
  ...ureExtra,
  ...ureReg,
  ...fedi,
  ...fediBloques,
  ...quijotes,
];

const tierCounts = { A: 0, B: 0, C: 0 };
const sourceCounts = new Map();
const obsoleteIds = [];
/** @type {{ id: string, score: number, tier: string, q: object }[]} */
const canonicals = [];

const excludedScope = [];
for (const q of all) {
  if (isOffTopicForRadioaficionadoExam(q)) {
    excludedScope.push(q.id);
    continue;
  }
  const meta = getRecencyMeta(q.id);
  tierCounts[meta.tier] += 1;
  sourceCounts.set(meta.source, (sourceCounts.get(meta.source) || 0) + 1);

  if (hasObsoleteHint(q.stem, q.options)) obsoleteIds.push(q.id);

  const figureBonus = q.stemFigure ? 25 : 0;
  const score = recencyScore(meta.tier) + figureBonus;
  const match = canonicals.find((c) => areParaphraseDuplicates(c.q, q));
  if (!match) {
    canonicals.push({ id: q.id, score, tier: meta.tier, q });
    continue;
  }
  const winner = pickDuplicateWinner([match.q, q], new Set());
  if (winner.id !== match.id) {
    match.id = winner.id;
    match.q = winner;
    match.tier = getRecencyMeta(winner.id).tier;
    match.score = Math.max(match.score, score);
  } else if (score > match.score) {
    match.score = score;
  }
}

const preferredNormalIds = [];
const preferredAmpliadoIds = [];
const preferredStrictIds = [];
const droppedHistoric = [];

for (const entry of canonicals) {
  const q = entry.q;
  if (hasObsoleteHint(q.stem, q.options)) continue;

  if (tierPassesCribado(entry.tier, "normal")) preferredNormalIds.push(entry.id);
  if (tierPassesCribado(entry.tier, "ampliado")) preferredAmpliadoIds.push(entry.id);
  if (tierPassesCribado(entry.tier, "estricto")) preferredStrictIds.push(entry.id);
  if (entry.tier === "C") droppedHistoric.push(entry.id);
}

preferredNormalIds.sort();
preferredAmpliadoIds.sort();
preferredStrictIds.sort();

const activeSet =
  mode === "estricto" ? preferredStrictIds : mode === "normal" ? preferredNormalIds : preferredAmpliadoIds;

const lines = [];
lines.push("/**");
lines.push(" * Cribado por antigüedad de fuente (generado por `node scripts/cribado-recencia.mjs`).");
lines.push(
  ` * Modo al generar: ${
    mode === "estricto"
      ? "estricto (solo tier A)"
      : mode === "normal"
        ? "normal (tier A + B)"
        : "ampliado (tier A + B + C, banco ≥900)"
  }.`,
);
lines.push(` * Generado: ${new Date().toISOString().slice(0, 10)}`);
lines.push(" *");
lines.push(" * Tier A: propias 2026, Quijotes qid≥1800, FEDI examen 2011.");
lines.push(" * Tier B: URE web, Quijotes medio, FEDI 2010, banco base.");
lines.push(" * Tier C: bloques FEDI 2006–2009 y exámenes 2007–2009 (histórico).");
lines.push(" */");
lines.push(`export const CRIBADO_MODE = ${JSON.stringify(mode)};`);
lines.push("");
lines.push("/** IDs únicos por enunciado (versión más reciente de cada duplicado). */");
lines.push(`export const CRIBADO_PREFERRED_IDS = new Set(${JSON.stringify(activeSet, null, 2)});`);
lines.push("");
lines.push(`export const CRIBADO_RECENT_IDS = new Set(${JSON.stringify(preferredNormalIds, null, 2)});`);
lines.push("");
lines.push(`export const CRIBADO_STRICT_IDS = new Set(${JSON.stringify(preferredStrictIds, null, 2)});`);
lines.push("");
lines.push(`export const CRIBADO_STATS = ${JSON.stringify(
  {
    totalBank: all.length,
    uniqueStems: canonicals.length,
    sourceEntriesDeduped: all.length - canonicals.length,
    tierA: tierCounts.A,
    tierB: tierCounts.B,
    tierC: tierCounts.C,
    preferredNormal: preferredNormalIds.length,
    preferredAmpliado: preferredAmpliadoIds.length,
    preferredStrict: preferredStrictIds.length,
    obsoleteFlagged: obsoleteIds.length,
    excludedOffTopic: excludedScope.length,
    historicUniqueStems: droppedHistoric.length,
  },
  null,
  2,
)};`);
lines.push("");
lines.push("export function isCribadoPreferred(id) {");
lines.push("  return CRIBADO_PREFERRED_IDS.has(id);");
lines.push("}");
lines.push("");

writeUtf8File(OUT, lines.join("\n"));

const report = [];
report.push("=== Cribado por antigüedad ===");
report.push(`Modo activo exportado: ${mode}`);
report.push(`Banco total (con duplicados entre fuentes): ${all.length}`);
report.push(`Enunciados únicos (exactos + parafraseados): ${canonicals.length}`);
report.push(`Parafraseos colapsados: ${all.length - canonicals.length}`);
report.push("");
report.push("Por tier (todas las entradas del banco):");
report.push(`  A (reciente):     ${tierCounts.A}`);
report.push(`  B (aceptable):    ${tierCounts.B}`);
report.push(`  C (histórico):    ${tierCounts.C}`);
report.push("");
report.push("Pool cribado (único por enunciado, sin obsoletos marcados):");
report.push(`  Normal (A+B):     ${preferredNormalIds.length}`);
report.push(`  Ampliado (A+B+C): ${preferredAmpliadoIds.length}`);
report.push(`  Estricto (solo A): ${preferredStrictIds.length}`);
report.push(`  Histórico único:  ${droppedHistoric.length} enunciados solo en tier C`);
report.push(`  Obsoletos marcados: ${obsoleteIds.length} (revisar manualmente)`);
report.push("");
report.push("Por fuente:");
for (const [src, n] of [...sourceCounts.entries()].sort((a, b) => b[1] - a[1])) {
  report.push(`  ${src}: ${n}`);
}
report.push("");
if (obsoleteIds.length) {
  report.push("Muestra IDs con posible normativa antigua (primeros 15):");
  obsoleteIds.slice(0, 15).forEach((id) => report.push(`  - ${id}`));
}

const reportText = report.join("\n");
process.stderr.write(`${reportText}\n\nEscrito ${OUT}\n`);

if (writeReport) {
  writeUtf8File(REPORT, `${reportText}\n`);
  process.stderr.write(`Escrito ${REPORT}\n`);
}

process.stderr.write("Siguiente paso: node scripts/build-banco-principal.mjs (o npm run build:banco)\n");
