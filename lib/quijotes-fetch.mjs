/**
 * Descarga y parseo de quizzes QSM (Quiz Master Next) en radioclubquijotes.org
 */
import { readResponseText } from "./http-text.mjs";
import { stemNeedsFigure } from "./import-question-utils.mjs";

export const SKIP_PATTERNS = [
  /\bFCC\b/i,
  /\bARRL\b/i,
  /\bUnited States\b/i,
  /\bAmerican\b/i,
  /\bExtra class\b/i,
  /\bTechnician\b/i,
  /\bGeneral license\b/i,
  /\bNTIA\b/i,
  /\bPart 97\b/i,
  /\bVE team\b/i,
  /\bCanadian\b/i,
  /\bIndustry Canada\b/i,
];

export const CORRECT_OVERRIDES = {
  "1-6": 2,
};

export function unescapePhpStringInJson(s) {
  return s
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\\//g, "/");
}

export function extractQuestionTitle(settings) {
  if (!settings || typeof settings !== "string") return "";
  const m = settings.match(
    /"question_title";s:\d+:"([\s\S]*?)";s:\d+:"(?:featureImageID|answerEditor)/,
  );
  if (!m) return "";
  return m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\").trim();
}

export function shouldSkip(stem, options) {
  const blob = `${stem}\n${options.join("\n")}`;
  return SKIP_PATTERNS.some((re) => re.test(blob));
}

export function topicIdPart1(stem) {
  const s = stem.toLowerCase();
  if (
    /antena|dipolo|radial|propagaci|ionosfera|troposfera|coaxial|yagi|balun|impedancia.*antena|diagrama.*radiaci/i.test(
      s,
    )
  ) {
    return "antenas-prop";
  }
  if (
    /receptor|transmis|mezclad|modul|demodul|oscilador|portadora|squelch|selectividad|sensibilidad|superheterodin|intermodulaci/i.test(
      s,
    )
  ) {
    return "receptores-emisores";
  }
  if (
    /transformador|condens|resist|ohm|farad|amper|volt|bobin|circuito resonante|diodo|rectific|campo eléctrico|campo magnético|serie|paralelo/i.test(
      s,
    )
  ) {
    return "componentes";
  }
  if (/onda|polarizaci|frecuencia|hf\b|vhf|uhf|ancho de banda|espectro/i.test(s)) {
    return "magnetismo-ondas";
  }
  return "electricidad-basica";
}

export function topicIdPart2(stem) {
  const s = stem.toLowerCase();
  if (/distintivo|indicativo|cept|harec|autorizaci|sufijo|prefijo|licencia de estaci/i.test(s)) {
    return "licencias-indicativos";
  }
  if (/antena|inmueble|comunidad|instalaci|desmontaje|terraza|sistema radiante/i.test(s)) {
    return "instalaciones";
  }
  if (/código q|rst\b|mayday|fonétic|deletreo|identificaci|alfabeto|socorro|urgencia/i.test(s)) {
    return "operacion-seguridad";
  }
  return "marco-normativo";
}

export function parseQuizJson(html, quizKey) {
  const safeKey = String(quizKey).replace(/[^0-9A-Za-z_-]/g, "");
  const m = html.match(new RegExp(`window\\.qmn_quiz_data\\["${safeKey}"\\]\\s*=\\s*(\\{)`));
  if (!m) return null;
  const startBrace = m.index + m[0].length - 1;
  let depth = 0;
  let end = -1;
  for (let i = startBrace; i < html.length; i += 1) {
    const c = html[i];
    if (c === "{") depth += 1;
    else if (c === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) return null;
  return JSON.parse(html.slice(startBrace, end));
}

export function extractItemsFromQuizData(data, quizKey, part, sourceSlug) {
  const qlist = data?.question_list;
  if (!qlist) return [];

  const items = [];
  for (const qid of Object.keys(qlist).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))) {
    const q = qlist[qid];
    const settings = unescapePhpStringInJson(q.question_settings || "");
    const stem = extractQuestionTitle(settings).trim();
    if (!stem) continue;
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
    if (stemNeedsFigure(stem)) continue;

    items.push({
      qid,
      quizKey,
      sourceSlug,
      stem,
      options,
      correctIndex,
      part,
      topicId: part === 1 ? topicIdPart1(stem) : topicIdPart2(stem),
    });
  }
  return items;
}

