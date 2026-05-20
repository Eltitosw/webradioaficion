/**
 * Auditoría: ¿el proyecto está en condiciones de cumplir su cometido (preparar el apto)?
 * Uso: node scripts/audit-exam-ready.mjs
 */
import questionsBanco from "../data/questions-banco.js";
import { BANCO_STATS } from "../data/questions-banco.js";
import { MIN_BANCO_QUESTIONS } from "../lib/question-recency.mjs";
import { stemNeedsFigure } from "../lib/import-question-utils.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "exam-ready-audit.txt");

const lines = [];
const push = (s = "") => lines.push(s);
let ok = true;

function fail(msg) {
  ok = false;
  push(`  ✗ ${msg}`);
}

function pass(msg) {
  push(`  ✓ ${msg}`);
}

push("=== Auditoría: proyecto listo para preparar el apto ===");
push(`Fecha: ${new Date().toISOString().slice(0, 10)}`);
push("");

const count = questionsBanco.length;
if (count >= MIN_BANCO_QUESTIONS) pass(`Banco ${count} preguntas (mín. ${MIN_BANCO_QUESTIONS})`);
else fail(`Banco ${count} < mínimo ${MIN_BANCO_QUESTIONS}`);

const p1 = questionsBanco.filter((q) => q.part === 1).length;
const p2 = questionsBanco.filter((q) => q.part === 2).length;
if (p1 >= 200 && p2 >= 200) pass(`Equilibrio partes: P1=${p1}, P2=${p2}`);
else fail(`Desequilibrio partes: P1=${p1}, P2=${p2} (objetivo ~200+ cada una)`);

const withFig = questionsBanco.filter((q) => q.stemFigure).length;
pass(`Con figura: ${withFig} (${BANCO_STATS.withFigure ?? withFig})`);

const needsFigNoImage = questionsBanco.filter((q) => stemNeedsFigure(q.stem) && !q.stemFigure);
if (needsFigNoImage.length <= 8) {
  pass(`Enunciados que piden figura sin imagen: ${needsFigNoImage.length} (tolerancia ≤8)`);
} else {
  fail(`${needsFigNoImage.length} preguntas piden figura y no tienen stemFigure`);
  needsFigNoImage.slice(0, 5).forEach((q) => push(`    · ${q.id}`));
}

const thin = [
  ["electricidad-basica", 10],
  ["instalaciones", 8],
];
for (const [topic, min] of thin) {
  const n = questionsBanco.filter((q) => q.topicId === topic).length;
  if (n >= min) pass(`Tema ${topic}: ${n} preguntas`);
  else push(`  ⚠ Tema ${topic}: solo ${n} preguntas (reforzar por temario)`);
}

push("");
push("Simulador (comprobar en app):");
push("  · Examen tipo test: 30 preguntas, 30 min, APTO ≥15/30 por prueba");
push("  · Indicador global en pestaña Examen");
push("  · Cuaderno + repaso inteligente");
push("");

push("Estudio recomendado (ver RUTA_AL_APTO.md):");
push("  1. Temario → Practicar por bloque");
push("  2. Cuaderno de falladas");
push("  3. ≥2 simulacros aptos por prueba");
push("  4. Revisar convocatoria oficial antes de inscribirse");
push("");

if (ok) push("RESULTADO: Proyecto APTO para su cometido (preparación examen).");
else push("RESULTADO: Revisar incidencias ✗ antes de dar por cerrada la versión.");

fs.writeFileSync(OUT, `${lines.join("\n")}\n`, "utf8");
console.log(lines.join("\n"));
console.log(`\nInforme: ${OUT}`);
process.exit(ok ? 0 : 1);
