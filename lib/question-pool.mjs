import { EMERGENCIA_AUXILIO_IDS } from "../data/emergencia-auxilio-ids.js";

/** @param {{ id?: string }} q */
export function isEmergenciaAuxilioQuestion(q) {
  return !!q?.id && EMERGENCIA_AUXILIO_IDS.has(q.id);
}

/**
 * En simulacros y práctica general se prioriza el examen de radioaficionado:
 * las preguntas de auxilios/señalización solo entran si eliges el bloque Operación y emergencias.
 *
 * @param {Array<{ id?: string; topicId?: string }>} questions
 * @param {{ topicFilter?: string; sessionType?: string; mode?: string }} opts
 */
export function filterQuestionsForSession(questions, { topicFilter = "all", sessionType = "libre", mode = "study" } = {}) {
  if (topicFilter === "operacion-seguridad") return questions;
  const examLike = sessionType === "teorico" || mode === "exam";
  const broad = !topicFilter || topicFilter === "all";
  if (!examLike && !broad) return questions;
  return questions.filter((q) => !isEmergenciaAuxilioQuestion(q));
}
