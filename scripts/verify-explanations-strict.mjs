/**
 * Verificación estricta triple del banco (falla si queda cualquier explicación inaceptable).
 * Uso: node scripts/verify-explanations-strict.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import banco from "../data/questions-banco.js";
import { bannedExplainPhraseHits } from "../lib/explain-faithfulness.mjs";
import { strictAuditExplainBank } from "../lib/explain-verify.mjs";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";
import { buildBestExplain } from "../lib/build-best-explain.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";

const OUT = join(import.meta.dirname, "..", "data", "explain-strict-failures.txt");

/** @type {string[]} */
const phraseHits = [];

for (const q of banco) {
  const ped = pedagogicalExplain(q);
  if (!ped) continue;
  for (const code of bannedExplainPhraseHits(ped, String(q.stem || ""))) {
    phraseHits.push(`${q.id}: ${code}`);
  }
}

const pass1 = strictAuditExplainBank(banco);

/** Pass 2: simular regeneración en memoria para inaceptables */
let pass2Fixed = 0;
let pass2StillBad = 0;
for (const item of pass1.unacceptable) {
  const q = banco.find((x) => x.id === item.id);
  if (!q) continue;
  const rebuilt = buildBestExplain(q);
  if (isExplainAcceptable(q, rebuilt)) pass2Fixed += 1;
  else pass2StillBad += 1;
}

const lines = [
  `Verificación estricta · ${new Date().toISOString().slice(0, 19)}`,
  `Banco: ${pass1.total}`,
  `OK: ${pass1.ok}`,
  `Inaceptables: ${pass1.unacceptable.length}`,
  `Solo plantilla: ${pass1.onlyTemplate.length}`,
  `Frases sospechosas (pass 3): ${phraseHits.length}`,
  `Regenerables en memoria (pass 2): ${pass2Fixed} / aún mal: ${pass2StillBad}`,
  "",
];

if (pass1.unacceptable.length) {
  lines.push("=== Inaceptables (muestra 60) ===");
  for (const item of pass1.unacceptable.slice(0, 60)) {
    const q = banco.find((x) => x.id === item.id);
    lines.push(`- ${item.id} [${item.topicId}] ${item.codes.join(", ")}`);
    if (q) {
      lines.push(`  P: ${String(q.stem).replace(/\s+/g, " ").slice(0, 100)}`);
      lines.push(`  E: ${pedagogicalExplain(q).replace(/\s+/g, " ").slice(0, 120)}`);
    }
  }
  if (pass1.unacceptable.length > 60) lines.push(`… y ${pass1.unacceptable.length - 60} más`);
}

if (phraseHits.length) {
  lines.push("");
  lines.push("=== Frases sospechosas ===");
  phraseHits.slice(0, 40).forEach((h) => lines.push(`- ${h}`));
}

writeFileSync(OUT, lines.join("\n"));

const fail = pass1.unacceptable.length > 0 || pass2StillBad > 0 || phraseHits.length > 0;

console.log(lines.slice(0, 8).join("\n"));
console.log(`Informe: ${OUT}`);

if (fail) {
  console.error(`FALLO ESTRICTO: ${pass1.unacceptable.length} inaceptables, ${phraseHits.length} frases sospechosas`);
  process.exit(1);
}
console.log("OK: verificación estricta superada");
process.exit(0);
