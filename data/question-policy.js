import { isCribadoPreferred as isCribadoPreferredId } from "./question-cribado.js";
import { EXACT_FIGURE_QUESTION_IDS } from "./question-figure-ids.js";

export { EXACT_FIGURE_QUESTION_IDS };

export const EXCLUDED_UNTIL_EXACT_FIGURE_IDS = new Set([]);

export function isActiveQuestion(q) {
  return !!q && !EXCLUDED_UNTIL_EXACT_FIGURE_IDS.has(q.id);
}

/** Pregunta incluida en el cribado de fuentes recientes (ver `npm run cribado`). */
export function isCribadoPreferred(q) {
  return !!q && isActiveQuestion(q) && isCribadoPreferredId(q.id);
}
