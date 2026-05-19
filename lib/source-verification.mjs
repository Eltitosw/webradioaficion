/**
 * Verificación de explicaciones frente a fuentes: sin inventar normativa ni datos no anclados.
 */
import { explainHasBoeAficionadosAnchor, stemNeedsBoeAficionadosAnchor } from "./boe-explain.mjs";
import { getQuestionSourceMeta, tierRank } from "../data/verification-sources.mjs";
import { pedagogicalExplain } from "./explain-quality.mjs";
import { explainMentionsCorrect } from "./explain-faithfulness.mjs";

/**
 * Hechos normativos documentados en regulatory.js / BOE (solo contrastes automáticos seguros).
 * No añadir cifras sin cita en studyAnchors o anexo I.
 */
export const VERIFIED_NORMATIVA_FACTS = [
  {
    id: "art25h_potencia_urbana",
    stemRe: /potencia|vatios|\bw\b|repetidor|desatendid|casco urbano|fuera del casco/i,
    /** Explicación afirma 25 W fuera sin matizar banco antiguo */
    riskyExplainRe: /\b25\s*w\b.*fuera|\bfuera\b.*\b25\s*w\b/i,
    safeHedgeRe: /boe|reglamento|art\.?\s*25|anexo\s*i|banco|2011|desfase|contradice|10\s*w.*urbano|50\s*w.*fuera/i,
    note: "Art. 25.h y anexo I: 10 W en urbano y hasta 50 W fuera (supuesto repetidores/desatendidas VHF/UHF).",
  },
  {
    id: "securite_vs_rst",
    stemRe: /securit[eé]|seguridad.*telefon|mayday|pan[\s-]?pan/i,
    riskyExplainRe: /^\s*rst\b|informe.*\brst\b.*securit[eé]/i,
    safeHedgeRe: /no confundir|frente a|mayday|pan-pan|tres veces/i,
    note: "Securité/Mayday/Pan-Pan no son RST.",
  },
];

/** Frases que presentan norma inventada o absoluta sin anclaje (marco normativo / licencias). */
const RISKY_ABSOLUTE_LEGAL = [
  /\bsiempre\s+est[aá]\s+prohibido\b/i,
  /\bnunca\s+se\s+puede\b/i,
  /\bes\s+obligatorio\s+pertenecer\b/i,
  /\bla\s+ley\s+exige\s+que\s+todos\b/i,
  /\bseg[uú]n\s+el\s+c[oó]digo\s+penal\b/i,
];

/** En temas históricos con cifras legales, exigir matiz si no hay anclaje. */
const HEDGE_MARKERS =
  /boe|reglamento|anexo|art\.?\s*\d|cept|harec|banco|enunciado|seg[uú]n el (texto|supuesto)|convocatoria|resoluci[oó]n/i;

/**
 * @param {object} q
 * @param {string} [explainText]
 * @returns {{ level: "fail" | "warn", code: string, note?: string }[]}
 */
export function auditExplainAgainstSources(q, explainText) {
  const issues = [];
  const ped = explainText !== undefined ? String(explainText).trim() : pedagogicalExplain(q);
  const stem = String(q?.stem || "");
  const correct =
    typeof q?.correctIndex === "number" && Array.isArray(q?.options)
      ? String(q.options[q.correctIndex] ?? "").trim()
      : "";
  const meta = getQuestionSourceMeta(q);
  const topic = String(q?.topicId || "");

  if (!ped) return issues;

  if (!explainMentionsCorrect(ped, correct)) {
    issues.push({ level: "fail", code: "source_correct_not_quoted" });
  }

  for (const fact of VERIFIED_NORMATIVA_FACTS) {
    if (!fact.stemRe.test(stem) && !fact.stemRe.test(ped)) continue;
    if (fact.riskyExplainRe.test(ped) && !fact.safeHedgeRe.test(ped)) {
      issues.push({
        level: "fail",
        code: `contradicts_${fact.id}`,
        note: fact.note,
      });
    }
  }

  const isNormative =
    topic === "marco-normativo" ||
    topic === "licencias-indicativos" ||
    topic === "instalaciones" ||
    /reglamento|boe|infracci|potencia.*\bw\b|plazo|autorizaci/i.test(stem);

  if (isNormative) {
    for (const re of RISKY_ABSOLUTE_LEGAL) {
      if (re.test(ped)) {
        issues.push({ level: "fail", code: "unverified_absolute_legal_claim" });
        break;
      }
    }
    if (meta.tier === "historical" && /\d+\s*(mes|meses|a[nñ]o|d[ií]as|w\b|mhz|khz)/i.test(ped)) {
      if (!HEDGE_MARKERS.test(ped) && !explainHasBoeAficionadosAnchor(q, ped)) {
        issues.push({
          level: "warn",
          code: "historical_source_numeric_without_hedge",
          note: `Origen ${meta.label}: cifra o plazo sin remisión a BOE/banco.`,
        });
      }
    }
  }

  const needsBoeAnchor = meta.tier === "historical" && stemNeedsBoeAficionadosAnchor(stem);

  if (needsBoeAnchor && !explainHasBoeAficionadosAnchor(q, ped)) {
    issues.push({
      level: "warn",
      code: "historical_normative_without_boe_anchor",
      note: `Pregunta ${meta.label}: falta cita BOE-A-2013-7624 / IET/1311/2013 en la explicación.`,
    });
  }

  /** No afirmar hechos técnicos de otro bloque como si fueran ley. */
  if (/identifica la estaci[oó]n y debe usarse al inicio y al final/i.test(ped)) {
    const stemAboutEtiquette = /(inicio|final|comunicaci[oó]n|transmitir.*distintivo|cu[aá]ndo deben)/i.test(stem);
    if (!stemAboutEtiquette) {
      issues.push({ level: "fail", code: "misassigned_callsign_etiquette" });
    }
  }

  return issues;
}

/**
 * @param {object[]} questions
 */
export function auditBankSourceSafety(questions) {
  const summary = {
    total: questions.length,
    fails: /** @type {{ id: string; codes: string[] }[]} */ ([]),
    warns: /** @type {{ id: string; codes: string[] }[]} */ ([]),
    bySource: /** @type {Record<string, { fail: number, warn: number }>} */ ({}),
  };

  for (const q of questions) {
    const meta = getQuestionSourceMeta(q);
    const label = meta.label || "Otro";
    if (!summary.bySource[label]) summary.bySource[label] = { fail: 0, warn: 0 };

    const issues = auditExplainAgainstSources(q);
    const failCodes = issues.filter((i) => i.level === "fail").map((i) => i.code);
    const warnCodes = issues.filter((i) => i.level === "warn").map((i) => i.code);
    if (failCodes.length) {
      summary.fails.push({ id: q.id, codes: failCodes });
      summary.bySource[label].fail += 1;
    }
    if (warnCodes.length) {
      summary.warns.push({ id: q.id, codes: warnCodes });
      summary.bySource[label].warn += 1;
    }
  }

  return summary;
}

/**
 * Comprueba que regulatory.js incluya las fuentes mínimas vinculantes.
 * @param {object} regulatory
 */
export function auditRegulatoryCatalog(regulatory) {
  const missing = [];
  const requiredIds = ["normativa-boe", "normativa-europa", "normativa-practica"];
  const groups = regulatory?.linkGroups || [];
  for (const id of requiredIds) {
    if (!groups.some((g) => g.id === id)) missing.push(id);
  }
  if (!Array.isArray(regulatory?.sourceHierarchy) || regulatory.sourceHierarchy.length < 3) {
    missing.push("sourceHierarchy");
  }
  return missing;
}
