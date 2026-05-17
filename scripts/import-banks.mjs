/**
 * Importa bancos públicos de práctica (FEDI-EA y URE) al proyecto.
 *
 * Uso (desde la raíz):
 *   pnpm run import:banks           # FEDI bloques + URE reglamentación
 *   pnpm run import:banks -- --fedi # solo FEDI-EA
 *   pnpm run import:banks -- --ure  # solo URE (electricidad + reglamentación)
 *   pnpm run import:banks -- --dry-run
 *
 * Salida:
 *   data/fediea-bloques.js
 *   data/ure-reglamentacion.js
 *   data/ure-electricidad-extra.js  (preguntas URE parte 1 no duplicadas)
 */
import path from "path";
import { fileURLToPath } from "url";

import questions from "../data/questions.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import fediea2011 from "../data/fediea-2011.js";
import quijotes from "../data/quijotes-ea3rcq.js";
import { fetchFediBlock } from "../lib/parse-fedi-html.mjs";
import { fetchUreQuizPage } from "../lib/parse-ure-quiz.mjs";
import {
  dedupeKey,
  inferTopicId,
  stemNeedsFigure,
  writeQuestionModule,
} from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_FEDI = path.join(ROOT, "data", "fediea-bloques.js");
const OUT_URE_P2 = path.join(ROOT, "data", "ure-reglamentacion.js");
const OUT_URE_P1_EXTRA = path.join(ROOT, "data", "ure-electricidad-extra.js");

