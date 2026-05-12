/**
 * Comprobaciones extra: cobertura topicId ↔ banco, h1 de rutas, #ids estáticos en app vs index.
 * Ejecutar desde web/: node scripts/verify-extra.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import topics from "../data/topics.js";
import questions from "../data/questions.js";
import ure from "../data/ure-electricidad.js";
import fedi from "../data/fediea-2011.js";
import quij from "../data/quijotes-ea3rcq.js";
import propias from "../data/questions-examen-propias.js";
import { checkStemFigures } from "../lib/stem-figure-check.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");

const all = [...questions, ...propias, ...ure, ...fedi, ...quij];

let errors = 0;
function fail(msg) {
  console.error(msg);
  errors += 1;
}

const blockIds = new Set();
for (const p of topics.parts || []) {
  for (const b of p.blocks || []) blockIds.add(b.id);
}

for (const id of blockIds) {
  const n = all.filter((q) => q.topicId === id).length;
  if (n === 0) fail(`Ninguna pregunta con topicId "${id}" (bloque huérfano en el banco).`);
}

const html = fs.readFileSync(path.join(webRoot, "index.html"), "utf8");
const app = fs.readFileSync(path.join(webRoot, "app.js"), "utf8");

const htmlIds = new Set();
for (const m of html.matchAll(/\bid\s*=\s*"([^"]+)"/gi)) htmlIds.add(m[1]);

const vhBlock = app.match(/const VIEW_HEADINGS = \{([\s\S]*?)\n\};/);
if (!vhBlock) {
  fail("No se encontró VIEW_HEADINGS en app.js");
} else {
  for (const m of vhBlock[1].matchAll(/:\s*"([^"]+)"/g)) {
    const hid = m[1];
    if (!htmlIds.has(hid)) fail(`VIEW_HEADINGS apunta a id inexistente en index.html: "${hid}"`);
  }
}

const dynamicIds = new Set(["quiz-mark-review", "quiz-reveal", "user-stats-reset"]);
const appRefs = new Set();
for (const m of app.matchAll(/\$\(\s*"#([^"]+)"\s*\)/g)) appRefs.add(m[1]);

for (const id of appRefs) {
  if (dynamicIds.has(id)) continue;
  if (!htmlIds.has(id)) fail(`app.js usa $("#${id}") pero no hay id="${id}" en index.html`);
}

checkStemFigures(all, webRoot, fail);

if (errors) {
  console.error(`\nverify-extra: ${errors} error(es).`);
  process.exit(1);
}
console.log("verify-extra: OK.", blockIds.size, "bloques con preguntas,", appRefs.size, "refs # en app.js.");
