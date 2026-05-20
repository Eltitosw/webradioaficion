/**
 * Importación completa URE: pool rotatorio, respuestas del JSON embebido,
 * imágenes reales descargadas y descarte de obsoletas / fuera de examen.
 *
 *   node scripts/import-ure-full.mjs
 *   node scripts/import-ure-full.mjs --dry-run
 *   node scripts/import-ure-full.mjs --rounds=40
 *   node scripts/import-ure-full.mjs --part=2 --rounds=45   # solo reglamentación
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import ureExisting from "../data/ure-electricidad.js";
import ureRegExisting from "../data/ure-reglamentacion.js";
import {
  extractAriQuizJson,
  correctIndexFromQuizData,
  parseUreQuestionBlocks,
} from "../lib/parse-ure-quiz.mjs";
import { readResponseText } from "../lib/http-text.mjs";
import {
  classifyQuestion,
  topicIdPart1,
  topicIdPart2,
  stemNeedsFigure,
  writeQuestionModule,
} from "../lib/import-question-utils.mjs";
import { downloadIfMissing } from "../lib/figure-import.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { hasObsoleteHint } from "../lib/question-recency.mjs";
import { isTemplateOnlyExplain } from "../lib/explain-quality.mjs";
import { dedupeKey } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_P1 = path.join(ROOT, "data", "ure-electricidad.js");
const OUT_P2 = path.join(ROOT, "data", "ure-reglamentacion.js");
const OUT_P1_EXTRA = path.join(ROOT, "data", "ure-electricidad-extra.js");
const IMG_DIR = path.join(ROOT, "images", "quiz");
const MIN_IMAGE_BYTES = 2048;
/** Por debajo de esto suele ser icono WP, no diagrama de examen. */
const MIN_DIAGRAM_BYTES = 8192;

const URE_PAGES = [
  {
    url: "https://www.ure.es/examenes/electricidad-y-radioelectricidad/",
    part: 1,
    label: "electricidad y radioelectricidad",
  },
  {
    url: "https://www.ure.es/examenes/reglamentacion/",
    part: 2,
    label: "reglamentación",
  },
];

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const onlyPart = args.find((a) => a.startsWith("--part="))?.split("=")[1];
const roundsArg = args.find((a) => a.startsWith("--rounds="));
const ROUNDS = roundsArg
  ? Math.max(10, Math.min(60, Number.parseInt(roundsArg.split("=")[1], 10) || 35))
  : 35;

const pagesToRun = onlyPart
  ? URE_PAGES.filter((p) => String(p.part) === onlyPart)
  : URE_PAGES;

function loadExplainByStem() {
  /** @type {Map<string, string>} */
  const m = new Map();
  for (const q of [...ureExisting, ...ureRegExisting]) {
    const exp = typeof q.explain === "string" ? q.explain.trim() : "";
    if (exp && !isTemplateOnlyExplain(exp)) {
      m.set(dedupeKey(q.stem, q.options), exp);
    }
  }
  return m;
}

/**
 * @param {string} id
 * @param {string} imageUrl
 */
function ureFigureRelPath(id, imageUrl) {
  const ext = (imageUrl.match(/\.(png|jpe?g|gif|webp)(?:\?|$)/i) || [null, "jpg"])[1].toLowerCase();
  const norm = ext === "jpeg" ? "jpg" : ext;
  return `images/quiz/${id}-original.${norm}`;
}

function absoluteUrl(src) {
  if (src.startsWith("http")) return src;
  return new URL(src, "https://www.ure.es/").href;
}

/**
 * @param {string} url
 * @param {number} part
 */
async function fetchUreHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "radioexam-import/1.0 (+https://www.ure.es)" },
  });
  if (!res.ok) throw new Error(`URE HTTP ${res.status} ${url}`);
  return readResponseText(res);
}

/**
 * Barre el pool rotatorio y fusiona preguntas + URLs de imagen por sourceId.
 * @param {typeof URE_PAGES[number]} page
 */
