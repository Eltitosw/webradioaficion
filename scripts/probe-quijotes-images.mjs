/**
 * Explora fuentes de imágenes QSM (settings, HTML, WP).
 */
import {
  discoverExamQuizUrls,
  detectQuizKey,
  fetchQuizHtml,
  parseQuizJson,
  unescapePhpStringInJson,
} from "../lib/quijotes-fetch.mjs";
import { stemNeedsFigure } from "../lib/import-question-utils.mjs";
import { extractQsmQuestionImageUrls } from "../lib/quijotes-figures.mjs";

const urls = await discoverExamQuizUrls();
const allUrls = new Map();
const noImg = [];

for (const { url, slug } of urls) {
  const key = await detectQuizKey(url);
  if (!key) continue;
  const seenFig = new Set();
  const seenImg = new Set();
  for (let r = 0; r < 55; r++) {
    const html = await fetchQuizHtml(url, key, r);
    const data = parseQuizJson(html, key);
    if (!data?.question_list) continue;
    for (const [qid, q] of Object.entries(data.question_list)) {
      const settings = unescapePhpStringInJson(q.question_settings || "");
      if (!stemNeedsFigure(settings)) continue;
      seenFig.add(qid);
      const imgs = extractQsmQuestionImageUrls(q);
      if (imgs.length) {
        seenImg.add(qid);
        allUrls.set(`${key}-${qid}`, imgs[0]);
      }
    }
  }
  for (const qid of seenFig) {
    if (!seenImg.has(qid)) noImg.push(`${key}-${qid}`);
  }
  console.log(slug, "need fig:", seenFig.size, "with qsm img:", seenImg.size);
}

console.log("\nTotal with QSM embedded images:", allUrls.size);
console.log("Still missing:", noImg.length);
noImg.slice(0, 25).forEach((k) => console.log(" ", k));
