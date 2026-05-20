/**
 * Parche final tema a tema: IDs que siguen con explicación corta o desalineada.
 */
import path from "path";
import { fileURLToPath } from "url";

import estudio from "../data/questions-banco-estudio.js";
import generated from "../data/generated-explanations.js";
import { generatePedagogicalExplain } from "../lib/generate-pedagogical-explain.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const IDS = [
  "ure-p1-q10",
  "ure-p1-q202",
  "ure-p1-q377",
  "ure-p1-q425",
  "ure-p1-q429",
  "ure-p1-q491",
  "ure-p2-q457",
  "ure-p2-q158",
  "ure-p2-q282",
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const next = { ...generated };

for (const id of IDS) {
  const q = estudio.find((x) => x.id === id);
  if (!q) continue;
  const text = generatePedagogicalExplain(q);
  if (!text || !isExplainAcceptable(q, text)) {
    console.error("No aceptable:", id, text?.slice(0, 80));
    process.exit(1);
  }
  next[id] = text;
  console.log(`✓ ${id}: ${text.length} chars`);
}

const keys = Object.keys(next).sort();
const lines = [
  "/** Explicaciones generadas (UTF-8). patch-explain-topic-polish.mjs */",
  "export default {",
  ...keys.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(next[k])},`),
  "};",
  "",
];
writeUtf8File(OUT, lines.join("\n"));
