/**
 * Valida pools de Practicar (misma lógica que lib/quiz-session.js).
 * Uso: node scripts/validate-classification-pools.mjs
 */
import questionsBanco from "../data/questions-banco.js";
import topics from "../data/topics.js";
import { buildQuestionList } from "../lib/quiz-session.js";
import { filterQuestionsForSession } from "../lib/question-pool.mjs";

const TECH_IN_LICENCIAS =
  /transceptor|compresi[oó]n de un transceptor|ganancia de radiofrecuencia|superheterodin|ley de ohm\b|mezclador/i;
const REG_IN_P1_TECH =
  /distintivo de llamada|autorizaci[oó]n de radioaficionado|harec|\bcept\b|mayday|securit[eé]/i;

let failures = 0;

function fail(msg) {
  console.error(`FALLO: ${msg}`);
  failures += 1;
}

function checkPool(label, pool, { forbidStemRe, requireStemRe }) {
  if (!pool.length) {
    fail(`${label}: pool vacío`);
    return;
  }
  if (forbidStemRe) {
    const bad = pool.filter((q) => forbidStemRe.test(q.stem));
    if (bad.length) {
      fail(`${label}: ${bad.length} preguntas prohibidas (ej. ${bad[0].id})`);
      console.error(`  → ${bad[0].stem.slice(0, 80)}`);
    }
  }
  if (requireStemRe) {
    const miss = pool.filter((q) => !requireStemRe.test(q.stem));
    if (miss.length === pool.length) {
      fail(`${label}: ninguna pregunta coincide con patrón esperado`);
    }
  }
}

const base = filterQuestionsForSession(questionsBanco);

console.log(`Banco activo: ${questionsBanco.length} preguntas\n`);

for (const part of topics.parts) {
  const partVal = part.id === "p2" ? "2" : "1";
  for (const block of part.blocks) {
    const pool = buildQuestionList(base, partVal, "teorico", block.id, 30);
    const wrongPart = pool.filter((q) => String(q.part) !== partVal);
    if (wrongPart.length) {
      fail(`P${partVal}/${block.id}: ${wrongPart.length} con parte incorrecta`);
    }
    const wrongTopic = pool.filter((q) => q.topicId !== block.id);
    if (wrongTopic.length) {
      fail(`P${partVal}/${block.id}: ${wrongTopic.length} con topicId distinto`);
    }
    console.log(`OK  P${partVal} · ${block.title.padEnd(42)} ${String(pool.length).padStart(3)} en muestra 30`);
  }
}

console.log("");
checkPool("P2 licencias (30)", buildQuestionList(base, "2", "teorico", "licencias-indicativos", 30), {
  forbidStemRe: TECH_IN_LICENCIAS,
});
checkPool("P1 receptores (30)", buildQuestionList(base, "1", "teorico", "receptores-emisores", 30), {
  forbidStemRe: REG_IN_P1_TECH,
});
checkPool(
  "P2 operacion (30)",
  buildQuestionList(base, "2", "teorico", "operacion-seguridad", 30),
  {
    requireStemRe: /mayday|securit|c[oó]digo q|\brst\b|socorro|fon[eé]tic|qsy|qrm/i,
  },
);

const p2all = buildQuestionList(base, "2", "libre", "all");
const techInP2 = p2all.filter((q) => TECH_IN_LICENCIAS.test(q.stem));
console.log(`\nP2 total: ${p2all.length}, técnica transceptor/etc.: ${techInP2.length}`);
if (techInP2.length) {
  fail(`Aún hay ${techInP2.length} preguntas técnicas en parte 2`);
  techInP2.slice(0, 3).forEach((q) => console.error(`  ${q.id} ${q.topicId}`));
}

if (failures) {
  console.error(`\n${failures} fallo(s)`);
  process.exit(1);
}
console.log("\nvalidate-classification-pools: OK");
