/**
 * Genera explicaciones didácticas para preguntas del banco con plantilla FEDI/URE/Quijotes.
 * Uso: node scripts/expand-generated-explanations.mjs
 */
import path from "path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import figures from "../data/questions-figures.js";
import fedi from "../data/fediea-2011.js";
import fediBloques from "../data/fediea-bloques.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import quij from "../data/quijotes-ea3rcq.js";
import quijotesExplanations from "../data/quijotes-explanations.js";
import existing from "../data/generated-explanations.js";
import { generatePedagogicalExplain } from "../lib/generate-pedagogical-explain.mjs";
import { isTemplateOnlyExplain } from "../lib/explain-quality.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "generated-explanations.js");

const SOURCE_IDS = new Set(
  [...fedi, ...fediBloques, ...ure, ...ureExtra, ...ureReg, ...quij, ...figures].map((q) => q.id),
);

/** @type {Record<string, string>} */
const next = { ...existing };
let pruned = 0;
for (const id of Object.keys(next)) {
  if (!SOURCE_IDS.has(id)) {
    delete next[id];
    pruned += 1;
  }
}

const GENERATABLE_PREFIX = /^(fedi-|ure-|quijotes-)/;

let added = 0;
for (const q of banco) {
  if (!SOURCE_IDS.has(q.id) && !GENERATABLE_PREFIX.test(q.id)) continue;
  if (quijotesExplanations[q.id]) continue;
  if (next[q.id]) continue;
  if (!isTemplateOnlyExplain(q.explain)) continue;
  next[q.id] = generatePedagogicalExplain(q);
  added += 1;
}

const sortedKeys = Object.keys(next).sort();
const lines = [
  "/** Explicaciones generadas (UTF-8). Ampliadas por expand-generated-explanations.mjs */",
  "export default {",
];
for (const id of sortedKeys) {
  lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(next[id])},`);
}
lines.push("};");
lines.push("");

writeUtf8File(OUT, lines.join("\n"));

process.stderr.write(
  `expand-generated-explanations: ${added} nuevas, ${pruned} huérfanas eliminadas (${sortedKeys.length} total)\n`,
);
