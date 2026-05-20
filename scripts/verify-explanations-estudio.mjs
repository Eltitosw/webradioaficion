/**
 * Verificación estricta de explicaciones en banco estudio (542 preguntas, una a una).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import estudio from "../data/questions-banco-estudio.js";
import { strictAuditExplainBank } from "../lib/explain-verify.mjs";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";

const OUT = join(import.meta.dirname, "..", "data", "explain-estudio-strict-failures.txt");
const pass = strictAuditExplainBank(estudio);

const lines = [
  `Verificación estricta · banco ESTUDIO · ${new Date().toISOString().slice(0, 19)}`,
  `Total: ${pass.total}`,
  `OK: ${pass.ok}`,
  `Inaceptables: ${pass.unacceptable.length}`,
  "",
];

if (pass.unacceptable.length) {
  lines.push("=== Todas las inaceptables ===");
  for (const item of pass.unacceptable) {
    const q = estudio.find((x) => x.id === item.id);
    lines.push(`- ${item.id} [${item.topicId}] ${item.codes.join(", ")}`);
    if (q) {
      lines.push(`  P: ${String(q.stem).replace(/\s+/g, " ").slice(0, 110)}`);
      lines.push(`  C: ${String(q.options[q.correctIndex] ?? "").replace(/\s+/g, " ").slice(0, 80)}`);
      lines.push(`  E: ${pedagogicalExplain(q).replace(/\s+/g, " ").slice(0, 140)}`);
    }
  }
}

writeFileSync(OUT, lines.join("\n"));
console.log(lines.slice(0, 5).join("\n"));
console.log(`Informe: ${OUT}`);

if (pass.unacceptable.length) {
  console.error(`FALLO: ${pass.unacceptable.length} explicaciones inaceptables en banco estudio`);
  process.exit(1);
}
console.log("OK: todas las explicaciones del banco estudio pasan verificación estricta");
