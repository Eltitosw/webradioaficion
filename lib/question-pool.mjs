import { EXCLUDED_EXAM_IDS } from "../data/excluded-exam-ids.js";

/** @param {{ id?: string }} q */
export function isExcludedFromRadioaficionadoExam(q) {
  return !!q?.id && EXCLUDED_EXAM_IDS.has(q.id);
}

/** @deprecated use isExcludedFromRadioaficionadoExam */
export function isEmergenciaAuxilioQuestion(q) {
  return isExcludedFromRadioaficionadoExam(q);
}

/**
 * El simulador prepara solo el examen de radioaficionado: se excluyen ítems
 * de Tráfico, TETRA/EA3RCQ, primeros auxilios vial, etc.
 *
 * @param {Array<{ id?: string; topicId?: string }>} questions
 * @param {{ topicFilter?: string; sessionType?: string; mode?: string }} opts
 */
export function filterQuestionsForSession(questions, { topicFilter = "all" } = {}) {
  void topicFilter;
  return questions.filter((q) => !isExcludedFromRadioaficionadoExam(q));
}
