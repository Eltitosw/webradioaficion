/**
 * Auditoría: normativa vigente + explicaciones didácticas (no plantillas).
 * Uso: node scripts/audit-normativa-explicaciones.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import {
  hasObsoleteCorrectAnswer,
  hasObsoleteHint,
  isNormativelyUnacceptableQuestion,
} from "../lib/question-recency.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { isGenericPedagogicalExplain, auditExplainBank } from "../lib/explain-faithfulness.mjs";
import { isTemplateOnlyExplain, pedagogicalExplain } from "../lib/explain-quality.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "normativa-explicaciones-audit.txt");

const normBad = banco.filter((q) => isNormativelyUnacceptableQuestion(q));
const obsCorrect = banco.filter((q) => hasObsoleteCorrectAnswer(q));
const weakExplain = banco.filter((q) => !isExplainAcceptable(q));
const genericExplain = banco.filter((q) => isGenericPedagogicalExplain(q));
const ureTemplate = banco.filter((q) =>
  /^Práctica URE/i.test(pedagogicalExplain(q) || String(q.explain || "")),
);
const faith = auditExplainBank(banco);

const lines = [
  "=== Auditoría normativa y explicaciones ===",
  `Fecha: ${new Date().toISOString().slice(0, 10)}`,
  `Banco: ${banco.length} preguntas`,
  "",
  "--- Normativa ---",
  `Inaceptables (stem obsoleto o correcta antigua): ${normBad.length}`,
  `Respuesta correcta obsoleta: ${obsCorrect.length}`,
  "",
  "--- Explicaciones ---",
  `No aceptables (estricto): ${weakExplain.length}`,
  `Genéricas (fallback): ${genericExplain.length}`,
  `Plantilla «Práctica URE» sin didáctica: ${ureTemplate.length}`,
  `Fidelidad: OK ${faith.ok} · fallos ${faith.faithfulnessFail.length}`,
  "",
];

function sample(title, items, n = 15) {
  if (!items.length) return;
  lines.push(`--- ${title} (${items.length}) ---`);
  for (const q of items.slice(0, n)) {
    const c = q.options?.[q.correctIndex] ?? "";
    lines.push(`  ${q.id}: ${String(q.stem).slice(0, 70)}…`);
    lines.push(`    Correcta: ${String(c).slice(0, 65)}`);
    lines.push(`    Explain: ${pedagogicalExplain(q).slice(0, 90)}…`);
  }
  lines.push("");
}

sample("Normativa obsoleta", normBad);
sample("Explicación no aceptable", weakExplain);
sample("Plantilla URE", ureTemplate);

writeUtf8File(OUT, `${lines.join("\n")}\n`);
console.log(lines.join("\n"));
console.log(`Escrito ${OUT}`);

const fail = normBad.length || weakExplain.length;
process.exit(fail ? 1 : 0);
