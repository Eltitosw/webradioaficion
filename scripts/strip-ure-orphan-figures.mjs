/**
 * Quita figuras URE pegadas al azar (banners, páginas sin diagrama en el enunciado).
 * Conserva figuras cuando el enunciado las pide explícitamente.
 *
 * Uso: node scripts/strip-ure-orphan-figures.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

import { stemNeedsFigure, writeQuestionModule, writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SOURCE_FILES = [
  "data/ure-electricidad.js",
  "data/ure-electricidad-extra.js",
  "data/ure-reglamentacion.js",
  "data/questions-figures.js",
];

/** IDs con banner URE conocido aunque el enunciado pida figura (falso positivo). */
const FORCE_STRIP_IDS = new Set(["ure-p1-q61"]);

/**
 * @param {object} q
 */
function shouldStripFigure(q) {
  if (!q?.stemFigure) return false;
  if (FORCE_STRIP_IDS.has(q.id)) return true;
  if (!String(q.id || "").startsWith("ure-")) return false;
  return !stemNeedsFigure(q.stem);
}

/**
 * @param {object} q
 */
function stripFigureFields(q) {
  const { stemFigure, stemFigureAlt, ...rest } = q;
  return rest;
}

/**
 * @param {string} filePath
 */
async function patchQuestionModule(filePath) {
  const abs = path.join(ROOT, filePath);
  const mod = await import(pathToFileURL(abs).href);
  const list = mod.default;
  if (!Array.isArray(list)) {
    process.stderr.write(`skip ${filePath}: no array\n`);
    return 0;
  }
  let n = 0;
  const next = list.map((q) => {
    if (!shouldStripFigure(q)) return q;
    n += 1;
    return stripFigureFields(q);
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

let total = 0;
for (const f of SOURCE_FILES) {
  const n = await patchQuestionModule(f);
  total += n;
  process.stderr.write(`${f}: ${n} figura(s) quitada(s)\n`);
}

process.stderr.write(`strip-ure-orphan-figures: ${total} en total\n`);
