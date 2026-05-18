/**
 * Genera la mejor explicación posible para una pregunta (varios intentos + validación).
 */
import { refreshExplainForQuestion, synthesizeReason, inferExplainTopic, finalizeExplain } from "./contextual-explain.mjs";
import { generatePedagogicalExplain } from "./generate-pedagogical-explain.mjs";
import { isExplainAcceptable } from "./explain-verify.mjs";
import { repairSpanishText } from "./text-encoding.mjs";

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

  push(refreshExplainForQuestion(q, ""));
  push(generatePedagogicalExplain(q));
  push(synthesizeReason(stem, correct, topic));
  push(finalizeExplain(stem, correct, synthesizeReason(stem, correct, topic)));

  for (const c of candidates) {
    if (isExplainAcceptable(q, c)) return c;
  }

  const longest = candidates.sort((a, b) => b.length - a.length)[0];
  if (longest && longest.length >= 30) {
    return finalizeExplain(stem, correct, longest);
  }

  return finalizeExplain(stem, correct, synthesizeReason(stem, correct, topic));
}
