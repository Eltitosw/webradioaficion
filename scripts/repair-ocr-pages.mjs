#!/usr/bin/env node
/**
 * Repara ficheros OCR locales (NNNN.txt) y opcionalmente regenera texto.txt.
 *
 * Uso:
 *   node scripts/repair-ocr-pages.mjs
 *   node scripts/repair-ocr-pages.mjs --dir="C:\ruta\ocr-pages"
 *   node scripts/repair-ocr-pages.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LIBRO_TECNICA_OCR_BASE } from "../data/libro-tecnica-indice.mjs";
import { repairOcrSpanishText } from "../lib/ocr-text-repair.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const dirArg = args.find((a) => a.startsWith("--dir="));
const ocrDir = dirArg ? dirArg.slice(6).replace(/^"|"$/g, "") : LIBRO_TECNICA_OCR_BASE;

if (!fs.existsSync(ocrDir)) {
  console.error(`No existe la carpeta OCR: ${ocrDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(ocrDir)
  .filter((f) => /^\d{4}\.txt$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let changed = 0;
let watermarks = 0;
const samples = [];

for (const name of files) {
  const fp = path.join(ocrDir, name);
  const raw = fs.readFileSync(fp, "utf8");
  const hadWm = /t\.?\s*me|ENFERMOS/i.test(raw);
  const fixed = repairOcrSpanishText(raw);
  if (hadWm) watermarks++;
  if (fixed !== raw) {
    changed++;
    if (samples.length < 5) samples.push(name);
    if (!dryRun) writeUtf8File(fp, fixed + (fixed.endsWith("\n") ? "" : "\n"));
  }
}

const parteDir = path.dirname(ocrDir);
const concatPath = path.join(parteDir, "texto.txt");
if (!dryRun && changed > 0) {
  const parts = files.map((name) => {
    const n = parseInt(name.slice(0, 4), 10);
    const body = fs.readFileSync(path.join(ocrDir, name), "utf8").trim();
    return `--- Página ${n} ---\n${body}`;
  });
  writeUtf8File(concatPath, parts.join("\n\n") + "\n");
}

console.log(`Carpeta: ${ocrDir}`);
console.log(`Ficheros: ${files.length}`);
console.log(`Modificados: ${changed}${dryRun ? " (dry-run)" : ""}`);
console.log(`Con marca de agua eliminada: ${watermarks}`);
if (samples.length) console.log(`Ejemplos tocados: ${samples.join(", ")}`);
if (!dryRun && changed > 0) console.log(`Regenerado: ${concatPath}`);
