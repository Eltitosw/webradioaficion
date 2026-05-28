import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildStructuredFeedbackHtml,
  buildWhyCorrect,
  buildWhyWrong,
  isWeakBankExplain,
} from "../lib/learn-while-test.mjs";

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
  explain: "plantilla vieja",
};

test("buildWhyCorrect para rectificador", () => {
  const t = buildWhyCorrect(RECTIFIER_Q);
  assert.match(t, /alterna.*continua/i);
  assert.equal(isWeakBankExplain(t), false);
});

test("buildWhyWrong detecta limitador de corriente", () => {
  const w = buildWhyWrong(
    RECTIFIER_Q.stem,
    RECTIFIER_Q.options[0],
    RECTIFIER_Q.options[3],
    RECTIFIER_Q.topicId,
  );
  assert.match(w, /fusibles|limitador/i);
});

test("buildWhyCorrect prioriza explicación del banco frente a plantilla genérica", () => {
  const t = buildWhyCorrect({
    id: "fedi-ag-005",
    part: 1,
    topicId: "electricidad-basica",
    stem: "¿Cómo se denomina al proceso de tomar parte de la señal de salida de un circuito para introducirla de nuevo en su entrada?",
    options: ["Rectificación", "Conversión", "Demodulación", "Realimentación"],
    correctIndex: 3,
    explain:
      "Tomar parte de la salida y reinyectarla a la entrada es realimentación (feedback): puede estabilizar o modificar la ganancia del circuito. No confundir con rectificación ni demodulación. «Realimentación».",
  });
  assert.match(t, /realimentaci[oó]n|feedback/i);
  assert.doesNotMatch(t, /criterio de examen apunta/i);
});

test("buildStructuredFeedbackHtml para todo el banco (rectificador)", () => {
  const html = buildStructuredFeedbackHtml(RECTIFIER_Q, 0);
  assert.match(html, /quiz-fb-reasoning--structured/);
  assert.match(html, /Por qué no encaja/);
  assert.match(html, /Por qué la correcta/);
});
