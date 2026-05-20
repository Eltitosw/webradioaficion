/**
 * Importación de figuras originales (FEDI-EA, URE, Quijotes).
 */
import fs from "node:fs";
import path from "node:path";

import { cleanStem, dedupeKey, inferTopicId, stemNeedsFigure } from "./import-question-utils.mjs";

const FEDI_IMG_BASE = "https://fediea.org/examen/ejercicios/";

/** @param {string} bloque @param {string} rawChunk */
export function pickFediImageFiles(bloque, rawChunk) {
  const bloqueLc = String(bloque).toLowerCase();
  const re = new RegExp(`^${bloqueLc}-\\d+[a-z]?\\.(?:jpg|jpeg|png|gif)$`, "i");
  const files = new Set();
  for (const m of String(rawChunk || "").matchAll(/<img[^>]+src=['"]([^'"]+)['"]/gi)) {
    const file = m[1].split("/").pop().replace(/&amp;/g, "&").split("?")[0];
    if (re.test(file)) files.add(file);
  }
  return [...files].sort();
}

/** @param {string} file */
export function fediImageUrl(file) {
  return `${FEDI_IMG_BASE}${file}`;
}

/** @param {string} bloque @param {string} num */
export function fediQuestionId(bloque, num) {
  return `fedi-${bloque}-${String(num).padStart(3, "0")}`;
}

/** @param {string} bloque @param {string} num */
export function fediFigureRelPath(bloque, num, ext = "jpg") {
  return `images/quiz/fedi-${bloque}-${String(num).padStart(3, "0")}-original.${ext}`;
}

/**
 * @param {string} url
 * @param {string} absPath
 */
