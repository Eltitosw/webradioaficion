/**
 * Informe de alineación pregunta ↔ explicación (fidelidad + plantillas).
 * Uso: node scripts/audit-explain-alignment.mjs
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import banco from "../data/questions-banco.js";
import { auditExplainBank, auditQuestionExplain } from "../lib/explain-faithfulness.mjs";
import { hasPedagogicalExplain, pedagogicalExplain } from "../lib/explain-quality.mjs";

const OUT = join(import.meta.dirname, "..", "data", "explain-alignment-report.txt");
const summary = auditExplainBank(banco);

const lines = [
  `Informe de alineación · ${new Date().toISOString().slice(0, 19)}`,
  `Banco: ${summary.total} preguntas`,
  `Didácticas: ${banco.filter(hasPedagogicalExplain).length}`,
  `Solo plantilla: ${summary.onlyTemplate.length}`,
  `Fallos de fidelidad: ${summary.faithfulnessFail.length}`,
  `Avisos: ${summary.faithfulnessWarn.length}`,
  "",
];

function section(title, items, limit = 80) {
  lines.push(`=== ${title} (${items.length}) ===`);
  const list = items.slice(0, limit);
  for (const item of list) {
    const id = typeof item === "string" ? item : item.id;
    const q = banco.find((x) => x.id === id);
    if (!q) {
      lines.push(`- ${id}`);
      continue;
    }
    const issues = typeof item === "object" && item.issues ? item.issues : auditQuestionExplain(q);
    const codes = issues.map((i) => i.code).join(", ");
    const correct = q.options?.[q.correctIndex] ?? "";
    lines.push(`- ${id} [${q.topicId}] ${codes}`);
    lines.push(`  P: ${String(q.stem).replace(/\s+/g, " ").slice(0, 120)}`);
    lines.push(`  R: ${String(correct).slice(0, 80)}`);
    lines.push(`  E: ${pedagogicalExplain(q).replace(/\s+/g, " ").slice(0, 140)}`);
  }
  if (items.length > limit) lines.push(`… y ${items.length - limit} más`);
  lines.push("");
}

section("Fallos de fidelidad", summary.faithfulnessFail, 200);
section("Solo plantilla (sin didáctica)", summary.onlyTemplate, 40);
section("Avisos genéricos", summary.faithfulnessWarn, 30);

writeFileSync(OUT, lines.join("\n"));
console.log(`Escrito ${OUT}`);
console.log(
  `Resumen: ${summary.faithfulnessFail.length} fallos, ${summary.onlyTemplate.length} plantillas, ${summary.faithfulnessWarn.length} avisos`,
);

process.exit(summary.faithfulnessFail.length ? 1 : 0);
