/**
 * Importa todas las preguntas con figura (FEDI + URE) y descarga imágenes originales.
 *
 *   node scripts/import-figures.mjs
 *   node scripts/import-figures.mjs --dry-run
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
import { fetchFediBlock } from "../lib/parse-fedi-html.mjs";
import { extractAriQuizJson, correctIndexFromQuizData } from "../lib/parse-ure-quiz.mjs";
import {
  buildFediFigureQuestion,
  downloadIfMissing,
  fediQuestionId,
  parseUreBlocksWithImages,
  pickFediImageFiles,
  questionNeedsFigureEntry,
  resolveUreFigureId,
  ureFigureRelPath,
  enrichFromExisting,
} from "../lib/figure-import.mjs";
import { importQuijotesFigures } from "../lib/quijotes-figures.mjs";
import { dedupeKey, writeQuestionModule } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "questions-figures.js");
const IMG_DIR = path.join(ROOT, "images", "quiz");

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

const dryRun = process.argv.includes("--dry-run");
const onlyQuijotes = process.argv.includes("--quijotes-only");
const onlyUre = process.argv.includes("--ure-only");

const existingById = new Map();
for (const q of [...questions, ...propias, ...ure, ...ureExtra, ...ureReg, ...fedi2011, ...fediBloques, ...quijotes]) {
  if (q?.id) existingById.set(q.id, q);
}

/** @type {object[]} */
const figureQuestions = [];
const stats = { fedi: 0, ure: 0, quijotes: 0, skipped: 0, downloadOk: 0, downloadSkip: 0, errors: 0 };

async function importFediFigures() {
  for (const block of FEDI_BLOCKS) {
    process.stderr.write(`FEDI figuras bloque ${block.bloque}…\n`);
    let data;
    try {
      data = await fetchFediBlock(block.bloque, { delayMs: 50, staleLimit: 8 });
    } catch (e) {
      process.stderr.write(`  error: ${e.message}\n`);
      stats.errors += 1;
      continue;
    }

    for (const [num, q] of data.questions) {
      const files = pickFediImageFiles(block.bloque, q.rawChunk || "");
      if (!files.length) continue;

      const correctIndex = data.correct.get(num);
      if (correctIndex === undefined || correctIndex < 0 || correctIndex >= q.options.length) {
        stats.skipped += 1;
        continue;
      }

      const built = buildFediFigureQuestion(block, num, q, correctIndex, existingById);
      if (!built) continue;

      const absPath = path.join(ROOT, ...built.stemFigure.split("/"));
      if (!dryRun) {
        try {
          const st = await downloadIfMissing(built._figureSourceUrl, absPath);
          if (st === "ok") stats.downloadOk += 1;
          else stats.downloadSkip += 1;
        } catch (e) {
          process.stderr.write(`  ${built.id}: ${e.message}\n`);
          stats.errors += 1;
          continue;
        }
      }

      delete built._figureSourceUrl;
      delete built._figureFile;
      figureQuestions.push(built);
      stats.fedi += 1;
    }
  }
}

async function importUreFigures() {
  const url = "https://www.ure.es/examenes/electricidad-y-radioelectricidad/";
  process.stderr.write("URE figuras parte 1…\n");
  const res = await fetch(url, {
    headers: { "User-Agent": "radioexam-import/1.0 (+https://www.ure.es)" },
  });
  if (!res.ok) throw new Error(`URE HTTP ${res.status}`);
  const html = await res.text();
  const quizData = extractAriQuizJson(html);
  const blocks = parseUreBlocksWithImages(html);

  for (const b of blocks) {
    if (b.index === 30) continue;
    const correctIndex = quizData
      ? correctIndexFromQuizData(
          quizData,
          b.rawChunk.match(/data-question-id="(\d+)"/)?.[1] || "",
          b.answerIds,
        )
      : -1;
    if (correctIndex < 0) continue;

    const id = resolveUreFigureId(b.stem, b.options, existingById);
    if (!id) {
      stats.skipped += 1;
      continue;
    }
    const stemFigure = ureFigureRelPath(parseInt(id.replace("ure-p1-", ""), 10), b.imageUrl);
    let item = {
      id,
      part: 1,
      topicId: existingById.get(id)?.topicId || "receptores-emisores",
      stem: b.stem,
      stemFigure,
      stemFigureAlt: `Figura original URE (índice ${b.index}): ${b.stem.slice(0, 100)}`,
      options: b.options,
      correctIndex,
      explain:
        existingById.get(id)?.explain ||
        `Práctica con figura (URE electricidad, pregunta ${b.index}). Contrastar con programa HAREC y BOE.`,
      _figureSourceUrl: b.imageUrl,
    };
    item = enrichFromExisting(item, existingById);

    const absPath = path.join(ROOT, ...stemFigure.split("/"));
    if (!dryRun) {
      try {
        const st = await downloadIfMissing(b.imageUrl, absPath);
        if (st === "ok") stats.downloadOk += 1;
        else stats.downloadSkip += 1;
      } catch (e) {
        process.stderr.write(`  ${id}: ${e.message}\n`);
        stats.errors += 1;
        continue;
      }
    }

    delete item._figureSourceUrl;
    figureQuestions.push(item);
    stats.ure += 1;
  }
}

