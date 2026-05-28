/**
 * Elimina colas tautológicas «La respuesta que marca el banco…» en generated-explanations.js
 * Uso: node scripts/patch-generated-tautology.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import existing from "../data/generated-explanations.js";
import curated from "../data/curated-explanations.js";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "generated-explanations.js");

const TAUTO_TAIL =
  /\s*La respuesta que marca el banco es «([^»]+)»\.?\s*$/i;

/** @type {Record<string, string>} */
const next = { ...existing };
let patched = 0;

for (const [id, text] of Object.entries(next)) {
  if (curated[id]) {
    next[id] = curated[id];
    patched += 1;
    continue;
  }
  const m = String(text).match(TAUTO_TAIL);
  if (!m) continue;
  const head = String(text).replace(TAUTO_TAIL, "").trim();
  const correct = m[1];
  if (!head || head.length < 20) continue;
  next[id] = `${head} «${correct}».`;
  patched += 1;
}

const sortedKeys = Object.keys(next).sort();
const lines = [
  "/** Explicaciones generadas (UTF-8). Solo fuentes examen oficial · patch-generated-tautology.mjs */",
  "export default {",
];
for (const id of sortedKeys) {
  lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(next[id])},`);
}
lines.push("};");
lines.push("");
writeUtf8File(OUT, lines.join("\n"));

console.log(`patch-generated-tautology: ${patched} entradas sin cola tautológica`);
