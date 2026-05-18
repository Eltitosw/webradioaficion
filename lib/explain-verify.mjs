/**
 * Comprobación estricta: una explicación solo es válida si encaja con el enunciado.
 */
import {
  auditQuestionExplain,
  bannedExplainPhraseHits,
  explainMentionsCorrect,
  isGenericExplainText,
  isMisassignedPedagogicalExplain,
  isStemExplainTopicConflict,
} from "./explain-faithfulness.mjs";
import { auditExplainAgainstSources } from "./source-verification.mjs";
import { pedagogicalExplain, isTemplateOnlyExplain } from "./explain-quality.mjs";

/**
 * @param {object} q
 * @param {string} [text] si se omite, usa pedagogicalExplain(q)
 */
export function isExplainAcceptable(q, text) {
  const ped = text !== undefined ? String(text).trim() : pedagogicalExplain(q);
  const stem = String(q?.stem ?? "");
  const correct =
    typeof q?.correctIndex === "number" && Array.isArray(q?.options)
      ? String(q.options[q.correctIndex] ?? "").trim()
      : "";
  if (!ped || ped.length < 35) return false;
  if (isGenericExplainText(ped)) return false;
  if (!correct || !explainMentionsCorrect(ped, correct)) return false;
  const probe = { ...q, explain: ped };
  if (isMisassignedPedagogicalExplain(probe)) return false;
  if (isStemExplainTopicConflict(ped, stem)) return false;
  if (bannedExplainPhraseHits(ped, stem).length) return false;
  if (auditExplainAgainstSources(q, ped).some((i) => i.level === "fail")) return false;
  return true;
}

/**
 * @param {object} q
 */
export function questionExplainIssues(q) {
  const issues = auditQuestionExplain(q);
  const ped = pedagogicalExplain(q);
  if (ped && isGenericExplainText(ped)) {
    issues.push({ level: "fail", code: "generic_pedagogy" });
  }
  if (ped && !isExplainAcceptable(q, ped)) {
    if (!issues.some((i) => i.code === "explain_topic_mismatch" || i.code === "explain_band_mismatch")) {
      issues.push({ level: "fail", code: "explain_not_acceptable" });
    }
  }
  for (const src of auditExplainAgainstSources(q, ped)) {
    if (src.level === "fail") issues.push({ level: "fail", code: src.code });
    else if (src.level === "warn") issues.push({ level: "warn", code: src.code });
  }
  const raw = String(q?.explain ?? "").trim();
  if (!ped && !isTemplateOnlyExplain(raw) && raw.length > 40) {
    issues.push({ level: "warn", code: "explain_not_pedagogical" });
  }
  return issues;
}

/**
 * @param {object[]} questions
 */
export function strictAuditExplainBank(questions) {
  const summary = {
    total: questions.length,
    unacceptable: /** @type {{ id: string; topicId: string; codes: string[] }[]} */ ([]),
    onlyTemplate: /** @type {string[]} */ ([]),
    ok: 0,
    byCode: /** @type {Record<string, number>} */ ({}),
  };

  for (const q of questions) {
    const issues = questionExplainIssues(q);
    const fails = issues.filter((i) => i.level === "fail");
    const warns = issues.filter((i) => i.level === "warn");
    for (const i of [...fails, ...warns]) {
      summary.byCode[i.code] = (summary.byCode[i.code] || 0) + 1;
    }
    if (fails.some((f) => f.code === "only_template")) summary.onlyTemplate.push(q.id);
    const blocking = fails.filter(
      (f) =>
        !["stem_empty", "no_options", "invalid_correct_index", "correct_option_empty"].includes(f.code),
    );
    const blockingWarns = warns.filter((w) => ["generic_topic_fallback", "explain_very_short"].includes(w.code));
    if (blocking.length || blockingWarns.length || fails.some((f) => f.code === "only_template")) {
      summary.unacceptable.push({
        id: q.id,
        topicId: q.topicId,
        codes: [...new Set([...blocking, ...blockingWarns, ...fails].map((x) => x.code))],
      });
    } else {
      summary.ok += 1;
    }
  }
  return summary;
}
