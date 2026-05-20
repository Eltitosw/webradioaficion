/**
 * Rellena el banco hasta MIN_BANCO_QUESTIONS con candidatos válidos de las fuentes.
 */
import fs from "fs";
import { dedupeKey, stemNeedsFigure } from "./import-question-utils.mjs";
import { isPublishableBankQuestion, prepareBankQuestion } from "./banco-quality.mjs";
import { examSourcePriority, isExamAlignedSourceId } from "./exam-aligned-sources.mjs";
import {
  getRecencyMeta,
  isNormativelyUnacceptableQuestion,
  MIN_BANCO_QUESTIONS,
  recencyScore,
} from "./question-recency.mjs";
import { repairQuestionFields } from "./text-encoding.mjs";
import { isOffTopicForRadioaficionadoExam } from "./exam-scope.mjs";

/**
 * @param {object} q
 * @returns {boolean}
 */
export function isBankCandidate(q) {
  if (!q?.id || typeof q.stem !== "string" || !q.stem.trim()) return false;
  if (!Array.isArray(q.options) || q.options.length < 2) return false;
  if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
    return false;
  }
  if (q.part !== 1 && q.part !== 2) return false;
  if (!q.topicId) return false;

  const repaired = repairQuestionFields(q);
  if (isOffTopicForRadioaficionadoExam(repaired)) return false;
  if (!isPublishableBankQuestion(repaired, { requireExplain: false })) return false;
  if (isNormativelyUnacceptableQuestion(repaired)) return false;
  if (JSON.stringify(repaired).includes("\uFFFD")) return false;

  if (stemNeedsFigure(repaired.stem) && !repaired.stemFigure) return false;
  if (repaired.stemFigure) {
    const path = String(repaired.stemFigure);
    if (!path.includes("-original.")) return false;
    if (!fs.existsSync(path)) return false;
  }

  return true;
}

/**
 * @param {object} q
 */
function candidateScore(q) {
  if (!isExamAlignedSourceId(q.id)) return -1;
  const meta = getRecencyMeta(q.id);
  if (meta.tier === "C" || meta.tier === "B") return -1;
  let score = recencyScore(meta.tier) + examSourcePriority(q.id);
  if (q.stemFigure) score += 50;
  return score;
}

/**
 * @param {Map<string, object>} bankById
 * @param {Map<string, object>} byId
 * @param {object[]} sourceList
 * @param {number} [minCount]
 */
export function fillBankToMinimum(bankById, byId, sourceList, minCount = MIN_BANCO_QUESTIONS) {
  const stemKeys = new Set();
  for (const q of bankById.values()) {
    stemKeys.add(dedupeKey(q.stem, q.options));
  }

  const added = [];
  if (bankById.size >= minCount) {
    return { added, finalCount: bankById.size };
  }

  const candidates = [];
  for (const q of sourceList) {
    if (!q?.id || bankById.has(q.id)) continue;
    const repaired = repairQuestionFields(q);
    if (!isBankCandidate(repaired)) continue;
    const { question: classified } = prepareBankQuestion(repaired);
    const key = dedupeKey(classified.stem, classified.options);
    if (stemKeys.has(key)) continue;
    candidates.push({ q: classified, score: candidateScore(classified), key });
  }

  candidates.sort((a, b) => b.score - a.score || a.q.id.localeCompare(b.q.id));

  for (const { q, key, score } of candidates) {
    if (score < 0) continue;
    if (bankById.size >= minCount) break;
    bankById.set(q.id, q);
    stemKeys.add(key);
    added.push(q.id);
  }

  return { added, finalCount: bankById.size };
}
