/**
 * Regenera explicaciones genéricas o con baja fidelidad (221+58 del audit).
 * Actualiza generated-explanations.js y quijotes-explanations.js cuando procede.
 */
import path from "path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import {
  explainMentionsCorrect,
  isGenericExplainText,
  needsExplainRefresh,
} from "../lib/explain-faithfulness.mjs";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";
import { refreshExplainForQuestion } from "../lib/contextual-explain.mjs";
import { generatePedagogicalExplain } from "../lib/generate-pedagogical-explain.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const QUIJ_OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");

/** @type {Record<string, string>} */
const nextGen = { ...generated };
/** @type {Record<string, string>} */
const nextQuij = { ...quijotesExp };

let refreshed = 0;
let quijUpdated = 0;
let genUpdated = 0;

for (const q of banco) {
  if (!needsExplainRefresh(q)) continue;

  const prior =
    quijotesExp[q.id] ||
    generated[q.id] ||
    pedagogicalExplain(q) ||
    (typeof q.explain === "string" ? q.explain : "");

  const correct = String(q.options?.[q.correctIndex] ?? "");
  const text =
    isGenericExplainText(prior) || !explainMentionsCorrect(prior, correct)
      ? generatePedagogicalExplain(q)
      : refreshExplainForQuestion(q, prior);
  refreshed += 1;

  if (q.id.startsWith("quijotes-") && quijotesExp[q.id]) {
    nextQuij[q.id] = text;
    quijUpdated += 1;
  } else {
    nextGen[q.id] = text;
    genUpdated += 1;
  }
}

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

writeMap(
  GEN_OUT,
  "/** Explicaciones generadas (UTF-8). refresh-all-explanations.mjs */",
  nextGen,
);
writeMap(
  QUIJ_OUT,
  "/** Explicaciones Quijotes (UTF-8). Ampliadas/refresh por refresh-all-explanations.mjs */",
  nextQuij,
);

process.stderr.write(
  `refresh-all-explanations: ${refreshed} actualizadas (gen: ${genUpdated}, quijotes: ${quijUpdated})\n`,
);
