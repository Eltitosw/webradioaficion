/**
 * Genera explicaciones didácticas para todas las fuentes alineadas con el examen.
 * Uso: node scripts/expand-explanations-exam.mjs
 */
import path from "path";
import { fileURLToPath } from "url";

import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import fedi from "../data/fediea-2011.js";
import quijotes from "../data/quijotes-ea3rcq.js";
import figures from "../data/questions-figures.js";
import questions from "../data/questions.js";
import quijotesExplanations from "../data/quijotes-explanations.js";
import existing from "../data/generated-explanations.js";
import { isExamAlignedSourceId } from "../lib/exam-aligned-sources.mjs";
import { generatePedagogicalExplain } from "../lib/generate-pedagogical-explain.mjs";
import {
  hasPedagogicalExplain,
  isTemplateOnlyExplain,
  pedagogicalExplain,
} from "../lib/explain-quality.mjs";
import { prepareBankQuestion } from "../lib/banco-quality.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "generated-explanations.js");

const pool = [
  ...propias,
  ...ure,
  ...ureExtra,
  ...ureReg,
  ...fedi,
  ...quijotes,
  ...figures,
  ...questions,
].filter((q) => q?.id && isExamAlignedSourceId(q.id));

/** @type {Record<string, string>} */
const next = {};
for (const [id, text] of Object.entries(existing)) {
  if (isExamAlignedSourceId(id)) next[id] = text;
}

let added = 0;
let skipped = 0;
for (const raw of pool) {
  const { question: q } = prepareBankQuestion(raw);
  if (quijotesExplanations[q.id]) continue;
  const pedFromSrc = pedagogicalExplain(q);
  const srcPed =
    hasPedagogicalExplain(q) &&
    !isTemplateOnlyExplain(q.explain) &&
    !isTemplateOnlyExplain(pedFromSrc);
  if (srcPed) {
    if (!next[q.id]) next[q.id] = pedFromSrc;
    skipped += 1;
    continue;
  }
  const prevGen = next[q.id];
  if (prevGen && !isTemplateOnlyExplain(prevGen) && hasPedagogicalExplain({ explain: prevGen })) continue;
  const text = generatePedagogicalExplain(q);
  if (!text || text.length < 24) continue;
  if (!prevGen || isTemplateOnlyExplain(prevGen) || !hasPedagogicalExplain({ explain: prevGen })) {
    next[q.id] = text;
    added += 1;
  }
}

const sortedKeys = Object.keys(next).sort();
const lines = [
  "/** Explicaciones generadas (UTF-8). Solo fuentes examen oficial · expand-explanations-exam.mjs */",
  "export default {",
];
for (const id of sortedKeys) {
  lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(next[id])},`);
}
lines.push("};");
lines.push("");

writeUtf8File(OUT, lines.join("\n"));
console.log(
  `expand-explanations-exam: pool=${pool.length} nuevas=${added} ya didácticas=${skipped} total=${sortedKeys.length}`,
);
