/**
 * Amplía explicaciones del banco EXAMEN (481) solo cuando hace falta.
 * Uso: node scripts/expand-explanations-exam-needed.mjs
 */
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

import examen from "../data/questions-banco.js";
import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import quijotesSource from "../data/quijotes-ea3rcq.js";
import { expandExplainFaithful } from "../lib/expand-explain-faithful.mjs";
import { needsExplainExpansion } from "../lib/explain-expand-need.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";
import { strictAuditExplainBank } from "../lib/explain-verify.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_OUT = path.join(__dirname, "..", "data", "generated-explanations.js");
const QUIJ_OUT = path.join(__dirname, "..", "data", "quijotes-explanations.js");
const REPORT = path.join(__dirname, "..", "data", "explain-examen-expand-report.txt");

const quijotesSourceIds = new Set(quijotesSource.map((q) => q.id));

/** @type {Record<string, string>} */
const nextGen = { ...generated };
/** @type {Record<string, string>} */
const nextQuij = { ...quijotesExp };

function storeExplain(q, text) {
  if (q.id.startsWith("quijotes-") && quijotesSourceIds.has(q.id)) {
    nextQuij[q.id] = text;
  } else {
    nextGen[q.id] = text;
  }
}

function currentText(q) {
  return nextQuij[q.id] || nextGen[q.id] || pedagogicalExplain(q) || String(q.explain || "");
}

const lines = [`Expansión selectiva · banco EXAMEN · ${new Date().toISOString().slice(0, 19)}`, ""];
let candidates = 0;
let expanded = 0;
let stillNeed = /** @type {string[]} */ ([]);

for (const q of examen) {
  const prev = currentText(q);
  if (!needsExplainExpansion(q, prev)) continue;
  candidates += 1;
  const { text, expanded: did } = expandExplainFaithful(q, prev);
  if (!isExplainAcceptable(q, text)) {
    stillNeed.push(q.id);
    lines.push(`✗ ${q.id}`);
    continue;
  }
  if (did && text !== prev) {
    storeExplain(q, text);
    expanded += 1;
    lines.push(`✓ ${q.id} · ${prev.length} → ${text.length} chars`);
    lines.push(`  P: ${String(q.stem).replace(/\s+/g, " ").slice(0, 95)}`);
    lines.push(`  E: ${text.replace(/\s+/g, " ").slice(0, 200)}`);
    lines.push("");
  } else if (needsExplainExpansion(q, text)) {
    stillNeed.push(q.id);
  }
}

function writeMap(outPath, header, map) {
  const keys = Object.keys(map).sort();
  writeUtf8File(
    outPath,
    [
      header,
      "export default {",
      ...keys.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(map[k])},`),
      "};",
      "",
    ].join("\n"),
  );
}

writeMap(GEN_OUT, "/** Explicaciones generadas (UTF-8). expand-explanations-exam-needed.mjs */", nextGen);
writeMap(QUIJ_OUT, "/** Explicaciones Quijotes (UTF-8). expand-explanations-exam-needed.mjs */", nextQuij);

lines.push(
  `Candidatas: ${candidates}`,
  `Ampliadas: ${expanded}`,
  `Siguen necesitando expansión: ${stillNeed.length}`,
);
if (stillNeed.length) lines.push("", "IDs:", stillNeed.join(", "));
writeUtf8File(REPORT, `${lines.join("\n")}\n`);

console.log(lines.slice(0, 6).join("\n"));
console.log(`Informe: ${REPORT}`);

const rebuild = spawnSync(process.execPath, ["scripts/build-banco-principal.mjs"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
});
if (rebuild.status !== 0) process.exit(rebuild.status ?? 1);

const { default: examAfter } = await import(`../data/questions-banco.js?x=${Date.now()}`);
const audit = strictAuditExplainBank(examAfter);
console.log(`Tras rebuild examen: ${audit.ok}/${audit.total} OK estricto`);

const verify = spawnSync(process.execPath, ["scripts/verify-explanations-strict.mjs"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
});
process.exit(verify.status !== 0 || audit.unacceptable.length ? 1 : stillNeed.length ? 0 : 0);
