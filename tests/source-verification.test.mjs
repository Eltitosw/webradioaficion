import assert from "node:assert/strict";
import { test } from "node:test";
import regulatory from "../data/regulatory.js";
import { getQuestionSourceMeta, SOURCES_CATALOG } from "../data/verification-sources.mjs";
import {
  auditExplainAgainstSources,
  auditRegulatoryCatalog,
} from "../lib/source-verification.mjs";

test("SOURCES_CATALOG incluye BOE vigente, 2026 equipos y CEPT", () => {
  const ids = SOURCES_CATALOG.map((s) => s.id);
  assert.ok(ids.includes("boe-2013-7624"));
  assert.ok(ids.includes("boe-2022-10757"));
  assert.ok(ids.includes("boe-1986-33766"));
  assert.ok(ids.includes("boe-2017-2460"));
  assert.ok(ids.includes("boe-2023-1192"));
  assert.ok(ids.includes("boe-2026-5878"));
  assert.ok(ids.includes("boe-2026-552"));
  assert.ok(ids.includes("boe-reglamento-pdf-2013"));
  assert.ok(ids.includes("cept-tr-61-02"));
});

test("getQuestionSourceMeta: FEDI es histórico", () => {
  const m = getQuestionSourceMeta({ id: "fedi-a-001" });
  assert.equal(m.tier, "historical");
});

test("auditExplainAgainstSources: falla afirmación legal absoluta inventada", () => {
  const q = {
    id: "t1",
    topicId: "marco-normativo",
    stem: "Potencia en urbano:",
    options: ["10 W", "25 W"],
    correctIndex: 0,
  };
  const issues = auditExplainAgainstSources(
    q,
    "Es obligatorio pertenecer a una asociación para operar. La respuesta correcta es «10 W».",
  );
  assert.ok(issues.some((i) => i.code === "unverified_absolute_legal_claim"));
});

test("auditRegulatoryCatalog: regulatory.js completo", () => {
  assert.deepEqual(auditRegulatoryCatalog(regulatory), []);
});
