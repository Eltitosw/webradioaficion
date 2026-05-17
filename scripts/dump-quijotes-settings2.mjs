import {
  detectQuizKey,
  fetchQuizHtml,
  parseQuizJson,
  unescapePhpStringInJson,
  extractQuestionTitle,
} from "../lib/quijotes-fetch.mjs";
import { stemNeedsFigure } from "../lib/import-question-utils.mjs";

const url = "https://radioclubquijotes.org/qsm_quiz/electricidad-y-radioelectricidad/";
const key = await detectQuizKey(url);

for (let r = 0; r < 50; r++) {
  const html = await fetchQuizHtml(url, key, r);
  const data = parseQuizJson(html, key);
  for (const [qid, q] of Object.entries(data?.question_list || {})) {
    const s = unescapePhpStringInJson(q.question_settings || "");
    const stem = extractQuestionTitle(s);
    if (!stemNeedsFigure(stem)) continue;
    const idx = s.indexOf("featureImage");
    console.log("qid", qid, stem.slice(0, 60));
    console.log(s.slice(idx, idx + 500));
    process.exit(0);
  }
}
