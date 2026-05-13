import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildExamReadiness,
  buildRecommendedPlan,
  buildSmartReviewQuestionIds,
  buildTopicDiagnostics,
  isActiveError,
  updateErrorNotebookWithResult,
} from "../lib/learning-coach.js";

const question = {
  id: "q1",
  part: 1,
  topicId: "antenas-prop",
  stem: "Pregunta sobre ROE",
  options: ["Correcta", "Distractor"],
  correctIndex: 0,
  explain: "La ROE alta indica desadaptación.",
};

const topics = [
  {
    id: "p1",
    title: "1.ª prueba",
    blocks: [
      { id: "antenas-prop", title: "Antenas, líneas y propagación" },
      { id: "electricidad-basica", title: "Electricidad básica" },
    ],
  },
];

test("cuaderno registra fallo de alta seguridad", () => {
  const notebook = updateErrorNotebookWithResult({}, question, 1, false, 2, 1000);
  assert.equal(notebook.q1.wrongCount, 1);
  assert.equal(notebook.q1.highSecurityWrongCount, 1);
  assert.equal(notebook.q1.selectedAnswer, "Distractor");
  assert.equal(notebook.q1.correctAnswer, "Correcta");
  assert.equal(notebook.q1.status, "open");
  assert.equal(isActiveError(notebook.q1), true);
});

test("acierto posterior marca el error como en mejora", () => {
  const withWrong = updateErrorNotebookWithResult({}, question, 1, false, 2, 1000);
  const withCorrect = updateErrorNotebookWithResult(withWrong, question, 0, true, 1, 2000);
  assert.equal(withCorrect.q1.correctAfterWrongCount, 1);
  assert.equal(withCorrect.q1.status, "improving");
  assert.equal(isActiveError(withCorrect.q1), false);
});

test("diagnóstico prioriza temas con errores activos y baja precisión", () => {
  const notebook = updateErrorNotebookWithResult({}, question, 1, false, 2, 1000);
  const diagnostics = buildTopicDiagnostics(
    notebook,
    {
      "antenas-prop": { t: 5, ok: 2 },
      "electricidad-basica": { t: 10, ok: 9 },
    },
    topics,
  );
  assert.equal(diagnostics[0].topicId, "antenas-prop");
  assert.equal(diagnostics[0].activeErrors, 1);
  assert.equal(diagnostics[0].accuracy, 40);
  assert.equal(buildRecommendedPlan(diagnostics).topicId, "antenas-prop");
});

test("repaso inteligente prioriza falladas activas y rellena con tema débil", () => {
  const notebook = updateErrorNotebookWithResult({}, question, 1, false, 2, 1000);
  const diagnostics = buildTopicDiagnostics(notebook, { "antenas-prop": { t: 5, ok: 2 } }, topics);
  const ids = buildSmartReviewQuestionIds(
    notebook,
    diagnostics,
    [
      question,
      { ...question, id: "q2", stem: "Otra de antenas", correctIndex: 0 },
      { ...question, id: "q3", topicId: "electricidad-basica", stem: "Ohm" },
    ],
    3,
  );
  assert.equal(ids[0], "q1");
  assert.ok(ids.includes("q2"));
  assert.equal(new Set(ids).size, ids.length);
});

test("repaso inteligente tiene fallback si no hay errores", () => {
  const ids = buildSmartReviewQuestionIds(
    {},
    [],
    [
      { ...question, id: "q1" },
      { ...question, id: "q2" },
    ],
    2,
  );
  assert.deepEqual(ids, ["q1", "q2"]);
});

test("indicador marca listo con cobertura, precisión y simulacros", () => {
  const diagnostics = buildTopicDiagnostics(
    {},
    {
      "antenas-prop": { t: 10, ok: 9 },
      "electricidad-basica": { t: 10, ok: 8 },
    },
    topics,
  );
  const [readiness] = buildExamReadiness(topics, diagnostics, {
    gradedByPart: { p1: { sessions: 2, passed: 2 } },
  });
  assert.equal(readiness.status, "ready");
  assert.equal(readiness.accuracy, 85);
  assert.equal(readiness.coverage, 100);
});

test("indicador penaliza fallos con seguridad alta", () => {
  const notebook = updateErrorNotebookWithResult({}, question, 1, false, 2, 1000);
  const diagnostics = buildTopicDiagnostics(
    notebook,
    {
      "antenas-prop": { t: 10, ok: 9 },
      "electricidad-basica": { t: 10, ok: 8 },
    },
    topics,
  );
  const [readiness] = buildExamReadiness(topics, diagnostics, {
    gradedByPart: { p1: { sessions: 2, passed: 2 } },
  });
  assert.notEqual(readiness.status, "ready");
  assert.equal(readiness.highSecurityWrongCount, 1);
});