export async function downloadToFile(url, absPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": "radioexam-import/1.0 (+https://github.com/webradioaficion)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 512) throw new Error(`Archivo demasiado pequeño (${buf.length} B): ${url}`);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, buf);
  return buf.length;
}

/** @param {string} url @param {string} absPath */
export async function downloadIfMissing(url, absPath) {
  if (fs.existsSync(absPath) && fs.statSync(absPath).size >= 512) return "skip";
  await downloadToFile(url, absPath);
  return "ok";
}

/**
 * @param {string} bloque
 * @param {string} num
 * @param {string} stem
 * @param {string} file
 */
export function fediFigureAlt(bloque, num, stem, file) {
  const short = stem.replace(/\s+/g, " ").trim().slice(0, 120);
  return `Figura original FEDI-EA ${bloque}-${num} (${file}): ${short}`;
}

/**
 * @param {object} q
 * @param {Map<string, object>} existingById
 */
function filledOptionCount(options) {
  if (!Array.isArray(options)) return 0;
  return options.filter((o) => String(o ?? "").trim().length > 0).length;
}

export function enrichFromExisting(q, existingById) {
  const prev = existingById.get(q.id);
  if (!prev) return q;
  const out = { ...q };
  if (filledOptionCount(out.options) < 2 && filledOptionCount(prev.options) >= 2) {
    out.options = prev.options;
    if (typeof prev.correctIndex === "number") out.correctIndex = prev.correctIndex;
  }
  if (typeof prev.explain === "string" && prev.explain.trim().length > 40) {
    out.explain = prev.explain;
  }
  if (typeof prev.correctIndex === "number" && filledOptionCount(out.options) >= 2) {
    out.correctIndex = prev.correctIndex;
  }
  if (Array.isArray(prev.optionExplanations)) out.optionExplanations = prev.optionExplanations;
  if (typeof prev.stemFigureAlt === "string" && prev.stemFigureAlt.includes("original")) {
    out.stemFigureAlt = prev.stemFigureAlt;
  }
  return out;
}

/** Pregunta FEDI con figura a partir del bloque descargado. */
export function buildFediFigureQuestion(block, num, q, correctIndex, existingById) {
  const files = pickFediImageFiles(block.bloque, q.rawChunk || "");
  if (!files.length) return null;
  const file = files[0];
  const ext = file.split(".").pop().toLowerCase().replace("jpeg", "jpg");
  const id = fediQuestionId(block.bloque, num);
  const stemFigure = fediFigureRelPath(block.bloque, num, ext === "gif" ? "gif" : ext === "png" ? "png" : "jpg");
  const label = block.exam
    ? `FEDI-EA examen ${block.exam} (${block.bloque}-${num})`
    : `FEDI-EA bloque ${block.bloque}-${num}`;
  let item = {
    id,
    part: block.part,
    topicId: inferTopicId(q.stem, block.part),
    stem: q.stem,
    stemFigure,
    stemFigureAlt: fediFigureAlt(block.bloque, num, q.stem, file),
    options: q.options,
    correctIndex,
    explain: `Práctica con figura (${label}). Contrastar con BOE y convocatoria vigente.`,
    _figureSourceUrl: fediImageUrl(file),
    _figureFile: file,
  };
  item = enrichFromExisting(item, existingById);
  return item;
}

/** @param {string} html */
export function parseUreBlocksWithImages(html) {
  const items = [];
  const blocks = html.split(/<div class="quiz-question\s*"/i).slice(1);
  for (const chunk of blocks) {
    const indexM = chunk.match(/data-question-index="(\d+)"/);
    if (!indexM) continue;
    const index = parseInt(indexM[1], 10);
    const titleMatch = chunk.match(
      /class="quiz-question-title"[^>]*data-question-index="(\d+)"[^>]*>([\s\S]*?)<\/div>/i,
    );
    if (!titleMatch) continue;
    const stem = cleanStem(titleMatch[2].replace(/<[^>]+>/g, " "));
    const imgs = [];
    for (const m of chunk.matchAll(/<img[^>]+src=['"]([^'"]+)['"]/gi)) {
      const src = m[1];
      if (/wp-content\/uploads/i.test(src) && /\.(png|jpg|jpeg|gif|webp)/i.test(src)) {
        imgs.push(src);
      }
    }
    if (!imgs.length) continue;
    const sourceId = chunk.match(/data-question-id="(\d+)"/)?.[1] || "";
    const options = [];
    const answerIds = [];
    const optRe =
      /<input[^>]*id="asq_[^"]+_answer_(\d+)"[^>]*>[\s\S]*?class="ari-checkbox-label quiz-question-answer-ctrl-lbl"[^>]*>([\s\S]*?)<\/label>/gi;
    let om;
    while ((om = optRe.exec(chunk)) !== null) {
      answerIds.push(om[1]);
      options.push(cleanStem(om[2].replace(/<[^>]+>/g, " ")));
    }
    if (!stem || options.length < 2) continue;
    items.push({ index, sourceId, stem, options, answerIds, imageUrl: imgs[0], rawChunk: chunk });
  }
  return items;
}

/** @param {number} index */
export function ureFigureIdP1(index) {
  return `ure-p1-${String(index).padStart(2, "0")}`;
}

/**
 * El índice HTML de la URE no coincide con el ordinal ure-p1-NN del banco local.
 * @param {string} stem
 * @param {string[]} options
 * @param {Map<string, object>} existingById
 */
export function resolveUreFigureId(stem, options, existingById) {
  const key = dedupeKey(stem, options);
  for (const q of existingById.values()) {
    if (!q?.id?.startsWith("ure-p1-")) continue;
    if (dedupeKey(q.stem, q.options) === key) return q.id;
  }
  return null;
}

/** @param {number} index @param {string} imageUrl */
export function ureFigureRelPath(index, imageUrl) {
  const ext = (imageUrl.match(/\.(png|jpe?g|gif|webp)(?:\?|$)/i) || [null, "jpg"])[1].toLowerCase();
  const norm = ext === "jpeg" ? "jpg" : ext;
  return `images/quiz/ure-p1-${String(index).padStart(2, "0")}-original.${norm}`;
}

export function questionNeedsFigureEntry(q) {
  return !!(q.stemFigure && q.stemFigure.includes("-original."));
}

export { dedupeKey, stemNeedsFigure };
