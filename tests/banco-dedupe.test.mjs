import { test } from "node:test";
import assert from "node:assert/strict";

import { dedupeBankByStem, pickDuplicateWinner } from "../lib/banco-dedupe.mjs";

test("pickDuplicateWinner: prefiere cribado y URE frente a Quijotes duplicado", () => {
  const crib = new Set(["ure-p1-02"]);
  const winner = pickDuplicateWinner(
    [
      { id: "quijotes-1-0153", stem: "x", options: ["a"], stemFigure: "images/quiz/a.png" },
      { id: "quijotes-83-1675", stem: "x", options: ["a"], stemFigure: "images/quiz/b.png" },
      { id: "ure-p1-02", stem: "x", options: ["a"], stemFigure: "images/quiz/c.png" },
    ],
    crib,
  );
  assert.equal(winner.id, "ure-p1-02");
});

test("pickDuplicateWinner: entre dos Quijotes queda el quiz 83", () => {
  const winner = pickDuplicateWinner(
    [
      { id: "quijotes-1-0119", stem: "x", options: ["a"], stemFigure: "f.png" },
      { id: "quijotes-83-1641", stem: "x", options: ["a"], stemFigure: "g.png" },
    ],
    new Set(),
  );
  assert.equal(winner.id, "quijotes-83-1641");
});

test("dedupeBankByStem colapsa parafraseos con mismas opciones", () => {
  const bankById = new Map([
    [
      "fedi-a-012",
      {
        id: "fedi-a-012",
        part: 1,
        stem: "En una onda electromagnética el producto de su frecuencia y su longitud de onda es:",
        options: ["constante", "variable", "nulo", "infinito"],
        correctIndex: 0,
        explain: "x",
      },
    ],
    [
      "fedi-b-213",
      {
        id: "fedi-b-213",
        part: 1,
        stem: "EN UNA ONDA ELECTROMAGNETICA EL PRODUCTO DE SU FRECUENCIA Y SU LONGITUD DE ONDA ES:",
        options: ["constante", "variable", "nulo", "infinito"],
        correctIndex: 0,
        explain: "y",
      },
    ],
  ]);
  const { bankById: next, removed } = dedupeBankByStem(bankById, new Set(["fedi-a-012"]));
  assert.equal(next.size, 1);
  assert.equal(removed.length, 1);
  assert.equal(next.has("fedi-a-012"), true);
});
