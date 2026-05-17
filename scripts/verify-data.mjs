/**
 * Comprueba coherencia de datos (preguntas, temario, topic-study).
 */
import topics from "../data/topics.js";
import topicStudy from "../data/topics-study.js";
import questionsBanco from "../data/questions-banco.js";
import { BANCO_STATS } from "../data/questions-banco.js";
import propias from "../data/questions-examen-propias.js";
import figures from "../data/questions-figures.js";
import { EXACT_FIGURE_QUESTION_IDS } from "../data/question-figure-ids.js";
import { EXCLUDED_UNTIL_EXACT_FIGURE_IDS, isActiveQuestion } from "../data/question-policy.js";

const blockIds = new Set();
for (const p of topics.parts || []) {
  for (const b of p.blocks || []) blockIds.add(b.id);
}

let errors = 0;
function fail(msg) {
  console.error(msg);
  errors += 1;
}

for (const k of Object.keys(topicStudy)) {
  if (!blockIds.has(k)) fail(`topicStudy: clave "${k}" no coincide con ningún bloque del temario`);
}
for (const id of blockIds) {
  if (!topicStudy[id]) fail(`Temario: bloque "${id}" sin entrada en topics-study.js`);
}

const all = questionsBanco;
const active = all.filter(isActiveQuestion);
const ids = new Set();

for (const q of all) {
  if (!q || typeof q.id !== "string") {
    fail("Ítem sin id válido");
    continue;
  }
  if (ids.has(q.id)) fail(`id duplicado: ${q.id}`);
  ids.add(q.id);
  if (!blockIds.has(q.topicId)) fail(`topicId desconocido en pregunta ${q.id}: ${q.topicId}`);
  if (q.part !== 1 && q.part !== 2) fail(`part inválida en ${q.id}: ${q.part}`);
  if (!Array.isArray(q.options) || q.options.length < 2) fail(`options inválidas en ${q.id}`);
  if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
    fail(`correctIndex inválido en ${q.id}`);
  }
}

for (const id of EXACT_FIGURE_QUESTION_IDS) {
  if (!ids.has(id)) fail(`question-figure-ids: "${id}" no está en questions-banco.js`);
}

for (const q of all) {
  if (q.stemFigure && !EXACT_FIGURE_QUESTION_IDS.has(q.id)) {
    fail(`Pregunta ${q.id}: tiene stemFigure pero falta en EXACT_FIGURE_QUESTION_IDS`);
  }
}

for (const q of propias) {
  if (!q.sourceRef || !String(q.sourceRef).trim()) fail(`questions-examen-propias: falta sourceRef en ${q.id}`);
}

for (const fq of figures) {
  if (!ids.has(fq.id)) {
    fail(`questions-figures: "${fq.id}" no está en el banco (ejecuta npm run build:banco)`);
  }
}

for (const q of all) {
  if (!q.stemFigure) continue;
  if (EXCLUDED_UNTIL_EXACT_FIGURE_IDS.has(q.id)) continue;
  if (!EXACT_FIGURE_QUESTION_IDS.has(q.id)) {
    fail(`Pregunta ${q.id}: figura sin certificar en question-figure-ids.js`);
  }
}

const withFig = all.filter((q) => q.stemFigure).length;
console.log("Banco principal:", all.length);
console.log("  cribado incluidos:", BANCO_STATS.cribadoIncluded ?? "?");
console.log("  con figura:", withFig);
console.log("Preguntas activas:", active.length);
if (errors) {
  console.error(`\nverify-data: ${errors} error(es).`);
  process.exit(1);
}
console.log("verify-data: OK.");
