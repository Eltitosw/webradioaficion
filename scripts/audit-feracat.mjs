/**
 * Audita https://www.feracat.org/examen/ejercicios/ frente al banco ya importado
 * (FEDI-EA, URE, Quijotes, cribado) para detectar preguntas nuevas sin duplicar.
 *
 *   node scripts/audit-feracat.mjs
 *   node scripts/audit-feracat.mjs --bloque=a
 *   node scripts/audit-feracat.mjs --sample=30   # solo N candidatos nuevos en detalle
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import questions from "../data/questions.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import fedi2011 from "../data/fediea-2011.js";
import fediBloques from "../data/fediea-bloques.js";
import quijotes from "../data/quijotes-ea3rcq.js";
import banco from "../data/questions-banco.js";
import { fetchFeracatBlock } from "../lib/parse-fedi-html.mjs";
import { dedupeKey, stemNeedsFigure } from "../lib/import-question-utils.mjs";
import { areParaphraseDuplicates } from "../lib/question-paraphrase.mjs";
import { hasObsoleteHint } from "../lib/question-recency.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REPORT = path.join(ROOT, "data", "feracat-audit-report.txt");
const JSON_OUT = path.join(ROOT, "data", "feracat-audit.json");

/** Misma lista que import-banks / índice FeRaCat. */
const FERACAT_BLOCKS = [
  { bloque: "a", part: 1, label: "Bloque A 001-121" },
  { bloque: "b", part: 1, label: "Bloque B 157-311" },
  { bloque: "c", part: 2, label: "Bloque C 331-397" },
  { bloque: "d", part: 1, label: "Bloque D 401-592" },
  { bloque: "e", part: 1, exam: "17/2/2007" },
  { bloque: "f", part: 2, exam: "17/2/2007" },
  { bloque: "g", part: 1, exam: "26/5/2007" },
  { bloque: "h", part: 2, exam: "26/5/2007" },
  { bloque: "i", part: 1, exam: "27/10/2007" },
  { bloque: "j", part: 2, exam: "27/10/2007" },
  { bloque: "k", part: 1, exam: "24/5/2008" },
  { bloque: "l", part: 2, exam: "24/5/2008" },
  { bloque: "m", part: 1, exam: "15/11/2008" },
  { bloque: "n", part: 2, exam: "15/11/2008" },
  { bloque: "o", part: 1, exam: "23/5/2009" },
  { bloque: "p", part: 2, exam: "23/5/2009" },
  { bloque: "s", part: 1, exam: "17/10/2009" },
  { bloque: "t", part: 2, exam: "17/10/2009" },
  { bloque: "w", part: 1, exam: "8/5/2010" },
  { bloque: "x", part: 2, exam: "8/5/2010" },
  { bloque: "aa", part: 1, exam: "23/10/2010" },
  { bloque: "ab", part: 2, exam: "23/10/2010" },
  { bloque: "ag", part: 1, exam: "22/10/2011" },
  { bloque: "ah", part: 2, exam: "22/10/2011" },
];

const args = process.argv.slice(2);
const onlyBloque = args.find((a) => a.startsWith("--bloque="))?.split("=")[1];
const sampleN = Number.parseInt(args.find((a) => a.startsWith("--sample="))?.split("=")[1] || "0", 10);

function loadCorpus() {
  const all = [
    ...questions,
    ...propias,
    ...ure,
    ...ureExtra,
    ...ureReg,
    ...fedi2011,
    ...fediBloques,
    ...quijotes,
    ...banco,
  ];
  /** @type {Map<string, { id: string, part?: number }>} */
  const byKey = new Map();
  /** @type {Map<string, object>} */
  const fediById = new Map();
  /** Parafraseo solo frente a fuentes ya publicadas (no todo FEDI: FeRaCat ≈ FEDI). */
  const forParaphrase = [];

  for (const q of all) {
    if (!q?.stem || !q?.options?.length) continue;
    const key = dedupeKey(q.stem, q.options);
    if (!byKey.has(key)) byKey.set(key, { id: q.id, part: q.part });
    if (q.id?.startsWith("fedi-")) fediById.set(q.id, q);
  }
  for (const q of [...banco, ...ure, ...ureReg, ...quijotes, ...fedi2011]) {
    if (q?.stem && q?.options?.length) forParaphrase.push(q);
  }
  return { byKey, fediById, forParaphrase };
}

/**
 * @param {object} q
 * @param {object} corpus
 */
