import assert from "node:assert/strict";
import { test } from "node:test";

import {
  examGradeExplainIssues,
  isCompactGradeExplain,
  isTautologicalExplain,
  passesExamGradeExplain,
} from "../lib/explain-exam-grade.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";

test("isTautologicalExplain detecta cola de banco", () => {
  assert.equal(
    isTautologicalExplain("Diodo. La respuesta que marca el banco es «Sí»."),
    true,
  );
});

test("fuente lineal rechaza explicación de fuente ideal", () => {
  const q = {
    id: "fedi-ag-011",
    stem: "Indique el orden de los elementos de una fuente de alimentación lineal:",
    topicId: "electricidad-basica",
    options: ["Transformador → rectificador → filtro → regulador", "Otro"],
    correctIndex: 0,
    explain:
      "Una fuente ideal de tensión mantiene V constante; una de corriente mantiene I constante. «Transformador → rectificador → filtro → regulador».",
  };
  assert.equal(isExplainAcceptable(q), false);
  assert.ok(examGradeExplainIssues(q).some((i) => i.code === "stem_mismatch"));
});

test("rechaza plantilla fuente ideal en pregunta de filtrado", () => {
  const q = {
    id: "ure-p1-q130",
    stem: '¿Para qué se ponen "circuitos de filtrado" en la salida de las fuentes de alimentación?:',
    topicId: "electricidad-basica",
    options: ["Protección bobinados", "Reducir rizado", "Igualar entrada"],
    correctIndex: 1,
    explain:
      "Una fuente ideal de tensión mantiene V constante; una de corriente mantiene I constante. «Reducir rizado».",
  };
  assert.equal(isExplainAcceptable(q), false);
});

test("explicación corta sin razonamiento falla grado examen", () => {
  const q = {
    id: "test-short",
    stem: "¿Qué es la inductancia?",
    topicId: "componentes",
    options: ["Oposición a cambios de corriente", "Capacidad"],
    correctIndex: 0,
    explain: "La inductancia se mide en henrios. «Oposición a cambios de corriente».",
  };
  assert.ok(examGradeExplainIssues(q).some((i) => i.code === "very_short"));
  assert.equal(passesExamGradeExplain(q), false);
});

test("explicación compacta con fórmula puede pasar", () => {
  const q = {
    id: "ofic-064",
    stem: "El valor de pico de una tensión alterna de 230 V eficaces es aproximadamente:",
    topicId: "electricidad-basica",
    options: ["325 V", "230 V"],
    correctIndex: 0,
    explain: "Vp ≈ √2·Vrms. Con 230 V eficaces, Vp ≈ 325 V (red doméstica en alterna). «325 V».",
  };
  assert.equal(isCompactGradeExplain(q, q.explain), true);
  assert.equal(passesExamGradeExplain(q), true);
});

test("explicación curada tipo pasa grado examen", () => {
  const q = {
    id: "test-ok",
    stem: "¿Qué es un diodo?",
    topicId: "componentes",
    options: ["Paso en un sentido", "Bidireccional"],
    correctIndex: 0,
    explain:
      "Un diodo conduce en polarización directa y bloquea en inversa; por eso rectifica. «Paso en un sentido».",
  };
  assert.equal(passesExamGradeExplain(q), true);
});
