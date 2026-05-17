/**
 * Importación de preguntas Quijotes que exigen figura (QSM).
 */
import fs from "node:fs";
import path from "node:path";

import {
  CORRECT_OVERRIDES,
  detectQuizKey,
  discoverExamQuizUrls,
  fetchQuizHtml,
  parseQuizJson,
  shouldSkip,
  stableQuijotesId,
  topicIdPart1,
  topicIdPart2,
  unescapePhpStringInJson,
  extractQuestionTitle,
} from "./quijotes-fetch.mjs";
import { dedupeKey, stemNeedsFigure } from "./import-question-utils.mjs";
import { downloadIfMissing } from "./figure-import.mjs";

const WP_MEDIA = "https://radioclubquijotes.org/wp-json/wp/v2/media";
const QSM_IMG_RE = /https?:\/\/[^"'\\\s<>]+\.(?:png|jpe?g|gif|webp)(?:\?[^"'\\\s<>]*)?/gi;
const QSM_IMG_SKIP_RE = /icono_|logo|banner|slider|filetejat|color-positiu|gravatar|emoji/i;

/** Archivos ya descargados a mano (nombre legacy → patrón de enunciado). */
const MANUAL_STEM_IMAGES = [
  {
    file: "quijotes-044-original.jpg",
    re: /conjunto L-C|L-C resuena|potencia medida por el vatímetro|transmisor.*línea de alimentación.*antena|vatímetro de la figura|ROE|relación de ondas estacionarias/i,
  },
  {
    file: "quijotes-051-original.jpg",
    re: /osciloscopio|pantalla del osciloscopio|gráfica de la pantalla|forma de onda.*figura/i,
  },
  {
    file: "quijotes-039-original.jpg",
    re: /señale el diagrama de radiación.*yagi|diagrama de radiación correspondiente a una antena yagi|elementos de una antena yagi/i,
  },
];

const KEYWORD_RULES = [
  { re: /osciloscopio|forma de onda/i, terms: ["osciloscopio", "forma", "onda", "pantalla"] },
  { re: /vatímetro|vatimetro/i, terms: ["vatimetro", "vatímetro", "watt"] },
  { re: /dipolo/i, terms: ["dipolo", "bobina"] },
  { re: /diagrama de radiación|diagrama de radiacion/i, terms: ["radiacion", "radiación", "diagrama"] },
  { re: /ionosfera|frecuencia crítica/i, terms: ["ionosfera", "critica", "crítica"] },
  { re: /detector de envolvente|detector/i, terms: ["detector", "envolvente", "diodo"] },
  { re: /receptor|mezclador|oscilador local|conversión directa|conversion directa/i, terms: [
    "receptor",
    "esquema",
    "agc",
    "mezclador",
  ] },
  { re: /condensador|circuito eléctrico|circuito electrico/i, terms: ["condensador", "circuito", "esquema"] },
  { re: /espectro|banda lateral/i, terms: ["espectro", "banda"] },
  { re: /distrito geográfico|distrito geografico/i, terms: ["distrito", "mapa", "geograf"] },
  { re: /indicativo.*EA\d/i, terms: ["indicativo", "distintivo"] },
];

const SEARCH_TERMS = [
  "receptor",
  "esquema",
  "dipolo",
  "antena",
  "radiacion",
  "osciloscopio",
  "detector",
  "diodo",
  "ionosfera",
  "vatimetro",
  "circuito",
  "espectro",
  "agc",
  "fm",
  "transmisor",
  "diagrama",
  "lobulo",
  "sintonizador",
  "emisora",
  "condensador",
  "mezclador",
  "conversor",
  "modulador",
  "demodulador",
  "yagi",
  "balun",
  "roe",
  "formadeonda",
  "pantalla",
];

/**
 * Imágenes incrustadas en question_settings / answers del JSON QSM (fuente fiable).
 * @param {object} q
 * @returns {string[]}
 */
export function extractQsmQuestionImageUrls(q) {
  const urls = new Set();
  const settings = unescapePhpStringInJson(q?.question_settings || "");
  const parts = [settings, JSON.stringify(q)];
  if (Array.isArray(q?.answers)) {
    for (const row of q.answers) {
      if (typeof row[0] === "string") parts.push(row[0]);
      if (typeof row[1] === "string") parts.push(row[1]);
    }
  }
  for (const part of parts) {
    for (const m of String(part).matchAll(QSM_IMG_RE)) {
      const u = m[0].replace(/\\\//g, "/");
      if (!QSM_IMG_SKIP_RE.test(u)) urls.add(u);
    }
  }
  const featSrc = settings.match(/featureImageSrc";s:\d+:"([^"]+)"/);
  if (featSrc?.[1] && featSrc[1].length > 8 && /\.(png|jpe?g|gif|webp)/i.test(featSrc[1])) {
    urls.add(featSrc[1].replace(/\\\//g, "/"));
  }
  const featId = settings.match(/featureImageID";s:\d+:"(\d+)"/);
  if (featId?.[1] && featId[1] !== "0") {
    /* resuelto vía fetchMediaById si hace falta */
  }
  return [...urls];
}

/**
 * @param {number} mediaId
 */
async function fetchMediaById(mediaId) {
  const res = await fetch(`${WP_MEDIA}/${mediaId}`, {
    headers: { "User-Agent": "radioexam-import/1.0" },
  });
  if (!res.ok) return null;
  const m = await res.json();
  if (!m?.source_url) return null;
  return {
    id: m.id,
    source_url: m.source_url,
    title: String(m.title?.rendered || "").replace(/<[^>]+>/g, " "),
    slug: String(m.slug || ""),
  };
}

/**
 * @param {object} q
 */
export async function resolveQsmImageUrl(q) {
  const embedded = extractQsmQuestionImageUrls(q);
  if (embedded.length) return embedded[0];
  const settings = unescapePhpStringInJson(q?.question_settings || "");
  const featId = settings.match(/featureImageID";s:\d+:"(\d+)"/);
  if (featId?.[1] && featId[1] !== "0") {
    const m = await fetchMediaById(parseInt(featId[1], 10));
    if (m?.source_url) return m.source_url;
  }
  return null;
}

/**
 * @returns {Promise<Array<{ id: number, source_url: string, title: string, slug: string }>>}
 */
/**
 * Búsqueda WP por nombre de archivo (slug sin extensión).
 * @param {string} filename
 */
async function fetchMediaByFilename(filename) {
  const base = filename.replace(/\.[a-z]+$/i, "").replace(/[-_]/g, " ");
  const terms = [filename.replace(/\.[a-z]+$/i, ""), base.split(" ")[0]].filter(Boolean);
  for (const term of terms) {
    const res = await fetch(`${WP_MEDIA}?search=${encodeURIComponent(term)}&per_page=100`, {
      headers: { "User-Agent": "radioexam-import/1.0" },
    });
    if (!res.ok) continue;
    const batch = await res.json();
    if (!Array.isArray(batch)) continue;
    const want = filename.toLowerCase();
    for (const m of batch) {
      if (m?.source_url && m.source_url.split("/").pop().toLowerCase() === want) {
        return {
          id: m.id,
          source_url: m.source_url,
          title: String(m.title?.rendered || "").replace(/<[^>]+>/g, " "),
          slug: String(m.slug || ""),
        };
      }
    }
  }
  return null;
}

export async function fetchTechnicalWpMediaIndex() {
  const byUrl = new Map();
  for (const term of SEARCH_TERMS) {
    const res = await fetch(`${WP_MEDIA}?search=${encodeURIComponent(term)}&per_page=100`, {
      headers: { "User-Agent": "radioexam-import/1.0" },
    });
    if (!res.ok) continue;
    const batch = await res.json();
    if (!Array.isArray(batch)) continue;
    for (const m of batch) {
      if (m?.source_url && /\.(png|jpe?g|gif|webp)(\?|$)/i.test(m.source_url)) {
        byUrl.set(m.source_url, {
          id: m.id,
          source_url: m.source_url,
          title: String(m.title?.rendered || "").replace(/<[^>]+>/g, " "),
          slug: String(m.slug || ""),
        });
      }
    }
  }
  return [...byUrl.values()];
}

export async function fetchAllWpMedia() {
  const all = [];
  for (let page = 1; page <= 30; page += 1) {
    const res = await fetch(`${WP_MEDIA}?per_page=100&page=${page}`, {
      headers: { "User-Agent": "radioexam-import/1.0" },
    });
    if (!res.ok) break;
    const batch = await res.json();
    if (!Array.isArray(batch) || !batch.length) break;
    for (const m of batch) {
      if (m?.source_url && /\.(png|jpe?g|gif|webp)(\?|$)/i.test(m.source_url)) {
        all.push({
          id: m.id,
          source_url: m.source_url,
          title: String(m.title?.rendered || "").replace(/<[^>]+>/g, " "),
          slug: String(m.slug || ""),
        });
      }
    }
    if (batch.length < 100) break;
  }
  return all;
}

/**
 * @param {string} stem
 * @param {Array<{ id: number, source_url: string, title: string, slug: string }>} mediaList
 */
export function pickMediaForStem(stem, mediaList) {
  const stemLc = stem.toLowerCase();
  let terms = [];
  for (const rule of KEYWORD_RULES) {
    if (rule.re.test(stemLc)) terms = [...terms, ...rule.terms];
  }
  if (!terms.length) {
    terms = stemLc
      .split(/\W+/)
      .filter((w) => w.length > 4)
      .slice(0, 6);
  }

  let best = null;
  let bestScore = 0;
  for (const m of mediaList) {
    const blob = `${m.title} ${m.slug} ${m.source_url}`.toLowerCase();
    if (/icono_|logo|banner|slider|filetejat|color-positiu/i.test(blob)) continue;
    let score = 0;
    for (const t of terms) {
      if (blob.includes(t)) score += 2;
    }
    if (score > bestScore) {
      bestScore = score;
      best = m;
    }
  }
  return bestScore >= 1 ? best : null;
}

function manualImageForStem(stem) {
  for (const { file, re } of MANUAL_STEM_IMAGES) {
    if (re.test(stem)) return file;
  }
  return null;
}

export function quijotesFigureRelPath(quizKey, qid, imageUrl) {
  const ext = (imageUrl.match(/\.(png|jpe?g|gif|webp)(\?|$)/i) || [null, "jpg"])[1].toLowerCase();
  const norm = ext === "jpeg" ? "jpg" : ext;
  return `images/quiz/quijotes-${quizKey}-${String(qid).padStart(4, "0")}-original.${norm}`;
}

/**
 * @param {object} data
 * @param {string} quizKey
 * @param {number} part
 * @param {string} sourceSlug
 */
export function extractFigureItemsFromQuizData(data, quizKey, part, sourceSlug) {
  const qlist = data?.question_list;
  if (!qlist) return [];

  const items = [];
  for (const qid of Object.keys(qlist).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))) {
    const q = qlist[qid];
    const settings = unescapePhpStringInJson(q.question_settings || "");
    const stem = extractQuestionTitle(settings).trim();
    if (!stem || !stemNeedsFigure(stem)) continue;

    const rawAnswers = q.answers;
    if (!Array.isArray(rawAnswers) || rawAnswers.length < 2) continue;

    const options = [];
    let correctIndex = -1;
    rawAnswers.forEach((row, idx) => {
      options.push(String(row[0]).trim());
      if (row[2] === 1 || row[2] === true) correctIndex = idx;
    });

    const ok = `${quizKey}-${qid}`;
    if (CORRECT_OVERRIDES[ok] !== undefined) correctIndex = CORRECT_OVERRIDES[ok];

    if (correctIndex < 0 || options.length > 6) continue;
    if (shouldSkip(stem, options)) continue;

    items.push({
      qid,
      quizKey,
      sourceSlug,
      stem,
      options,
      correctIndex,
      part,
      topicId: part === 1 ? topicIdPart1(stem) : topicIdPart2(stem),
      rawQuestion: q,
    });
  }
  return items;
}

/**
 * @param {{ rounds?: number, delayMs?: number, imgDir: string, dryRun?: boolean, existingById: Map<string, object> }} opts
 */
export async function importQuijotesFigures(opts) {
  const { imgDir, dryRun = false, existingById, existingFigureKeys } = opts;
  const rounds = opts.rounds ?? 60;
  const delayMs = opts.delayMs ?? 300;
  const skipKeys = existingFigureKeys || new Set();

  process.stderr.write("Quijotes: cargando medios WordPress…\n");
  const mediaList = [...(await fetchTechnicalWpMediaIndex()), ...(await fetchAllWpMedia())];
  const mediaByUrl = new Map(mediaList.map((m) => [m.source_url, m]));
  process.stderr.write(`  ${mediaByUrl.size} archivos técnicos + biblioteca WP\n`);

  const urls = await discoverExamQuizUrls();
  /** @type {Map<string, { it: object, qsmUrls: string[], rawQuestion: object|null }>} */
  const pending = new Map();
  const byStableId = new Map();
  const stats = { found: 0, downloaded: 0, manual: 0, qsm: 0, wp: 0, skipped: 0, noImage: 0, errors: 0 };

  for (const { url, slug } of urls) {
    const key = await detectQuizKey(url);
    if (!key) continue;
    const part = /reglamentacion|comunicaciones|normativa/i.test(slug) ? 2 : 1;
    process.stderr.write(`Quijotes figuras ${slug} (quiz ${key})…\n`);

    const seenQid = new Set();
    for (let r = 0; r < rounds; r++) {
      const html = await fetchQuizHtml(url, key, r);
      const data = parseQuizJson(html, key);
      if (!data) continue;
      const batch = extractFigureItemsFromQuizData(data, key, part, slug);
      for (const it of batch) {
        seenQid.add(`${key}-${it.qid}`);
        const id = stableQuijotesId(it.quizKey, it.qid);
        if (skipKeys.has(dedupeKey(it.stem, it.options))) {
          stats.skipped += 1;
          continue;
        }
        const qsmUrls = it.rawQuestion ? extractQsmQuestionImageUrls(it.rawQuestion) : [];
        const prev = pending.get(id);
        if (prev) {
          if (qsmUrls.length) prev.qsmUrls = [...new Set([...prev.qsmUrls, ...qsmUrls])];
          prev.it = it;
          if (it.rawQuestion) prev.rawQuestion = it.rawQuestion;
        } else {
          pending.set(id, { it, qsmUrls, rawQuestion: it.rawQuestion || null });
        }
      }
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
    }
    process.stderr.write(`  ${slug}: ${seenQid.size} qids con figura vistos, ${pending.size} pendientes\n`);
  }

  process.stderr.write(`Quijotes: resolviendo ${pending.size} preguntas con figura…\n`);
  for (const [id, { it, qsmUrls, rawQuestion }] of pending) {
    let imageUrl = null;
    let relPath = null;
    let source = null;
    const manualFile = manualImageForStem(it.stem);
    let manualSrcAbs = null;

    if (qsmUrls.length) {
      imageUrl = qsmUrls[0];
      relPath = quijotesFigureRelPath(it.quizKey, it.qid, imageUrl);
      source = "qsm";
    }
    if (!relPath && manualFile) {
      manualSrcAbs = path.join(imgDir, manualFile);
      if (fs.existsSync(manualSrcAbs)) {
        relPath = quijotesFigureRelPath(it.quizKey, it.qid, manualFile);
        source = "manual";
      }
    }
    if (!relPath && rawQuestion) {
      const qsmUrl = await resolveQsmImageUrl(rawQuestion);
      if (qsmUrl) {
        imageUrl = qsmUrl;
        relPath = quijotesFigureRelPath(it.quizKey, it.qid, qsmUrl);
        source = "qsm";
      }
    }
    if (!relPath) {
      const media = pickMediaForStem(it.stem, [...mediaByUrl.values()]);
      if (media) {
        imageUrl = media.source_url;
        relPath = quijotesFigureRelPath(it.quizKey, it.qid, media.source_url);
        source = "wp";
      }
    }
    if (!relPath) {
      const terms = it.stem
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 5)
        .slice(0, 4);
      for (const term of terms) {
        const res = await fetch(`${WP_MEDIA}?search=${encodeURIComponent(term)}&per_page=50`, {
          headers: { "User-Agent": "radioexam-import/1.0" },
        });
        if (!res.ok) continue;
        const batch = await res.json();
        if (!Array.isArray(batch)) continue;
        for (const m of batch) {
          if (m?.source_url) {
            mediaByUrl.set(m.source_url, {
              id: m.id,
              source_url: m.source_url,
              title: String(m.title?.rendered || "").replace(/<[^>]+>/g, " "),
              slug: String(m.slug || ""),
            });
          }
        }
        const media = pickMediaForStem(it.stem, [...mediaByUrl.values()]);
        if (media) {
          imageUrl = media.source_url;
          relPath = quijotesFigureRelPath(it.quizKey, it.qid, media.source_url);
          source = "wp";
          break;
        }
      }
    }
    if (!relPath) {
      stats.noImage += 1;
      continue;
    }
    if (source === "qsm") stats.qsm += 1;
    else if (source === "manual") stats.manual += 1;
    else if (source === "wp") stats.wp += 1;

    const absPath = path.join(imgDir, path.basename(relPath));
    if (!dryRun) {
      try {
        if (manualSrcAbs) {
          if (!fs.existsSync(absPath)) fs.copyFileSync(manualSrcAbs, absPath);
          stats.downloaded += 1;
        } else if (imageUrl) {
          const st = await downloadIfMissing(imageUrl, absPath);
          if (st === "ok") stats.downloaded += 1;
        }
      } catch (e) {
        process.stderr.write(`  ${id}: ${e.message}\n`);
        stats.errors += 1;
        continue;
      }
    }

    const prev = existingById.get(id);
    const { rawQuestion: _rq, ...itRest } = it;
    const item = {
      id,
      part: itRest.part,
      topicId: prev?.topicId || itRest.topicId,
      stem: itRest.stem,
      stemFigure: relPath,
      stemFigureAlt: `Figura Quijotes EA3RCQ (quiz ${itRest.quizKey}, pregunta ${itRest.qid}): ${itRest.stem.slice(0, 120)}`,
      options: itRest.options,
      correctIndex: itRest.correctIndex,
      explain:
        prev?.explain ||
        `Práctica con figura (Quijotes EA3RCQ · ${itRest.sourceSlug}, quiz ${itRest.quizKey}, pregunta ${itRest.qid}). Contrastar con BOE y convocatoria.`,
    };
    byStableId.set(id, item);
    stats.found += 1;
  }

  return {
    questions: [...byStableId.values()].sort((a, b) => a.id.localeCompare(b.id)),
    stats,
    mediaCount: mediaByUrl.size,
  };
}
