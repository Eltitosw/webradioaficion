import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

import questions from "../data/questions.js";
import ure from "../data/ure-electricidad.js";
import fedi from "../data/fediea-2011.js";
import quij from "../data/quijotes-ea3rcq.js";
import propias from "../data/questions-examen-propias.js";
import { checkStemFigures, EXPLICIT_FIGURE_STEM_RE, STEM_FIGURE_PATH_RE } from "../lib/stem-figure-check.mjs";

const webRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const all = [...questions, ...propias, ...ure, ...fedi, ...quij];

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
  }
});

test("enunciados que piden figura declaran stemFigure", () => {
  for (const q of all) {
    if (!q || typeof q !== "object") continue;
    const stem = typeof q.stem === "string" ? q.stem : "";
    if (!EXPLICIT_FIGURE_STEM_RE.test(stem)) continue;
    assert.ok("stemFigure" in q, `id ${q.id}: menciona figura/esquema/gráfico pero no declara stemFigure`);
  }
});
