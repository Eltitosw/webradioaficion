import { test } from "node:test";
import assert from "node:assert/strict";

import questionsBanco from "../data/questions-banco.js";
import questionsBancoEstudio from "../data/questions-banco-estudio.js";
import { BANCO_ESTUDIO_STATS } from "../data/questions-banco-estudio.js";
import { dedupeKey } from "../lib/import-question-utils.mjs";
import { hasPedagogicalExplain } from "../lib/explain-quality.mjs";

test("banco estudio amplía el banco examen", () => {
  assert.ok(BANCO_ESTUDIO_STATS.count >= 520);
  assert.ok(BANCO_ESTUDIO_STATS.count > questionsBanco.length);
  assert.ok(BANCO_ESTUDIO_STATS.studyOnlyAdded >= 15);
});

test("todas las preguntas examen están en banco estudio", () => {
  const keys = new Set(questionsBancoEstudio.map((q) => dedupeKey(q.stem, q.options)));
  for (const q of questionsBanco) {
    assert.ok(keys.has(dedupeKey(q.stem, q.options)), `falta en estudio: ${q.id}`);
  }
});

test("banco estudio tiene explicación didáctica en casi todo el banco", () => {
  const ped = questionsBancoEstudio.filter((q) => hasPedagogicalExplain(q)).length;
  assert.ok(ped / questionsBancoEstudio.length >= 0.95);
});
