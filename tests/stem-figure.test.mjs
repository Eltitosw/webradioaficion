import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

import questionsBanco from "../data/questions-banco.js";
import { checkStemFigures, EXPLICIT_FIGURE_STEM_RE, STEM_FIGURE_PATH_RE } from "../lib/stem-figure-check.mjs";
import { EXACT_FIGURE_QUESTION_IDS } from "../data/question-policy.js";

const webRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const all = [...questionsBanco];

test("stemFigure: rutas, archivos y SVG intrínsecos", () => {
  const msgs = [];
  checkStemFigures(all, webRoot, (msg) => msgs.push(msg));
  assert.deepEqual(msgs, [], msgs.join("\n"));
});

test("STEM_FIGURE_PATH_RE alinea con rutas de figuras del banco", () => {
  for (const q of all) {
    if (!q || typeof q !== "object" || !("stemFigure" in q)) continue;
    const s = /** @type {{ stemFigure?: string }} */ (q).stemFigure;
    assert.ok(typeof s === "string" && STEM_FIGURE_PATH_RE.test(s.trim()), `id ${q.id}: ${s}`);
    assert.match(s, /-original\.(jpg|jpeg|png|webp)$/i, `id ${q.id}: debe usar imagen original fiel`);
  }
});

test("enunciados que piden figura declaran stemFigure", () => {
  for (const q of all) {
    if (!q || typeof q !== "object") continue;
    const stem = typeof q.stem === "string" ? q.stem : "";
    if (!EXPLICIT_FIGURE_STEM_RE.test(stem)) continue;
    assert.ok("stemFigure" in q, `id ${q.id}: menciona figura/esquema/gráfico pero no declara stemFigure`);
    assert.ok(EXACT_FIGURE_QUESTION_IDS.has(q.id), `id ${q.id}: figura no certificada en EXACT_FIGURE_QUESTION_IDS`);
  }
});
