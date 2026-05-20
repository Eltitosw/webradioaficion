import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  classifyQuestion,
  inferTopicId,
  isMisfiledPart2TechnicalStem,
  reconcilePartAndTopic,
} from "../lib/question-classification.mjs";

describe("código Q — FEDI bloque d (CODIGO \"Q\")", () => {
  it("fedi-d-516 no va a electricidad-basica sino a operación P2", () => {
    const stem =
      'QUE ABREVIATURA DEL CODIGO "Q" CORRESPONDE A LA PREGUNTA: ¿SUFRE USTED INTERFERENCIA?';
    const c = classifyQuestion({ stem, sourcePart: 1, id: "fedi-d-516" });
    assert.equal(c.part, 2);
    assert.equal(c.topicId, "operacion-seguridad");
    assert.notEqual(c.topicId, "electricidad-basica");
  });

  it("fedi-a-120 (socorro) va a operación P2, no electricidad", () => {
    const stem = "LA SEÑAL RADIOTELEGRÁFlCA DE SOCORRO CONSISTE EN:";
    const c = classifyQuestion({ stem, sourcePart: 1, id: "fedi-a-120" });
    assert.equal(c.part, 2);
    assert.equal(c.topicId, "operacion-seguridad");
  });

  it("fedi-d-517 (QSY) no va a magnetismo-ondas por la palabra frecuencia", () => {
    const stem =
      'A QUE ABREVIATURA DEL CODIGO "Q" CORRESPONDE LA PREGUNTA: ¿TENGO OUE PASAR A TRANSMITIR EN OTRA FRECUENCIA?';
    const c = classifyQuestion({ stem, sourcePart: 1, id: "fedi-d-517" });
    assert.equal(c.part, 2);
    assert.equal(c.topicId, "operacion-seguridad");
  });
});

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

  it("ningún código Q (CODIGO \"Q\") queda en electricidad-basica", async () => {
    const { CODIGO_Q_STEM_RE } = await import("../lib/question-classification.mjs");
    const { default: banco } = await import("../data/questions-banco.js");
    const bad = banco.filter(
      (q) => q.topicId === "electricidad-basica" && CODIGO_Q_STEM_RE.test(q.stem),
    );
    assert.equal(bad.length, 0, bad.map((q) => q.id).join(", "));
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
