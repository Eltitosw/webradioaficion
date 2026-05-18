/**
 * Auditoría estática de vistas y datos del frontend.
 * Ejecutar: node scripts/audit-frontend-views.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import topicsData from "../data/topics.js";
import topicStudy from "../data/topics-study.js";
import questionsBanco from "../data/questions-banco.js";
import regulatory from "../data/regulatory.js";

const root = join(import.meta.dirname, "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const appJs = readFileSync(join(root, "app.js"), "utf8");

const VIEWS = [
  "inicio",
  "temario",
  "normativa",
  "metodologia",
  "practicar",
  "examen",
  "cuaderno",
  "tarjetas",
  "ayuda",
];

const REQUIRED_IDS = [
  "temario-root",
  "temario-filter",
  "temario-weak-only",
  "temario-expand-all",
  "temario-collapse-all",
  "temario-reading-mode",
  "temario-speak-start",
  "temario-speak-stop",
  "temario-jump",
  "normativa-root",
  "method-root",
  "user-stats-root",
  "quiz-start",
  "quiz-topic",
  "quiz-part",
  "quiz-area",
  "exam-readiness-root",
  "error-notebook-root",
  "fc-load",
  "fc-topic",
  "fc-area",
  "a11y-light",
  "a11y-font-scale",
  "app.bundle.js",
];

let failures = 0;
let warnings = 0;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures += 1;
}
function warn(msg) {
  console.warn(`AVISO: ${msg}`);
  warnings += 1;
}
function ok(msg) {
  console.log(`OK: ${msg}`);
}

// Vistas en HTML
for (const id of VIEWS) {
  if (!html.includes(`id="view-${id}"`)) fail(`Falta sección view-${id} en index.html`);
}
ok(`${VIEWS.length} vistas presentes en index.html`);

// IDs críticos
for (const id of REQUIRED_IDS) {
  if (id === "app.bundle.js") {
    if (!html.includes("app.bundle.js")) fail("index.html no referencia app.bundle.js");
    continue;
  }
  if (!html.includes(`id="${id}"`)) fail(`Falta #${id} en index.html`);
}
ok("Elementos críticos del DOM referenciados");

// Bloques temario vs study
const blocks = topicsData.parts.flatMap((p) => p.blocks || []);
const blockIds = blocks.map((b) => b.id);
const missingStudy = blockIds.filter((id) => !topicStudy[id]);
const emptyStudy = blockIds.filter((id) => {
  const s = topicStudy[id];
  if (!s) return true;
  const has =
    (s.memoryHooks?.length || 0) +
    (s.expressBullets?.length || 0) +
    (s.bookGuide?.length || 0) +
    (s.flashcards?.length || 0);
  return has === 0;
});
if (missingStudy.length) fail(`Bloques sin topicStudy: ${missingStudy.join(", ")}`);
else ok(`topicStudy cubre ${blockIds.length} bloques`);
if (emptyStudy.length) warn(`Bloques con study vacío: ${emptyStudy.join(", ")}`);

// Preguntas por bloque
const counts = {};
for (const q of questionsBanco) {
  counts[q.topicId] = (counts[q.topicId] || 0) + 1;
}
const noQuestions = blockIds.filter((id) => !counts[id]);
if (noQuestions.length) fail(`Bloques sin preguntas: ${noQuestions.join(", ")}`);
else ok(`Todos los bloques tienen preguntas en el banco`);

// Normativa y método
if (!regulatory?.linkGroups?.length) fail("regulatory.linkGroups vacío");
else ok(`Normativa: ${regulatory.linkGroups.length} grupos de enlaces`);
const methodsMatch = appJs.match(/const methods = \[([\s\S]*?)\n\];/);
if (!methodsMatch) fail("No se encontró const methods en app.js");
else ok("Método: bloque methods definido en app.js");

// Funciones de render en app.js
const renderFns = [
  "renderTemario",
  "renderNormativa",
  "renderMethods",
  "renderUserProgress",
  "renderExamCoach",
  "renderFlashcard",
  "renderQuestion",
  "initNav",
  "initA11y",
  "initTemarioReading",
  "speakTemarioBlock",
  "scrollQuizToQuestion",
];
for (const fn of renderFns) {
  if (!appJs.includes(`function ${fn}`)) fail(`Falta función ${fn} en app.js`);
}
ok("Funciones principales presentes en app.js");

// Bundle existe
try {
  readFileSync(join(root, "app.bundle.js"));
  ok("app.bundle.js existe");
} catch {
  warn("app.bundle.js no encontrado — ejecuta npm run build:web antes de desplegar");
}

console.log("\n=== Resumen auditoría frontend ===");
console.log(`Fallos: ${failures}`);
console.log(`Avisos: ${warnings}`);
if (failures > 0) process.exit(1);
console.log("Resultado: OK");
