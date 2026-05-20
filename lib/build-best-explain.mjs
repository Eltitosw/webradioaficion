/**
 * Genera la mejor explicación posible para una pregunta (varios intentos + validación).
 */
import { refreshExplainForQuestion, synthesizeReason, inferExplainTopic, finalizeExplain } from "./contextual-explain.mjs";
import { generatePedagogicalExplain, stemCrossTopicExplain } from "./generate-pedagogical-explain.mjs";
import { isGenericExplainText } from "./explain-faithfulness.mjs";
import { isExplainAcceptable } from "./explain-verify.mjs";
import { repairSpanishText } from "./text-encoding.mjs";
import { ensureHistoricalSourceHedge } from "./source-hedge.mjs";

/**
 * @param {object} q
 * @returns {string}
 */
export function buildBestExplain(q) {
  const stem = repairSpanishText(String(q.stem || ""));
  const correct = repairSpanishText(String(q.options?.[q.correctIndex] ?? ""));
  const topic = inferExplainTopic(stem, q.topicId);
  const candidates = [];

  const push = (text) => {
    const t = String(text || "").trim();
    if (t && !isGenericExplainText(t)) candidates.push(t);
  };

  push(generatePedagogicalExplain(q));
  push(refreshExplainForQuestion(q, ""));
  push(synthesizeReason(stem, correct, topic));
  push(finalizeExplain(stem, correct, synthesizeReason(stem, correct, topic)));

  for (const c of candidates) {
    const hedged = ensureHistoricalSourceHedge(q, c);
    if (isExplainAcceptable(q, hedged)) return hedged;
  }

  const cross = stemCrossTopicExplain(stem, correct);
  if (cross) {
    const hedged = ensureHistoricalSourceHedge(q, finalizeExplain(stem, correct, cross));
    if (isExplainAcceptable(q, hedged)) return hedged;
  }

  const reason = synthesizeReason(stem, correct, topic);
  const finalized = finalizeExplain(stem, correct, reason);
  if (!isGenericExplainText(finalized) && isExplainAcceptable(q, finalized)) {
    return ensureHistoricalSourceHedge(q, finalized);
  }

  const longest = candidates.sort((a, b) => b.length - a.length)[0];
  if (longest && longest.length >= 30) {
    const hedged = ensureHistoricalSourceHedge(q, finalizeExplain(stem, correct, longest));
    if (isExplainAcceptable(q, hedged)) return hedged;
  }

  return ensureHistoricalSourceHedge(q, finalizeExplain(stem, correct, cross || reason));
}
