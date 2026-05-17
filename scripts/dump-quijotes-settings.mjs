import {
  detectQuizKey,
  discoverExamQuizUrls,
  fetchQuizHtml,
  parseQuizJson,
  unescapePhpStringInJson,
  extractQuestionTitle,
} from "../lib/quijotes-fetch.mjs";
import { stemNeedsFigure } from "../lib/import-question-utils.mjs";

const url = "https://radioclubquijotes.org/qsm_quiz/electricidad-y-radioelectricidad/";
const key = await detectQuizKey(url);

for (let r = 0; r < 100; r++) {
  const html = await fetchQuizHtml(url, key, r);
  const data = parseQuizJson(html, key);
  if (!data?.question_list) continue;
  for (const [qid, q] of Object.entries(data.question_list)) {
    const s = unescapePhpStringInJson(q.question_settings || "");
    const stem = extractQuestionTitle(s);
    if (!stemNeedsFigure(stem)) continue;
    console.log("=== qid", qid, "round", r);
    console.log(stem.slice(0, 100));
    const parts = s.match(/featureImage[^;]{0,120}/g);
    console.log("feature", parts);
    const imgs = s.match(/https?:\/\/[^"'\s]+\.(?:png|jpe?g|gif)/gi);
    console.log("urls", imgs?.slice(0, 3));
    process.exit(0);
  }
}
console.log("none found in 100 rounds");
