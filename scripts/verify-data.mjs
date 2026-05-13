/**
 * Comprueba coherencia de datos (preguntas, temario, topic-study).
 * Ejecutar desde la raíz del proyecto: npm run verify
 */
import topics from "../data/topics.js";
import topicStudy from "../data/topics-study.js";
import questions from "../data/questions.js";
import ure from "../data/ure-electricidad.js";
import fedi from "../data/fediea-2011.js";
import quij from "../data/quijotes-ea3rcq.js";
import propias from "../data/questions-examen-propias.js";

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

const all = [...questions, ...propias, ...ure, ...fedi, ...quij];
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

for (const q of propias) {
  if (!q.sourceRef || !String(q.sourceRef).trim()) fail(`questions-examen-propias: falta sourceRef en ${q.id}`);
}

console.log("Preguntas totales:", all.length);
if (errors) {
  console.error(`\nverify-data: ${errors} error(es).`);
  process.exit(1);
}
console.log("verify-data: OK.");
