/**
 * Añade matiz BOE en explicaciones de bancos históricos con datos normativos.
 */
import {
  BOE_AFICIONADOS_REF,
  explainHasBoeAficionadosAnchor,
  stemNeedsBoeAficionadosAnchor,
} from "./boe-explain.mjs";

/**
 * @param {object} q
 * @param {string} text
 */
export function ensureHistoricalSourceHedge(q, text) {
  let ped = String(text || "")
    .trim()
    .replace(/\s*FEDI-EA\.?\s*$/i, "")
    .replace(/\s*Práctica histórica[^.]*\.\s*/gi, "")
    .trim();
  if (!ped) return ped;

  const stem = String(q?.stem || "");
  if (stemNeedsBoeAficionadosAnchor(stem) && !explainHasBoeAficionadosAnchor(q, ped)) {
    ped = `${ped} (${BOE_AFICIONADOS_REF}).`;
  }
  return ped;
}
