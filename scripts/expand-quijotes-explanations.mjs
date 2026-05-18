/**
 * Añade explicaciones didácticas a quijotes-explanations.js para preguntas del banco sin entrada.
 * Uso: node scripts/expand-quijotes-explanations.mjs
 */
import path from "path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import quij from "../data/quijotes-ea3rcq.js";
import existing from "../data/quijotes-explanations.js";
import { generateQuijotesExplain } from "../lib/generate-quijotes-explain.mjs";
import { isTemplateOnlyExplain } from "../lib/explain-quality.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");

const PRIORITY_TOPICS = new Set([
  "marco-normativo",
  "licencias-indicativos",
  "electricidad-basica",
  "componentes",
  "receptores-emisores",
  "antenas-prop",
  "instalaciones",
  "operacion-seguridad",
]);

const quijIds = new Set(quij.map((q) => q.id));

/** @type {Record<string, string>} */
const next = {};
let pruned = 0;
for (const [id, text] of Object.entries(existing)) {
  if (!quijIds.has(id)) {
    pruned += 1;
    continue;
  }
  next[id] = text;
}
let added = 0;

for (const q of banco) {
  if (!q?.id?.startsWith("quijotes-")) continue;
  if (!quijIds.has(q.id)) continue;
  if (!PRIORITY_TOPICS.has(q.topicId)) continue;
  if (next[q.id]) continue;
  if (!isTemplateOnlyExplain(q.explain)) continue;
  next[q.id] = generateQuijotesExplain(q);
  added += 1;
}

const sortedKeys = Object.keys(next).sort();
const lines = [
  "/** Explicaciones Quijotes (UTF-8). Generadas/ampliadas por expand-quijotes-explanations.mjs */",
  "export default {",
];
for (const id of sortedKeys) {
  lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(next[id])},`);
}
lines.push("};");
lines.push("");

writeUtf8File(OUT, lines.join("\n"));

process.stderr.write(
  `expand-quijotes-explanations: ${added} nuevas, ${pruned} huérfanas eliminadas (${sortedKeys.length} total)\n`,
);
