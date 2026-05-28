/**
 * Informe de grado examen (nunca falla el proceso; usar verify-explain-exam-grade para bloquear).
 * Uso: node scripts/audit-explain-exam-grade.mjs [--ids=id1,id2]
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import banco from "../data/questions-banco.js";
import { auditExamGradeBank } from "../lib/explain-exam-grade.mjs";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";

const OUT = join(import.meta.dirname, "..", "data", "explain-exam-grade-report.txt");
const idsArg = process.argv.find((a) => a.startsWith("--ids="));
const onlyIds = idsArg
  ? new Set(
      idsArg
        .slice(6)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
  : null;

const summary = auditExamGradeBank(banco, { onlyIds: onlyIds ?? undefined });

const lines = [
  "=== Auditoría calidad explicaciones (grado examen) ===",
  `Fecha: ${new Date().toISOString().slice(0, 10)}`,
  `Ámbito: ${summary.total} preguntas`,
  `OK: ${summary.pass}`,
  `Fallos: ${summary.fail.length}`,
  "",
  "Por código:",
];
for (const [code, n] of Object.entries(summary.byCode).sort((a, b) => b[1] - a[1])) {
  lines.push(`  ${code}: ${n}`);
}

if (summary.fail.length) {
  lines.push("", "--- Fallos (muestra 50) ---");
  for (const item of summary.fail.slice(0, 50)) {
    const q = banco.find((x) => x.id === item.id);
    lines.push(`  ${item.id} [${item.topicId}] ${item.codes.join(", ")}`);
    if (q) {
      lines.push(`    P: ${String(q.stem).replace(/\s+/g, " ").slice(0, 90)}`);
      lines.push(`    E: ${pedagogicalExplain(q).replace(/\s+/g, " ").slice(0, 110)}`);
    }
  }
  if (summary.fail.length > 50) lines.push(`  … y ${summary.fail.length - 50} más`);
}

writeFileSync(OUT, lines.join("\n"), { encoding: "utf8" });
console.log(lines.slice(0, 8).join("\n"));
console.log(`Informe: ${OUT}`);
process.exit(0);
