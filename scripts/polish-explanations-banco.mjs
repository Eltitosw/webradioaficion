/**
 * Pasada final: quita relleno/padding, citas duplicadas y plantillas de figura.
 * Uso: node scripts/polish-explanations-banco.mjs [--dry-run]
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import banco from "../data/questions-banco.js";
import curated from "../data/curated-explanations.js";
import generated from "../data/generated-explanations.js";
import { FIGURE_EXPLAINS } from "../data/figure-explanations.mjs";
import {
  MISASSIGNED_EXPLAIN_FIXES,
  PADDING_REMNANT_FIXES,
  TEMPLATE_EXPLAIN_FIXES,
} from "../data/template-explain-fixes.mjs";
import { TECNICA_EXPLAIN_REWRITES } from "../data/tecnica-explain-rewrites.mjs";
import { NORMATIVA_EXPLAIN_REWRITES } from "../data/normativa-explain-rewrites.mjs";
import { passesExamGradeExplain } from "../lib/explain-exam-grade.mjs";
import {
  isFigureTemplateExplain,
  polishExplainText,
} from "../lib/polish-explain-text.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURATED_OUT = path.join(__dirname, "..", "data", "curated-explanations.js");
const GENERATED_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");

const dryRun = process.argv.includes("--dry-run");
const byId = new Map(banco.map((q) => [q.id, q]));

/** @type {Record<string, string>} */
const nextCurated = { ...curated };
/** @type {Record<string, string>} */
const nextGenerated = { ...generated };

const fixIds = new Set([
  ...Object.keys(FIGURE_EXPLAINS),
  ...Object.keys(TEMPLATE_EXPLAIN_FIXES),
  ...Object.keys(PADDING_REMNANT_FIXES),
  ...Object.keys(MISASSIGNED_EXPLAIN_FIXES),
  ...Object.keys(TECNICA_EXPLAIN_REWRITES),
  ...Object.keys(NORMATIVA_EXPLAIN_REWRITES),
]);

let mergedFixes = 0;
for (const [id, text] of Object.entries({
  ...FIGURE_EXPLAINS,
  ...TEMPLATE_EXPLAIN_FIXES,
  ...PADDING_REMNANT_FIXES,
  ...MISASSIGNED_EXPLAIN_FIXES,
  ...TECNICA_EXPLAIN_REWRITES,
  ...NORMATIVA_EXPLAIN_REWRITES,
})) {
  nextCurated[id] = text;
  mergedFixes += 1;
}

/**
 * @param {string} id
 * @param {string} text
 * @param {boolean} requirePass
 */
function safePolishCurated(id, text, requirePass) {
  const q = byId.get(id);
  const correct =
    q && typeof q.correctIndex === "number"
      ? String(q.options?.[q.correctIndex] ?? "")
      : "";
  const before = String(text || "").trim();
  let polished = polishExplainText(before, { correct });
  if (!q) return polished;

  const probe = (t) => passesExamGradeExplain({ ...q, explain: t });
  if (probe(polished)) return polished;

  // No reintroducimos coletillas genéricas: si tras limpiar no pasa el gate,
  // se considera pendiente de curación real (se reporta abajo).
  if (requirePass) return null;
  return polished;
}

let curatedPolished = 0;
let curatedFailed = 0;
for (const id of Object.keys(nextCurated)) {
  const out = safePolishCurated(id, nextCurated[id], fixIds.has(id));
  if (out === null) {
    curatedFailed += 1;
    console.error(`  curated ${id}: fix nuevo no pasa gate`);
  } else {
    nextCurated[id] = out;
    curatedPolished += 1;
  }
}

let genPolished = 0;
let genStrippedTemplate = 0;
for (const id of Object.keys(nextGenerated)) {
  const q = byId.get(id);
  const correct =
    q && typeof q.correctIndex === "number"
      ? String(q.options?.[q.correctIndex] ?? "")
      : "";
  let text = polishExplainText(nextGenerated[id], { correct });
  if (isFigureTemplateExplain(text)) {
    if (nextCurated[id]) {
      delete nextGenerated[id];
      genStrippedTemplate += 1;
      continue;
    }
    genStrippedTemplate += 1;
  }
  nextGenerated[id] = text;
  genPolished += 1;
}

function writeModule(outPath, headerLines, data) {
  const sortedKeys = Object.keys(data).sort();
  const lines = [...headerLines, "export default {"];
  for (const id of sortedKeys) {
    lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(data[id])},`);
  }
  lines.push("};");
  lines.push("");
  writeUtf8File(outPath, lines.join("\n"));
}

console.log(
  `polish: +${mergedFixes} fixes · curated ${curatedPolished} · generated ${genPolished} · plantilla gen eliminada ${genStrippedTemplate} · fallos gate ${curatedFailed}`,
);

if (curatedFailed) process.exit(1);
if (dryRun) process.exit(0);

writeModule(CURATED_OUT, [
  "/** Explicaciones revisadas manualmente (UTF-8). Máxima prioridad en build-banco. */",
  "/** Actualizado: polish-explanations-banco.mjs · no regenerar con refresh-all sobre estos IDs. */",
], nextCurated);

writeModule(GENERATED_OUT, [
  "/** Explicaciones generadas (UTF-8). Solo fuentes examen oficial · patch-generated-tautology.mjs */",
], nextGenerated);
