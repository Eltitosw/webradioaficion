/**
 * Caza imágenes para preguntas Quijotes con figura aún sin URL.
 */
import {
  discoverExamQuizUrls,
  detectQuizKey,
  fetchQuizHtml,
  parseQuizJson,
  unescapePhpStringInJson,
  extractQuestionTitle,
} from "../lib/quijotes-fetch.mjs";
import { extractQsmQuestionImageUrls } from "../lib/quijotes-figures.mjs";
import { stemNeedsFigure } from "../lib/import-question-utils.mjs";
import figures from "../data/questions-figures.js";

const have = new Set(figures.filter((q) => q.id.startsWith("quijotes-")).map((q) => q.id));

const urls = await discoverExamQuizUrls();
const missing = [];

for (const { url, slug } of urls) {
  const key = await detectQuizKey(url);
  for (let r = 0; r < 60; r++) {
    const html = await fetchQuizHtml(url, key, r);
    const data = parseQuizJson(html, key);
    if (!data?.question_list) continue;
    for (const [qid, q] of Object.entries(data.question_list)) {
      const settings = unescapePhpStringInJson(q.question_settings || "");
      if (!stemNeedsFigure(settings)) continue;
      const id = `quijotes-${key}-${String(qid).padStart(4, "0")}`;
      if (have.has(id)) continue;
      const imgs = extractQsmQuestionImageUrls(q);
      if (imgs.length) {
        console.log("FOUND", id, imgs[0]);
        have.add(id);
      } else if (!missing.some((m) => m.id === id)) {
        missing.push({ id, stem: extractQuestionTitle(settings).slice(0, 90), key, qid });
      }
    }
  }
}

console.log("\nStill missing:", missing.length);
for (const m of missing) {
  console.log(m.id, "|", m.stem);
  const term = encodeURIComponent(m.stem.split(/\s+/).slice(0, 4).join(" "));
  const res = await fetch(`https://radioclubquijotes.org/wp-json/wp/v2/media?search=${term}&per_page=20`);
  const batch = await res.json();
  if (Array.isArray(batch) && batch.length) {
    batch.slice(0, 3).forEach((x) => console.log("  WP:", x.slug, x.source_url.split("/").pop()));
  }
}
