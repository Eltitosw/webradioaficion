import { cleanStem } from "./import-question-utils.mjs";

const HR_SPLIT = /<tr><td colspan="4"><hr><\/td><\/tr>/i;

/**
 * @param {string} html
 * @returns {Map<string, { num: string, stem: string, options: string[], rawChunk: string }>}
 */
export function parseFediQuestions(html) {
  const byNum = new Map();
  const parts = html.split(HR_SPLIT);
  for (const chunk of parts) {
    const head = chunk.match(/<td[^>]*>\s*(\d{1,4})\s*<\/td>\s*<td colspan="3">([\s\S]*?)<\/td>/i);
    if (!head) continue;
    const num = head[1];
    const stem = cleanStem(head[2].replace(/<[^>]+>/g, " "));
    const options = [];
    const optRe =
      /<input[^>]*name="q\d+"[^>]*value="[A-D]"[^>]*>[\s\S]*?[A-D]\.-<\/td><td[^>]*>([\s\S]*?)<\/td>/gi;
    let om;
    while ((om = optRe.exec(chunk)) !== null) {
      options.push(cleanStem(om[1].replace(/<[^>]+>/g, " ")));
    }
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
    const numM = chunk.match(/<td[^>]*>\s*(\d{1,4})\s*<\/td>/);
    if (!numM) continue;
    const num = numM[1];
    const okM = chunk.match(/OK=&gt;[\s\S]*?value="([A-D])"/i);
    if (okM) {
      correct.set(num, okM[1].charCodeAt(0) - 65);
    }
  }
  return correct;
}

/**
 * @param {string} bloque
 * @param {{ maxStep?: number, staleLimit?: number, delayMs?: number }} [opts]
 */
export async function fetchFediBlock(bloque, opts = {}) {
  const maxStep = opts.maxStep ?? 300;
  const staleLimit = opts.staleLimit ?? 12;
  const delayMs = opts.delayMs ?? 80;

  let html = "";
  let prev = 0;
  let stale = 0;
  for (let step = 1; step <= maxStep; step++) {
    const u = `https://fediea.org/examen/ejercicios/test.php?bloque=${encodeURIComponent(bloque)}&step=${step}&lang=es`;
    const res = await fetch(u, {
      headers: { "User-Agent": "radioexam-import/1.0 (+https://github.com/webradioaficion)" },
    });
    if (!res.ok) throw new Error(`FEDI HTTP ${res.status} bloque=${bloque} step=${step}`);
    html = await res.text();
    const n = parseFediQuestions(html).size;
    if (n === prev) stale += 1;
    else stale = 0;
    prev = n;
    if (stale >= staleLimit) break;
    if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
  }

  const questions = parseFediQuestions(html);
  if (!questions.size) {
    return { bloque, questions: new Map(), correct: new Map() };
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

  const postRes = await fetch("https://fediea.org/examen/ejercicios/test.php?lang=es", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "radioexam-import/1.0",
    },
    body: body.toString(),
  });
  const graded = await postRes.text();
  const correct = parseFediCorrectIndices(graded);

  return { bloque, questions, correct };
}
