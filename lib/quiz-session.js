/**
 * Lógica pura de armado del pool de preguntas (tests + app).
 * @template {{ part: number; topicId: string }} Q
 * @param {Q[]} arr
 * @param {() => number} [random]
 * @returns {Q[]}
 */
export function shuffle(arr, random = Math.random) {
  const a = /** @type {Q[]} */ ([...arr]);
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Devuelve una copia de la pregunta con las opciones mezcladas y el índice correcto recalculado.
 *
 * @template {{ options?: unknown[]; correctIndex?: number }} Q
 * @param {Q} question
 * @param {() => number} [random]
 * @returns {Q}
 */
export function shuffleQuestionOptions(question, random = Math.random) {
  if (!Array.isArray(question.options) || typeof question.correctIndex !== "number") {
    return { ...question };
  }
  const optionExplanations = Array.isArray(question.optionExplanations) ? question.optionExplanations : null;
  const shuffledOptions = shuffle(
    question.options.map((option, index) => ({
      option,
      index,
      optionExplanation: optionExplanations?.[index],
    })),
    random,
  );
  const nextCorrectIndex = shuffledOptions.findIndex((entry) => entry.index === question.correctIndex);
  return {
    ...question,
    options: shuffledOptions.map((entry) => entry.option),
    ...(optionExplanations ? { optionExplanations: shuffledOptions.map((entry) => entry.optionExplanation) } : {}),
    correctIndex: nextCorrectIndex >= 0 ? nextCorrectIndex : question.correctIndex,
  };
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
