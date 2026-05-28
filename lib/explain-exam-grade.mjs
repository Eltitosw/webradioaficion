/**
 * Criterio de calidad «examen» (más estricto que verify-explanations-strict).
 * Usar verify:gate en el día a día; verify:explain-grade --strict antes de publicar.
 */
import {
  bannedExplainPhraseHits,
  isGenericExplainText,
  isMisassignedPedagogicalExplain,
  isStemExplainTopicConflict,
  explainMentionsCorrect,
} from "./explain-faithfulness.mjs";
import { isExplainAcceptable } from "./explain-verify.mjs";
import { pedagogicalExplain } from "./explain-quality.mjs";

/** Longitud mínima salvo excepción compacta (definición/unidad con fórmula). */
export const EXAM_GRADE_MIN_CHARS = 120;

/** Por debajo de esto hace falta marcador de razonamiento explícito. */
export const EXAM_GRADE_REASONING_BELOW = 180;

const TAUTOLOGY_RE =
  /la respuesta que marca el banco|responde al criterio del banco|opción que responde al criterio del banco|formulación del banco es «/i;

export const REASONING_MARKERS_RE =
  /porque|por eso|equivale|significa|no confundir|fórmula|ley |art\.|anexo|por tanto|se deduce|se calcula|se mide|se define|conviene|recuerda|no es /i;

const TECHNICAL_COMPACT_RE = /[\/=·≈√]|\d+\s*(v|a|ω|hz|db|mhz|khz|ohm|ω|µf|nf|pf)\b/i;

/** @param {string} ped */
export function isTautologicalExplain(ped) {
  return TAUTOLOGY_RE.test(String(ped || ""));
}

/** @param {string} ped */
export function hasExplicitReasoning(ped) {
  return REASONING_MARKERS_RE.test(String(ped || ""));
}

/** Dos frases o más con cuerpo (evita una línea vacía de relleno). @param {string} ped */
export function hasSubstantiveStructure(ped) {
  const text = String(ped || "").trim();
  if (text.length < 125) return false;
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.replace(/«[^»]+»/g, "").trim().length > 14);
  return sentences.length >= 2;
}

/**
 * Definición corta aceptable (unidad, fórmula, contraste mínimo).
 * @param {object} q
 * @param {string} ped
 */
export function isCompactGradeExplain(q, ped) {
  const text = String(ped || "").trim();
  if (text.length < 72 || text.length >= EXAM_GRADE_MIN_CHARS) return false;
  const correct =
    typeof q?.correctIndex === "number" && Array.isArray(q?.options)
      ? String(q.options[q.correctIndex] ?? "").trim()
      : "";
  if (!correct || !explainMentionsCorrect(text, correct)) return false;
  if (isTautologicalExplain(text) || isGenericExplainText(text)) return false;
  if (isStemExplainTopicConflict(text, q?.stem)) return false;
  return hasExplicitReasoning(text) || TECHNICAL_COMPACT_RE.test(text);
}

/**
 * @param {object} q
 * @param {string} [text]
 * @returns {{ level: "fail" | "warn", code: string }[]}
 */
export function examGradeExplainIssues(q, text) {
  const issues = [];
  const ped = text !== undefined ? String(text).trim() : pedagogicalExplain(q);
  const stem = String(q?.stem ?? "");
  const correct =
    typeof q?.correctIndex === "number" && Array.isArray(q?.options)
      ? String(q.options[q.correctIndex] ?? "").trim()
      : "";

  if (!ped) {
    issues.push({ level: "fail", code: "no_pedagogy" });
    return issues;
  }

  if (!isExplainAcceptable(q, ped)) {
    issues.push({ level: "fail", code: "not_acceptable" });
  }
  if (isTautologicalExplain(ped)) {
    issues.push({ level: "fail", code: "tautology" });
  }
  if (isStemExplainTopicConflict(ped, stem)) {
    issues.push({ level: "fail", code: "stem_mismatch" });
  }
  if (isMisassignedPedagogicalExplain({ ...q, explain: ped })) {
    issues.push({ level: "fail", code: "topic_mismatch" });
  }
  for (const code of bannedExplainPhraseHits(ped, stem)) {
    issues.push({ level: "fail", code: `banned_${code}` });
  }

  const compact = isCompactGradeExplain(q, ped);

  const substantive = hasSubstantiveStructure(ped);

  if (!compact) {
    if (ped.length < EXAM_GRADE_MIN_CHARS) {
      issues.push({ level: "fail", code: "very_short" });
    } else if (
      ped.length < EXAM_GRADE_REASONING_BELOW &&
      !hasExplicitReasoning(ped) &&
      !substantive
    ) {
      issues.push({ level: "fail", code: "short_no_reason" });
    }
  }

  if (correct && !explainMentionsCorrect(ped, correct)) {
    issues.push({ level: "fail", code: "correct_not_quoted" });
  }
  if (isGenericExplainText(ped) && !hasExplicitReasoning(ped) && !compact) {
    issues.push({ level: "fail", code: "generic_template" });
  }

  return issues;
}

/**
 * @param {object} q
 */
export function passesExamGradeExplain(q) {
  const issues = examGradeExplainIssues(q);
  return !issues.some((i) => i.level === "fail");
}

/**
 * @param {object[]} questions
 * @param {{ onlyIds?: Set<string> }} [opts]
 */
export function auditExamGradeBank(questions, opts = {}) {
  const only = opts.onlyIds;
  const summary = {
    total: 0,
    pass: 0,
    fail: /** @type {{ id: string; topicId: string; codes: string[] }[]} */ ([]),
    warn: /** @type {{ id: string; topicId: string; codes: string[] }[]} */ ([]),
    byCode: /** @type {Record<string, number>} */ ({}),
  };

  for (const q of questions) {
    if (only && !only.has(q.id)) continue;
    summary.total += 1;
    const issues = examGradeExplainIssues(q);
    const fails = issues.filter((i) => i.level === "fail");
    const warns = issues.filter((i) => i.level === "warn");
    for (const i of issues) {
      summary.byCode[i.code] = (summary.byCode[i.code] || 0) + 1;
    }
    if (fails.length) {
      summary.fail.push({ id: q.id, topicId: q.topicId, codes: fails.map((f) => f.code) });
    } else {
      summary.pass += 1;
    }
    if (warns.length) {
      summary.warn.push({ id: q.id, topicId: q.topicId, codes: warns.map((w) => w.code) });
    }
  }
  return summary;
}
