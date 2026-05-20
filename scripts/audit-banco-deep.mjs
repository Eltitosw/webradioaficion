/**
 * Auditoría profunda: cada pregunta del banco vs clasificador y coherencia tema.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import banco from "../data/questions-banco.js";
import topics from "../data/topics.js";
import { classifyQuestion } from "../lib/question-classification.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { getRecencyMeta } from "../lib/question-recency.mjs";
import { buildQuestionList } from "../lib/quiz-session.js";
import { filterQuestionsForSession } from "../lib/question-pool.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "banco-deep-audit.txt");

const topicTitles = new Map();
for (const p of topics.parts) {
  for (const b of p.blocks) topicTitles.set(b.id, b.title);
}

/** Señales mínimas que DEBEN aparecer en el stem para estar en ese tema (heurística estricta). */
const TOPIC_MUST_HINT = {
  "electricidad-basica":
    /ohm|volt|amper|vat|watt|resist|condens|induct|transform|farad|henr|coulomb|pilas?|bater[ií]a|circuito el[eé]ctrico|corriente|tensi[oó]n|potencia el[eé]ctrica|fusible|electroim[aá]n|osciloscopio|pol[ií]metro|mult[ií]metro|termistor|semiconductor|electr[oó]n|conductor el[eé]ctrico|fuente de alimentaci|toma de tierra.*estaci|incendio.*electricidad/i,
  "magnetismo-ondas":
    /onda|modulaci|am\b|fm\b|ssb|usb|lsb|frecuencia|hercio|decibel|espectro|polariz|propagaci|ionosfera|vhf|uhf|hf\b|mf\b|lf\b|wavelength|longitud de onda|fading|desvanecimiento|banda lateral|clase de emisi/i,
  "componentes":
    /diodo|transistor|condensador|resistencia|bobina|inductor|rectific|semiconductor|válvula|tubo electr|transformador|circuito resonante/i,
  "receptores-emisores":
    /receptor|transmis|transceptor|mezclador|demodul|superheterodin|squelch|agc|fi\b|frecuencia intermedia|oscilador|excitador|amplificador.*(rf|potencia)|detector|s-meter|vox|portadora|modo de emisi/i,
  "antenas-prop":
    /antena|dipolo|yagi|coaxial|balun|línea de transmisi|roe\b|ondas estacionarias|radial|directividad.*antena|ganancia.*antena|propagaci/i,
  "licencias-indicativos":
    /distintivo|indicativo|cept|harec|autorizaci|licencia|prefijo|sufijo|distrito|deletre|ea\d|eb\d|ec\d|menci[oó]n\s+\/|pa[ií]s visitado|titular.*licencia/i,
  "marco-normativo":
    /reglamento|boe|orden iet|art[ií]culo|anexo|secretar[ií]a|cnaf|uit\b|infracci|sanci[oó]n|examen de radioaficionado|prueba de capacitaci|servicio de radioaficionado|potencia m[aá]xima.*estaci/i,
  "operacion-seguridad":
    /c[oó]digo\s*["']?\s*q|\bq(?:rm|rn|sy|rt|sl|th|ro|rp)\b|mayday|securit[eé]|socorro|fon[eé]tic|rst\b|pan\s*pan|deletreo.*llamada|señal.*socorro/i,
  "instalaciones":
    /comunidad de propietarios|fachada|terraza|inmueble|instalaci[oó]n.*antena|desmontaje.*antena|propietario/i,
};

/** NUNCA deberían estar en este tema. */
const TOPIC_FORBID = {
  "electricidad-basica":
    /c[oó]digo\s*["']?\s*q|\bq(?:rm|rn|sy|rt)\b|distintivo|indicativo|cept|harec|mayday|socorro|transceptor|superheterodin|mezclador|adsl|internet|autorizaci[oó]n de radioaficionado|licencia cept|gama de frecuenc.*mhz|reflexiones lunares/i,
  "licencias-indicativos":
    /transceptor|compresi[oó]n de un transceptor|ley de ohm|condensador|volt[ií]metro|mezclador|superheterodin/i,
  "operacion-seguridad":
    /ley de ohm|condensador|faradio|henrio|dipolo|transformador/i,
  "magnetismo-ondas":
    /distintivo de llamada|licencia de estaci|autorizaci[oó]n de radioaficionado/i,
};

const drift = [];
const weakTopic = [];
const forbidden = [];
const offTopic = [];

for (const q of banco) {
  if (isOffTopicForRadioaficionadoExam(q)) offTopic.push(q);

  const c = classifyQuestion({ stem: q.stem, sourcePart: q.part, id: q.id });
  if (c.part !== q.part || c.topicId !== q.topicId) {
    drift.push({ q, c });
  }

  const forbid = TOPIC_FORBID[q.topicId];
  const forbidHit = Array.isArray(forbid) && forbid.some((re) => re.test(q.stem));
  if (forbidHit) forbidden.push(q);

  const must = TOPIC_MUST_HINT[q.topicId];
  if (must && !must.test(q.stem) && !forbidHit) {
    weakTopic.push(q);
  }
}

const base = filterQuestionsForSession(banco);
const poolIssues = [];
for (const p of topics.parts) {
  const partVal = p.id === "p2" ? "2" : "1";
  for (const block of p.blocks) {
    const pool = buildQuestionList(base, partVal, "teorico", block.id, 30);
    const bad = pool.filter((q) => {
      const forbid = TOPIC_FORBID[block.id];
      if (Array.isArray(forbid) && forbid.some((re) => re.test(q.stem))) return true;
      const must = TOPIC_MUST_HINT[block.id];
      if (must && !must.test(q.stem)) return true;
      return q.topicId !== block.id || String(q.part) !== partVal;
    });
    if (bad.length) poolIssues.push({ block: block.id, bad });
  }
}

const lines = [];
lines.push("=== AUDITORÍA PROFUNDA ===");
lines.push(`Preguntas: ${banco.length}`);
lines.push(`Drift almacenado≠clasificador: ${drift.length}`);
lines.push(`Prohibidas en su tema (forbid): ${forbidden.length}`);
lines.push(`Sin señal del tema (weak, puede ser basura): ${weakTopic.length}`);
lines.push(`Fuera examen pero en banco: ${offTopic.length}`);
lines.push(`Pools 30 con sospechosas: ${poolIssues.reduce((n, x) => n + x.bad.length, 0)}`);
lines.push("");

if (forbidden.length) {
  lines.push("--- PROHIBIDAS EN TEMA (prioridad alta) ---");
  for (const q of forbidden.slice(0, 60)) {
    lines.push(`${q.id}\tP${q.part}/${q.topicId}\t${topicTitles.get(q.topicId)}`);
    lines.push(`  ${q.stem.slice(0, 100)}`);
  }
}

if (poolIssues.length) {
  lines.push("");
  lines.push("--- POOLS PRACTICAR (30) con sospechosas ---");
  for (const { block, bad } of poolIssues) {
    lines.push(`\n${block} (${bad.length}/30):`);
    for (const q of bad) {
      lines.push(`  ${q.id}: ${q.stem.slice(0, 85)}`);
    }
  }
}

if (weakTopic.length) {
  lines.push("");
  lines.push(`--- SIN SEÑAL DEL TEMA (${weakTopic.length}, muestra 40) ---`);
  const byTopic = {};
  for (const q of weakTopic) {
    byTopic[q.topicId] = (byTopic[q.topicId] || 0) + 1;
  }
  lines.push("Por tema:", JSON.stringify(byTopic));
  for (const q of weakTopic.slice(0, 40)) {
    lines.push(`${q.id}\t${q.topicId}\t${getRecencyMeta(q.id).tier}\t${q.stem.slice(0, 90)}`);
  }
}

fs.writeFileSync(OUT, lines.join("\n") + "\n", "utf8");
console.log(lines.slice(0, 25).join("\n"));
console.log(`\n… escrito ${OUT}`);
console.log(
  `\nRESUMEN: forbid=${forbidden.length} weak=${weakTopic.length} drift=${drift.length} poolBad=${poolIssues.reduce((n, x) => n + x.bad.length, 0)}`,
);
process.exit(forbidden.length + drift.length + offTopic.length > 0 ? 1 : 0);
