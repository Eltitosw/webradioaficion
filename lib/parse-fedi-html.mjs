import { readResponseText } from "./http-text.mjs";
import { cleanStem } from "./import-question-utils.mjs";

const HR_SPLIT = /<tr><td colspan="4"><hr><\/td><\/tr>/i;
const STEM_HEAD_RE =
  /<td[^>]*>\s*(\d{1,4})(?:\s|&nbsp;)*<\/td>\s*<td[^>]*colspan="3"[^>]*>([\s\S]*?)<\/td>/i;
/** FEDI: «A.-</td><td>texto»; FeRaCat: «A.-</td><td>texto» con celda extra «&nbsp;A.-&nbsp;». */
const OPT_RE =
  /<input[^>]*name="q\d+"[^>]*value="[A-D]"[^>]*>[\s\S]*?(?:<td[^>]*>(?:\s|&nbsp;)*[A-D]\.-(?:\s|&nbsp;)*<\/td>\s*)?<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi;

/**
 * @param {string} chunk
 * @returns {string[]}
 */
function parseFediOptions(chunk) {
  const options = [];
  let om;
  OPT_RE.lastIndex = 0;
  while ((om = OPT_RE.exec(chunk)) !== null) {
    options.push(cleanStem(om[1].replace(/<[^>]+>/g, " ")));
  }
  return options;
}

/**
 * @param {string} html
 * @returns {Map<string, { num: string, stem: string, options: string[], rawChunk: string }>}
 */
export function parseFediQuestions(html) {
  const byNum = new Map();
  const parts = html.split(HR_SPLIT);
  for (const chunk of parts) {
    const head = chunk.match(STEM_HEAD_RE);
    if (!head) continue;
    const num = head[1];
    const stem = cleanStem(head[2].replace(/<[^>]+>/g, " "));
    const options = parseFediOptions(chunk);
    if (stem && options.length >= 2 && options.length <= 6) {
      byNum.set(num, { num, stem, options, rawChunk: chunk });
    }
  }
  return byNum;
}

/**
 * Tras enviar el formulario, FEDI marca la opción correcta con OK=&gt;
 * @param {string} html
 * @returns {Map<string, number>}
 */
export function parseFediCorrectIndices(html) {
  const correct = new Map();
  const parts = html.split(HR_SPLIT);
  for (const chunk of parts) {
    const numM = chunk.match(/<td[^>]*>\s*(\d{1,4})(?:\s|&nbsp;)*<\/td>/);
    if (!numM) continue;
    const num = numM[1];
    const okM = chunk.match(/OK=&gt;[\s\S]*?value="([A-D])"/i);
    if (okM) {
      correct.set(num, okM[1].charCodeAt(0) - 65);
    }
  }
  return correct;
}

const DEFAULT_EXAM_HOST = "https://fediea.org";

/**
 * @param {string} bloque
 * @param {{ maxStep?: number, staleLimit?: number, delayMs?: number, host?: string, label?: string }} [opts]
 */
export async function fetchExamBlock(bloque, opts = {}) {
  const maxStep = opts.maxStep ?? 300;
  const staleLimit = opts.staleLimit ?? 12;
  const delayMs = opts.delayMs ?? 80;
  const host = (opts.host || DEFAULT_EXAM_HOST).replace(/\/$/, "");
  const label = opts.label || host;

  let html = "";
  let prev = 0;
  let stale = 0;
  for (let step = 1; step <= maxStep; step++) {
    const u = `${host}/examen/ejercicios/test.php?bloque=${encodeURIComponent(bloque)}&step=${step}&lang=es`;
    const res = await fetch(u, {
      headers: { "User-Agent": "radioexam-import/1.0 (+https://github.com/webradioaficion)" },
    });
    if (!res.ok) throw new Error(`${label} HTTP ${res.status} bloque=${bloque} step=${step}`);
    html = await readResponseText(res);
    const n = parseFediQuestions(html).size;
    if (n === prev) stale += 1;
    else stale = 0;
    prev = n;
    if (stale >= staleLimit) break;
    if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
  }

  const questions = parseFediQuestions(html);
  if (!questions.size) {
    return { bloque, questions: new Map(), correct: new Map(), host };
  }

  const body = new URLSearchParams();
  const bloqueM = html.match(/name="bloque"[^>]*value="([^"]+)"/);
  const startM = html.match(/name="start"[^>]*value="([^"]+)"/);
  const stepM = html.match(/name="step"[^>]*value="([^"]+)"/);
  body.set("bloque", bloqueM?.[1] || bloque);
  if (startM) body.set("start", startM[1]);
  if (stepM) body.set("step", stepM[1]);
  body.set("lang", "es");
  for (const num of questions.keys()) {
    body.set(`q${num}`, "A");
  }

  const postRes = await fetch(`${host}/examen/ejercicios/test.php?lang=es`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "radioexam-import/1.0",
    },
    body: body.toString(),
  });
  const graded = await readResponseText(postRes);
  const correct = parseFediCorrectIndices(graded);

  return { bloque, questions, correct, host };
}

/** @param {string} bloque @param {object} [opts] */
export async function fetchFediBlock(bloque, opts = {}) {
  return fetchExamBlock(bloque, { ...opts, host: opts.host || DEFAULT_EXAM_HOST, label: "FEDI" });
}

/** FeRaCat usa el mismo formato HTML que FEDI-EA. */
export async function fetchFeracatBlock(bloque, opts = {}) {
  return fetchExamBlock(bloque, {
    ...opts,
    host: opts.host || "https://www.feracat.org",
    label: "FeRaCat",
  });
}
