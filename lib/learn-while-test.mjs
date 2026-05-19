/**
 * Feedback didáctico estructurado para practicar: el estudiante aprende mientras corrige.
 */
import { generatePedagogicalExplain } from "./generate-pedagogical-explain.mjs";
import { buildBestExplain } from "./build-best-explain.mjs";
import { inferExplainTopic } from "./contextual-explain.mjs";
import { isExplainAcceptable } from "./explain-verify.mjs";
import {
  isGenericExplainText,
  isRespectoTemplateExplain,
  isStemExplainTopicConflict,
} from "./explain-faithfulness.mjs";
import {
  explainBlockPedagogy,
  explainBridge,
  explainContrastPair,
  explainStemWrong,
  explainTopicWrongHint,
} from "./learn-contrast-rules.mjs";

export const LAZY_DIODE_LIST_RE =
  /^Cada diodo tiene función distinta: rectificar, estabilizar tensión \(Zener\), emitir luz \(LED\) o variar capacidad \(varicap\)\./i;

/** @param {string} text */
export function isLazyDiodeListExplain(text) {
  return LAZY_DIODE_LIST_RE.test(String(text || "").trim());
}

/**
 * @param {string} stem
 * @param {string} correct
 */
export function explainRectifierFunction(stem, correct) {
  const c = String(correct || "").trim();
  const s = String(stem || "").toLowerCase();
  if (!/rectificador/.test(s)) return "";
  return (
    `Un rectificador es un circuito cuya misión es que la corriente circule en un solo sentido: la alterna (CA) cambia de sentido; la continua (CC) va siempre igual. ` +
    `Al «obligar» la corriente a un sentido único, la transformas de alterna en continua. ` +
    `En la práctica se monta con diodos (paso en un sentido, bloqueo en el otro), pero en examen la definición directa es: «${c}».`
  );
}

/**
 * @param {string} stem
 * @param {string} wrong
 * @param {string} correct
 */
export function explainWrongOptionForStem(stem, wrong, correct) {
  const stemMsg = explainStemWrong(stem, wrong, correct);
  if (stemMsg) return stemMsg;
  return "";
}

/** @param {string} text */
export function isWeakBankExplain(text) {
  const t = String(text || "").trim();
  if (!t) return true;
  if (isLazyDiodeListExplain(t)) return true;
  if (isRespectoTemplateExplain(t)) return true;
  if (isGenericExplainText(t)) return true;
  if (/\. Es[,]?\s*["']?\s*$/.test(t)) return true;
  return false;
}

/**
 * @param {object} q
 * @returns {string}
 */
export function buildWhyCorrect(q) {
  const stem = String(q?.stem || "");
  const correct =
    typeof q?.correctIndex === "number" && Array.isArray(q?.options)
      ? String(q.options[q.correctIndex] ?? "").trim()
      : "";
  if (!correct) return "";

  const rect = explainRectifierFunction(stem, correct);
  if (rect) return rect;

  const gen = generatePedagogicalExplain(q);
  if (gen && !isWeakBankExplain(gen) && !isStemExplainTopicConflict(gen, stem)) {
    if (isExplainAcceptable(q, gen)) return gen;
  }

  const best = buildBestExplain(q);
  if (best && !isWeakBankExplain(best) && !isStemExplainTopicConflict(best, stem)) {
    if (isExplainAcceptable(q, best)) return best;
  }

  return gen && !isWeakBankExplain(gen) ? gen : best;
}

/**
 * @param {string} stem
 * @param {string} wrong
 * @param {string} correct
 * @param {string} topicId
 */
export function buildWhyWrong(stem, wrong, correct, topicId) {
  const specific = explainWrongOptionForStem(stem, wrong, correct);
  if (specific) return specific;

  const contrast = explainContrastPair(stem, wrong, correct);
  if (contrast) return contrast;

  const topic = inferExplainTopic(stem, topicId);
  const hint = explainTopicWrongHint(topic, stem, wrong, correct);
  if (hint) return hint;

  const w = String(wrong).trim();
  const c = String(correct).trim();

  if (topic === "operacion-seguridad" && /mayday|socorro/i.test(c) && /securit[eé]/i.test(w)) {
    return `«${w}» corresponde a otra señal o concepto; aquí se pregunta por Securité (seguridad), no por socorro grave.`;
  }
  if (topic === "operacion-seguridad" && /pan[\s-]?pan/i.test(c) && /\bmayday\b/i.test(w)) {
    return `«${w}» es socorro grave; aquí la urgencia sin peligro inmediato se expresa con Pan-Pan.`;
  }

  const block = explainBlockPedagogy(topic, stem, wrong, correct);
  if (block) return block;

  return `«${w}» no encaja con lo que pide el enunciado. La regla o dato que marca el banco es «${c}».`;
}

/**
 * @param {string} stem
 * @param {string} correct
 * @param {string} _whyCorrect
 */
function buildBridge(stem, correct, _whyCorrect) {
  return explainBridge(stem, correct);
}

/**
 * @param {object} q
 * @returns {string}
 */
export function bestPedagogyForQuestion(q) {
  return buildWhyCorrect(q);
}

/**
 * @param {object} q
 * @param {number} sel
 * @returns {string}
 */
export function buildStructuredFeedbackHtml(q, sel) {
  const options = Array.isArray(q?.options) ? q.options : [];
  const correctIdx = q?.correctIndex;
  if (typeof correctIdx !== "number" || !options[correctIdx]) return "";

  const correct = String(options[correctIdx]);
  const selected = typeof sel === "number" && options[sel] !== undefined ? String(options[sel]) : "";
  const ok = sel === correctIdx;

  const whyCorrect = buildWhyCorrect(q);
  if (!whyCorrect || whyCorrect.length < 35) return "";

  if (ok) {
    return `<div class="quiz-fb-reasoning quiz-fb-reasoning--structured">
      <p><strong>Por qué encaja:</strong> ${escapeHtml(whyCorrect)}</p>
    </div>`;
  }

  const whyWrong = selected ? buildWhyWrong(q.stem, selected, correct, q.topicId) : "";
  const bridge = buildBridge(q.stem, correct, whyCorrect);

  let html = `<div class="quiz-fb-reasoning quiz-fb-reasoning--structured">`;
  if (selected) {
    html += `<p><strong>Por qué no encaja tu opción:</strong> ${escapeHtml(whyWrong)}</p>`;
  }
  html += `<p><strong>Por qué la correcta es «${escapeHtml(correct)}»:</strong> ${escapeHtml(whyCorrect)}</p>`;
  if (bridge) {
    html += `<p class="quiz-fb-bridge muted"><strong>Para fijar el concepto:</strong> ${escapeHtml(bridge)}</p>`;
  }
  html += `</div>`;
  return html;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
