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
 *   data/ure-electricidad.js  (pool completo parte 1, ids ure-p1-q{sourceId})
 *   data/ure-electricidad-extra.js  (vacío; legado)
 */
import path from "path";
import { fileURLToPath } from "url";

import questions from "../data/questions.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import fediea2011 from "../data/fediea-2011.js";
import fediBloquesExisting from "../data/fediea-bloques.js";
import quijotes from "../data/quijotes-ea3rcq.js";
import { fetchFediBlock } from "../lib/parse-fedi-html.mjs";
import { fetchUreQuizPool } from "../lib/parse-ure-quiz.mjs";
import {
  dedupeKey,
  classifyQuestion,
  stemNeedsFigure,
  writeQuestionModule,
} from "../lib/import-question-utils.mjs";
import { isTemplateOnlyExplain } from "../lib/explain-quality.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { hasObsoleteHint } from "../lib/question-recency.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_FEDI = path.join(ROOT, "data", "fediea-bloques.js");
const OUT_URE_P1 = path.join(ROOT, "data", "ure-electricidad.js");
const OUT_URE_P2 = path.join(ROOT, "data", "ure-reglamentacion.js");
const OUT_URE_P1_EXTRA = path.join(ROOT, "data", "ure-electricidad-extra.js");

const DEFAULT_URE_ROUNDS = 25;

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
const ureRoundsArg = args.find((a) => a.startsWith("--ure-rounds="));
const ureRounds = ureRoundsArg
  ? Math.max(5, Math.min(50, Number.parseInt(ureRoundsArg.split("=")[1], 10) || DEFAULT_URE_ROUNDS))
  : DEFAULT_URE_ROUNDS;

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
  const classified = classifyQuestion({ stem, sourcePart: part, id });
  out.push({
    id,
    part: classified.part,
    topicId: classified.topicId,
    stem,
    options,
    correctIndex,
    explain: `Práctica histórica (${sourceLabel.replace(/\.$/, "")}). Puede contener erratas u obsolescencia; contrastar con BOE y convocatoria vigente.`,
  });
  stats.added += 1;
}

async function importFedi(seenIds) {
  /** Dedupe solo dentro del archivo FEDI (no frente a Quijotes/URE). */
  const fediKeys = new Set();
  const byId = new Map();
  for (const q of fediBloquesExisting) {
    if (!q?.id) continue;
    fediKeys.add(dedupeKey(q.stem, q.options));
    byId.set(q.id, q);
    seenIds.add(q.id);
  }

  const stats = {
    added: 0,
    duplicate: 0,
    duplicateId: 0,
    skippedFigure: 0,
    skippedNoAnswer: 0,
    fetched: 0,
    keptExisting: byId.size,
  };

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
      const batch = [];
      tryAddQuestion({
        stem: q.stem,
        options: q.options,
        correctIndex,
        part: block.part,
        sourceLabel: label,
        idPrefix: `fedi-${block.bloque}`,
        numKey: num,
        seenKeys: fediKeys,
        seenIds,
        out: batch,
        stats,
      });
      for (const item of batch) byId.set(item.id, item);
    }
  }

  const out = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  return { out, stats };
}

/** Conserva explicaciones ya curadas al reimportar por id estable ure-p1-q{sourceId}. */
function loadExistingUreByStem() {
  /** @type {Map<string, { explain?: string; stemFigure?: string; stemFigureAlt?: string }>} */
  const byStem = new Map();
  for (const q of [...ure, ...ureExtra, ...ureReg]) {
    if (!q?.stem) continue;
    const key = dedupeKey(q.stem, q.options);
    const prev = byStem.get(key);
    const exp = typeof q.explain === "string" ? q.explain.trim() : "";
    const keep =
      exp && !isTemplateOnlyExplain(exp)
        ? { explain: exp, stemFigure: q.stemFigure, stemFigureAlt: q.stemFigureAlt }
        : prev;
    if (keep) byStem.set(key, keep);
  }
  return byStem;
}

