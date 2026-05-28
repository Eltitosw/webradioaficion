/**
 * Grado examen de explicaciones.
 * Uso:
 *   node scripts/verify-explain-exam-grade.mjs              # anti-regresión (baseline)
 *   node scripts/verify-explain-exam-grade.mjs --strict     # 0 fallos (pre-publicar)
 *   node scripts/verify-explain-exam-grade.mjs --ids=a,b    # solo IDs tocados (ahorra tiempo)
 *   node scripts/verify-explain-exam-grade.mjs --update-baseline  # tras bajar deuda
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import banco from "../data/questions-banco.js";
import { auditExamGradeBank } from "../lib/explain-exam-grade.mjs";

const ROOT = join(import.meta.dirname, "..");
const BASELINE_PATH = join(ROOT, "data", "explain-grade-baseline.json");

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const updateBaseline = args.includes("--update-baseline");
const idsArg = args.find((a) => a.startsWith("--ids="));
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
const scope = onlyIds ? `${summary.total} IDs filtrados` : `${summary.total} preguntas`;

console.log(`Grado examen [${scope}]: ${summary.pass} OK · fallos ${summary.fail.length}`);

if (summary.fail.length) {
  const byCode = {};
  for (const item of summary.fail) {
    for (const code of item.codes) {
      byCode[code] = (byCode[code] || 0) + 1;
    }
  }
  console.log("Por código:", Object.entries(byCode).sort((a, b) => b[1] - a[1]).join(", "));
  console.error("Muestra (25):");
  for (const item of summary.fail.slice(0, 25)) {
    console.error(`  ${item.id}: ${item.codes.join(", ")}`);
  }
}

if (updateBaseline) {
  const next = {
    version: 1,
    updated: new Date().toISOString().slice(0, 10),
    note: "Actualizado con verify-explain-exam-grade --update-baseline",
    maxFails: summary.fail.length,
    maxFailsByCode: summary.byCode,
  };
  writeFileSync(BASELINE_PATH, `${JSON.stringify(next, null, 2)}\n`, { encoding: "utf8" });
  console.log(`Baseline actualizado: maxFails=${next.maxFails}`);
  process.exit(0);
}

if (strict) {
  if (summary.fail.length) {
    console.error(`FALLO ESTRICTO: ${summary.fail.length} explicaciones no cumplen grado examen.`);
    process.exit(1);
  }
  console.log("OK: grado examen estricto (0 fallos).");
  process.exit(0);
}

/** Anti-regresión: no empeorar respecto al baseline. */
const baseline = JSON.parse(readFileSync(BASELINE_PATH, { encoding: "utf8" }));
const maxFails = Number(baseline.maxFails ?? 0);

if (summary.fail.length > maxFails) {
  console.error(
    `FALLO REGRESIÓN: ${summary.fail.length} fallos > baseline ${maxFails}. Corrige o ejecuta --update-baseline si bajaste la deuda a propósito.`,
  );
  process.exit(1);
}

if (summary.fail.length < maxFails) {
  console.log(
    `Mejora detectada: ${summary.fail.length} fallos (baseline ${maxFails}). Ejecuta --update-baseline para fijar el nuevo techo.`,
  );
} else {
  console.log(`OK: anti-regresión (fallos ${summary.fail.length} ≤ baseline ${maxFails}).`);
}
process.exit(0);
