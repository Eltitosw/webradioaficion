/**
 * Auditoría de part/topicId del banco activo.
 * Uso: node scripts/audit-classification.mjs [--json]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import questionsBanco from "../data/questions-banco.js";
import topics from "../data/topics.js";
import { classifyQuestion } from "../lib/question-classification.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "classification-audit.txt");
const asJson = process.argv.includes("--json");

const topicPart = new Map();
for (const p of topics.parts || []) {
  for (const b of p.blocks || []) topicPart.set(b.id, p.id === "p2" ? 2 : 1);
}

/** @type {Array<{ id: string; from: string; to: string; ruleId: string; confidence: string; stem: string }>} */
const drift = [];
/** @type {Record<string, number>} */
const byRule = {};
/** @type {Record<string, number>} */
const byTopic = {};

for (const q of questionsBanco) {
  const c = classifyQuestion({ stem: q.stem, sourcePart: q.part, id: q.id });
  byTopic[`${c.part}/${c.topicId}`] = (byTopic[`${c.part}/${c.topicId}`] || 0) + 1;
  byRule[c.ruleId] = (byRule[c.ruleId] || 0) + 1;

  const expectedPart = topicPart.get(c.topicId);
  if (expectedPart && expectedPart !== c.part) {
    drift.push({
      id: q.id,
      from: `${q.part}/${q.topicId}`,
      to: `${c.part}/${c.topicId}`,
      ruleId: `${c.ruleId}+topic-part-mismatch`,
      confidence: c.confidence,
      stem: q.stem.slice(0, 90),
    });
    continue;
  }

  if (c.part !== q.part || c.topicId !== q.topicId) {
    drift.push({
      id: q.id,
      from: `${q.part}/${q.topicId}`,
      to: `${c.part}/${c.topicId}`,
      ruleId: c.ruleId,
      confidence: c.confidence,
      stem: q.stem.slice(0, 90),
    });
  }
}

const lowConf = questionsBanco.filter((q) => {
  const c = classifyQuestion({ stem: q.stem, sourcePart: q.part, id: q.id });
  return c.confidence === "low";
});

const lines = [];
const push = (s = "") => lines.push(s);
push("=== Auditoría clasificación (banco activo) ===");
push(`Fecha: ${new Date().toISOString().slice(0, 10)}`);
push(`Preguntas: ${questionsBanco.length}`);
push(`Drift (almacenado ≠ clasificador): ${drift.length}`);
push(`Confianza baja (revisar — fallback-review): ${lowConf.length}`);
push("");
push("Distribución según clasificador:");
for (const [k, n] of Object.entries(byTopic).sort((a, b) => b[1] - a[1])) {
  push(`  ${n}\t${k}`);
}
push("");
push("Reglas aplicadas:");
for (const [k, n] of Object.entries(byRule).sort((a, b) => b[1] - a[1])) {
  push(`  ${n}\t${k}`);
}
if (drift.length) {
  push("");
  push("Cambios sugeridos (primeros 80):");
  for (const d of drift.slice(0, 80)) {
    push(`  ${d.id}: ${d.from} → ${d.to} [${d.ruleId}]`);
    push(`    ${d.stem}`);
  }
  if (drift.length > 80) push(`  … y ${drift.length - 80} más`);
}

const text = lines.join("\n");
if (asJson) {
  console.log(JSON.stringify({ drift, byTopic, byRule, lowConfCount: lowConf.length }, null, 2));
} else {
  console.log(text);
  fs.writeFileSync(OUT, `${text}\n`, { encoding: "utf8" });
  console.error(`\nEscrito ${OUT}`);
}

if (drift.length > 0) {
  console.error(
    `FAIL: ${drift.length} pregunta(s) con drift de clasificación. Edita la fuente o añade override en data/question-classification-overrides.mjs.`,
  );
  process.exitCode = 1;
}
