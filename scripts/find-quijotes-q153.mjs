import {
  detectQuizKey,
  fetchQuizHtml,
  parseQuizJson,
  unescapePhpStringInJson,
  extractQuestionTitle,
} from "../lib/quijotes-fetch.mjs";

const url = "https://radioclubquijotes.org/qsm_quiz/electricidad-y-radioelectricidad/";
const key = await detectQuizKey(url);

for (let r = 0; r < 80; r++) {
  const html = await fetchQuizHtml(url, key, r);
  const data = parseQuizJson(html, key);
  const q = data?.question_list?.["153"];
  if (!q) continue;
  const s = unescapePhpStringInJson(q.question_settings || "");
  console.log("found round", r);
  console.log(extractQuestionTitle(s).slice(0, 80));
  console.log(s.match(/featureImageID[^;]{0,80}/));
  console.log(s.match(/<img[^>]+>/));
  break;
}
