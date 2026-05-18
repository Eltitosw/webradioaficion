/**
 * Regenera explicaciones hasta pasar verificación estricta (varias pasadas).
 */
import path from "path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { isGenericExplainText, isRespectoTemplateExplain } from "../lib/explain-faithfulness.mjs";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";
import { buildBestExplain } from "../lib/build-best-explain.mjs";
import { isWeakBankExplain } from "../lib/learn-while-test.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const QUIJ_OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");

/** @type {Record<string, string>} */
const nextGen = { ...generated };
/** @type {Record<string, string>} */
const nextQuij = { ...quijotesExp };

const MAX_PASSES = 6;

function storeExplain(q, text) {
  if (q.id.startsWith("quijotes-")) {
    nextQuij[q.id] = text;
  } else {
    nextGen[q.id] = text;
  }
}

function currentText(q) {
  return nextQuij[q.id] || nextGen[q.id] || pedagogicalExplain(q) || String(q.explain || "");
}

function needsExplainRefresh(q) {
  const text = currentText(q);
  if (!text) return true;
  if (isWeakBankExplain(text)) return true;
  const probe = { ...q, explain: text };
  return !isExplainAcceptable(probe, text);
}

let totalUpdated = 0;

for (let pass = 1; pass <= MAX_PASSES; pass += 1) {
  let passUpdated = 0;
  for (const q of banco) {
    if (!needsExplainRefresh(q)) continue;

    const text = buildBestExplain(q);
    if (!isExplainAcceptable(q, text)) continue;

    const prev = currentText(q);
    if (prev === text) continue;
    storeExplain(q, text);
    passUpdated += 1;
  }
  totalUpdated += passUpdated;
  process.stderr.write(`refresh pass ${pass}: ${passUpdated} actualizadas\n`);
  if (passUpdated === 0) break;
}

/** Cobertura: reintento final solo si la explicación pasa verificación estricta. */
let forced = 0;
let stillBad = 0;
for (const q of banco) {
  if (!needsExplainRefresh(q)) continue;
  const text = buildBestExplain(q);
  if (!isExplainAcceptable(q, text)) {
    stillBad += 1;
    continue;
  }
  storeExplain(q, text);
  forced += 1;
}
if (stillBad) {
  process.stderr.write(`AVISO: ${stillBad} pregunta(s) sin explicación aceptable tras regenerar\n`);
}

const bankIds = new Set(banco.map((q) => q.id));

function pruneOrphans(map, label) {
  let n = 0;
  for (const id of Object.keys(map)) {
    if (!bankIds.has(id)) {
      delete map[id];
      n += 1;
    }
  }
  if (n) process.stderr.write(`refresh: ${n} entrada(s) huérfana(s) eliminada(s) de ${label}\n`);
}

pruneOrphans(nextGen, "generated-explanations");
pruneOrphans(nextQuij, "quijotes-explanations");

function writeMap(outPath, header, map) {
  const keys = Object.keys(map).sort();
  const lines = [header, "export default {"];
  for (const id of keys) {
    lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(map[id])},`);
  }
  lines.push("};");
  lines.push("");
  writeUtf8File(outPath, lines.join("\n"));
}

writeMap(GEN_OUT, "/** Explicaciones generadas (UTF-8). refresh-all-explanations.mjs */", nextGen);
writeMap(QUIJ_OUT, "/** Explicaciones Quijotes (UTF-8). refresh-all-explanations.mjs */", nextQuij);

process.stderr.write(
  `refresh-all-explanations: ${totalUpdated} en pasadas + ${forced} forzadas · gen ${Object.keys(nextGen).length} · quij ${Object.keys(nextQuij).length}\n`,
);
