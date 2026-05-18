/**
 * Detecta explicaciones plantilla (importación histórica) vs texto didáctico.
 */

/**
 * @param {string} [explain]
 */
export function isTemplateOnlyExplain(explain) {
  const s = String(explain || "").trim();
  if (!s) return true;
  if (
    /^Práctica (histórica|con figura)\s*\(/i.test(s) &&
    /(Puede contener erratas|Contrastar con BOE)/i.test(s) &&
    s.length < 280
  ) {
    return true;
  }
  if (/^Fuente:\s*/i.test(s) && s.length < 200) return true;
  return false;
}

/**
 * Texto didáctico útil para «por qué es correcta» (sin cola de aviso histórico).
 * @param {object} q
 */
export function pedagogicalExplain(q) {
  const raw = typeof q?.explain === "string" ? q.explain.trim() : "";
  if (!raw) return "";

  const cut = raw.search(/\s+Práctica (histórica|con figura)\s*\(/i);
  const core = cut > 0 ? raw.slice(0, cut).trim() : raw;

  if (!core || isTemplateOnlyExplain(core)) return "";
  return core;
}

/**
 * @param {object} q
 */
export function hasPedagogicalExplain(q) {
  return pedagogicalExplain(q).length > 0;
}
