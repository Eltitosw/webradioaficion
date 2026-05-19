import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  classifyQuestion,
  inferTopicId,
  isMisfiledPart2TechnicalStem,
  reconcilePartAndTopic,
} from "../lib/question-classification.mjs";

describe("topicIdPart2 — transceptor vs CEPT", () => {
  it("no clasifica compresión de transceptor como licencias-indicativos", () => {
    const stem = "LAS MEDIDAS DE COMPRESIÓN DE UN TRANSCEPTOR INDICAN:";
    assert.notEqual(inferTopicId(stem, 2), "licencias-indicativos");
  });

  it("sigue clasificando distintivos como licencias-indicativos", () => {
    const stem =
      "Durante sus emisiones, ¿cuando deben de transmitir sus distintivos de llamada las estaciones de aficionados?";
    assert.equal(inferTopicId(stem, 2), "licencias-indicativos");
  });
});

describe("reconcilePartAndTopic — FEDI bloque c", () => {
  it("mueve equipo de transceptor a parte 1 receptores-emisores", () => {
    const stem = "El mando de ganancia de radiofrecuencia en un transceptor:";
    assert.equal(reconcilePartAndTopic(stem, 2).part, 1);
    assert.equal(reconcilePartAndTopic(stem, 2).topicId, "receptores-emisores", stem);
  });

  it("respeta override en repetidor (fedi-a-108)", () => {
    const c = classifyQuestion({
      id: "fedi-a-108",
      stem: "A CUAL DE ESTOS CIRCUITOS DE LA PARTE RECEPTORA DE UN REPETIDOR DEBE ESTAR CONECTADO EL RELE",
      sourcePart: 2,
    });
    assert.equal(c.part, 1);
    assert.equal(c.topicId, "receptores-emisores");
    assert.equal(c.ruleId, "override");
  });

  it("no deja preguntas en fallback-review sin clasificar", async () => {
    const { default: banco } = await import("../data/questions-banco.js");
    const pending = banco.filter(
      (q) => classifyQuestion({ stem: q.stem, sourcePart: q.part, id: q.id }).ruleId === "fallback-review",
    );
    assert.equal(pending.length, 0, `pendientes: ${pending.map((q) => q.id).join(", ")}`);
  });

  it("deja en parte 2 las preguntas de distintivo", () => {
    const stem =
      "Durante sus emisiones, ¿cuando deben de transmitir sus distintivos de llamada las estaciones de aficionados?";
    const r = reconcilePartAndTopic(stem, 2);
    assert.equal(r.part, 2);
    assert.equal(r.topicId, "licencias-indicativos");
    assert.equal(isMisfiledPart2TechnicalStem(stem, 2), false);
  });
});
