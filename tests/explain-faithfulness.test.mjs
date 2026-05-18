import assert from "node:assert/strict";
import { test } from "node:test";
import {
  auditQuestionExplain,
  explainMentionsCorrect,
  isMisassignedPedagogicalExplain,
  isStemExplainTopicConflict,
  normalizeForMatch,
} from "../lib/explain-faithfulness.mjs";

test("normalizeForMatch ignora tildes", () => {
  assert.equal(normalizeForMatch("Resistividad"), normalizeForMatch("resistividad"));
});

test("explainMentionsCorrect detecta cita entrecomillada", () => {
  assert.equal(
    explainMentionsCorrect('La opción correcta es «Aumentar la autoinducción».', "Aumentar la autoinducción"),
    true,
  );
  assert.equal(
    explainMentionsCorrect("La opción correcta es «7».", "7"),
    true,
  );
  assert.equal(explainMentionsCorrect("Unidad SI: faradio (F) y submúltiplos.", "Faradios"), true);
});

test("auditQuestionExplain: falla si no cita la correcta", () => {
  const q = {
    id: "t1",
    part: 1,
    topicId: "componentes",
    stem: "¿Qué hace un condensador en CC?",
    options: ["Corto", "Abierto", "Inductor", "Fuente"],
    correctIndex: 1,
    explain: "En componentes hay que estudiar mucho.",
  };
  const issues = auditQuestionExplain(q);
  assert.ok(issues.some((i) => i.code === "correct_not_quoted"));
});

test("auditQuestionExplain: ok si cita la correcta", () => {
  const q = {
    id: "t2",
    part: 1,
    topicId: "componentes",
    stem: "¿Qué hace un condensador en CC?",
    options: ["Corto", "Abierto", "Inductor", "Fuente"],
    correctIndex: 1,
    explain: "En CC estable el condensador ideal equivale a circuito abierto. La opción correcta es «Abierto».",
  };
  const issues = auditQuestionExplain(q).filter((i) => i.level === "fail");
  assert.equal(issues.length, 0);
});

test("isStemExplainTopicConflict: Securité no puede explicarse con RST", () => {
  assert.equal(
    isStemExplainTopicConflict(
      "RST resume legibilidad, intensidad y tono.",
      "La señal de seguridad en radiotelefonía se compone:",
    ),
    true,
  );
});

test("isStemExplainTopicConflict: Mayday no puede explicarse con RST", () => {
  assert.equal(
    isStemExplainTopicConflict(
      "RST resume legibilidad, intensidad y tono; en fonía se usan R y S.",
      "La señal de socorro en Radiotelefonía está constituida por la palabra:",
    ),
    true,
  );
});

test("isStemExplainTopicConflict: sufijo PAN no usa plantilla de distintivo genérico", () => {
  assert.equal(
    isStemExplainTopicConflict(
      "El distintivo identifica la estación y debe usarse al inicio y al final de cada comunicación.",
      "¿Se puede asignar el sufijo PAN a un distintivo de estación de aficionado clase A?:",
    ),
    true,
  );
});

test("isMisassignedPedagogicalExplain detecta banda LF mal asignada", () => {
  const q = {
    stem: "¿Qué información puede emitir un aficionado?",
    topicId: "marco-normativo",
    options: ["LF 30-300 kHz", "Información del servicio de aficionados"],
    correctIndex: 1,
    explain:
      "Cada símbolo ITU agrupa un tramo espectral; LF son frecuencias muy bajas (30–300 kHz). La respuesta es «Información del servicio de aficionados.»",
  };
  assert.equal(isMisassignedPedagogicalExplain(q), true);
});
