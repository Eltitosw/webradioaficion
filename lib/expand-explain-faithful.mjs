/**
 * Amplía explicaciones solo con texto anclado al enunciado y la opción correcta.
 */
import { finalizeExplain, refreshExplainForQuestion } from "./contextual-explain.mjs";
import {
  isGenericExplainText,
  isMisassignedPedagogicalExplain,
  isStemExplainTopicConflict,
} from "./explain-faithfulness.mjs";
import { isExplainAcceptable } from "./explain-verify.mjs";
import {
  buildWhyCorrect,
  explainRectifierFunction,
  isWeakBankExplain,
} from "./learn-while-test.mjs";
import { buildBestExplain } from "./build-best-explain.mjs";
import { inferExplainTopic, synthesizeReason } from "./contextual-explain.mjs";
import { generatePedagogicalExplain, stemCrossTopicExplain } from "./generate-pedagogical-explain.mjs";
import {
  GENERIC_Q_BLOCK_RE,
  isExplainExpansionImprovement,
  needsExplainExpansion,
} from "./explain-expand-need.mjs";

/**
 * @param {object} q
 * @param {string} text
 */
function explainCandidateScore(q, text) {
  const t = String(text || "").trim();
  const probe = { ...q, explain: t };
  let score = t.length;
  if (!needsExplainExpansion(q, t)) score += 300;
  if (GENERIC_Q_BLOCK_RE.test(t)) score -= 400;
  if (/^En este enunciado \(«/.test(t)) score -= 400;
  if (/\bFEDI-EA\.?\s*$/i.test(t)) score -= 80;
  if (isMisassignedPedagogicalExplain(probe) || isStemExplainTopicConflict(t, q.stem)) score -= 500;
  return score;
}

/**
 * @param {string} text
 */
function rejectCandidate(text) {
  const t = String(text || "").trim();
  if (!t || t.length < 35) return true;
  if (isWeakBankExplain(t)) return true;
  if (isGenericExplainText(t)) return true;
  if (/^En este enunciado \(«/.test(t)) return true;
  return false;
}

/**
 * @param {object} q
 * @param {string} current
 * @returns {string[]}
 */
function expansionCandidates(q, current) {
  const stem = String(q.stem || "");
  const correct = String(q.options?.[q.correctIndex] ?? "").trim();
  /** @type {string[]} */
  const out = [];
  const push = (text) => {
    const t = String(text || "").trim();
    if (rejectCandidate(t)) return;
    if (!out.includes(t)) out.push(t);
  };

  push(explainRectifierFunction(stem, correct));
  push(buildWhyCorrect(q));
  push(generatePedagogicalExplain(q));
  const syn = synthesizeReason(stem, correct, inferExplainTopic(stem, q.topicId));
  if (syn && !/^En este enunciado \(«/.test(syn)) {
    push(finalizeExplain(stem, correct, syn));
  }
  const cross = stemCrossTopicExplain(stem, correct);
  if (cross) push(finalizeExplain(stem, correct, cross));
  if (current) push(refreshExplainForQuestion(q, current));
  push(buildBestExplain(q));

  return out;
}

/**
 * @param {object} q
 * @param {string} [current]
 * @returns {{ text: string; expanded: boolean }}
 */
export function expandExplainFaithful(q, current = "") {
  const cur = String(current || "").trim();
  if (!needsExplainExpansion(q, cur) && cur) {
    return { text: cur, expanded: false };
  }

  let best = cur;
  for (const cand of expansionCandidates(q, cur)) {
    const probe = { ...q, explain: cand };
    if (!isExplainAcceptable(q, cand)) continue;
    if (isMisassignedPedagogicalExplain(probe) || isStemExplainTopicConflict(cand, q.stem)) continue;
    const mustReplace = needsExplainExpansion(q, cur);
    if (!mustReplace && !isExplainExpansionImprovement(cur, cand) && !needsExplainExpansion(q, best)) {
      continue;
    }

    const candScore = explainCandidateScore(q, cand);
    const bestScore = explainCandidateScore(q, best);
    if (candScore > bestScore) best = cand;
  }

  if (best && isExplainAcceptable(q, best)) {
    const qualityGain = needsExplainExpansion(q, cur) && !needsExplainExpansion(q, best);
    if (qualityGain || isExplainExpansionImprovement(cur, best)) {
      return { text: best, expanded: best !== cur };
    }
  }

  if (cur && isExplainAcceptable(q, cur)) {
    return { text: cur, expanded: false };
  }

  const fallback = expansionCandidates(q, cur).find((c) => isExplainAcceptable(q, c));
  if (fallback) return { text: fallback, expanded: Boolean(cur) && fallback !== cur };

  return { text: cur || best, expanded: false };
}
