/**
 * Auditoría integral de calidad del banco activo (examen radioaficionado España).
 * Uso: node scripts/audit-banco-quality.mjs [--json]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import questionsBanco from "../data/questions-banco.js";
import topics from "../data/topics.js";
import { classifyQuestion, CODIGO_Q_STEM_RE } from "../lib/question-classification.mjs";
import { isStemCoherentWithTopic, stemForbiddenInTopic } from "../lib/topic-stem-coherence.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { getRecencyMeta, hasObsoleteHint } from "../lib/question-recency.mjs";
import { buildQuestionList } from "../lib/quiz-session.js";
import { filterQuestionsForSession } from "../lib/question-pool.mjs";
import { isExcludedFromRadioaficionadoExam } from "../lib/question-pool.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "banco-quality-audit.txt");
const asJson = process.argv.includes("--json");

/** Contaminación por tema (stem no encaja en el bloque). */
const TOPIC_FORBID = {
  "electricidad-basica": [
    /c[oó]digo\s*["']?\s*q|del\s+c[oó]digo\s*["']?\s*q|\bq(?:rm|rn|sy|rt|sl|th|ro|rp)\b/i,
    /mayday|securit[eé]|señal\s+.*socorro|distintivo|\bindicativo\b|harec|\bcept\b|autorizaci[oó]n de radioaficionado/i,
    /transceptor|superheterodin|mezclador|ley de ohm|control autom[aá]tico de ganancia|vox-man|load knob/i,
    /acceso a internet|\badsl\b|gama de frecuenc|reflexiones lunares|usb.*lsb/i,
  ],
  "magnetismo-ondas": [
    /c[oó]digo\s*["']?\s*q|del\s+c[oó]digo\s*["']?\s*q/i,
    /distintivo|\bindicativo\b|licencia cept|autorizaci[oó]n de radioaficionado/i,
  ],
  "componentes": [
    /c[oó]digo\s*["']?\s*q|distintivo|\bindicativo\b|harec|\bcept\b/i,
  ],
  "receptores-emisores": [
    /distintivo de llamada|licencia cept|autorizaci[oó]n de radioaficionado|marco normativo/i,
  ],
  "antenas-prop": [
    /distintivo|\bindicativo\b|c[oó]digo\s*q|harec/i,
  ],
  "licencias-indicativos": [
    /transceptor|compresi[oó]n de un transceptor|ganancia de radiofrecuencia|superheterodin|ley de ohm\b|mezclador|condensador|volt[ií]metro/i,
  ],
  "marco-normativo": [
    /transceptor|compresi[oó]n de un transceptor|ley de ohm\b|condensador|dipolo.*impedancia/i,
  ],
  "operacion-seguridad": [
    /transceptor|compresi[oó]n de un transceptor|ley de ohm\b|condensador|faradio|henrio/i,
  ],
  "instalaciones": [
    /transceptor|ley de ohm|mezclador|superheterodin/i,
  ],
};

/** Fuera del examen oficial (debería estar excluido). */
const JUNK_STEM_RE =
  /interfaces?\s+ir-29[12]|700\s*mhz|mfcn\b|tetra\b|\bea3rcq\b|accidente de tr[aá]fico|direcci[oó]n de tr[aá]fico|señal de tr[aá]fico|protocolo pas\b|posici[oó]n lateral de seguridad|fin de silencio radio/i;

/** Explicación contradictoria con tema (restos de clasificación errónea). */
const EXPLAIN_MISMATCH = [
  {
    topicId: "electricidad-basica",
    stemRe: CODIGO_Q_STEM_RE,
    explainRe: /ley de ohm|potencia y circuitos/i,
    label: "Q-code en electricidad con explain de Ohm",
  },
  {
    topicId: "magnetismo-ondas",
    stemRe: CODIGO_Q_STEM_RE,
    explainRe: /λ\s*=\s*c\/f|longitud de onda/i,
    label: "Q-code en magnetismo con explain de ondas",
  },
  {
    topicId: "licencias-indicativos",
    stemRe: /transceptor|compresi[oó]n de un transceptor/i,
    explainRe: /.+/,
    label: "técnica RF en licencias",
  },
];

const base = filterQuestionsForSession(questionsBanco);
const issues = [];

function add(severity, code, q, detail = "") {
  issues.push({
    severity,
    code,
    id: q.id,
    part: q.part,
    topicId: q.topicId,
    stem: q.stem.slice(0, 100),
    detail,
  });
}

for (const q of questionsBanco) {
  if (isExcludedFromRadioaficionadoExam(q)) {
    add("error", "in-banco-but-excluded", q, "figura en EXCLUDED_EXAM_IDS");
  }
  if (isOffTopicForRadioaficionadoExam(q)) {
    add("error", "off-topic-exam", q);
  }
  if (JUNK_STEM_RE.test(q.stem) || (q.options || []).some((o) => JUNK_STEM_RE.test(String(o)))) {
    add("error", "junk-content", q);
  }
  if (hasObsoleteHint(q.stem, q.options)) {
    add("warn", "obsolete-hint", q);
  }

  const c = classifyQuestion({ stem: q.stem, sourcePart: q.part, id: q.id });
  if (c.part !== q.part || c.topicId !== q.topicId) {
    add("error", "classification-drift", q, `${q.part}/${q.topicId} → ${c.part}/${c.topicId} (${c.ruleId})`);
  }
  if (c.confidence === "low") {
    add("warn", "low-confidence", q, c.ruleId);
  }

  if (stemForbiddenInTopic(q.stem, q.topicId)) {
    add("error", "topic-contamination", q, q.topicId);
  }
  if (!isStemCoherentWithTopic(q.stem, q.topicId, c)) {
    add("warn", "stem-incoherent", q, c.ruleId);
  }

  for (const m of EXPLAIN_MISMATCH) {
    if (q.topicId === m.topicId && m.stemRe.test(q.stem) && m.explainRe.test(String(q.explain || ""))) {
      add("warn", "explain-mismatch", q, m.label);
    }
  }

  if (String(q.stem).length < 12) add("warn", "stem-too-short", q);
  if (/^QUE ABREVIATURA DEL CODIGO/i.test(q.stem) && q.topicId !== "operacion-seguridad") {
    add("error", "qcode-wrong-topic", q);
  }
}

// Pools Practicar (30 muestras)
for (const part of topics.parts) {
  const partVal = part.id === "p2" ? "2" : "1";
  for (const block of part.blocks) {
    const pool = buildQuestionList(base, partVal, "teorico", block.id, 30);
    if (!pool.length) add("error", "empty-pool", { id: `pool-${block.id}`, part: partVal, topicId: block.id, stem: "" }, block.id);
    const wrong = pool.filter((x) => String(x.part) !== partVal || x.topicId !== block.id);
    for (const q of wrong) add("error", "pool-wrong-meta", q, block.id);
    const forbids = TOPIC_FORBID[block.id];
    if (forbids) {
      for (const q of pool.filter((x) => forbids.some((re) => re.test(x.stem)))) {
        add("error", "pool-contamination", q, block.id);
      }
    }
  }
}

const tierC = questionsBanco.filter((q) => getRecencyMeta(q.id).tier === "C");
const tierCContaminated = tierC.filter((q) => {
  const c = classifyQuestion({ stem: q.stem, sourcePart: q.part, id: q.id });
  return c.part !== q.part || c.topicId !== q.topicId;
});

const byCode = {};
for (const i of issues) {
  byCode[i.code] = (byCode[i.code] || 0) + 1;
}

const errors = issues.filter((i) => i.severity === "error");
const warns = issues.filter((i) => i.severity === "warn");

const lines = [];
const push = (s = "") => lines.push(s);
push("=== Auditoría calidad banco (examen radioaficionado) ===");
push(`Fecha: ${new Date().toISOString().slice(0, 10)}`);
push(`Preguntas activas: ${questionsBanco.length}`);
push(`Errores: ${errors.length} · Avisos: ${warns.length}`);
push(`Tier C (histórico FEDI bloques): ${tierC.length} · Con drift: ${tierCContaminated.length}`);
push("");
push("Resumen por código:");
for (const [k, n] of Object.entries(byCode).sort((a, b) => b[1] - a[1])) {
  push(`  ${n}\t${k}`);
}
push("");
if (errors.length) {
  push("--- ERRORES (no deberían publicarse) ---");
  for (const i of errors.slice(0, 80)) {
    push(`  [${i.code}] ${i.id} P${i.part}/${i.topicId}`);
    push(`    ${i.stem}`);
    if (i.detail) push(`    → ${i.detail}`);
  }
  if (errors.length > 80) push(`  … y ${errors.length - 80} más`);
}
if (warns.length) {
  push("");
  push("--- AVISOS (revisar) ---");
  for (const i of warns.slice(0, 40)) {
    push(`  [${i.code}] ${i.id} ${i.detail || ""}`);
  }
  if (warns.length > 40) push(`  … y ${warns.length - 40} más`);
}

fs.writeFileSync(OUT, `${lines.join("\n")}\n`, "utf8");

if (asJson) {
  console.log(JSON.stringify({ errors: errors.length, warns: warns.length, issues }, null, 2));
} else {
  console.log(lines.join("\n"));
  console.log(`\nEscrito ${OUT}`);
}

if (errors.length) process.exit(1);
process.exit(0);
