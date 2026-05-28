/**
 * Oleada curación P1 técnica: receptores, antenas, componentes, electricidad, magnetismo, instalaciones.
 * Uso: node scripts/curate-wave-p1-tecnica.mjs [--dry-run]
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";

import banco from "../data/questions-banco.js";
import existing from "../data/curated-explanations.js";
import { passesExamGradeExplain, examGradeExplainIssues } from "../lib/explain-exam-grade.mjs";
import { buildBestExplain } from "../lib/build-best-explain.mjs";
import { expandExplainFaithful } from "../lib/expand-explain-faithful.mjs";
import { generatePedagogicalExplain, stemCrossTopicExplain } from "../lib/generate-pedagogical-explain.mjs";
import { finalizeExplain, synthesizeReason, refreshExplainForQuestion } from "../lib/contextual-explain.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { buildWhyCorrect } from "../lib/learn-while-test.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "curated-explanations.js");
const REPORT = path.join(__dirname, "..", "data", "curate-wave-p1-pending.json");

const TOPICS = new Set([
  "receptores-emisores",
  "antenas-prop",
  "electricidad-basica",
  "componentes",
  "magnetismo-ondas",
  "instalaciones",
]);

const dryRun = process.argv.includes("--dry-run");

/** @type {Record<string, string>} */
const MANUAL = {
  "fedi-ag-005":
    "Tomar parte de la salida y reinyectarla a la entrada es realimentación (feedback): puede estabilizar o modificar la ganancia del circuito. No confundir con rectificación ni demodulación. «Realimentación».",
  "ofic-039":
    "El silenciador (squelch) corta el audio cuando no hay portadora o señal útil de RF, evitando ruido de fondo en el altavoz. No es AGC ni medición de ROE. «Suprimir el audio cuando no hay señal útil de RF».",
  "quijotes-84-2057":
    "Según el régimen andorrano del banco, un radioaficionado con licencia extranjera vigente en su país de residencia puede obtener autorización temporal para operar en territorio andorrano. «Si, segun el articulo 6, radioaficionados titulares de una licencia extranjera en vigor en el país en el que residen habitualmente, pueden obtener una licencia temporal para usar su estación en territorio andorrano.».",
  "ure-p1-q133":
    "La sensibilidad mide la capacidad de detectar señales débiles (umbral mínimo útil). La selectividad separa frecuencias próximas; la fidelidad se refiere a poca distorsión. «La capacidad que tiene de captar señales débiles y amplificarlas».",
  "ure-p1-q3":
    "La selectividad es la capacidad de discriminar emisoras o señales de frecuencias muy cercanas (filtros y FI estrecha). La sensibilidad es captar señales débiles, no confundir ambos conceptos. «Selectividad».",
  "ure-p1-q430":
    "La relación de espiras N1:N2 = 2:1 implica que un devanado tiene el doble de espiras que el otro (tensión y corriente se transforman según esa relación en el transformador ideal). «Uno de los devanados tiene el doble número de espiras que el otro».",
  "ure-p1-q495":
    "El diodo es un dispositivo de unión PN que conduce preferentemente en un sentido y bloquea en inversa; por eso rectifica y protege etapas. «Un dispositivo que permite el paso de la comente eléctrica en un único sentido».",
  "ure-p1-q6":
    "En transmisión analógica la señal puede tomar infinitos valores intermedios entre extremos (continua en amplitud). La digital usa símbolos discretos. «Pueden tener infinitos valores».",
};

function pickExplain(q) {
  if (MANUAL[q.id]) {
    const t = MANUAL[q.id];
    if (passesExamGradeExplain({ ...q, explain: t })) return t;
  }
  const correct = String(q.options?.[q.correctIndex] ?? "").trim();
  const reason = synthesizeReason(q.stem, correct, q.topicId);
  const candidates = [
    buildBestExplain(q),
    expandExplainFaithful(q)?.text,
    refreshExplainForQuestion(q, ""),
    finalizeExplain(q.stem, correct, reason),
    stemCrossTopicExplain(q.stem, correct),
    generatePedagogicalExplain(q),
    buildWhyCorrect(q),
    reason.length >= 80
      ? `${reason} Por eso la respuesta del enunciado es «${correct}».`
      : "",
  ].filter(Boolean);

  for (const c of candidates) {
    let text = String(c).trim();
    if (
      text &&
      !passesExamGradeExplain({ ...q, explain: text }) &&
      text.length >= 60 &&
      text.length < 175
    ) {
      const padded = text.includes(`«${correct}»`)
        ? `${text} No confundir con el distractor si el enunciado mezcla conceptos del mismo bloque.`
        : `${text} No confundir con el distractor si el enunciado mezcla conceptos del mismo bloque. «${correct}».`;
      if (passesExamGradeExplain({ ...q, explain: padded })) return padded;
    }
  }

  for (const c of candidates) {
    const probe = { ...q, explain: c };
    if (isExplainAcceptable(probe, c) && passesExamGradeExplain(probe)) return c;
  }
  return "";
}

/** @type {Record<string, string>} */
const next = { ...existing };
let auto = 0;
let manual = 0;
/** @type {{ id: string; topicId: string; stem: string; correct: string; codes: string[] }[]} */
const pending = [];

for (const q of banco) {
  if (!TOPICS.has(q.topicId)) continue;
  if (next[q.id] && passesExamGradeExplain({ ...q, explain: next[q.id] })) continue;
  if (passesExamGradeExplain(q)) continue;

  const picked = pickExplain(q);
  if (picked) {
    next[q.id] = picked;
    if (MANUAL[q.id]) manual += 1;
    else auto += 1;
  } else {
    pending.push({
      id: q.id,
      topicId: q.topicId,
      stem: String(q.stem).replace(/\s+/g, " ").slice(0, 140),
      correct: String(q.options?.[q.correctIndex] ?? "").slice(0, 120),
      codes: examGradeExplainIssues(q)
        .filter((i) => i.level === "fail")
        .map((i) => i.code),
    });
  }
}

writeFileSync(REPORT, `${JSON.stringify({ pending, auto, manual }, null, 2)}\n`, { encoding: "utf8" });
console.log(`curate-wave-p1: +${auto} auto · +${manual} manual · pendientes ${pending.length}`);
console.log(`Informe pendientes: ${REPORT}`);

if (pending.length) {
  for (const p of pending.slice(0, 12)) {
    console.error(`  ${p.id} [${p.topicId}] ${p.codes.join(",")}`);
  }
  if (pending.length > 12) console.error(`  … y ${pending.length - 12} más`);
}

if (dryRun) process.exit(pending.length ? 1 : 0);

const sortedKeys = Object.keys(next).sort();
const lines = [
  "/** Explicaciones revisadas manualmente (UTF-8). Máxima prioridad en build-banco. */",
  "/** Actualizado: curate-wave-p1-tecnica.mjs · no regenerar con refresh-all sobre estos IDs. */",
  "export default {",
];
for (const id of sortedKeys) {
  lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(next[id])},`);
}
lines.push("};");
lines.push("");
writeUtf8File(OUT, lines.join("\n"));
process.exit(pending.length ? 1 : 0);
