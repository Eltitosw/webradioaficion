/**
 * Auditoría de figuras del banco activo: solo raster original, sin SVG interpretados,
 * sin duplicados de ruta, coherencia tema/parte y archivos presentes.
 *
 *   node scripts/verify-figures.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import questionsBanco from "../data/questions-banco.js";
import topics from "../data/topics.js";
import figureSvgs from "../data/figure-assets.js";
import { EXACT_FIGURE_QUESTION_IDS } from "../data/question-policy.js";
import { checkStemFigures, EXPLICIT_FIGURE_STEM_RE } from "../lib/stem-figure-check.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const QUIZ_IMG_DIR = path.join(webRoot, "images", "quiz");

const ORIGINAL_PATH_RE = /^images\/quiz\/[A-Za-z0-9._-]+-original\.(jpg|jpeg|png|webp)$/i;
const MIN_BYTES = 2048;

const topicPart = new Map();
for (const p of topics.parts || []) {
  for (const b of p.blocks || []) topicPart.set(b.id, p.id === "p2" ? 2 : 1);
}

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  errors += 1;
}

function warn(msg) {
  console.warn(`AVISO: ${msg}`);
  warnings += 1;
}

const withFigure = questionsBanco.filter((q) => q.stemFigure);
const pathToIds = new Map();

for (const q of withFigure) {
  const rel = String(q.stemFigure).trim();
  const ids = pathToIds.get(rel) || [];
  ids.push(q.id);
  pathToIds.set(rel, ids);

  if (rel.toLowerCase().endsWith(".svg")) {
    fail(`${q.id}: el banco activo no debe usar SVG interpretado (${rel}). Usa *-original.jpg|png.`);
  }
  if (!ORIGINAL_PATH_RE.test(rel)) {
    fail(`${q.id}: stemFigure debe ser imagen original (*-original.jpg|png|webp): ${rel}`);
  }
  if (!EXACT_FIGURE_QUESTION_IDS.has(q.id)) {
    fail(`${q.id}: tiene figura pero no está en EXACT_FIGURE_QUESTION_IDS (question-policy.js).`);
  }
  if (typeof figureSvgs[rel] === "string") {
    fail(`${q.id}: ${rel} no debe tener SVG embebido en figure-assets.js (solo raster fiel).`);
  }
  const expectedPart = topicPart.get(q.topicId);
  if (expectedPart !== q.part) {
    fail(`${q.id}: part ${q.part} no coincide con el bloque "${q.topicId}" (esperada parte ${expectedPart}).`);
  }
  if (!q.stemFigureAlt || !String(q.stemFigureAlt).trim()) {
    fail(`${q.id}: falta stemFigureAlt descriptivo.`);
  }
  const abs = path.join(webRoot, ...rel.split("/"));
  if (!fs.existsSync(abs)) {
    fail(`${q.id}: no existe el archivo ${rel}`);
  } else {
    const size = fs.statSync(abs).size;
    if (size < MIN_BYTES) fail(`${q.id}: ${rel} demasiado pequeño (${size} B); puede estar corrupto.`);
  }
}

for (const [rel, ids] of pathToIds) {
  if (ids.length > 1) {
    fail(`Ruta duplicada ${rel} usada por: ${ids.join(", ")} (cada figura debe ser 1:1 con su pregunta).`);
  }
}

for (const id of EXACT_FIGURE_QUESTION_IDS) {
  if (!withFigure.some((q) => q.id === id)) {
    fail(`EXACT_FIGURE_QUESTION_IDS incluye "${id}" pero no está en questions-banco.js con stemFigure.`);
  }
}

for (const q of questionsBanco) {
  if (EXPLICIT_FIGURE_STEM_RE.test(String(q.stem || "")) && !q.stemFigure) {
    fail(`${q.id}: el enunciado exige figura visible pero no define stemFigure.`);
  }
}

const stemMsgs = [];
checkStemFigures(questionsBanco, webRoot, (msg) => stemMsgs.push(msg));
for (const msg of stemMsgs) fail(msg);

const usedBasenames = new Set(withFigure.map((q) => path.basename(q.stemFigure)));
if (fs.existsSync(QUIZ_IMG_DIR)) {
  for (const name of fs.readdirSync(QUIZ_IMG_DIR)) {
    if (!/-original\.(jpg|jpeg|png|webp)$/i.test(name)) continue;
    if (!usedBasenames.has(name)) {
      warn(`Raster original sin pregunta en banco activo: ${name} (reservar o enlazar).`);
    }
  }
  const svgOnDisk = fs.readdirSync(QUIZ_IMG_DIR).filter((n) => n.endsWith(".svg"));
  if (svgOnDisk.length) {
    warn(
      `${svgOnDisk.length} SVG interpretado(s) en images/quiz/ no usados por el banco activo (legacy): ${svgOnDisk.join(", ")}`,
    );
  }
}

const byTopic = new Map();
for (const q of withFigure) {
  byTopic.set(q.topicId, (byTopic.get(q.topicId) || 0) + 1);
}

console.log("=== Figuras del banco activo ===");
console.log(`Preguntas con figura: ${withFigure.length}`);
console.log("Por bloque (topicId):");
for (const [topicId, n] of [...byTopic.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`  ${topicId}: ${n}`);
}
for (const q of withFigure) {
  console.log(`  · ${q.id} → ${q.stemFigure} [${q.topicId}]`);
}

if (errors) {
  console.error(`\nverify-figures: ${errors} error(es), ${warnings} aviso(s).`);
  process.exit(1);
}
console.log(`\nverify-figures: OK (${withFigure.length} figuras originales, 0 duplicados de ruta).`);
if (warnings) console.log(`Avisos: ${warnings}`);
