import { fetchFediBlock } from "../lib/parse-fedi-html.mjs";
import { pickFediImageFiles } from "../lib/figure-import.mjs";
import { stemNeedsFigure } from "../lib/import-question-utils.mjs";

const blocks = ["a", "b", "ag", "w", "aa", "s", "ah", "c", "d"];
const miss = [];
for (const bloque of blocks) {
  const data = await fetchFediBlock(bloque, { delayMs: 0, staleLimit: 6 });
  for (const [num, q] of data.questions) {
    const raw = q.rawChunk || "";
    const needs = stemNeedsFigure(`${raw} ${q.stem}`);
    const files = pickFediImageFiles(bloque, raw);
    if (needs && !files.length) {
      const imgs = [...raw.matchAll(/src=['"]([^'"]+)['"]/gi)]
        .map((m) => m[1])
        .filter((s) => /\.(jpg|png|gif)/i.test(s));
      miss.push({ bloque, num, stem: q.stem.slice(0, 60), imgs });
    }
  }
}
console.log("missed", miss.length);
miss.forEach((m) => console.log(JSON.stringify(m)));