async function importUre() {
  const byStem = loadExistingUreByStem();
  /** @type {object[]} */
  const p1 = [];
  /** @type {object[]} */
  const p2 = [];
  const stats = {
    rounds: ureRounds,
    poolP1: 0,
    poolP2: 0,
    writtenP1: 0,
    writtenP2: 0,
    skippedFigure: 0,
    keptExplain: 0,
  };

  for (const page of URE_PAGES) {
    process.stderr.write(
      `URE parte ${page.part} (${ureRounds} cargas aleatorias del pool)…\n`,
    );
    const pool = await fetchUreQuizPool(page.url, page.part, { rounds: ureRounds });
    const label = `Fuente: URE (${page.part === 1 ? "electricidad y radioelectricidad" : "reglamentación"}).`;
    const out = page.part === 1 ? p1 : p2;
    const idPrefix = page.part === 1 ? "ure-p1-q" : "ure-p2-q";

    if (page.part === 1) stats.poolP1 = pool.length;
    else stats.poolP2 = pool.length;

    for (const q of pool) {
      const id = `${idPrefix}${q.sourceId}`;
      const probe = { id, stem: q.stem, options: q.options };
      if (isOffTopicForRadioaficionadoExam(probe)) {
        stats.skippedOffTopic = (stats.skippedOffTopic || 0) + 1;
        continue;
      }
      if (hasObsoleteHint(q.stem, q.options)) {
        stats.skippedObsolete = (stats.skippedObsolete || 0) + 1;
        continue;
      }
      if (stemNeedsFigure(q.stem) && !(q.imageUrls?.length > 0)) {
        stats.skippedFigure += 1;
        continue;
      }
      const classified = classifyQuestion({ stem: q.stem, sourcePart: page.part, id });
      const key = dedupeKey(q.stem, q.options);
      const prev = byStem.get(key);
      const explain =
        prev?.explain ||
        `Práctica histórica (${label.replace(/\.$/, "")}). Puede contener erratas u obsolescencia; contrastar con BOE y convocatoria vigente.`;
      if (prev?.explain) stats.keptExplain += 1;

      /** @type {Record<string, unknown>} */
      const item = {
        id,
        part: classified.part,
        topicId: classified.topicId,
        stem: q.stem,
        options: q.options,
        correctIndex: q.correctIndex,
        explain,
      };
      if (prev?.stemFigure) {
        item.stemFigure = prev.stemFigure;
        if (prev.stemFigureAlt) item.stemFigureAlt = prev.stemFigureAlt;
      }
      out.push(item);
    }
  }

  p1.sort((a, b) => a.id.localeCompare(b.id));
  p2.sort((a, b) => a.id.localeCompare(b.id));
  stats.writtenP1 = p1.length;
  stats.writtenP2 = p2.length;
  return { p1, p2, stats };
}

async function main() {
  const { keys: seenKeys, ids: seenIds } = loadExistingKeys();
  const report = { fedi: null, ure: null };

  if (doFedi) {
    const { out, stats } = await importFedi(seenIds);
    report.fedi = stats;
    process.stderr.write(
      `FEDI: ${stats.added} nuevas, ${stats.duplicate} duplicadas en archivo, ${stats.keptExisting} previas, ${stats.skippedFigure} con figura omitidas, ${stats.skippedNoAnswer} sin respuesta, ${stats.fetched} leídas, total ${out.length}.\n`,
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
    const { p1, p2, stats } = await importUre();
    report.ure = stats;
    process.stderr.write(
      `URE pool: P1=${stats.poolP1} P2=${stats.poolP2} (${stats.rounds} peticiones/URL). ` +
        `Escritas: P1=${stats.writtenP1} P2=${stats.writtenP2}. ` +
        `Figura pendiente: ${stats.skippedFigure}. Obsoletas: ${stats.skippedObsolete || 0}. Fuera examen: ${stats.skippedOffTopic || 0}. Explicaciones: ${stats.keptExplain}.\n` +
        `Para pool+imágenes: npm run import:ure\n`,
    );
    if (!dryRun) {
      writeQuestionModule(
        OUT_URE_P1,
        "URE — electricidad y radioelectricidad (pool completo web).\n" +
          "https://www.ure.es/examenes/electricidad-y-radioelectricidad/\n" +
          "La web muestra 30 preguntas aleatorias por sesión; este archivo reúne el pool por id URE (ure-p1-q*).",
        p1,
      );
      writeQuestionModule(
        OUT_URE_P2,
        "URE — prueba de Reglamentación (pool completo web).\nhttps://www.ure.es/examenes/reglamentacion/",
        p2,
      );
      writeQuestionModule(
        OUT_URE_P1_EXTRA,
        "Legado: las preguntas URE parte 1 están en ure-electricidad.js (pool ure-p1-q*).",
        [],
      );
      process.stderr.write(
        `Escrito ${OUT_URE_P1} (${p1.length}), ${OUT_URE_P2} (${p2.length}), extra vacío.\n`,
      );
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
