import assert from "node:assert/strict";
import { test } from "node:test";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { buildBestExplain } from "../lib/build-best-explain.mjs";

test("isExplainAcceptable rechaza distintivo genérico en especialización", () => {
  const q = {
    stem: "¿Qué es un indicativo de especialización?",
    topicId: "licencias-indicativos",
    options: ["Asignado por habilidades o funciones", "Temporal"],
    correctIndex: 0,
    explain:
      "El distintivo identifica la estación y debe usarse al inicio y al final. «Asignado por habilidades o funciones».",
  };
  assert.equal(isExplainAcceptable(q), false);
});

test("buildBestExplain genera texto aceptable para especialización", () => {
  const q = {
    id: "test-spec",
    part: 2,
    topicId: "licencias-indicativos",
    stem: "¿Qué es un indicativo de especialización?",
    options: ["Asignado por habilidades o funciones", "Temporal", "Numérico", "Emergencias"],
    correctIndex: 0,
    explain: "plantilla",
  };
  const text = buildBestExplain(q);
  assert.equal(isExplainAcceptable(q, text), true);
  assert.match(text, /especializaci|habilidades|funciones/i);
  assert.doesNotMatch(text, /inicio y al final de cada comunicaci/i);
});
