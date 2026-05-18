import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildStructuredFeedbackHtml,
  explainRectifierFunction,
  explainWrongOptionForStem,
  isLazyDiodeListExplain,
} from "../lib/quiz-structured-feedback.mjs";

const RECTIFIER_Q = {
  id: "fedi-b-214",
  part: 1,
  topicId: "componentes",
  stem: "LA FUNCIÓN DE UN RECTIFICADOR DE CORRIENTE CONSISTE EN:",
  options: [
    "Limitar los máximos de corriente",
    "Transformar la corriente continua en alterna",
    "Cambiar la polaridad de la corriente",
    "Transformar la corriente alterna en continua",
  ],
  correctIndex: 3,
  explain:
    "Cada diodo tiene función distinta: rectificar, estabilizar tensión (Zener), emitir luz (LED) o variar capacidad (varicap). La correcta es «Transformar la corriente alterna en continua».",
};

test("isLazyDiodeListExplain detecta plantilla genérica", () => {
  assert.equal(isLazyDiodeListExplain(RECTIFIER_Q.explain), true);
});

test("explainRectifierFunction para enunciado de rectificador", () => {
  const t = explainRectifierFunction(RECTIFIER_Q.stem, RECTIFIER_Q.options[3]);
  assert.match(t, /alterna.*continua/i);
  assert.match(t, /«Transformar la corriente alterna en continua»/);
});

test("explainWrongOptionForStem: limitar corriente no es rectificar", () => {
  const w = explainWrongOptionForStem(RECTIFIER_Q.stem, RECTIFIER_Q.options[0], RECTIFIER_Q.options[3]);
  assert.match(w, /fusibles|limitador/i);
});

test("buildStructuredFeedbackHtml incluye por qué no y puente con diodos", () => {
  const html = buildStructuredFeedbackHtml(RECTIFIER_Q, 0);
  assert.match(html, /quiz-fb-reasoning--structured/);
  assert.match(html, /Por qué no encaja tu opción/);
  assert.match(html, /Para fijar el concepto/);
  assert.match(html, /diodos/i);
  assert.match(html, /alterna en continua/i);
});
