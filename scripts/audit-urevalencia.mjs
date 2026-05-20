/**
 * Audita https://www.urevalencia.es/tests.php frente al banco local.
 * Muestrea preguntas por tema (sin login) y detecta duplicados / valor añadido.
 *
 *   node scripts/audit-urevalencia.mjs
 *   node scripts/audit-urevalencia.mjs --max=5   # menos preguntas por tema
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import { readResponseText } from "../lib/http-text.mjs";
import { cleanStem, dedupeKey } from "../lib/import-question-utils.mjs";
import { repairSpanishText } from "../lib/text-encoding.mjs";
import { areParaphraseDuplicates } from "../lib/question-paraphrase.mjs";
import { hasObsoleteHint, isNormativelyUnacceptableQuestion } from "../lib/question-recency.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "urevalencia-audit.json");
const REPORT = path.join(ROOT, "data", "urevalencia-audit-report.txt");

const BASE = "https://www.urevalencia.es/tests.php";
const maxPerTopic = Number.parseInt(
  process.argv.find((a) => a.startsWith("--max="))?.split("=")[1] || "12",
  10,
);

/** tema[id] → part, topicId aproximado */
const TOPICS = [
  { test: "tema[10]", part: 1, topicId: "electricidad-basica", label: "I-1" },
  { test: "tema[11]", part: 1, topicId: "componentes", label: "I-2" },
  { test: "tema[12]", part: 1, topicId: "componentes", label: "I-3" },
  { test: "tema[13]", part: 1, topicId: "receptores-emisores", label: "I-4" },
  { test: "tema[14]", part: 1, topicId: "receptores-emisores", label: "I-5" },
  { test: "tema[15]", part: 1, topicId: "antenas-prop", label: "I-6" },
  { test: "tema[16]", part: 1, topicId: "antenas-prop", label: "I-7" },
  { test: "tema[2]", part: 2, topicId: "operacion-seguridad", label: "II-2" },
  { test: "tema[5]", part: 2, topicId: "licencias-indicativos", label: "II-5" },
  { test: "tema[8]", part: 2, topicId: "marco-normativo", label: "II-8" },
];

/**
 * @param {string} html
 */
function parseUrevQuestion(html) {
  const preguntaId = html.match(/name="pregunta"[^>]*value="(\d+)"/)?.[1];
  const h2 = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1];
  if (!h2) return null;
  const stem = cleanStem(h2.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));

  /** @type {{ id: string, text: string, wrongHint: string }[]} */
  const options = [];
  const optRe =
    /<input type="radio" name="respuesta" value="(\d+)"[^>]*>[\s\S]*?<label[^>]*>([\s\S]*?)<\/label>[\s\S]*?<div class="motivo_incorrecta">([\s\S]*?)<\/div>/gi;
  let m;
  while ((m = optRe.exec(html)) !== null) {
    const text = cleanStem(m[2].replace(/<[^>]+>/g, " "));
    const wrongHint = cleanStem(m[3].replace(/<[^>]+>/g, " "));
    options.push({ id: m[1], text, wrongHint });
  }
  if (options.length < 2) return null;

  const correctId = html.match(/\.val\(\)\s*!=\s*(\d+)/)?.[1];
  let correctIndex = options.findIndex((o) => o.id === correctId);
  if (correctIndex < 0) {
    correctIndex = options.findIndex((o) => !o.wrongHint || o.wrongHint === "Incorrecta. Motivo:");
  }

  const libro = html.match(/libro[^<]{0,80}p[aá]gina\s*(\d+)/i)?.[1];
  const examDate = html.match(/(\d{1,2}\/\d{1,2}\/\d{4})/)?.[1];

  return {
    preguntaId,
    stem,
    optionRows: options,
    options: options.map((o) => o.text),
    wrongHints: options.map((o) => o.wrongHint),
    correctIndex: correctIndex >= 0 ? correctIndex : 0,
    correctOptionId: correctId || options[correctIndex >= 0 ? correctIndex : 0]?.id,
    libroPage: libro || null,
    examDate: examDate || null,
  };
}

async function fetchHtml(body, cookie) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "radioexam-audit/1.0",
      Cookie: cookie || "",
    },
    body,
    redirect: "follow",
  });
  const setCookie = res.headers.getSetCookie?.() || [];
  const newCookie = setCookie.map((c) => c.split(";")[0]).join("; ");
  const html = await readResponseText(res);
  return { html, cookie: newCookie || cookie };
}

/**
 * @param {ReturnType<typeof parseUrevQuestion>} q
 * @param {Map<string, object>} corpus
 */
