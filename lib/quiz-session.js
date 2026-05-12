/**
 * Lógica pura de armado del pool de preguntas (tests + app).
 * @template {{ part: number; topicId: string }} Q
 * @param {Q[]} arr
 * @returns {Q[]}
 */
export function shuffle(arr) {
  const a = /** @type {Q[]} */ ([...arr]);
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * @template {{ part: number; topicId: string }} Q
 * @param {Q[]} allQuestions
 * @param {string} partValue "1" | "2" | "mix"
 * @param {"libre"|"teorico"} sessionType
 * @param {string} [topicFilter]
 * @param {number} [teoricoMax] máximo de ítems en modo examen tipo test
 * @param {ReadonlySet<string>|null} [onlyIds] si se pasa, solo entran ítems cuyo `id` esté en el conjunto (p. ej. repaso de falladas)
 */
export function buildQuestionList(
  allQuestions,
  partValue,
  sessionType,
  topicFilter = "all",
  teoricoMax = 30,
  onlyIds = null,
) {
  let pool;
  if (partValue === "mix") {
    pool = shuffle(allQuestions);
  } else {
    const p = parseInt(partValue, 10);
    pool = shuffle(allQuestions.filter((q) => q.part === p));
  }
  if (topicFilter && topicFilter !== "all") {
    pool = pool.filter((q) => q.topicId === topicFilter);
  }
  if (onlyIds && onlyIds.size > 0) {
    pool = pool.filter((q) => onlyIds.has(q.id));
  }
  if (sessionType === "teorico") {
    const n = Math.min(teoricoMax, pool.length);
    return pool.slice(0, n);
  }
  return pool;
}
