/**
 * Alinea fuentes del banco (FEDI/Quijotes/URE) con BOE-A-2013-7624.
 * Uso: node scripts/apply-boe-bank-corrections.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { QUESTION_CORRECTIONS } from "../data/boe-bank-corrections.mjs";
import { applyBoeBankRules, explainForBoeRule } from "../lib/boe-bank-rules.mjs";
import { BOE_HISTORICAL_HEDGE } from "../lib/boe-explain.mjs";
import { writeQuestionModule, writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SOURCE_FILES = [
  "data/fediea-bloques.js",
  "data/fediea-2011.js",
  "data/quijotes-ea3rcq.js",
  "data/ure-reglamentacion.js",
];

const EXPLAIN_FILES = [
  "data/generated-explanations.js",
  "data/quijotes-explanations.js",
];

function stripHistoricalHedge(text) {
  return String(text || "")
    .replace(BOE_HISTORICAL_HEDGE, "")
    .replace(
      /\s*Pregunta de banco histórico \(FEDI\/Quijotes\):[^.]*\.\s*/gi,
      " ",
    )
    .replace(/\s*Es pregunta de banco histórico \(FEDI\/Quijotes\):[^.]*\.\s*/gi, " ")
    .replace(/\s*Contrastar con el reglamento consolidado BOE-A-2013-7624[^.]*\.\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {object} q
 */
function applyQuestionCorrections(q) {
  const rule = QUESTION_CORRECTIONS[q.id];
  if (!rule) return q;
  const next = { ...q, options: [...(q.options || [])] };
  if (rule.optionPatches) {
    for (const p of rule.optionPatches) {
      if (p.index >= 0 && p.index < next.options.length) {
        next.options[p.index] = p.text;
      }
    }
  }
  if (typeof rule.correctIndex === "number") {
    next.correctIndex = rule.correctIndex;
  }
  if (rule.explain) {
    next.explain = rule.explain;
  }
  return next;
}

function questionChanged(before, after) {
  if (before.stem !== after.stem) return true;
  if (before.correctIndex !== after.correctIndex) return true;
  const bo = before.options || [];
  const ao = after.options || [];
  if (bo.length !== ao.length) return true;
  return bo.some((o, i) => o !== ao[i]) || before.explain !== after.explain;
}

/**
 * @param {string} filePath
 */
async function patchQuestionModule(filePath) {
  const abs = path.join(ROOT, filePath);
  const mod = await import(pathToFileURL(abs).href);
  const list = mod.default;
  if (!Array.isArray(list)) {
    process.stderr.write(`skip ${filePath}: no export default array\n`);
    return 0;
  }
  let n = 0;
  const next = list.map((q) => {
    let item = applyQuestionCorrections(q);
    item = applyBoeBankRules(item);
    if (QUESTION_CORRECTIONS[item.id]?.explain) {
      item = { ...item, explain: QUESTION_CORRECTIONS[item.id].explain };
    }
    if (questionChanged(q, item)) n += 1;
    return item;
  });

  const raw = fs.readFileSync(abs, "utf8");
  const headerMatch = raw.match(/^\/\*\*([\s\S]*?)\*\//);
  const header = headerMatch
    ? headerMatch[1]
        .replace(/^\s*\n?/, "")
        .split("\n")
        .map((l) => l.replace(/^\s*\*\s?/, "").trim())
        .filter((l) => l && !l.startsWith("Generado por"))
        .join("\n")
    : path.basename(filePath);
  writeQuestionModule(abs, header, next);
  return n;
}

/**
 * @param {string} filePath
 */
function patchExplainModule(filePath) {
  const abs = path.join(ROOT, filePath);
  const raw = fs.readFileSync(abs, "utf8");
  const mod = raw.match(/export default (\{[\s\S]*\});/);
  if (!mod) {
    process.stderr.write(`skip ${filePath}: no map\n`);
    return 0;
  }
  const map = Function(`return (${mod[1]});`)();
  let n = 0;
  for (const [id, text] of Object.entries(map)) {
    const cleaned = stripHistoricalHedge(text);
    const fromRule = QUESTION_CORRECTIONS[id]?.explain;
    const finalText = fromRule || cleaned;
    if (finalText !== text) {
      map[id] = finalText;
      n += 1;
    }
  }
  const header = raw.split("\n")[0];
  const lines = [header, "export default {"];
  for (const id of Object.keys(map).sort()) {
    lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(map[id])},`);
  }
  lines.push("};", "");
  writeUtf8File(abs, lines.join("\n"));
  return n;
}

let totalQ = 0;
for (const f of SOURCE_FILES) {
  const n = await patchQuestionModule(f);
  totalQ += n;
  process.stderr.write(`${f}: ${n} pregunta(s) tocada(s)\n`);
}

let totalE = 0;
for (const f of EXPLAIN_FILES) {
  const n = patchExplainModule(f);
  totalE += n;
  process.stderr.write(`${f}: ${n} explicación(es) limpiada(s)\n`);
}

process.stderr.write(`apply-boe-bank-corrections: ${totalQ} preguntas · ${totalE} explicaciones\n`);