function classify(q, corpus) {
  if (!q) return "parse_fail";
  const fake = { stem: q.stem, options: q.options, correctIndex: q.correctIndex };
  if (isNormativelyUnacceptableQuestion(fake)) return "obsolete";
  const key = dedupeKey(q.stem, q.options);
  const hit = corpus.get(key);
  if (hit) return `dup:${hit.id}`;
  for (const existing of corpus.values()) {
    if (areParaphraseDuplicates(fake, existing)) return `paraphrase:${existing.id}`;
  }
  return "new";
}

async function harvestTopic(topic, corpus) {
  const startBody = `test=${encodeURIComponent(topic.test)}&comenzar=Comenzar`;
  let cookie = "";
  let { html, cookie: c1 } = await fetchHtml(startBody, cookie);
  cookie = c1 || cookie;

  /** @type {object[]} */
  const collected = [];
  const seenStem = new Set();

  for (let i = 0; i < maxPerTopic; i++) {
    const q = parseUrevQuestion(html);
    if (!q) break;
    const key = dedupeKey(q.stem, q.options);
    if (seenStem.has(key)) break;
    seenStem.add(key);
    collected.push({ ...q, topic: topic.label, part: topic.part, topicId: topic.topicId });

    const correctId = q.correctOptionId || q.optionRows[q.correctIndex]?.id;

    const body = new URLSearchParams({
      respuesta_primera: "0",
      salta_pregunta: "F",
      pregunta: q.preguntaId || "",
      respuesta: correctId || "",
    }).toString();

    const next = await fetchHtml(body, cookie);
    cookie = next.cookie || cookie;
    html = next.html;
    if (!parseUrevQuestion(html)) break;
  }

  return collected;
}

function loadCorpus() {
  const byKey = new Map();
  for (const q of banco) {
    if (q?.stem && q?.options?.length) {
      byKey.set(dedupeKey(q.stem, q.options), q);
    }
  }
  return byKey;
}

async function main() {
  const corpus = loadCorpus();
  const totals = {
    fetched: 0,
    new: 0,
    dup: 0,
    paraphrase: 0,
    obsolete: 0,
    withWrongHints: 0,
    withLibro: 0,
    withExamDate: 0,
  };
  /** @type {object[]} */
  const samples = [];
  /** @type {object[]} */
  const newOnes = [];

  for (const topic of TOPICS) {
    process.stderr.write(`UREV ${topic.label}…\n`);
    let items;
    try {
      items = await harvestTopic(topic, corpus);
    } catch (e) {
      process.stderr.write(`  error: ${e.message}\n`);
      continue;
    }
    for (const item of items) {
      totals.fetched += 1;
      const status = classify(item, corpus);
      if (status === "new") {
        totals.new += 1;
        newOnes.push(item);
      } else if (status.startsWith("dup:")) totals.dup += 1;
      else if (status.startsWith("paraphrase:")) totals.paraphrase += 1;
      else if (status === "obsolete") totals.obsolete += 1;
      if (item.wrongHints.some((h) => h.length > 20)) totals.withWrongHints += 1;
      if (item.libroPage) totals.withLibro += 1;
      if (item.examDate) totals.withExamDate += 1;
      samples.push({ ...item, status });
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  const lines = [
    "=== Auditoría URE Valencia (urevalencia.es/tests.php) ===",
    `Banco local: ${banco.length} preguntas · ${corpus.size} enunciados únicos`,
    `Muestra: ${maxPerTopic} preguntas/tema · ${TOPICS.length} temas`,
    "",
    `Preguntas obtenidas:     ${totals.fetched}`,
    `Nuevas (no en banco):    ${totals.new}`,
    `Duplicadas exactas:      ${totals.dup}`,
    `Parafraseadas:           ${totals.paraphrase}`,
    `Obsoletas:               ${totals.obsolete}`,
    `Con motivo incorrecta:   ${totals.withWrongHints}`,
    `Con página libro URE:    ${totals.withLibro}`,
    `Con fecha de examen:     ${totals.withExamDate}`,
    "",
  ];

  if (newOnes.length) {
    lines.push("--- Muestra nuevas (primeras 20) ---");
    for (const n of newOnes.slice(0, 20)) {
      lines.push(`  [${n.topic}] ${n.stem.slice(0, 90)}`);
      lines.push(`    Correcta: ${n.options[n.correctIndex]?.slice(0, 70)}`);
    }
  }

  const report = lines.join("\n");
  writeUtf8File(REPORT, `${report}\n`);
  writeUtf8File(OUT, `${JSON.stringify({ totals, samples, newOnes }, null, 2)}\n`);
  console.log(report);
  process.stderr.write(`\nEscrito ${REPORT}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
