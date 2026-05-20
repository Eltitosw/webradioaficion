import { test } from "node:test";
import assert from "node:assert/strict";

import {
  EXAM_PASS_MIN_SIMULATIONS_PER_PART,
  summarizePresentReadiness,
} from "../lib/exam-present-readiness.mjs";

const readyPart = (partId) => ({
  partId,
  status: "ready",
  passedSimulations: 2,
  activeErrors: 0,
  highSecurityWrongCount: 0,
});

test("listo cuando ambas pruebas están ready", () => {
  const r = summarizePresentReadiness([readyPart("p1"), readyPart("p2")]);
  assert.equal(r.status, "ready");
  assert.equal(r.canPresent, true);
});

test("casi listo con un simulacro apto por prueba", () => {
  const r = summarizePresentReadiness(
    [
      { partId: "p1", status: "almost", passedSimulations: 1, activeErrors: 0, highSecurityWrongCount: 0 },
      { partId: "p2", status: "almost", passedSimulations: 1, activeErrors: 0, highSecurityWrongCount: 0 },
    ],
    { p1: { passed: 1 }, p2: { passed: 1 } },
  );
  assert.equal(r.status, "almost");
  assert.equal(r.canPresent, false);
});

test("mínimo recomendado son 2 simulacros por prueba", () => {
  assert.equal(EXAM_PASS_MIN_SIMULATIONS_PER_PART, 2);
});
