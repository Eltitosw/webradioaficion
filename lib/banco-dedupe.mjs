/**
 * Elige una sola pregunta por enunciado duplicado (mismo stem + opciones).
 */
import { dedupeKey } from "./import-question-utils.mjs";
import { getRecencyMeta, recencyScore } from "./question-recency.mjs";

/** @param {string} id */
function sourcePriority(id) {
  if (id.startsWith("ofic-")) return 0;
  if (id.startsWith("fedi-")) return 1;
  if (id.startsWith("ure-")) return 2;
  if (id.startsWith("quijotes-")) return 3;
  return 4;
}

/** @param {string} id */
function quijotesQuizKey(id) {
  const m = id.match(/^quijotes-(\d+)-/);
  return m ? parseInt(m[1], 10) : 0;
}

/**
 * @param {object[]} candidates
 * @param {Set<string>} [cribadoIds]
 */
export function pickDuplicateWinner(candidates, cribadoIds) {
  if (!candidates.length) return null;
  if (candidates.length === 1) return candidates[0];

  return [...candidates].sort((a, b) => {
    const aC = cribadoIds?.has(a.id) ? 1 : 0;
    const bC = cribadoIds?.has(b.id) ? 1 : 0;
    if (bC !== aC) return bC - aC;

    const aF = a.stemFigure ? 1 : 0;
    const bF = b.stemFigure ? 1 : 0;
    if (bF !== aF) return bF - aF;

    const aS = recencyScore(getRecencyMeta(a.id).tier);
    const bS = recencyScore(getRecencyMeta(b.id).tier);
    if (bS !== aS) return bS - aS;

    const aP = sourcePriority(a.id);
    const bP = sourcePriority(b.id);
    if (aP !== bP) return aP - bP;

    if (aP === 3 && bP === 3) {
      return quijotesQuizKey(b.id) - quijotesQuizKey(a.id);
    }

    return a.id.localeCompare(b.id);
  })[0];
}

/**
 * @param {Map<string, object>} bankById
 * @param {Set<string>} cribadoIds
 */
export function dedupeBankByStem(bankById, cribadoIds) {
  /** @type {Map<string, object[]>} */
  const groups = new Map();
  for (const q of bankById.values()) {
    const key = dedupeKey(q.stem, q.options);
    const list = groups.get(key) || [];
    list.push(q);
    groups.set(key, list);
  }

  const next = new Map();
  const removed = [];

  for (const [, candidates] of groups) {
    const winner = pickDuplicateWinner(candidates, cribadoIds);
    if (!winner) continue;
    next.set(winner.id, winner);
    for (const q of candidates) {
      if (q.id !== winner.id) removed.push(q.id);
    }
  }

  return {
    bankById: next,
    removed,
    duplicateGroups: [...groups.values()].filter((g) => g.length > 1).length,
  };
}