function classifyItem(q, corpus) {
  const fake = { id: `feracat-${q.bloque}-${q.num}`, stem: q.stem, options: q.options };
  if (stemNeedsFigure(`${q.rawChunk || ""} ${q.stem}`)) return "needs_figure";
  if (isOffTopicForRadioaficionadoExam(fake)) return "off_topic";
  if (hasObsoleteHint(q.stem, q.options)) return "obsolete";
  if (q.correctIndex === undefined) return "no_answer";

  const key = dedupeKey(q.stem, q.options);
  const fediId = `fedi-${q.bloque}-${q.num}`;
  const localFedi = corpus.fediById.get(fediId);
  if (localFedi && dedupeKey(localFedi.stem, localFedi.options) === key) {
    return "already_fedi_local";
  }
  if (localFedi) return "differs_from_local_fedi";

  const hit = corpus.byKey.get(key);
  if (hit) return hit.id.startsWith("fedi-") ? "dup_other_fedi" : "dup_banco";

  const probe = { stem: q.stem, options: q.options };
  for (const existing of corpus.forParaphrase) {
    if (areParaphraseDuplicates(probe, existing)) {
      return "dup_paraphrase";
    }
  }
  return "usable_new";
}

async function main() {
  const corpus = loadCorpus();
  const blocks = onlyBloque
    ? FERACAT_BLOCKS.filter((b) => b.bloque === onlyBloque)
    : FERACAT_BLOCKS;

  const totals = {
    fetched: 0,
    already_fedi_local: 0,
    differs_from_local_fedi: 0,
    dup_other_fedi: 0,
    dup_banco: 0,
    dup_paraphrase: 0,
    usable_new: 0,
    obsolete: 0,
    needs_figure: 0,
    off_topic: 0,
    no_answer: 0,
    errors: 0,
  };
  /** @type {object[]} */
  const usableNew = [];
  /** @type {object[]} */
  const differs = [];

  for (const block of blocks) {
    process.stderr.write(`FeRaCat bloque ${block.bloque}…\n`);
    let data;
    try {
      data = await fetchFeracatBlock(block.bloque, { delayMs: 50 });
    } catch (e) {
      process.stderr.write(`  error: ${e.message}\n`);
      totals.errors += 1;
      continue;
    }

    for (const [num, raw] of data.questions) {
      totals.fetched += 1;
      const correctIndex = data.correct.get(num);
      const item = {
        bloque: block.bloque,
        part: block.part,
        num,
        stem: raw.stem,
        options: raw.options,
        correctIndex,
        rawChunk: raw.rawChunk,
      };
      const status = classifyItem(item, corpus);
      totals[status] = (totals[status] || 0) + 1;

      if (status === "usable_new") {
        usableNew.push({
          id: `feracat-${block.bloque}-${num}`,
          part: block.part,
          stem: raw.stem.slice(0, 120),
          bloque: block.bloque,
          num,
        });
      }
      if (status === "differs_from_local_fedi") {
        const local = corpus.fediById.get(`fedi-${block.bloque}-${num}`);
        differs.push({
          id: `fedi-${block.bloque}-${num}`,
          feracatStem: raw.stem.slice(0, 100),
          localStem: local?.stem?.slice(0, 100),
        });
      }
    }
  }

  const lines = [
    "=== Auditoría FeRaCat vs banco local ===",
    `Fuente: https://www.feracat.org/examen/ejercicios/`,
    `Corpus local: ${corpus.byKey.size} enunciados únicos (exactos)`,
    "",
    "Resumen por pregunta:",
    `  Total en FeRaCat:        ${totals.fetched}`,
    `  Ya en fedi-{bloque}-N:   ${totals.already_fedi_local} (mismo texto, importado vía fediea.org)`,
    `  Duplicado otro FEDI:     ${totals.dup_other_fedi}`,
    `  Duplicado banco (exact): ${totals.dup_banco}`,
    `  Duplicado parafraseo:    ${totals.dup_paraphrase}`,
    `  Obsoleta (JPIT/SET…):    ${totals.obsolete}`,
    `  Requiere figura:         ${totals.needs_figure}`,
    `  Fuera de examen:         ${totals.off_topic}`,
    `  Sin respuesta OK:        ${totals.no_answer}`,
    `  Texto distinto a local:  ${totals.differs_from_local_fedi}`,
    `  NUEVAS aprovechables:    ${totals.usable_new}`,
    `  Errores de red:          ${totals.errors}`,
    "",
  ];

  if (usableNew.length) {
    lines.push("--- Candidatas nuevas (muestra) ---");
    const show = sampleN > 0 ? usableNew.slice(0, sampleN) : usableNew.slice(0, 40);
    for (const u of show) {
      lines.push(`  ${u.id} [P${u.part}] ${u.stem}`);
    }
    if (usableNew.length > show.length) {
      lines.push(`  … y ${usableNew.length - show.length} más (ver feracat-audit.json)`);
    }
  }

  if (differs.length) {
    lines.push("", "--- Mismo nº FEDI pero texto distinto FeRaCat vs local ---");
    for (const d of differs.slice(0, 15)) {
      lines.push(`  ${d.id}`);
      lines.push(`    FeRaCat: ${d.feracatStem}`);
      lines.push(`    Local:   ${d.localStem}`);
    }
  }

  const report = lines.join("\n");
  writeUtf8File(REPORT, `${report}\n`);
  writeUtf8File(
    JSON_OUT,
    `${JSON.stringify({ totals, usableNew, differs }, null, 2)}\n`,
  );
  console.log(report);
  process.stderr.write(`\nEscrito ${REPORT}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
