import { test } from "node:test";
import assert from "node:assert/strict";
import regulatory from "../data/regulatory.js";
import topics from "../data/topics.js";
import questions from "../data/questions.js";
import ownQuestions from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import fedi from "../data/fediea-2011.js";
import quijotes from "../data/quijotes-ea3rcq.js";

const allQuestions = [...questions, ...ownQuestions, ...ure, ...fedi, ...quijotes];

test("regulatory export tiene estructura mínima", () => {
  assert.ok(regulatory.headline);
  assert.ok(Array.isArray(regulatory.normativaNav));
  assert.ok(regulatory.normativaNav.length > 0);
});

test("topics tiene partes y bloques", () => {
  assert.ok(Array.isArray(topics.parts));
  assert.ok(topics.parts.length >= 2);
  for (const p of topics.parts) {
    assert.ok(Array.isArray(p.blocks));
    assert.ok(p.blocks.length > 0);
  }
});

test("banco de preguntas mantiene estructura y coherencia por bloque", () => {
  const topicPart = new Map();
  for (const part of topics.parts) {
    for (const block of part.blocks) topicPart.set(block.id, part.id === "p2" ? 2 : 1);
  }

  const ids = new Set();
  for (const q of allQuestions) {
    assert.equal(typeof q.id, "string", "cada pregunta debe tener id");
    assert.ok(!ids.has(q.id), `id duplicado: ${q.id}`);
    ids.add(q.id);
    assert.ok(q.part === 1 || q.part === 2, `part inválida en ${q.id}`);
    assert.equal(topicPart.get(q.topicId), q.part, `topicId no corresponde a la prueba en ${q.id}`);
    assert.equal(Array.isArray(q.options), true, `opciones ausentes en ${q.id}`);
    assert.ok(q.options.length >= 2, `cada pregunta debe tener al menos 2 opciones: ${q.id}`);
    assert.ok(Number.isInteger(q.correctIndex), `correctIndex no entero en ${q.id}`);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < q.options.length, `correctIndex fuera de rango en ${q.id}`);
    assert.ok(typeof q.explain === "string" && q.explain.trim().length > 0, `falta explain en ${q.id}`);
  }
});

test("preguntas propias tienen trazabilidad de fuente", () => {
  for (const q of ownQuestions) {
    assert.equal(q.options.length, 4, `cada pregunta propia debe tener 4 opciones: ${q.id}`);
    assert.ok(typeof q.sourceRef === "string" && q.sourceRef.trim().length > 0, `falta sourceRef en ${q.id}`);
  }
});
