/**
 * Genera la mejor explicación posible para una pregunta (varios intentos + validación).
 */
import { refreshExplainForQuestion, synthesizeReason, inferExplainTopic, finalizeExplain } from "./contextual-explain.mjs";
import { generatePedagogicalExplain } from "./generate-pedagogical-explain.mjs";
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
    if (t) candidates.push(t);
  };

  push(generatePedagogicalExplain(q));
  push(refreshExplainForQuestion(q, ""));
  push(synthesizeReason(stem, correct, topic));
  push(finalizeExplain(stem, correct, synthesizeReason(stem, correct, topic)));

  for (const c of candidates) {
    const hedged = ensureHistoricalSourceHedge(q, c);
    if (isExplainAcceptable(q, hedged)) return hedged;
  }

  const longest = candidates.sort((a, b) => b.length - a.length)[0];
  if (longest && longest.length >= 30) {
    return ensureHistoricalSourceHedge(q, finalizeExplain(stem, correct, longest));
  }

  return ensureHistoricalSourceHedge(q, finalizeExplain(stem, correct, synthesizeReason(stem, correct, topic)));
}
