import assert from "node:assert/strict";
import { test } from "node:test";
import {
  auditQuestionExplain,
  explainMentionsCorrect,
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
