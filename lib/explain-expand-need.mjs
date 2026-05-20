/**
 * Detecta explicaciones que conviene ampliar (sin tocar las ya sólidas).
 */
import {
  isGenericExplainText,
  isMisassignedPedagogicalExplain,
  isStemExplainTopicConflict,
} from "./explain-faithfulness.mjs";
import { isExplainAcceptable } from "./explain-verify.mjs";
import { isWeakBankExplain } from "./learn-while-test.mjs";

/** Plantilla reutilizada en indicativos sin encaje con el enunciado. */
const INDICATIVO_BOILERPLATE_RE =
  /^El indicativo español combina prefijo E, cifra de distrito y sufijo asignado/i;

/** Bloque genérico de códigos Q (sin distinguir QRM, QRN, QTH…). */
export const GENERIC_Q_BLOCK_RE =
  /^Los códigos Q abrevian situaciones: QRL ocupado, QRX esperando, QSY cambio de frecuencia, QRT cese\. «/i;

/**
 * @param {string} stem
 */
function stemNeedsIndicativoExplain(stem) {
  return /indicativo|distintivo|sufijo|prefijo|cifra|distrito|\/p\b|\/mm\b|pan\b|empadron|reasignar/i.test(
    String(stem || ""),
  );
}

/**
 * @param {object} q
 * @param {string} [text]
 */
export function needsExplainExpansion(q, text) {
  const t = String(text ?? "").trim();
  if (!t || isWeakBankExplain(t)) return true;
  if (!isExplainAcceptable(q, t)) return true;
  if (isGenericExplainText(t)) return true;
  if (/^En este enunciado \(«/.test(t)) return true;

  const len = t.length;
  const sentences = t.split(/(?<=[.!?])\s+/).filter((s) => s.length > 8);
  const probe = { ...q, explain: t };

  if (
    len >= 95 &&
    isExplainAcceptable(q, t) &&
    !isMisassignedPedagogicalExplain(probe) &&
    !isStemExplainTopicConflict(t, q.stem) &&
    !GENERIC_Q_BLOCK_RE.test(t) &&
    !INDICATIVO_BOILERPLATE_RE.test(t)
  ) {
    return false;
  }

  if (len < 88) return true;
  if (len < 130 && sentences.length < 2) return true;
  if (q.topicId === "operacion-seguridad" && len < 125 && sentences.length < 2) return true;
  if (INDICATIVO_BOILERPLATE_RE.test(t) && !stemNeedsIndicativoExplain(q.stem)) return true;
  if (GENERIC_Q_BLOCK_RE.test(t)) return true;
  if (/^El excitador \(driver\)/i.test(t)) return true;
  if (/\bFEDI-EA\.?\s*$/i.test(t) && len < 140) return true;

  return false;
}

/**
 * @param {string} before
 * @param {string} after
 */
export function isExplainExpansionImprovement(before, after) {
  const a = String(before || "").trim();
  const b = String(after || "").trim();
  if (!b || b.length < 40) return false;
  if (a === b) return false;
  if (a.length < 125) {
    return b.length > a.length + 6 && b.length >= 88;
  }
  return b.length >= a.length + 12;
}
