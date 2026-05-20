import assert from "node:assert/strict";
import { test } from "node:test";
import { MIN_BANCO_QUESTIONS, tierPassesCribado } from "../lib/question-recency.mjs";

test("tierPassesCribado ampliado incluye tier C", () => {
  assert.equal(tierPassesCribado("A", "ampliado"), true);
  assert.equal(tierPassesCribado("B", "ampliado"), true);
  assert.equal(tierPassesCribado("C", "ampliado"), true);
  assert.equal(tierPassesCribado("C", "normal"), false);
});

test("MIN_BANCO_QUESTIONS es 400 (banco examen oficial)", () => {
  assert.equal(MIN_BANCO_QUESTIONS, 400);
});
