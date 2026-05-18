/**
 * Auditoría de explicaciones: cobertura + fidelidad básica respecto a la pregunta.
 * Uso: node scripts/audit-explanations.mjs [--json]
 */
import banco from "../data/questions-banco.js";
import generated from "../data/generated-explanations.js";
import quijotesExp from "../data/quijotes-explanations.js";
import { auditExplainBank } from "../lib/explain-faithfulness.mjs";
import { hasPedagogicalExplain, pedagogicalExplain } from "../lib/explain-quality.mjs";

const jsonOut = process.argv.includes("--json");
const summary = auditExplainBank(banco);

const withPed = banco.filter(hasPedagogicalExplain).length;
const genIds = new Set(Object.keys(generated));
const quijIds = new Set(Object.keys(quijotesExp));

if (jsonOut) {
  console.log(JSON.stringify({ withPedagogical: withPed, ...summary }, null, 2));
  process.exit(summary.noExplain.length || summary.onlyTemplate.length ? 1 : 0);
}

console.log("=== Auditoría de explicaciones ===");
console.log(`Fecha: ${new Date().toISOString().slice(0, 10)}`);
console.log(`Banco: ${summary.total} preguntas`);
console.log("");
console.log("--- 1. Cobertura ---");
console.log(`Con explicación didáctica (feedback): ${withPed} (${Math.round((100 * withPed) / summary.total)}%)`);
console.log(`Sin ningún texto explain:           ${summary.noExplain.length}`);
console.log(`Solo plantilla histórica:           ${summary.onlyTemplate.length}`);
console.log(`Sin didáctica (otros):              ${summary.noPedagogical.length}`);
console.log("");
console.log("Origen de explicaciones en banco:");
let fromGen = 0;
let fromQuij = 0;
let manual = 0;
for (const q of banco) {
  if (!hasPedagogicalExplain(q)) continue;
  if (genIds.has(q.id)) fromGen += 1;
  else if (quijIds.has(q.id)) fromQuij += 1;
  else manual += 1;
}
console.log(`  Generadas (generated-explanations): ${fromGen}`);
console.log(`  Quijotes (quijotes-explanations):   ${fromQuij}`);
console.log(`  Manuales / otras fuentes:           ${manual}`);
console.log("");
console.log("--- 2. Fidelidad (respecto a enunciado y respuesta correcta) ---");
console.log(`OK (sin fallos):                    ${summary.ok}`);
console.log(`Avisos (genéricas o cortas):        ${summary.faithfulnessWarn.length}`);
console.log(`Fallos de fidelidad:                ${summary.faithfulnessFail.length}`);
console.log("");
console.log("Códigos de incidencia (conteo):");
for (const [code, n] of Object.entries(summary.byCode).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${code}: ${n}`);
}
if (Object.keys(summary.byTopicFail).length) {
  console.log("");
  console.log("Fallos de fidelidad por bloque:");
  for (const [topic, n] of Object.entries(summary.byTopicFail).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${topic}: ${n}`);
  }
}

function printSamples(title, items, limit = 12) {
  if (!items.length) return;
  console.log("");
  console.log(`${title} (muestra ${Math.min(limit, items.length)} de ${items.length}):`);
  const list = typeof items[0] === "string" ? items.map((id) => ({ id })) : items;
  for (const item of list.slice(0, limit)) {
    const id = item.id;
    const q = banco.find((x) => x.id === id);
    if (!q) {
      console.log(`  ${id}`);
      continue;
    }
    const issues = typeof item === "object" && item.issues ? item.issues : [];
    const codes = issues.map((i) => i.code).join(", ") || "—";
    const correct = q.options?.[q.correctIndex] ?? "";
    const ped = pedagogicalExplain(q).slice(0, 90);
    console.log(`  ${id} [${q.topicId}]`);
    console.log(`    Enunciado: ${String(q.stem).slice(0, 85)}…`);
    console.log(`    Correcta: ${String(correct).slice(0, 60)}`);
    console.log(`    Explain: ${ped}…`);
    if (codes !== "—") console.log(`    Incidencias: ${codes}`);
  }
}

printSamples("Sin explicación", summary.noExplain);
printSamples("Solo plantilla", summary.onlyTemplate);
printSamples("Fallos de fidelidad", summary.faithfulnessFail);
printSamples("Avisos (explicación genérica)", summary.faithfulnessWarn, 8);

console.log("");
const coverageFail = summary.noExplain.length || summary.onlyTemplate.length;
const exitCode = coverageFail ? 1 : 0;
if (coverageFail) {
  console.log("Resultado: FALLO DE COBERTURA (faltan explicaciones didácticas).");
} else if (summary.faithfulnessFail.length) {
  console.log(
    `Resultado: COBERTURA OK · FIDELIDAD A REVISAR (${summary.faithfulnessFail.length} fallos, ${summary.faithfulnessWarn.length} avisos genéricos).`,
  );
} else if (summary.faithfulnessWarn.length) {
  console.log("Resultado: OK con avisos (explicaciones genéricas pero citan la respuesta correcta).");
} else {
  console.log("Resultado: OK (cobertura y fidelidad básica).");
}
process.exit(exitCode);
