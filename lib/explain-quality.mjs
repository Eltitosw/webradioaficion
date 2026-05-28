/**
 * Detecta explicaciones plantilla (importación histórica) vs texto didáctico.
 */

const GENERIC_BANK_RE =
  /^Pregunta sobre .+ La opción que responde al criterio del banco es «/i;

/** Relleno del generador «electricidad» pegado delante del texto útil. */
const OHM_BOILERPLATE_RE =
  /^En corriente continua, V = I·R y P = V·I son las relaciones base del examen\.\s*(?:La magnitud o fórmula correcta aquí es «[^»]+»\.?\s*)?/i;

/**
 * @param {string} text
 * @returns {string}
 */
export function stripExplainBoilerplate(text) {
  return String(text || "")
    .trim()
    .replace(OHM_BOILERPLATE_RE, "")
    .trim();
}

/** @param {string} text */
export function hasOhmBoilerplatePrefix(text) {
  return OHM_BOILERPLATE_RE.test(String(text || "").trim());
}

/**
 * @param {string} [explain]
 */
export function isTemplateOnlyExplain(explain) {
  const s = String(explain || "").trim();
  if (!s) return true;
  if (/^Práctica (histórica|con figura|URE)\s*\(/i.test(s)) return true;
  if (/^Práctica con figura\s*\(/i.test(s)) return true;
  if (
    /^Práctica URE/i.test(s) &&
    /Contrastar con BOE-A-2013-7624/i.test(s) &&
    s.length < 320 &&
    !/Por eso|encaja|correcta es|«.+»/.test(s)
  ) {
    return true;
  }
  if (/Quijotes EA3RCQ.*quiz \d+/i.test(s) && s.length < 400 && !/Por eso|encaja|correcta es/i.test(s)) {
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
  if (GENERIC_BANK_RE.test(core) && core.length < 220) return "";
  const stripped = stripExplainBoilerplate(core);
  if (stripped.length >= 24) return stripped;
  if (hasOhmBoilerplatePrefix(core) && stripped.length < 24) return "";
  return core;
}

/**
 * @param {object} q
 */
export function hasPedagogicalExplain(q) {
  return pedagogicalExplain(q).length > 0;
}
