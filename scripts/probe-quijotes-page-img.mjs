import { detectQuizKey, fetchQuizHtml, parseQuizJson, unescapePhpStringInJson } from "../lib/quijotes-fetch.mjs";

const url = "https://radioclubquijotes.org/qsm_quiz/electricidad-y-radioelectricidad/";
const key = await detectQuizKey(url);
const html = await fetchQuizHtml(url, key, 0);

const wpUploads = [...html.matchAll(/https:\/\/radioclubquijotes\.org\/wp-content\/uploads\/[^"'\s)]+\.(?:png|jpe?g|gif|webp)/gi)].map(
  (m) => m[0],
);
console.log("wp uploads in page", [...new Set(wpUploads)].length);
[...new Set(wpUploads)].slice(0, 20).forEach((u) => console.log(u));

const data = parseQuizJson(html, key);
for (const qid of ["153", "257", "189", "151"]) {
  const q = data.question_list[qid];
  if (!q) {
    console.log("missing qid", qid);
    continue;
  }
  const s = unescapePhpStringInJson(q.question_settings || "");
  console.log("\n=== qid", qid, "len", s.length);
  console.log(s.slice(0, 500));
  const fid = s.match(/featureImageID";s:\d+:"(\d+)"/);
  console.log("fid", fid?.[1]);
}
