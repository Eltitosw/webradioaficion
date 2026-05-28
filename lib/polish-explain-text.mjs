/**
 * Limpia relleno de oleadas de curación y citas correctas duplicadas.
 */

const PADDING_RE =
  /\s*Contrastar con el temario del bloque si el distractor te confundió\.\s*/gi;

const FIG_TEMPLATE_RE =
  /^Interpreta la figura junto con el enunciado: identifica qué magnitud, bloque o relación se pregunta\.\s*La opción que encaja es /i;

/** @param {string} text @param {string} correct */
export function dedupeCorrectQuote(text, correct) {
  const t = String(text || "").trim();
  const c = String(correct || "").trim();
  if (!t || !c) return t;
  const tag = `«${c}»`;
  let out = t;
  let from = 0;
  let idx = out.indexOf(tag, from);
  if (idx < 0) return out;
  from = idx + tag.length;
  idx = out.indexOf(tag, from);
  while (idx >= 0) {
    out = `${out.slice(0, idx)}${out.slice(idx + tag.length)}`.replace(/\s{2,}/g, " ").trim();
    idx = out.indexOf(tag, from);
  }
  return out.replace(/\s+\./g, ".").replace(/\.\s*\./g, ".").trim();
}

/** @param {string} text */
export function stripPaddingPhrase(text) {
  return String(text || "")
    .replace(PADDING_RE, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {string} text */
export function isFigureTemplateExplain(text) {
  return FIG_TEMPLATE_RE.test(String(text || "").trim());
}

/**
 * @param {string} text
 * @param {{ correct?: string }} [opts]
 */
export function polishExplainText(text, opts = {}) {
  let t = stripPaddingPhrase(text);
  t = dedupeCorrectQuote(t, opts.correct ?? "");
  return t.trim();
}
