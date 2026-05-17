import { test } from "node:test";
import assert from "node:assert/strict";

import { pickDuplicateWinner } from "../lib/banco-dedupe.mjs";

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
