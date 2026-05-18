/**
 * Añade matiz BOE a explicaciones históricas normativas ya guardadas.
 */
import path from "path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";
import { explainHasBoeAficionadosAnchor, stemNeedsBoeAficionadosAnchor } from "../lib/boe-explain.mjs";
import { ensureHistoricalSourceHedge } from "../lib/source-hedge.mjs";
import { auditExplainAgainstSources } from "../lib/source-verification.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const QUIJ_OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");

const nextGen = { ...generated };
const nextQuij = { ...quijotesExp };
let patched = 0;

for (const q of banco) {
  const current = nextQuij[q.id] || nextGen[q.id] || pedagogicalExplain(q);
  const meta = q.id.startsWith("quijotes-") || q.id.startsWith("fedi-");
  if (!meta) continue;
  const stem = String(q.stem || "");
  if (!stemNeedsBoeAficionadosAnchor(stem)) continue;
  if (explainHasBoeAficionadosAnchor(q, current)) continue;

  const hedged = ensureHistoricalSourceHedge(q, current);
  if (hedged === current) continue;

  if (q.id.startsWith("quijotes-")) nextQuij[q.id] = hedged;
  else nextGen[q.id] = hedged;
  patched += 1;
}

function writeMap(outPath, header, map) {
  const keys = Object.keys(map).sort();
  const lines = [header, "export default {"];
  for (const id of keys) lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(map[id])},`);
  lines.push("};", "");
  writeUtf8File(outPath, lines.join("\n"));
}

writeMap(GEN_OUT, "/** Explicaciones generadas (UTF-8). patch-historical-hedges.mjs */", nextGen);
writeMap(QUIJ_OUT, "/** Explicaciones Quijotes (UTF-8). patch-historical-hedges.mjs */", nextQuij);

process.stderr.write(`patch-historical-hedges: ${patched} explicaciones actualizadas\n`);
