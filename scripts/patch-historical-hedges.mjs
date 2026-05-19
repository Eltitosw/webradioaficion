/**
 * Elimina colas «banco histórico / contrastar BOE» de explicaciones ya materializadas.
 */
import path from "path";
import { fileURLToPath } from "url";

import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import { BOE_HISTORICAL_HEDGE } from "../lib/boe-explain.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const QUIJ_OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");

function stripHistoricalHedge(text) {
  return String(text || "")
    .replace(BOE_HISTORICAL_HEDGE, "")
    .replace(/\s*Pregunta de banco histórico \(FEDI\/Quijotes\):[^.]*\.\s*/gi, " ")
    .replace(/\s*Es pregunta de banco histórico \(FEDI\/Quijotes\):[^.]*\.\s*/gi, " ")
    .replace(/\s*Contrastar con el reglamento consolidado BOE-A-2013-7624[^.]*\.\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const nextGen = { ...generated };
const nextQuij = { ...quijotesExp };
let patched = 0;

for (const [map, label] of [
  [nextGen, "gen"],
  [nextQuij, "quij"],
]) {
  for (const id of Object.keys(map)) {
    const cleaned = stripHistoricalHedge(map[id]);
    if (cleaned !== map[id]) {
      map[id] = cleaned;
      patched += 1;
    }
  }
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

process.stderr.write(`patch-historical-hedges: ${patched} explicaciones depuradas\n`);
