/**
 * Genera data/excluded-exam-ids.js: preguntas que no pertenecen al examen
 * oficial de radioaficionado (Tráfico, TETRA/EA3RCQ, auxilios vial, etc.).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import fedi from "../data/fediea-2011.js";
import fediBloques from "../data/fediea-bloques.js";
import quijotes from "../data/quijotes-ea3rcq.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import questions from "../data/questions.js";
import { EXAM_OFFICIAL_URLS, isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { isNormativelyUnacceptableQuestion } from "../lib/question-recency.mjs";

const OUT = join(import.meta.dirname, "..", "data", "excluded-exam-ids.js");

const all = [
  ...questions,
  ...propias,
  ...ure,
  ...ureExtra,
  ...ureReg,
  ...fedi,
  ...fediBloques,
  ...quijotes,
];

const ids = [];
for (const q of all) {
  if (isOffTopicForRadioaficionadoExam(q)) ids.push(q.id);
  else if (isNormativelyUnacceptableQuestion(q)) ids.push(q.id);
}
ids.sort();

const body = `/**
 * Fuera del examen oficial de radioaficionado (no entran en cribado ni banco activo).
 * Generado por \`node scripts/build-excluded-exam-ids.mjs\`
 * Examen: ${EXAM_OFFICIAL_URLS.examenes}
 * Autorización: ${EXAM_OFFICIAL_URLS.autorizaciones}
 */
export const EXCLUDED_EXAM_IDS = new Set(${JSON.stringify(ids, null, 2)});
`;

writeFileSync(OUT, body);
console.log(`excluded-exam-ids: ${ids.length} id(s) → ${OUT}`);