function mergeManualUreWithFigures() {
  for (const q of ure) {
    if (!questionNeedsFigureEntry(q)) continue;
    if (figureQuestions.some((x) => x.id === q.id)) continue;
    const abs = path.join(ROOT, ...q.stemFigure.split("/"));
    if (!fs.existsSync(abs)) {
      process.stderr.write(`AVISO: falta archivo manual ${q.stemFigure}\n`);
      continue;
    }
    figureQuestions.push({ ...q });
    stats.ure += 1;
  }
}

function dedupeFigureList(list) {
  const byId = new Map();
  for (const q of list) {
    byId.set(q.id, q);
  }
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}

async function importQuijotes() {
  const existingFigureKeys = new Set(
    figureQuestions.filter((q) => q.id.startsWith("quijotes-")).map((q) => dedupeKey(q.stem, q.options)),
  );
  const { questions, stats: qs } = await importQuijotesFigures({
    imgDir: IMG_DIR,
    dryRun,
    existingById,
    existingFigureKeys,
    rounds: 50,
    delayMs: 280,
  });
  for (const q of questions) {
    if (!figureQuestions.some((x) => x.id === q.id)) figureQuestions.push(q);
  }
  stats.quijotes = questions.length;
  process.stderr.write(
    `Quijotes: ${qs.found} con imagen (QSM ${qs.qsm || 0}, WP ${qs.wp || 0}, manual ${qs.manual}), ${qs.noImage} sin imagen, ${qs.errors} errores (índice WP: ${qs.mediaCount})\n`,
  );
}

async function main() {
  if (onlyQuijotes || onlyUre) {
    const existing = await import("../data/questions-figures.js").then((m) => m.default);
    const skipPrefix = onlyQuijotes ? "quijotes-" : onlyUre ? "ure-p1-" : null;
    if (skipPrefix) {
      figureQuestions.push(...existing.filter((q) => !q.id.startsWith(skipPrefix)));
    } else {
      figureQuestions.push(...existing);
    }
  }
  if (!onlyQuijotes && !onlyUre) {
    await importFediFigures();
    await importUreFigures();
    mergeManualUreWithFigures();
  } else if (onlyUre) {
    await importUreFigures();
    mergeManualUreWithFigures();
  }
  if (!onlyUre) await importQuijotes();

  const out = dedupeFigureList(figureQuestions);
  process.stderr.write(
    `\nFiguras: FEDI ${stats.fedi}, URE ${stats.ure}, Quijotes ${stats.quijotes}, descargadas ${stats.downloadOk}, ya existían ${stats.downloadSkip}, omitidas ${stats.skipped}, errores ${stats.errors}\n`,
  );
  process.stderr.write(`Total preguntas con figura: ${out.length}\n`);

  if (dryRun) {
    process.stderr.write("Modo --dry-run: no se escribió questions-figures.js\n");
    return;
  }

  writeQuestionModule(
    OUT,
    "Preguntas que requieren figura original (generado por `node scripts/import-figures.mjs`).\nNo editar a mano: regenerar import y build:banco.",
    out,
  );
  process.stderr.write(`Escrito ${OUT}\n`);
  process.stderr.write("Siguiente: npm run build:banco\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
