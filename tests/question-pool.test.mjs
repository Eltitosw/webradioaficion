import test from "node:test";
import assert from "node:assert/strict";
import { filterQuestionsForSession, isExcludedFromRadioaficionadoExam } from "../lib/question-pool.mjs";

const offTopic = { id: "quijotes-85-2113", topicId: "marco-normativo" };
const radio = { id: "fedi-a-001", topicId: "marco-normativo" };
const pool = [offTopic, radio];

test("isExcludedFromRadioaficionadoExam detecta quiz 85", () => {
  assert.equal(isExcludedFromRadioaficionadoExam(offTopic), true);
  assert.equal(isExcludedFromRadioaficionadoExam(radio), false);
});

test("filterQuestionsForSession excluye siempre fuera de ámbito examen", () => {
  assert.deepEqual(filterQuestionsForSession(pool, { topicFilter: "all" }), [radio]);
  assert.deepEqual(
    filterQuestionsForSession(pool, { topicFilter: "operacion-seguridad", sessionType: "teorico" }),
    [radio],
  );
});
