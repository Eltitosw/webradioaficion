/**
 * Añade matiz BOE en explicaciones de bancos históricos con datos normativos.
 */
import { BOE_HISTORICAL_HEDGE, explainHasBoeAficionadosAnchor, stemNeedsBoeAficionadosAnchor } from "./boe-explain.mjs";
import { getQuestionSourceMeta } from "../data/verification-sources.mjs";

/**
 * @param {object} q
 * @param {string} text
 */
export function ensureHistoricalSourceHedge(q, text) {
  const ped = String(text || "").trim();
  if (!ped) return ped;

  const meta = getQuestionSourceMeta(q);
  if (meta.tier !== "historical") return ped;
  if (explainHasBoeAficionadosAnchor(q, ped)) return ped;
  if (/contrastar con el reglamento consolidado BOE-A-2013-7624/i.test(ped)) return ped;

  const stem = String(q?.stem || "");
  if (!stemNeedsBoeAficionadosAnchor(stem)) return ped;

  return `${ped.replace(/\s*FEDI-EA\.?\s*$/i, "").replace(/\s*Práctica histórica[^.]*\.\s*/i, "").trim()}${BOE_HISTORICAL_HEDGE}`;
}
