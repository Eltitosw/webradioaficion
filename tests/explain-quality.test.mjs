import assert from "node:assert/strict";
import { test } from "node:test";
import { isTemplateOnlyExplain, pedagogicalExplain } from "../lib/explain-quality.mjs";

test("isTemplateOnlyExplain detecta plantilla FEDI", () => {
  assert.equal(
    isTemplateOnlyExplain(
      "Práctica histórica (Fuente: FEDI-EA bloque a). Puede contener erratas u obsolescencia; contrastar con BOE.",
    ),
    true,
  );
  assert.equal(
    isTemplateOnlyExplain(
      "Práctica histórica (Fuente: FEDI-EA examen 23/10/2010 (bloque aa)). Puede contener erratas u obsolescencia; contrastar con BOE.",
    ),
    true,
  );
});

test("pedagogicalExplain extrae texto antes de la cola histórica", () => {
  const q = {
    explain:
      "La realimentación devuelve parte de la salida a la entrada. Práctica histórica (Quijotes EA3RCQ). Puede contener erratas.",
  };
  assert.match(pedagogicalExplain(q), /realimentación/);
  assert.doesNotMatch(pedagogicalExplain(q), /Práctica histórica/);
});

test("pedagogicalExplain ignora explainSourceNote en el campo explain", () => {
  const q = {
    explain: "En serie las resistencias se suman.",
    explainSourceNote:
      "Práctica histórica (Fuente: FEDI-EA bloque d). Puede contener erratas u obsolescencia; contrastar con BOE.",
  };
  assert.equal(pedagogicalExplain(q), "En serie las resistencias se suman.");
});