/** Bloques FEDI-EA (índice https://fediea.org/examen/ejercicios/) */
const FEDI_BLOCKS = [
  { bloque: "a", part: 1 },
  { bloque: "b", part: 1 },
  { bloque: "c", part: 2 },
  { bloque: "d", part: 1 },
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

const URE_PAGES = [
  {
    url: "https://www.ure.es/examenes/electricidad-y-radioelectricidad/",
    part: 1,
    outKey: "p1",
  },
  {
    url: "https://www.ure.es/examenes/reglamentacion/",
    part: 2,
    outKey: "p2",
  },
];

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const doFedi = args.includes("--fedi") || (!args.includes("--ure") && !args.includes("--fedi"));
const doUre = args.includes("--ure") || (!args.includes("--fedi") && !args.includes("--ure"));

function loadExistingKeys() {
  const all = [...questions, ...propias, ...ure, ...fediea2011, ...quijotes];
  const keys = new Set();
  const ids = new Set();
  for (const q of all) {
    keys.add(dedupeKey(q.stem, q.options));
    ids.add(q.id);
  }
  return { keys, ids };
}

/**
 * @param {object} opts
 */
function tryAddQuestion(opts) {
  const { stem, options, correctIndex, part, sourceLabel, idPrefix, numKey, seenKeys, seenIds, out, stats } =
    opts;

  if (stemNeedsFigure(stem)) {
    stats.skippedFigure += 1;
    return;
  }
  const key = dedupeKey(stem, options);
  if (seenKeys.has(key)) {
    stats.duplicate += 1;
    return;
  }
  const id = `${idPrefix}-${numKey}`;
  if (seenIds.has(id)) {
    stats.duplicateId += 1;
    return;
  }
  seenKeys.add(key);
  seenIds.add(id);
  out.push({
    id,
    part,
    topicId: inferTopicId(stem, part),
    stem,
    options,
    correctIndex,
    explain: `Práctica histórica (${sourceLabel.replace(/\.$/, "")}). Puede contener erratas u obsolescencia; contrastar con BOE y convocatoria vigente.`,
  });
  stats.added += 1;
}

async function importFedi(seenKeys, seenIds) {
  const out = [];
  const stats = { added: 0, duplicate: 0, duplicateId: 0, skippedFigure: 0, skippedNoAnswer: 0, fetched: 0 };

  for (const block of FEDI_BLOCKS) {
    process.stderr.write(`FEDI bloque ${block.bloque}…\n`);
    let data;
    try {
      data = await fetchFediBlock(block.bloque, { delayMs: 60 });
    } catch (e) {
      process.stderr.write(`  error: ${e.message}\n`);
      continue;
    }
    const label = block.exam
      ? `Fuente: FEDI-EA examen ${block.exam} (bloque ${block.bloque}).`
      : `Fuente: FEDI-EA bloque ${block.bloque}.`;

    for (const [num, q] of data.questions) {
      stats.fetched += 1;
      const correctIndex = data.correct.get(num);
      if (correctIndex === undefined || correctIndex < 0 || correctIndex >= q.options.length) {
        stats.skippedNoAnswer += 1;
        continue;
      }
      if (stemNeedsFigure(`${q.rawChunk || ""} ${q.stem}`)) {
        stats.skippedFigure += 1;
        continue;
      }
      tryAddQuestion({
        stem: q.stem,
        options: q.options,
        correctIndex,
        part: block.part,
        sourceLabel: label,
        idPrefix: `fedi-${block.bloque}`,
        numKey: num,
        seenKeys,
        seenIds,
        out,
        stats,
      });
    }
  }
  return { out, stats };
}

async function importUre(seenKeys, seenIds) {
  const p1 = [];
  const p2 = [];
  const stats = { added: 0, duplicate: 0, duplicateId: 0, skippedFigure: 0, fetched: 0 };

  for (const page of URE_PAGES) {
    process.stderr.write(`URE parte ${page.part}…\n`);
    const items = await fetchUreQuizPage(page.url, page.part);
    const label = `Fuente: URE (${page.part === 1 ? "electricidad y radioelectricidad" : "reglamentación"}).`;
    const out = page.part === 1 ? p1 : p2;
    const idPrefix = page.part === 1 ? "ure-p1x" : "ure-p2";

    for (const q of items) {
      stats.fetched += 1;
      const numKey = String(q.index).padStart(2, "0");
      tryAddQuestion({
        stem: q.stem,
        options: q.options,
        correctIndex: q.correctIndex,
        part: page.part,
        sourceLabel: label,
        idPrefix,
        numKey,
        seenKeys,
        seenIds,
        out,
        stats,
      });
    }
  }
  return { p1, p2, stats };
}

async function main() {
  const { keys: seenKeys, ids: seenIds } = loadExistingKeys();
  const report = { fedi: null, ure: null };

  if (doFedi) {
    const { out, stats } = await importFedi(seenKeys, seenIds);
    report.fedi = stats;
    process.stderr.write(
      `FEDI: ${stats.added} nuevas, ${stats.duplicate} duplicadas, ${stats.skippedFigure} con figura omitidas, ${stats.skippedNoAnswer} sin respuesta, ${stats.fetched} leídas.\n`,
    );
    if (!dryRun) {
      writeQuestionModule(
        OUT_FEDI,
        "FEDI-EA — bloques históricos de práctica (001-592 y exámenes 2007-2011).\nÍndice: https://fediea.org/examen/ejercicios/\nAdvertencia FEDI: pueden contener fallos u obsolescencia.",
        out,
      );
      process.stderr.write(`Escrito ${OUT_FEDI} (${out.length} preguntas).\n`);
    }
  }

  if (doUre) {
    const { p1, p2, stats } = await importUre(seenKeys, seenIds);
    report.ure = stats;
    process.stderr.write(
      `URE: ${stats.added} nuevas, ${stats.duplicate} duplicadas, ${stats.skippedFigure} omitidas, ${stats.fetched} leídas.\n`,
    );
    if (!dryRun) {
      writeQuestionModule(
        OUT_URE_P2,
        "URE — prueba de Reglamentación (web pública).\nhttps://www.ure.es/examenes/reglamentacion/",
        p2,
      );
      writeQuestionModule(
        OUT_URE_P1_EXTRA,
        "URE — electricidad y radioelectricidad adicionales (no presentes en ure-electricidad.js).\nhttps://www.ure.es/examenes/electricidad-y-radioelectricidad/",
        p1,
      );
      process.stderr.write(`Escrito ${OUT_URE_P2} (${p2.length}), ${OUT_URE_P1_EXTRA} (${p1.length}).\n`);
    }
  }

  if (dryRun) {
    process.stderr.write("Modo --dry-run: no se escribieron archivos.\n");
  } else {
    process.stderr.write("\nSiguiente paso: pnpm run verify:all\n");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
