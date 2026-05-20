import assert from "node:assert/strict";
import { test } from "node:test";

import { needsExplainExpansion, isExplainExpansionImprovement } from "../lib/explain-expand-need.mjs";
import { expandExplainFaithful } from "../lib/expand-explain-faithful.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";

test("needsExplainExpansion detecta texto muy corto", () => {
  const q = {
    id: "q9",
    topicId: "operacion-seguridad",
    stem: "En el alfabeto fonético ICAO/NATO, la letra M se deletrea como:",
    options: ["Mike", "Mary", "Mama", "Mexico"],
    correctIndex: 0,
  };
  assert.equal(needsExplainExpansion(q, "En el alfabeto fonético ICAO/NATO, M es «Mike»."), true);
});

test("expandExplainFaithful amplía rectificador sin inventar", () => {
  const q = {
    id: "fedi-b-214",
    part: 1,
    topicId: "componentes",
    stem: "LA FUNCIÓN DE UN RECTIFICADOR DE CORRIENTE CONSISTE EN:",
    options: [
      "Limitar los máximos de corriente",
      "Transformar la corriente continua en alterna",
      "Cambiar la polaridad de la corriente",
      "Transformar la corriente alterna en continua",
    ],
    correctIndex: 3,
    explain: "La función es transformar CA en CC. «Transformar la corriente alterna en continua».",
  };
  const { text, expanded } = expandExplainFaithful(q, q.explain);
  assert.equal(expanded, true);
  assert.ok(text.length > q.explain.length);
  assert.match(text, /alterna|continua/i);
  assert.equal(isExplainAcceptable(q, text), true);
});

test("no expande explicación ya sólida", () => {
  const q = {
    id: "ure-p1-q259",
    topicId: "antenas-prop",
    stem: "En una antena pasiva, se puede afirmar que:",
    options: ["A", "B", "Los diagramas de radiación en transmisión y en recepción son iguales", "D"],
    correctIndex: 2,
  };
  const solid =
    "Por reciprocidad, el diagrama de radiación de una antena pasiva es el mismo en transmisión y recepción. «Los diagramas de radiación en transmisión y en recepción son iguales».";
  const { expanded } = expandExplainFaithful(q, solid);
  assert.equal(expanded, false);
});

test("isExplainExpansionImprovement exige ganancia mínima", () => {
  assert.equal(isExplainExpansionImprovement("x".repeat(50), "y".repeat(90)), true);
  assert.equal(isExplainExpansionImprovement("x".repeat(130), "y".repeat(135)), false);
});
