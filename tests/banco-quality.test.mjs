import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isPublishableBankQuestion, prepareBankQuestion } from "../lib/banco-quality.mjs";
import { isStemCoherentWithTopic } from "../lib/topic-stem-coherence.mjs";

describe("banco-quality — publicación estricta", () => {
  it("rechaza código Q en electricidad-basica", () => {
    const q = {
      id: "fedi-d-516",
      part: 1,
      topicId: "electricidad-basica",
      stem: 'QUE ABREVIATURA DEL CODIGO "Q" CORRESPONDE A LA PREGUNTA: ¿SUFRE USTED INTERFERENCIA?',
      options: ["QRP", "QRO", "QRM", "QRN"],
      correctIndex: 2,
    };
    assert.equal(isPublishableBankQuestion(q), false);
    const { question, classification } = prepareBankQuestion(q);
    assert.equal(question.topicId, "operacion-seguridad");
    assert.equal(classification.part, 2);
  });

  it("rechaza ADSL / Internet", () => {
    const q = {
      id: "quijotes-1-2205",
      part: 1,
      topicId: "electricidad-basica",
      stem: 'Si un usuario tiene contratado un acceso a Internet "ADSL de 2 megas", esto significa que:',
      options: ["A", "B", "C", "D"],
      correctIndex: 1,
    };
    assert.equal(isPublishableBankQuestion(q), false);
  });

  it("rechaza FEDI bloque estudio (no examen)", () => {
    const q = {
      id: "fedi-d-516",
      part: 1,
      topicId: "electricidad-basica",
      stem: "UN CONDENSADOR",
      options: ["A", "B", "C", "D"],
      correctIndex: 0,
      explain: "Prueba.",
    };
    assert.equal(isPublishableBankQuestion(q), false);
  });

  it("rechaza Quijotes quiz 1 (genérico)", () => {
    const q = {
      id: "quijotes-1-2205",
      part: 1,
      topicId: "electricidad-basica",
      stem: 'Internet ADSL',
      options: ["A", "B", "C", "D"],
      correctIndex: 0,
    };
    assert.equal(isPublishableBankQuestion(q), false);
  });

  it("acepta Ohm claro en electricidad", () => {
    assert.equal(
      isStemCoherentWithTopic("Si V=12 V y R=6 Ω, la corriente es:", "electricidad-basica", {
        ruleId: "p1-technical",
        confidence: "high",
      }),
      true,
    );
  });

  it("acepta URE electricidad con default-topic-ok si el enunciado encaja", () => {
    const q = {
      id: "ure-p1-q999",
      part: 1,
      topicId: "electricidad-basica",
      stem: "El campo eléctrico se expresa en:",
      options: ["V/m", "A/m", "Hz", "Ω"],
      correctIndex: 0,
      explain: "La intensidad del campo eléctrico se mide en voltios por metro (V/m).",
    };
    assert.equal(isPublishableBankQuestion(q), true);
  });
});
