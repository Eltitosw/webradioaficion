import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isExamAlignedSourceId } from "../lib/exam-aligned-sources.mjs";

describe("exam-aligned-sources", () => {
  it("acepta ofic, FEDI examen, URE, quijotes-84", () => {
    assert.equal(isExamAlignedSourceId("ofic-001"), true);
    assert.equal(isExamAlignedSourceId("fedi-ag-001"), true);
    assert.equal(isExamAlignedSourceId("ure-p2-01"), true);
    assert.equal(isExamAlignedSourceId("quijotes-84-1900"), true);
  });

  it("rechaza bloques FEDI estudio y quizzes genéricos", () => {
    assert.equal(isExamAlignedSourceId("fedi-d-516"), false);
    assert.equal(isExamAlignedSourceId("fedi-a-001"), false);
    assert.equal(isExamAlignedSourceId("quijotes-1-2205"), false);
    assert.equal(isExamAlignedSourceId("quijotes-85-2113"), false);
  });
});
