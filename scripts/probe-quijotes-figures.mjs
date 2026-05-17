import {
  detectQuizKey,
  fetchQuizHtml,
  parseQuizJson,
  unescapePhpStringInJson,
  extractQuestionTitle,
} from "../lib/quijotes-fetch.mjs";

const url = "https://radioclubquijotes.org/qsm_quiz/electricidad-y-radioelectricidad/";
const key = await detectQuizKey(url);
const html = await fetchQuizHtml(url, key, 0);
const data = parseQuizJson(html, key);
const qlist = data.question_list;

let withImg = 0;
for (const qid of Object.keys(qlist)) {
  const q = qlist[qid];
  const settings = unescapePhpStringInJson(q.question_settings || "");
  const stem = extractQuestionTitle(settings);
  const fid = settings.match(/"featureImageID";s:\d+:"(\d+)"/);
  const imgInTitle = /<img[^>]+src=['"]([^'"]+)['"]/i.exec(settings);
  if (fid || imgInTitle) {
    withImg++;
    console.log(qid, stem.slice(0, 55), "fid", fid?.[1], "img", imgInTitle?.[1]?.slice(0, 60));
  }
}
console.log("total with image hint", withImg, "of", Object.keys(qlist).length);
