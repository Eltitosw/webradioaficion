/**
 * Comprueba cobertura y fidelidad básica de explicaciones respecto a la pregunta.
 */
import { hasPedagogicalExplain, isTemplateOnlyExplain, pedagogicalExplain } from "./explain-quality.mjs";

/** Frases de fallback del generador automático (baja especificidad). */
const GENERIC_FALLBACK_RE =
  /^(En (reglamentación|electricidad básica|componentes|receptores y emisores|antenas y propagación|magnetismo y ondas|instalaciones),|La opción correcta es «|Contrastar con el temario)/i;

const TOPIC_FALLBACK_RE =
  /Repasa el bloque correspondiente en el temario si el distractor te confundió/i;

/** @param {string} text */
export function isGenericExplainText(text) {
  const ped = String(text || "").trim();
  if (!ped) return true;
  if (TOPIC_FALLBACK_RE.test(ped)) return true;
  if (GENERIC_FALLBACK_RE.test(ped) && ped.length < 220) {
    if (/significa|designa|corresponde|indica|se compone|no confundir/i.test(ped) && !/banco de examen es «/i.test(ped)) {
      return false;
    }
    return true;
  }
  if (/conviene identificar magnitud, unidad y fórmula antes de elegir distractor/i.test(ped)) return true;
  if (/asocia símbolo, función y comportamiento en CC frente a CA\. La respuesta correcta es/i.test(ped)) {
    return true;
  }
  if (/sigue la cadena RF → mezcla\/FI → detección → audio\. La respuesta correcta es/i.test(ped)) {
    return true;
  }
  if (/^Pregunta sobre .+ La opción que responde al criterio del banco es «/i.test(ped)) {
    return true;
  }
  if (/^Cada diodo tiene función distinta: rectificar, estabilizar tensión \(Zener\)/i.test(ped)) {
    return true;
  }
  if (/^En este enunciado \(«/.test(ped) && /Repasa .+ en el temario y fija qué regla/.test(ped)) {
    return true;
  }
  if (
    /^La autorización y el indicativo condicionan quién puede operar/.test(ped) &&
    ped.length < 130
  ) {
    return true;
  }
  return false;
}

/** Plantilla «Respecto a… opción que cumple el enunciado» (perezosa; no usar en banco nuevo). */
export function isRespectoTemplateExplain(text) {
  return /^Respecto a «.+», la opción que cumple el enunciado en el banco es «/i.test(String(text || "").trim());
}

/** @param {object} q */
export function isGenericPedagogicalExplain(q) {
  return isGenericExplainText(pedagogicalExplain(q));
}

/** Plantilla LF/HF mal pegada a preguntas que no son de bandas ITU. */
export function isMisassignedBandExplain(text, stem, correct) {
  const t = String(text || "");
  if (!/LF son frecuencias muy bajas|Cada símbolo ITU agrupa un tramo espectral/i.test(t)) {
    return false;
  }
  const s = String(stem || "").toLowerCase();
  const c = String(correct || "").toLowerCase();
  const looksLikeBandAnswer =
    /\b(lf|mf|hf|vhf|uhf|ehf|shf)\b/i.test(c) ||
    /\d+\s*(a|-|–)\s*\d+\s*(mhz|khz)/i.test(c) ||
    /megahercio|kilometr|ondas\s+(kilom|hectom|decam)/i.test(c);
  const stemAboutBands =
    /bandas de frecuencia|nomenclatura|gama de frecuencias|símbolo.*mhz|tramo espectral|\b(lf|mf|hf|vhf|uhf)\b.*corresponde/i.test(
      s,
    );
  if (stemAboutBands && looksLikeBandAnswer) return false;
  const quoted = t.match(/(?:respuesta|opción) (?:correcta )?es «([^»]+)»/i)?.[1];
  if (quoted && correct) {
    const qn = normalizeForMatch(quoted);
    const cn = normalizeForMatch(correct);
    if (qn && cn && qn !== cn && !qn.includes(cn) && !cn.includes(qn)) return true;
  }
  return true;
}

/** @param {string} ped @param {string} stem */
export function isStemExplainTopicConflict(ped, stem) {
  const p = String(ped || "").toLowerCase();
  const s = String(stem || "").toLowerCase();
  if (!p || !s) return false;
  if (/securit[eé]|señal de seguridad|seguridad en radiotelefon/i.test(s) && /\brst\b|legibilidad.*intensidad.*tono/i.test(p)) {
    if (/no confundir|ni con rst|no es rst|frente a rst/i.test(p)) return false;
    if (/^\s*rst\b|resume.*\brst\b|en fon[ií]a.*\brst\b/i.test(p)) return true;
    return false;
  }
  if (/(mayday|socorro inminente|peligro grave)/i.test(s) && /securit[eé]/i.test(p) && !/mayday|socorro/i.test(p)) {
    return true;
  }
  if (/\brst\b|informe de señal|legibilidad.*intensidad/i.test(s) && /securit[eé].*tres veces|mayday.*tres veces/i.test(p)) {
    return true;
  }
  if (/bandas de frecuencia|nomenclatura|gama de frecuencias|\bhf\b.*corresponde|\blf\b.*corresponde/i.test(s)) {
    if (/primeros auxilios|accidente de tr[aá]fico|\bpls\b|proteger la zona/i.test(p)) return true;
  }
  if (/distorsi[oó]n/i.test(s) && /lf son frecuencias|símbolo itu|30.?300\s*khz/i.test(p)) return true;
  if (/distorsi[oó]n/i.test(s) && /indicativo|distrito ea|cept\b/i.test(p) && !/distorsi|señal de salida|arm[oó]nico/i.test(p)) {
    return true;
  }
  if (/indicativo de especializaci[oó]n|especializaci[oó]n/.test(s) && /inicio y al final de cada comunicaci[oó]n|identifica la estaci[oó]n y debe usarse/i.test(p)) {
    return true;
  }
  if (/indicativo (fijo|variable|de especializaci)/i.test(s) && /inicio y al final de cada comunicaci[oó]n|identifica la estaci[oó]n y debe usarse/i.test(p)) {
    return true;
  }
  if (/(abreviatura|significa|qu[eé] es).*\b(qrm|qsb|qsl|qsy|qrn|qth|qrv|qrl)\b/i.test(s) && /distintivo identifica|inicio y al final de cada comunicaci/i.test(p)) {
    return true;
  }
  if (/(vocoder|monitorizaci[oó]n remota|banal|tetra\b|contra sentido de circulaci)/i.test(s) && /ley de ohm|marco normativo del banco|criterio del banco es/i.test(p)) {
    return true;
  }
  if (/(creciente|decreciente|ascendente|descendente|numeraci[oó]n que)/i.test(s) && /indicativo español combina prefijo|distintivo identifica la estaci/i.test(p)) {
    return true;
  }
  if (/\bpls\b|accidente de tr[aá]fico|primeros auxilios/i.test(s) && /s[ií]mbolo itu|lf son frecuencias|cept coordina/i.test(p)) {
    return true;
  }
  if (/distorsi[oó]n/i.test(s) && /identifica la estaci[oó]n y debe usarse/i.test(p)) {
    return true;
  }
  if (
    /(deletrea|deletreo|alfabeto fon|fon[eé]tico|\bicao\b|emite con el siguiente indicativo|indicativo:)/i.test(s) &&
    /identifica la estaci[oó]n y debe usarse al inicio/i.test(p)
  ) {
    return true;
  }
  if (/\brst\b/i.test(s) && /securit[eé].*tres veces/i.test(p) && !/no confundir/i.test(p)) {
    return true;
  }
  if (/(mayday|socorro|señal de socorro|señal de peligro|peligro grave)/i.test(s) && /\brst\b|legibilidad.*intensidad.*tono/i.test(p)) {
    if (!/no confundir.*rst|rst no/i.test(p)) return true;
  }
  if (/rectificador/.test(s) && /funci[oó]n|consiste/.test(s) && /^Cada diodo tiene función distinta/i.test(p)) {
    return true;
  }
  if (/asignar (el )?sufijo|sufijo\s+(pan|mm|mo)\b/i.test(s) && /identifica la estaci[oó]n y debe usarse/i.test(p)) {
    return true;
  }
  if (/identifica la estaci[oó]n y debe usarse al inicio/i.test(p)) {
    const stemAboutEtiquette =
      /(inicio y (al )?final|al principio y al final|debe usarse al inicio|obligatorio.*identificar|identificaci[oó]n.*(inicio|final|comunicaci))/i.test(
        s,
      );
    if (!stemAboutEtiquette && /(sufijo|asignar|clase\s+[abc]|prefijo\s+ed|especializaci|formato del indicativo)/i.test(s)) {
      return true;
    }
  }
  return false;
}

/** Frases de plantilla mal asignadas (pass 3 de verificación estricta). */
export const BANNED_EXPLAIN_PHRASES = [
  {
    code: "generic_callsign",
    re: /identifica la estaci[oó]n y debe usarse al inicio/i,
    unlessStem: /distintivo.*(inicio|final|comunicaci)|debe usarse al inicio|al principio y al final/i,
  },
  {
    code: "lf_band_template",
    re: /lf son frecuencias muy bajas/i,
    unlessStem: /\blf\b|30.?300\s*khz|bandas de frecuencia/i,
  },
  {
    code: "rst_template",
    re: /\brst\b.*legibilidad.*intensidad/i,
    unlessStem: /\brst\b|informe de señal|legibilidad.*intensidad.*tono/i,
  },
];

/**
 * @param {string} ped
 * @param {string} stem
 * @returns {string[]}
 */
export function bannedExplainPhraseHits(ped, stem) {
  const hits = [];
  const s = String(stem || "");
  const p = String(ped || "");
  if (!p) return hits;
  for (const rule of BANNED_EXPLAIN_PHRASES) {
    if (!rule.re.test(p)) continue;
    if (rule.unlessStem && rule.unlessStem.test(s)) continue;
    hits.push(rule.code);
  }
  return hits;
}

export function isMisassignedPedagogicalExplain(q) {
  const ped = pedagogicalExplain(q);
  if (!ped) return false;
  const correct = String(q?.options?.[q.correctIndex] ?? "");
  if (isMisassignedBandExplain(ped, q?.stem, correct)) return true;
  if (isStemExplainTopicConflict(ped, q?.stem)) return true;
  return false;
}

/** @param {object} q */
export function needsExplainRefresh(q) {
  const issues = auditQuestionExplain(q);
  if (issues.some((i) => i.level === "fail")) return true;
  if (isGenericPedagogicalExplain(q)) return true;
  if (isMisassignedPedagogicalExplain(q)) return true;
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

  if (isMisassignedBandExplain(pedagogy, stem, correct)) {
    issues.push({ level: "fail", code: "explain_band_mismatch" });
  } else if (isStemExplainTopicConflict(pedagogy, stem)) {
    issues.push({ level: "fail", code: "explain_topic_mismatch" });
  }

  if (TOPIC_FALLBACK_RE.test(pedagogy)) {
    issues.push({ level: "warn", code: "generic_topic_fallback" });
  } else if (GENERIC_FALLBACK_RE.test(pedagogy) && pedagogy.length < 220) {
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
