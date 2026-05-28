import assert from "node:assert/strict";
import { test } from "node:test";
import { isTemplateOnlyExplain, pedagogicalExplain, stripExplainBoilerplate } from "../lib/explain-quality.mjs";

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

test("stripExplainBoilerplate quita prefijo V=IR y deja el texto útil", () => {
  const raw =
    "En corriente continua, V = I·R y P = V·I son las relaciones base del examen. La magnitud o fórmula correcta aquí es «En paralelo entre esos puntos». El voltímetro mide en paralelo.";
  assert.match(stripExplainBoilerplate(raw), /voltímetro.*paralelo/i);
  assert.doesNotMatch(stripExplainBoilerplate(raw), /relaciones base del examen/i);
});

test("pedagogicalExplain ignora explainSourceNote en el campo explain", () => {
  const q = {
    explain: "En serie las resistencias se suman.",
    explainSourceNote:
      "Práctica histórica (Fuente: FEDI-EA bloque d). Puede contener erratas u obsolescencia; contrastar con BOE.",
  };
  assert.equal(pedagogicalExplain(q), "En serie las resistencias se suman.");
});
