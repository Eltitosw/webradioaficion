/**
 * Regenera explicaciones de preguntas históricas que exigen ancla BOE-A-2013-7624.
 * Uso: node scripts/sync-boe-normative-explanations.mjs
 */
import path from "node:path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import {
  explainHasBoeAficionadosAnchor,
  stemNeedsBoeAficionadosAnchor,
} from "../lib/boe-explain.mjs";
import { generatePedagogicalExplain } from "../lib/generate-pedagogical-explain.mjs";
import { ensureHistoricalSourceHedge } from "../lib/source-hedge.mjs";
import { getQuestionSourceMeta } from "../data/verification-sources.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const QUIJ_OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");

const nextGen = { ...generated };
const nextQuij = { ...quijotesExp };
let updated = 0;

for (const q of banco) {
  if (!stemNeedsBoeAficionadosAnchor(q.stem)) continue;
  if (getQuestionSourceMeta(q).tier !== "historical") continue;
  if (explainHasBoeAficionadosAnchor(q, q.explain)) continue;

  const fresh = ensureHistoricalSourceHedge(q, generatePedagogicalExplain(q));
  if (q.id.startsWith("quijotes-")) nextQuij[q.id] = fresh;
  else if (q.id.startsWith("fedi-")) nextGen[q.id] = fresh;
  else continue;
  updated += 1;
}

function writeMap(outPath, header, map) {
  const keys = Object.keys(map).sort();
  const lines = [header, "export default {"];
  for (const id of keys) lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(map[id])},`);
  lines.push("};", "");
  writeUtf8File(outPath, lines.join("\n"));
}

writeMap(GEN_OUT, "/** Explicaciones generadas (UTF-8). sync-boe-normative-explanations.mjs */", nextGen);
writeMap(QUIJ_OUT, "/** Explicaciones Quijotes (UTF-8). sync-boe-normative-explanations.mjs */", nextQuij);

process.stderr.write(`sync-boe-normative-explanations: ${updated} explicaciones regeneradas\n`);
