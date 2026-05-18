import test from "node:test";
import assert from "node:assert/strict";
import { filterQuestionsForSession, isEmergenciaAuxilioQuestion } from "../lib/question-pool.mjs";

const aux = { id: "quijotes-85-2146", topicId: "operacion-seguridad" };
const radio = { id: "fedi-a-001", topicId: "marco-normativo" };
const pool = [aux, radio];

test("isEmergenciaAuxilioQuestion detecta ids del banco histórico", () => {
  assert.equal(isEmergenciaAuxilioQuestion(aux), true);
  assert.equal(isEmergenciaAuxilioQuestion(radio), false);
});

test("filterQuestionsForSession excluye auxilio en examen y tema todos", () => {
  assert.deepEqual(
    filterQuestionsForSession(pool, { topicFilter: "all", sessionType: "teorico", mode: "exam" }),
    [radio],
  );
});

test("filterQuestionsForSession incluye auxilio en operacion-seguridad", () => {
  assert.deepEqual(
    filterQuestionsForSession(pool, { topicFilter: "operacion-seguridad", sessionType: "teorico", mode: "exam" }),
    pool,
  );
});
