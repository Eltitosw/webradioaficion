/**
 * Comprueba cobertura y fidelidad básica de explicaciones respecto a la pregunta.
 */
import { hasPedagogicalExplain, isTemplateOnlyExplain, pedagogicalExplain } from "./explain-quality.mjs";

/** Frases de fallback del generador automático (baja especificidad). */
const GENERIC_FALLBACK_RE =
  /^(En (reglamentación|electricidad básica|componentes|receptores y emisores|antenas y propagación|magnetismo y ondas|instalaciones|operación)|La opción correcta es «|Contrastar con el temario)/i;

const TOPIC_FALLBACK_RE =
  /Repasa el bloque correspondiente en el temario si el distractor te confundió/i;

/** @param {string} text */
export function isGenericExplainText(text) {
  const ped = String(text || "").trim();
  if (!ped) return true;
  if (TOPIC_FALLBACK_RE.test(ped)) return true;
  if (GENERIC_FALLBACK_RE.test(ped) && ped.length < 220) return true;
  if (/conviene identificar magnitud, unidad y fórmula antes de elegir distractor/i.test(ped)) return true;
  if (/asocia símbolo, función y comportamiento en CC frente a CA\. La respuesta correcta es/i.test(ped)) {
    return true;
  }
  if (/sigue la cadena RF → mezcla\/FI → detección → audio\. La respuesta correcta es/i.test(ped)) {
    return true;
  }
  if (/^Pregunta sobre .+ La opción que responde al criterio del banco es «/i.test(ped) && ped.length < 200) {
    return true;
  }
  return false;
}

/** @param {object} q */
export function isGenericPedagogicalExplain(q) {
  return isGenericExplainText(pedagogicalExplain(q));
}

/** @param {object} q */
export function needsExplainRefresh(q) {
  const issues = auditQuestionExplain(q);
  if (issues.some((i) => i.level === "fail")) return true;
  if (isGenericPedagogicalExplain(q)) return true;
  if (issues.some((i) => i.code === "generic_block_fallback")) return true;
  return false;
}

/**
 * Normaliza texto para comparación laxa (sin tildes, minúsculas, espacios).
 * @param {string} s
 */
