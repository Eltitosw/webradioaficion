/**
 * One-off helper: read saved QSM HTML and print quiz JSON keys / question blocks.
 * Usage: node scripts/parse-quijotes-quiz.mjs path/to/page.html
 */
import fs from "fs";

const path = process.argv[2];
if (!path) {
  console.error("Usage: node parse-quijotes-quiz.mjs <file.html>");
  process.exit(1);
}
const html = fs.readFileSync(path, "utf8");
const m = html.match(/window\.qmn_quiz_data\s*=\s*new Object\(\);\s*<\/script><script>window\.qmn_quiz_data\[["'](\d+)["']\]\s*=\s*(\{[\s\S]*?\});\s*<\/script>/);
if (!m) {
  const m2 = html.match(/window\.qmn_quiz_data\[["'](\d+)["']\]\s*=\s*(\{[\s\S]*?\});\s*<\/script>/);
  if (!m2) {
    console.error("Could not find qmn_quiz_data assignment");
    process.exit(1);
  }
  dump(m2[1], m2[2]);
} else {
  dump(m[1], m[2]);
}

function dump(id, jsonStr) {
  console.log("quiz key:", id);
  let data;
  try {
    data = JSON.parse(jsonStr);
  } catch (e) {
    console.error("JSON parse error", e.message);
    process.exit(1);
  }
  console.log("quiz_name:", data.quiz_name);
  const pages = data.qpages || {};
  console.log("qpages keys:", Object.keys(pages));
  const qs = data.question_list;
  if (Array.isArray(qs)) {
    console.log("question_list length:", qs.length);
    console.log(JSON.stringify(qs.slice(0, 2), null, 2));
  } else {
    console.log("no question_list; top keys:", Object.keys(data).slice(0, 40));
  }
}
