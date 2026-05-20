/**
 * Regenera explicaciones del banco estudio hasta pasar verificación estricta (una a una).
 * Uso: node scripts/refresh-explanations-estudio.mjs
 */
import path from "path";
import { fileURLToPath } from "url";

import estudio from "../data/questions-banco-estudio.js";
import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import quijotesSource from "../data/quijotes-ea3rcq.js";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";
import { finalizeExplain } from "../lib/contextual-explain.mjs";
import { buildBestExplain } from "../lib/build-best-explain.mjs";
import { stemCrossTopicExplain } from "../lib/generate-pedagogical-explain.mjs";
import { isWeakBankExplain } from "../lib/learn-while-test.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const QUIJ_OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");
const REPORT = path.join(__dirname, "..", "data", "explain-estudio-refresh-report.txt");

/** @type {Record<string, string>} */
const nextGen = { ...generated };
/** @type {Record<string, string>} */
const nextQuij = { ...quijotesExp };

const quijotesSourceIds = new Set(quijotesSource.map((q) => q.id));
const studyIds = new Set(estudio.map((q) => q.id));

function storeExplain(q, text) {
  if (q.id.startsWith("quijotes-") && quijotesSourceIds.has(q.id)) {
    nextQuij[q.id] = text;
  } else {
    nextGen[q.id] = text;
  }
}

function currentText(q) {
  return nextQuij[q.id] || nextGen[q.id] || pedagogicalExplain(q) || String(q.explain || "");
}

function needsRefresh(q) {
  const text = currentText(q);
  if (!text || isWeakBankExplain(text)) return true;
  return !isExplainAcceptable({ ...q, explain: text }, text);
}

const lines = [`Repaso explicaciones banco estudio · ${new Date().toISOString().slice(0, 19)}`, ""];
let updated = 0;
let stillBad = /** @type {{ id: string; stem: string; text: string }[]} */ ([]);

for (const q of estudio) {
  if (!needsRefresh(q)) continue;
  const prev = currentText(q);
  const correct = String(q.options[q.correctIndex] ?? "");
  let text = "";
  const cross = stemCrossTopicExplain(q.stem, correct);
  if (cross) text = finalizeExplain(q.stem, correct, cross);
  if (!text || !isExplainAcceptable(q, text)) text = buildBestExplain(q);
  if (!isExplainAcceptable(q, text)) {
    stillBad.push({
      id: q.id,
      stem: String(q.stem).slice(0, 80),
      text: text.slice(0, 120),
    });
    continue;
  }
  if (text !== prev) {
    storeExplain(q, text);
    updated += 1;
    lines.push(`✓ ${q.id}`);
    lines.push(`  P: ${String(q.stem).replace(/\s+/g, " ").slice(0, 100)}`);
    lines.push(`  E: ${text.replace(/\s+/g, " ").slice(0, 160)}`);
    lines.push("");
  }
}

function writeMap(outPath, header, map) {
  const keys = Object.keys(map).sort();
  const body = [
    header,
    "export default {",
    ...keys.map((id) => `  ${JSON.stringify(id)}: ${JSON.stringify(map[id])},`),
    "};",
    "",
  ].join("\n");
  writeUtf8File(outPath, body);
}

writeMap(GEN_OUT, "/** Explicaciones generadas (UTF-8). refresh-explanations-estudio.mjs */", nextGen);
writeMap(QUIJ_OUT, "/** Explicaciones Quijotes (UTF-8). refresh-explanations-estudio.mjs */", nextQuij);

lines.push(`Actualizadas: ${updated}`);
lines.push(`Sin arreglar: ${stillBad.length}`);
if (stillBad.length) {
  lines.push("");
  lines.push("=== Pendientes ===");
  for (const row of stillBad) {
    lines.push(`- ${row.id}: ${row.stem}`);
    lines.push(`  ${row.text}`);
  }
}
writeUtf8File(REPORT, lines.join("\n"));

process.stderr.write(`refresh-explanations-estudio: ${updated} actualizadas, ${stillBad.length} pendientes\n`);
process.stderr.write(`Informe: ${REPORT}\n`);

if (stillBad.length) process.exit(1);