export function normalizeForMatch(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .replace(/[«»"']/g, "")
    .trim();
}

/**
 * ¿La explicación cita o contiene la opción correcta?
 * @param {string} explain
 * @param {string} correct
 */
export function explainMentionsCorrect(explain, correct) {
  const e = normalizeForMatch(explain);
  const c = normalizeForMatch(correct);
  const cBare = normalizeForMatch(String(correct).replace(/\s*\([^)]*\)/g, " ").trim());
  if (!c) return false;
  if (c.length === 1) {
    return e.includes(c) || explain.includes(`«${correct}»`) || explain.includes(`"${correct}"`);
  }
  if (c.length < 2) return false;
  if (e.includes(c)) return true;
  if (cBare.length >= 4 && e.includes(cBare)) return true;
  if (explain.includes(`«${correct}»`) || explain.includes(`"${correct}"`)) return true;
  // Fragmento largo (p. ej. fórmulas con espacios distintos)
  if (c.length >= 12) {
    const core = c.slice(0, Math.min(24, c.length));
    if (core.length >= 8 && e.includes(core)) return true;
  }
  // Respuestas numéricas cortas (p. ej. «7», 25 W)
  if (c.length <= 24 && /\d/.test(c)) {
    const nums = c.match(/\d+([.,]\d+)?/g);
    if (nums?.length && nums.every((n) => e.includes(n.replace(",", ".")) || e.includes(n))) return true;
  }
  // Palabras clave de la opción correcta (explicaciones manuales sin comillas)
  const words = c.split(/\s+/).filter((w) => w.length >= 4);
  if (words.length) {
    const hit = words.filter((w) => {
      if (e.includes(w)) return true;
      const stem = w.slice(0, Math.min(5, w.length));
      return stem.length >= 4 && e.includes(stem);
    }).length;
    if (hit >= Math.min(2, words.length) || (words.length === 1 && hit === 1)) return true;
  }
  return false;
}

/**
 * @param {object} q
 * @returns {{ level: "ok"|"warn"|"fail"; code: string; detail?: string }[]}
 */
export function auditQuestionExplain(q) {
  const issues = [];
  const stem = String(q?.stem ?? "").trim();
  const options = Array.isArray(q?.options) ? q.options : [];
  const correctIdx = q?.correctIndex;
  const correct =
    typeof correctIdx === "number" && options[correctIdx] !== undefined
      ? String(options[correctIdx]).trim()
      : "";
  const rawExplain = String(q?.explain ?? "").trim();
  const pedagogy = pedagogicalExplain(q);
  const sourceNote =
    typeof q?.explainSourceNote === "string" ? q.explainSourceNote.trim() : "";

  if (!stem) issues.push({ level: "fail", code: "stem_empty" });
  if (!options.length) issues.push({ level: "fail", code: "no_options" });
  if (typeof correctIdx !== "number" || correctIdx < 0 || correctIdx >= options.length) {
    issues.push({ level: "fail", code: "invalid_correct_index" });
  }
  if (!correct) issues.push({ level: "fail", code: "correct_option_empty" });

  const playable =
    options.filter((o) => String(o ?? "").trim().length > 0).length >= 2 && !!correct;

  if (!rawExplain && !sourceNote) {
    issues.push({ level: "fail", code: "no_explain_at_all" });
  } else if (!pedagogy && playable) {
    if (isTemplateOnlyExplain(rawExplain) || (sourceNote && isTemplateOnlyExplain(sourceNote))) {
      issues.push({ level: "fail", code: "only_template" });
    } else if (!rawExplain) {
      issues.push({ level: "fail", code: "no_pedagogical" });
    } else {
      issues.push({ level: "warn", code: "explain_not_pedagogical", detail: rawExplain.slice(0, 80) });
    }
  }

  if (!pedagogy || !playable) return issues;

  if (pedagogy.length < 40) {
    issues.push({ level: "warn", code: "explain_very_short", detail: `${pedagogy.length} chars` });
  }

  if (!explainMentionsCorrect(pedagogy, correct)) {
    issues.push({ level: "fail", code: "correct_not_quoted", detail: correct.slice(0, 60) });
  }

  if (TOPIC_FALLBACK_RE.test(pedagogy)) {
    issues.push({ level: "warn", code: "generic_topic_fallback" });
  } else if (GENERIC_FALLBACK_RE.test(pedagogy) && pedagogy.length < 160) {
    issues.push({ level: "warn", code: "generic_block_fallback" });
  }

  // Otra opción citada como «correcta» en la explicación
  for (let i = 0; i < options.length; i += 1) {
    if (i === correctIdx) continue;
    const wrong = String(options[i] ?? "").trim();
    if (wrong.length < 8) continue;
    const w = normalizeForMatch(wrong);
    const p = normalizeForMatch(pedagogy);
    if (
      (p.includes(`correcta es «${w}»`) ||
        p.includes(`opción correcta es «${w}»`) ||
        p.includes(`respuesta correcta es «${w}»`) ||
        p.includes(`respuesta es «${w}»`)) &&
      !explainMentionsCorrect(pedagogy, correct)
    ) {
      issues.push({ level: "fail", code: "wrong_option_as_correct", detail: wrong.slice(0, 50) });
      break;
    }
  }

  return issues;
}

/**
 * @param {object[]} questions
 */
export function auditExplainBank(questions) {
  const summary = {
    total: questions.length,
    noExplain: [],
    onlyTemplate: [],
    noPedagogical: [],
    faithfulnessFail: [],
    faithfulnessWarn: [],
    ok: 0,
    byCode: /** @type {Record<string, number>} */ ({}),
    byTopicFail: /** @type {Record<string, number>} */ ({}),
  };

  for (const q of questions) {
    const issues = auditQuestionExplain(q);
    const fails = issues.filter((i) => i.level === "fail");
    const warns = issues.filter((i) => i.level === "warn");

    for (const i of issues) {
      summary.byCode[i.code] = (summary.byCode[i.code] || 0) + 1;
    }

    if (fails.some((f) => f.code === "no_explain_at_all")) summary.noExplain.push(q.id);
    if (fails.some((f) => f.code === "only_template")) summary.onlyTemplate.push(q.id);
    if (fails.some((f) => f.code === "no_pedagogical")) summary.noPedagogical.push(q.id);

    if (fails.length) {
      const faithFails = fails.filter(
        (f) =>
          !["no_explain_at_all", "only_template", "no_pedagogical", "stem_empty", "no_options", "invalid_correct_index", "correct_option_empty"].includes(
            f.code,
          ),
      );
      if (faithFails.length) {
        summary.faithfulnessFail.push({ id: q.id, topicId: q.topicId, issues: faithFails });
        summary.byTopicFail[q.topicId] = (summary.byTopicFail[q.topicId] || 0) + 1;
      }
    } else if (warns.length) {
      summary.faithfulnessWarn.push({ id: q.id, topicId: q.topicId, issues: warns });
    } else {
      summary.ok += 1;
    }
  }

  return summary;
}
