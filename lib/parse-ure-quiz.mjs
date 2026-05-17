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
export function parseUreQuestionsFromHtml(html) {
  const items = [];
  const blocks = html.split(/<div class="quiz-question\s*"/i).slice(1);
  for (const chunk of blocks) {
    const idM = chunk.match(/data-question-id="(\d+)"/);
    const titleMatch = chunk.match(
      /class="quiz-question-title"[^>]*data-question-index="(\d+)"[^>]*>([\s\S]*?)<\/div>/i,
    );
    if (!idM || !titleMatch) continue;
    const qid = idM[1];
    const index = parseInt(titleMatch[1], 10);
    const stem = cleanStem(titleMatch[2].replace(/<[^>]+>/g, " "));
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
      items.push({ id: qid, index, stem, options, answerIds });
    }
  }
  return items;
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
  const html = await res.text();
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
    });
  }
  return results;
}
