/**
 * Limpieza de artefactos legacy (SVG huérfanos, datos de desarrollo).
 * Uso: node scripts/cleanup-project.mjs [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import questionsBanco from "../data/questions-banco.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const QUIZ_DIR = path.join(ROOT, "images", "quiz");
const dryRun = process.argv.includes("--dry-run");

/** SVG interpretados no referenciados por el banco activo. */
const LEGACY_SVG = [
  "envelope-detector-am.svg",
  "fedi-ag-013-critical-frequency.svg",
  "fedi-ag-014-capacitor-divider.svg",
  "fedi-ag-016-direct-conversion.svg",
  "ofic-yagi-elements.svg",
  "quijotes-044-lc-wattmeter.svg",
  "quijotes-051.svg",
  "ure-p1-02.svg",
  "ure-p1-08.svg",
  "ure-p1-15.svg",
  "ure-p1-17.svg",
  "ure-p1-27.svg",
];

const STALE_DATA = [
  "data/bad-explain-stems.txt",
  "data/radioid-sevilla.json",
  "data/radioid-sevilla.csv",
];

const STALE_SCRIPTS = [
  "scripts/dump-quijotes-settings.mjs",
  "scripts/dump-quijotes-settings2.mjs",
  "scripts/dump-quijotes-stem-html.mjs",
  "scripts/probe-quijotes-images.mjs",
  "scripts/probe-quijotes-page-img.mjs",
  "scripts/probe-quijotes-figures.mjs",
  "scripts/find-quijotes-q153.mjs",
  "scripts/hunt-quijotes-missing.mjs",
  "scripts/scan-quijotes-figures.mjs",
  "scripts/audit-fedi-missed-figures.mjs",
  "scripts/audit-live-html.mjs",
  "scripts/fetch-radioid-sevilla.mjs",
  "scripts/build-emergencia-auxilio-ids.mjs",
  "data/emergencia-auxilio-ids.js",
];

function removeFile(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return false;
  if (dryRun) {
    process.stderr.write(`[dry-run] eliminar ${rel}\n`);
    return true;
  }
  fs.unlinkSync(abs);
  process.stderr.write(`eliminado ${rel}\n`);
  return true;
}

let n = 0;
for (const name of LEGACY_SVG) {
  if (removeFile(path.join("images", "quiz", name).replace(/\\/g, "/"))) n += 1;
}

for (const rel of [...STALE_DATA, ...STALE_SCRIPTS]) {
  if (removeFile(rel)) n += 1;
}

const used = new Set(
  questionsBanco.filter((q) => q.stemFigure).map((q) => path.basename(String(q.stemFigure))),
);
if (fs.existsSync(QUIZ_DIR)) {
  for (const name of fs.readdirSync(QUIZ_DIR)) {
    if (!/-original\.(jpg|jpeg|png|webp)$/i.test(name)) continue;
    if (used.has(name)) continue;
    const rel = `images/quiz/${name}`;
    if (removeFile(rel)) n += 1;
  }
}

process.stderr.write(`cleanup-project: ${n} archivo(s)${dryRun ? " (simulación)" : ""}\n`);