async function harvestUrePage(page) {
  /** @type {Map<string, object>} */
  const bySourceId = new Map();
  let fetches = 0;
  let withImageHits = 0;

  for (let r = 0; r < ROUNDS; r += 1) {
    const html = await fetchUreHtml(page.url);
    fetches += 1;
    const quizData = extractAriQuizJson(html);
    const blocks = parseUreQuestionBlocks(html);

    for (const b of blocks) {
      const correctIndex = quizData
        ? correctIndexFromQuizData(quizData, b.sourceId, b.answerIds)
        : -1;
      if (correctIndex < 0 || correctIndex >= b.options.length) continue;

      const imageUrls = (b.imageUrls || []).map(absoluteUrl);
      const prev = bySourceId.get(b.sourceId);
      if (!prev) {
        bySourceId.set(b.sourceId, {
          sourceId: b.sourceId,
          part: page.part,
          stem: b.stem,
          options: b.options,
          correctIndex,
          imageUrls: [...imageUrls],
        });
        if (imageUrls.length) withImageHits += 1;
        continue;
      }
      if (imageUrls.length && !prev.imageUrls.length) {
        prev.imageUrls = imageUrls;
        withImageHits += 1;
      } else if (imageUrls.length) {
        const u = imageUrls[0];
        if (!prev.imageUrls.includes(u)) prev.imageUrls.push(u);
      }
    }

    if (r < ROUNDS - 1) {
      await new Promise((resolve) => setTimeout(resolve, 180));
    }
  }

  return { bySourceId, fetches, withImageHits };
}

/**
 * @param {object} q
 */
function rejectReason(q) {
  const fake = { id: `ure-p${q.part}-q${q.sourceId}`, stem: q.stem, options: q.options };
  if (isOffTopicForRadioaficionadoExam(fake)) return "fuera-examen";
  if (hasObsoleteHint(q.stem, q.options)) return "obsoleta";
  return null;
}

/**
 * Una sola pregunta por enunciado+opciones (evita duplicados con distinto sourceId URE).
 * @param {object[]} items
 */
function dedupeStemItems(items) {
  /** @type {Map<string, object>} */
  const byStem = new Map();
  let removed = 0;
  for (const item of items) {
    const key = dedupeKey(item.stem, item.options);
    const prev = byStem.get(key);
    if (!prev) {
      byStem.set(key, item);
      continue;
    }
    const prevFig = Boolean(prev.stemFigure);
    const nextFig = Boolean(item.stemFigure);
    if (nextFig && !prevFig) byStem.set(key, item);
    removed += 1;
  }
  return { items: [...byStem.values()], removed };
}

