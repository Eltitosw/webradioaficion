/**
 * Añade cita BOE-A-2013-7624 a explicaciones normativas sin degradar el texto didáctico.
 */
import path from "node:path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import quijotesSource from "../data/quijotes-ea3rcq.js";
import {
  explainHasBoeAficionadosAnchor,
  stemNeedsBoeAficionadosAnchor,
} from "../lib/boe-explain.mjs";
import { QUESTION_CORRECTIONS } from "../data/boe-bank-corrections.mjs";
import { buildBestExplain } from "../lib/build-best-explain.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { ensureHistoricalSourceHedge } from "../lib/source-hedge.mjs";
import { getQuestionSourceMeta } from "../data/verification-sources.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const QUIJ_OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");

const nextGen = { ...generated };
const nextQuij = { ...quijotesExp };
const quijotesSourceIds = new Set(quijotesSource.map((q) => q.id));
let updated = 0;

for (const q of banco) {
  if (!stemNeedsBoeAficionadosAnchor(q.stem)) continue;
  if (getQuestionSourceMeta(q).tier !== "historical") continue;

  const stored = nextQuij[q.id] || nextGen[q.id] || String(q.explain || "");
  if (explainHasBoeAficionadosAnchor(q, stored) && isExplainAcceptable(q, stored)) continue;

  const fromCorrection = QUESTION_CORRECTIONS[q.id]?.explain;
  const candidate = ensureHistoricalSourceHedge(q, fromCorrection || buildBestExplain(q));
  if (!isExplainAcceptable(q, candidate)) continue;

  if (q.id.startsWith("quijotes-") && quijotesSourceIds.has(q.id)) nextQuij[q.id] = candidate;
  else if (q.id.startsWith("fedi-") || q.id.startsWith("quijotes-")) nextGen[q.id] = candidate;
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

process.stderr.write(`sync-boe-normative-explanations: ${updated} explicaciones actualizadas\n`);
