import assert from "node:assert/strict";
import { test } from "node:test";
import { fillBankToMinimum, isBankCandidate } from "../lib/banco-fill.mjs";
import { MIN_BANCO_QUESTIONS } from "../lib/question-recency.mjs";

test("isBankCandidate rechaza pregunta sin figura cuando el enunciado la exige", () => {
  assert.equal(
    isBankCandidate({
      id: "x-1",
      part: 1,
      topicId: "electricidad-basica",
      stem: "Según el siguiente circuito, ¿qué tensión mide el voltímetro?",
      options: ["1 V", "2 V"],
      correctIndex: 0,
    }),
    false,
  );
});

test("fillBankToMinimum no reduce un banco ya suficiente", () => {
  const bankById = new Map();
  for (let i = 0; i < MIN_BANCO_QUESTIONS; i += 1) {
    bankById.set(`q${i}`, {
      id: `q${i}`,
      part: 1,
      topicId: "electricidad-basica",
      stem: `Pregunta única ${i}`,
      options: ["A", "B"],
      correctIndex: 0,
    });
  }
  const { added, finalCount } = fillBankToMinimum(bankById, new Map(), []);
  assert.equal(added.length, 0);
  assert.equal(finalCount, MIN_BANCO_QUESTIONS);
});