async function main() {
  const explainByStem = loadExplainByStem();
  /** @type {object[]} */
  const p1 = onlyPart === "2" ? [...ureExisting] : [];
  /** @type {object[]} */
  const p2 = onlyPart === "1" ? [...ureRegExisting] : [];
  const stats = {
    rounds: ROUNDS,
    rejectedObsolete: 0,
    rejectedOffTopic: 0,
    rejectedDuplicate: 0,
    downloadOk: 0,
    downloadSkip: 0,
    downloadFail: 0,
    skippedTinyImage: 0,
    withFigureP1: 0,
    withFigureP2: 0,
    poolP1: 0,
    poolP2: 0,
  };

  for (const page of pagesToRun) {
    process.stderr.write(`URE ${page.label}: ${ROUNDS} cargas del pool…\n`);
    const { bySourceId, fetches, withImageHits } = await harvestUrePage(page);
    process.stderr.write(
      `  ${fetches} HTML, ${bySourceId.size} preguntas únicas, ${withImageHits} con imagen en alguna carga\n`,
    );

    const idPrefix = page.part === 1 ? "ure-p1-q" : "ure-p2-q";
    const label = `Fuente: URE (${page.label})`;
    /** @type {object[]} */
    const batch = [];

    if (page.part === 1) stats.poolP1 = bySourceId.size;
    else stats.poolP2 = bySourceId.size;

    for (const raw of bySourceId.values()) {
      const reason = rejectReason(raw);
      if (reason === "obsoleta") {
        stats.rejectedObsolete += 1;
        continue;
      }
      if (reason === "fuera-examen") {
        stats.rejectedOffTopic += 1;
        continue;
      }

      const id = `${idPrefix}${raw.sourceId}`;
      const classified = classifyQuestion({ stem: raw.stem, sourcePart: page.part, id });
      // La URL URE fija la prueba (1 = electricidad, 2 = reglamentación); no reclasificar de parte.
      const part = page.part;
      const topicId =
        classified.part === part
          ? classified.topicId
          : part === 1
            ? topicIdPart1(raw.stem)
            : topicIdPart2(raw.stem);
      const key = dedupeKey(raw.stem, raw.options);
      const explain =
        explainByStem.get(key) ||
        `Práctica URE (${label}). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio.`;

      /** @type {Record<string, unknown>} */
      const item = {
        id,
        part,
        topicId,
        stem: raw.stem,
        options: raw.options,
        correctIndex: raw.correctIndex,
        explain,
      };

      if (raw.imageUrls?.length) {
        let attached = false;
        for (const imageUrl of raw.imageUrls) {
          const stemFigure = ureFigureRelPath(id, imageUrl);
          const absPath = path.join(ROOT, ...stemFigure.split("/"));
          if (!dryRun) {
            try {
              await downloadIfMissing(imageUrl, absPath);
              const size = fs.existsSync(absPath) ? fs.statSync(absPath).size : 0;
              if (size < MIN_IMAGE_BYTES) {
                if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
                stats.skippedTinyImage += 1;
                continue;
              }
              const needsFigure = stemNeedsFigure(raw.stem);
              if (!needsFigure && size < MIN_DIAGRAM_BYTES) {
                if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
                stats.skippedTinyImage += 1;
                continue;
              }
              stats.downloadOk += 1;
            } catch (e) {
              process.stderr.write(`  ${id}: imagen ${e.message}\n`);
              stats.downloadFail += 1;
              continue;
            }
          }
          item.stemFigure = stemFigure;
          item.stemFigureAlt = `Figura original URE (${id}): ${raw.stem.replace(/\s+/g, " ").trim().slice(0, 120)}`;
          if (page.part === 1) stats.withFigureP1 += 1;
          else stats.withFigureP2 += 1;
          attached = true;
          break;
        }
        if (!attached && stemNeedsFigure(raw.stem)) {
          stats.skippedFigurePending = (stats.skippedFigurePending || 0) + 1;
        }
      }

      batch.push(item);
    }

    const { items: deduped, removed } = dedupeStemItems(batch);
    stats.rejectedDuplicate += removed;
    if (page.part === 1) p1.push(...deduped);
    else p2.push(...deduped);
  }

  p1.sort((a, b) => a.id.localeCompare(b.id));
  p2.sort((a, b) => a.id.localeCompare(b.id));

  function logByTopic(label, items) {
    /** @type {Map<string, number>} */
    const counts = new Map();
    for (const q of items) {
      counts.set(q.topicId, (counts.get(q.topicId) || 0) + 1);
    }
    process.stderr.write(`\n${label} por apartado (topicId):\n`);
    for (const [topicId, n] of [...counts.entries()].sort((a, b) => a - b)) {
      process.stderr.write(`  ${topicId}: ${n}\n`);
    }
  }
  logByTopic("Parte 1 — electricidad", p1);
  logByTopic("Parte 2 — reglamentación", p2);

  process.stderr.write(
    `\nResultado: P1=${p1.length} (${stats.withFigureP1} figuras), P2=${p2.length} (${stats.withFigureP2} figuras)\n` +
      `Descartadas: obsoletas=${stats.rejectedObsolete}, fuera examen=${stats.rejectedOffTopic}, duplicadas=${stats.rejectedDuplicate}\n` +
      `Imágenes: ok=${stats.downloadOk}, iconos omitidos=${stats.skippedTinyImage}, fallos=${stats.downloadFail}, figura pendiente=${stats.skippedFigurePending || 0}\n`,
  );

  if (dryRun) {
    process.stderr.write("Modo --dry-run: no se escribieron archivos.\n");
    return;
  }

  const headerP1 =
    "URE — Parte 1 · Electricidad y radioelectricidad (pool completo URE).\n" +
    "Fuente: https://www.ure.es/examenes/electricidad-y-radioelectricidad/\n" +
    "Apartados: electricidad-basica, magnetismo-ondas, componentes, receptores-emisores, antenas-prop.\n" +
    `Generado: ${new Date().toISOString().slice(0, 10)} · ${ROUNDS} cargas aleatorias · ids ure-p1-q{sourceId}.`;
  const headerP2 =
    "URE — Parte 2 · Reglamentación (pool completo URE).\n" +
    "Fuente: https://www.ure.es/examenes/reglamentacion/\n" +
    "Apartados: marco-normativo, licencias-indicativos, operacion-seguridad, instalaciones.\n" +
    `Generado: ${new Date().toISOString().slice(0, 10)} · ${ROUNDS} cargas aleatorias · ids ure-p2-q{sourceId}.`;

  if (!onlyPart || onlyPart === "1") writeQuestionModule(OUT_P1, headerP1, p1);
  if (!onlyPart || onlyPart === "2") writeQuestionModule(OUT_P2, headerP2, p2);
  if (!onlyPart || onlyPart === "1") {
    writeQuestionModule(OUT_P1_EXTRA, "Legado vacío: ver ure-electricidad.js (ure-p1-q*).", []);
  }

  process.stderr.write(
    `Escrito ${!onlyPart || onlyPart === "1" ? `${OUT_P1} (${p1.length})` : "(P1 sin cambios)"}, ` +
      `${!onlyPart || onlyPart === "2" ? `${OUT_P2} (${p2.length})` : "(P2 sin cambios)"}\n`,
  );
  process.stderr.write("Siguiente: npm run build:banco\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
