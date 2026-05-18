import assert from "node:assert/strict";
import { test } from "node:test";
import { areParaphraseDuplicates, stemSimilarity } from "../lib/question-paraphrase.mjs";

test("detecta mismo enunciado con distinto casing", () => {
  const a = {
    id: "fedi-a-012",
    part: 1,
    stem: "En una onda electromagnética el producto de su frecuencia y su longitud de onda es:",
    options: ["constante", "variable", "nulo", "infinito"],
    correctIndex: 0,
  };
  const b = {
    id: "fedi-b-213",
    part: 1,
    stem: "EN UNA ONDA ELECTROMAGNETICA EL PRODUCTO DE SU FRECUENCIA Y SU LONGITUD DE ONDA ES:",
    options: ["constante", "variable", "nulo", "infinito"],
    correctIndex: 0,
  };
  assert.equal(areParaphraseDuplicates(a, b), true);
});

test("no agrupa preguntas de partes distintas", () => {
  const a = { id: "a", part: 1, stem: "potencia disipada circuito resistivo", options: ["a", "b"], correctIndex: 0 };
  const b = { id: "b", part: 2, stem: "potencia disipada circuito resistivo", options: ["a", "b"], correctIndex: 0 };
  assert.equal(areParaphraseDuplicates(a, b), false);
});

test("stemSimilarity alta en parafraseo cercano", () => {
  const sim = stemSimilarity(
    "¿Cómo se denomina al proceso de tomar parte de la señal de salida para introducirla de nuevo en su entrada?",
    "¿Cómo se denomina al proceso de tomar parte de la señal de salida de un circuito para introducirla de nuevo en su entrada?",
  );
  assert.ok(sim >= 0.7);
});
