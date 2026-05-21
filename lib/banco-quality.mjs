/**
 * Calidad mínima para publicar una pregunta en el banco activo del examen.
 */
import { classifyQuestion } from "./question-classification.mjs";
import { isOffTopicForRadioaficionadoExam } from "./exam-scope.mjs";
import { isExcludedFromRadioaficionadoExam } from "./question-pool.mjs";
import { repairQuestionFields } from "./text-encoding.mjs";
import {
  isStemCoherentWithTopic,
  stemForbiddenInTopic,
  stemRequiredForTopic,
} from "./topic-stem-coherence.mjs";
import { isExamAlignedSourceId } from "./exam-aligned-sources.mjs";
import { hasPedagogicalExplain } from "./explain-quality.mjs";
import { getRecencyMeta, hasObsoleteHint, isNormativelyUnacceptableQuestion } from "./question-recency.mjs";
import { isExplainAcceptable } from "./explain-verify.mjs";

/**
 * @param {object} q
 * @returns {{ question: object; classification: ReturnType<typeof classifyQuestion> }}
 */
export function prepareBankQuestion(q) {
  const repaired = repairQuestionFields(q);
  if (
    repaired.id?.startsWith("ofic-") &&
    repaired.topicId &&
    (repaired.part === 1 || repaired.part === 2)
  ) {
    return {
      question: repaired,
      classification: {
        part: repaired.part,
        topicId: repaired.topicId,
        ruleId: "ofic-pinned",
        confidence: "high",
      },
    };
  }
  const classification = classifyQuestion({
    stem: repaired.stem,
    sourcePart: repaired.part,
    id: repaired.id,
  });
  const question =
    repaired.part === classification.part && repaired.topicId === classification.topicId
      ? repaired
      : repairQuestionFields({
          ...repaired,
          part: classification.part,
          topicId: classification.topicId,
        });
  return { question, classification };
}

/** URE/FEDI sin señal fuerte de bloque: solo si el enunciado encaja con el tema por defecto. */
function allowsExamDefaultTopicFallback(id, stem, topicId) {
  if (!id?.startsWith("ure-") && !id?.startsWith("fedi-")) return false;
  return stemRequiredForTopic(stem, topicId) && !stemForbiddenInTopic(stem, topicId);
}

/**
 * @param {object} q
 * @param {{ allowLowConfidence?: boolean; allowTierC?: boolean; allowTierB?: boolean; requireExplain?: boolean }} [opts]
 */
export function isPublishableBankQuestion(
  q,
  { allowLowConfidence = false, allowTierC = false, allowTierB = true, requireExplain = true } = {},
) {
  if (!q?.id || typeof q.stem !== "string" || !q.stem.trim()) return false;
  if (!Array.isArray(q.options) || q.options.length < 2) return false;
  if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
    return false;
  }
  if (isExcludedFromRadioaficionadoExam(q)) return false;
  if (isOffTopicForRadioaficionadoExam(q)) return false;
  if (!isExamAlignedSourceId(q.id)) return false;
  if (JSON.stringify(q).includes("\uFFFD")) return false;
  if (isNormativelyUnacceptableQuestion(q)) return false;

  const tier = getRecencyMeta(q.id).tier;
  if (!allowTierC && tier === "C") return false;
  if (!allowTierB && tier === "B") return false;

  const { question, classification } = prepareBankQuestion(q);
  if (!allowLowConfidence && (classification.confidence === "low" || classification.ruleId === "fallback-review")) {
    return false;
  }
  if (classification.ruleId === "default-topic-ok") {
    if (!allowsExamDefaultTopicFallback(q.id, question.stem, question.topicId)) return false;
  }

  if (!isStemCoherentWithTopic(question.stem, question.topicId, classification)) return false;

  if (requireExplain && !hasPedagogicalExplain(question)) return false;

  return true;
}

/**
 * Tras fusionar explicaciones generadas (build-banco).
 * @param {object} q
 */
export function isPublishableEnrichedQuestion(q) {
  if (!isPublishableBankQuestion(q, { requireExplain: true, allowTierB: false })) return false;
  return isExplainAcceptable(q);
}
