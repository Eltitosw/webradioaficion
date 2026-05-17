import {
  detectQuizKey,
  fetchQuizHtml,
  parseQuizJson,
  unescapePhpStringInJson,
} from "../lib/quijotes-fetch.mjs";
import { stemNeedsFigure } from "../lib/import-question-utils.mjs";

function extractRawTitle(settings) {
  const m = settings.match(/"question_title";s:\d+:"([\s\S]*?)";s:\d+:"(?:featureImageID|answerEditor)/);
  return m ? m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\") : "";
}

const url = "https://radioclubquijotes.org/qsm_quiz/electricidad-y-radioelectricidad/";
const key = await detectQuizKey(url);

for (let r = 0; r < 80; r++) {
  const html = await fetchQuizHtml(url, key, r);
  const data = parseQuizJson(html, key);
  for (const [qid, q] of Object.entries(data?.question_list || {})) {
    const s = unescapePhpStringInJson(q.question_settings || "");
    const raw = extractRawTitle(s);
    if (!stemNeedsFigure(raw.replace(/<[^>]+>/g, " "))) continue;
    console.log("qid", qid);
    console.log(raw.slice(0, 800));
    process.exit(0);
  }
}
