import {
  detectQuizKey,
  discoverExamQuizUrls,
  fetchQuizHtml,
  parseQuizJson,
  unescapePhpStringInJson,
  extractQuestionTitle,
} from "../lib/quijotes-fetch.mjs";
import { stemNeedsFigure as needsFig } from "../lib/import-question-utils.mjs";

const urls = await discoverExamQuizUrls();
const found = [];

for (const { url, slug } of urls.slice(0, 8)) {
  const key = await detectQuizKey(url);
  if (!key) continue;
  for (let r = 0; r < 15; r++) {
    const html = await fetchQuizHtml(url, key, r);
    const data = parseQuizJson(html, key);
    if (!data?.question_list) continue;
    for (const qid of Object.keys(data.question_list)) {
      const q = data.question_list[qid];
      const settings = unescapePhpStringInJson(q.question_settings || "");
      const stem = extractQuestionTitle(settings);
      const fid = settings.match(/"featureImageID";s:\d+:"(\d+)"/);
      const img = settings.match(/<img[^>]+src=['"]([^'"]+)['"]/i);
      const needs = needsFig(stem) || needsFig(settings);
      if (fid || img || needs) {
        const k = `${key}-${qid}`;
        if (!found.some((f) => f.k === k)) {
          found.push({ k, key, qid, slug, stem: stem.slice(0, 70), fid: fid?.[1], img: img?.[1] });
        }
      }
    }
  }
  process.stderr.write(`${slug}: ${found.length} acum\n`);
}

console.log("found", found.length);
found.forEach((f) => console.log(JSON.stringify(f)));
