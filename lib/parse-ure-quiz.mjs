import { readResponseText } from "./http-text.mjs";
import { cleanStem } from "./import-question-utils.mjs";

/**
 * @param {string} html
 */
export function extractAriQuizJson(html) {
  const m = html.match(/var\s+ARI_STREAM_QUIZ_[A-Za-z0-9_]+\s*=\s*(\{[\s\S]*?\});/);
  if (!m) return null;
  try {
    const outer = JSON.parse(m[1]);
    if (!outer.data) return null;
    const json = Buffer.from(outer.data, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * @param {object} quizData
 * @param {string} questionId
 * @param {string[]} answerIdsInOrder
 */
export function correctIndexFromQuizData(quizData, questionId, answerIdsInOrder) {
  const pages = quizData?.pages || [];
  for (const page of pages) {
    const q = page?.questions?.[questionId];
    if (!q?.answers) continue;
    for (let i = 0; i < answerIdsInOrder.length; i++) {
      const aid = answerIdsInOrder[i];
      if (q.answers[aid]?.correct === 1) return i;
    }
  }
  return -1;
}

/**
 * @param {string} html
 */
export function parseUreQuestionBlocks(html) {
  const items = [];
  const blocks = html.split(/<div class="quiz-question\s*"/i).slice(1);
  for (const chunk of blocks) {
    const idM = chunk.match(/data-question-id="(\d+)"/);
    const titleMatch = chunk.match(
      /class="quiz-question-title"[^>]*data-question-index="(\d+)"[^>]*>([\s\S]*?)<\/div>/i,
    );
    if (!idM || !titleMatch) continue;
    const sourceId = idM[1];
    const index = parseInt(titleMatch[1], 10);
    const stem = cleanStem(titleMatch[2].replace(/<[^>]+>/g, " "));
    const imageUrls = [];
    for (const m of chunk.matchAll(/<img[^>]+src=['"]([^'"]+)['"]/gi)) {
      const src = m[1];
      if (/wp-content\/uploads/i.test(src) && /\.(png|jpe?g|gif|webp)/i.test(src)) {
        imageUrls.push(src);
      }
    }
    const options = [];
    const answerIds = [];
    const optRe =
      /<input[^>]*id="asq_[^"]+_answer_(\d+)"[^>]*>[\s\S]*?class="ari-checkbox-label quiz-question-answer-ctrl-lbl"[^>]*>([\s\S]*?)<\/label>/gi;
    let om;
    while ((om = optRe.exec(chunk)) !== null) {
      answerIds.push(om[1]);
      options.push(cleanStem(om[2].replace(/<[^>]+>/g, " ")));
    }
    if (stem && options.length >= 2) {
      items.push({ sourceId, index, stem, options, answerIds, imageUrls, rawChunk: chunk });
    }
  }
  return items;
}

/**
 * @param {string} html
 */
export function parseUreQuestionsFromHtml(html) {
  return parseUreQuestionBlocks(html).map((b) => ({
    id: b.sourceId,
    index: b.index,
    stem: b.stem,
    options: b.options,
    answerIds: b.answerIds,
    imageUrls: b.imageUrls,
  }));
}

/**
 * @param {string} url
 * @param {number} part
 */
export async function fetchUreQuizPage(url, part) {
  const res = await fetch(url, {
    headers: { "User-Agent": "radioexam-import/1.0 (+https://www.ure.es)" },
  });
  if (!res.ok) throw new Error(`URE HTTP ${res.status} ${url}`);
  const html = await readResponseText(res);
  const quizData = extractAriQuizJson(html);
  const parsed = parseUreQuestionsFromHtml(html);

  const results = [];
  for (const q of parsed) {
    const correctIndex = quizData
      ? correctIndexFromQuizData(quizData, q.id, q.answerIds)
      : -1;
    if (correctIndex < 0 || correctIndex >= q.options.length) continue;
    results.push({
      sourceId: q.id,
      index: q.index,
      part,
      stem: q.stem,
      options: q.options,
      correctIndex,
      imageUrls: q.imageUrls || [],
    });
  }
  return results;
}

/**
 * La web URE sirve ~30 preguntas aleatorias por carga; varias peticiones revelan el pool completo.
 * @param {string} url
 * @param {number} part
 * @param {{ rounds?: number; delayMs?: number }} [opts]
 */
export async function fetchUreQuizPool(url, part, { rounds = 25, delayMs = 200 } = {}) {
  /** @type {Map<string, Awaited<ReturnType<typeof fetchUreQuizPage>>[number]>} */
  const bySourceId = new Map();

  for (let r = 0; r < rounds; r += 1) {
    const batch = await fetchUreQuizPage(url, part);
    for (const q of batch) {
      const prev = bySourceId.get(q.sourceId);
      if (!prev) {
        bySourceId.set(q.sourceId, q);
        continue;
      }
      if ((q.imageUrls?.length || 0) > (prev.imageUrls?.length || 0)) {
        bySourceId.set(q.sourceId, { ...prev, imageUrls: q.imageUrls });
      }
    }
    if (r < rounds - 1 && delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return [...bySourceId.values()].sort(
    (a, b) => Number.parseInt(a.sourceId, 10) - Number.parseInt(b.sourceId, 10),
  );
}