export function stableQuijotesId(quizKey, qid) {
  return `quijotes-${quizKey}-${String(qid).padStart(4, "0")}`;
}

export function dedupeKey(stem, options) {
  const norm = (s) =>
    s
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[¿?¡!.:;]+$/g, "")
      .trim();
  return `${norm(stem)}|${options.map(norm).join("¦")}`;
}

/**
 * @param {string} url
 * @param {string} quizKey
 */
export async function fetchQuizHtml(url, quizKey, round = 0) {
  const u = `${url}${url.includes("?") ? "&" : "?"}_=${Date.now()}-${round}`;
  let lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(u, {
        cache: "no-store",
        headers: {
          "User-Agent": "radioexam-import/1.0 (+https://radioclubquijotes.org)",
          "Cache-Control": "no-cache",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
      return readResponseText(res);
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
  }
  throw lastErr;
}

/**
 * Múltiples peticiones para muestrear el banco aleatorio del quiz.
 * @param {{ url: string, key: string, part: number, slug: string, rounds?: number, delayMs?: number }} src
 */
export async function fetchQuizPool(src) {
  const rounds = src.rounds ?? 45;
  const delayMs = src.delayMs ?? 350;
  const byQid = new Map();

  for (let r = 0; r < rounds; r++) {
    const html = await fetchQuizHtml(src.url, src.key, r);
    const data = parseQuizJson(html, src.key);
    if (!data) continue;
    const batch = extractItemsFromQuizData(data, src.key, src.part, src.slug);
    for (const it of batch) {
      byQid.set(`${src.key}-${it.qid}`, it);
    }
    if ((r + 1) % 10 === 0) {
      process.stderr.write(`  ${src.slug}: ronda ${r + 1}/${rounds} → ${byQid.size} preguntas únicas\n`);
    }
    if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return [...byQid.values()];
}

const EXAM_SLUG_RE =
  /electricidad|radioelectricidad|reglamentacion|comunicaciones|licencia|normativa|harec|radioaficionado/i;
const SKIP_SLUG_RE = /telegrafia|ppm|morse|diploma|descifrar|signos|abreviaturas|al-vuelo|cuestionario-telegrafia/i;

/**
 * @returns {Promise<{ url: string, slug: string }[]>}
 */
export async function discoverExamQuizUrls() {
  const urls = new Set();
  const manual = [
    "https://radioclubquijotes.org/qsm_quiz/electricidad-y-radioelectricidad/",
    "https://radioclubquijotes.org/qsm_quiz/radioelectricidad-correccion-inmediata/",
    "https://radioclubquijotes.org/qsm_quiz/reglamentacion/",
    "https://radioclubquijotes.org/qsm_quiz/reglamentacion-correccion-inmediata/",
    "https://radioclubquijotes.org/qsm_quiz/comunicaciones/",
  ];
  manual.forEach((u) => urls.add(u));

  try {
    const xml = await readResponseText(await fetch("https://radioclubquijotes.org/qsm_quiz-sitemap.xml"));
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = m[1];
      if (!u.includes("/qsm_quiz/")) continue;
      if (SKIP_SLUG_RE.test(u)) continue;
      if (EXAM_SLUG_RE.test(u)) urls.add(u.split("?")[0].replace(/\/?$/, "/"));
    }
  } catch {
    /* sitemap opcional */
  }

  return [...urls].sort().map((url) => ({
    url,
    slug: url.replace(/.*\/qsm_quiz\//, "").replace(/\/$/, ""),
  }));
}

/**
 * @param {string} url
 */
export async function detectQuizKey(url) {
  const html = await fetchQuizHtml(url, "0", 0);
  const keys = [...html.matchAll(/qmn_quiz_data\["([^"]+)"\]/g)].map((m) => m[1]);
  return keys[0] || null;
}
