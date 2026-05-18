/**
 * Explicaciones ancladas al enunciado (evita fallbacks genéricos por bloque).
 */
import { repairSpanishText } from "./text-encoding.mjs";
import { explainMentionsCorrect, isGenericExplainText } from "./explain-faithfulness.mjs";

/**
 * @param {string} stem
 * @param {string} topicId
 */
export function inferExplainTopic(stem, topicId) {
  const s = stem.toLowerCase();
  if (
    /provincia|distrito|cifra.*identifica|indicativo|distintivo|prefijo\s*e\b|sufijo\s*pan|empadron|licencia cept|harec|cept\b|prefijo de pa[ií]s/i.test(
      s,
    )
  ) {
    return "licencias-indicativos";
  }
  if (/deletrea|alfabeto fon|c[oó]digo q\b|qsy|qrt|qrl|mayday|socorro|\brst\b|fon[ií]a/i.test(s)) {
    return "operacion-seguridad";
  }
  if (
    /reglamento|boe\b|infracci|sanci|inspecci|potencia.*\bw\b|estaci[oó]n desatend|iaru|clase de emisi|organismo|telecomunicaciones/i.test(
      s,
    )
  ) {
    return "marco-normativo";
  }
  if (/dipolo|antena\b|roe\b|yagi|propagaci|ionosfera|balun|acoplador|diagrama de radiaci|vat[ií]metro.*antena/i.test(s)) {
    return "antenas-prop";
  }
  if (
    /receptor|transmisor|superheterodino|mezclador|detector|demodul|\bfi\b|cag\b|agc\b|arm[oó]nico|selectividad|sensibilidad|pol[ií]metro|oscilador|ssb|cw\b/i.test(
      s,
    )
  ) {
    return "receptores-emisores";
  }
  if (/condensador|resistencia|faradio|ohmio|ohm\b|vatios|transformador|diodo|transistor|megaohm|kiloohm/i.test(s)) {
    return "componentes";
  }
  if (/campo magn|inducci|onda electrom|polarizaci|longitud de onda|frecuencia cr[ií]tica|muf\b/i.test(s)) {
    return "magnetismo-ondas";
  }
  if (/instalaci[oó]n|puesta a tierra|seguro de antena|comunidad de propiet|apantall/i.test(s)) {
    return "instalaciones";
  }
  return topicId;
}

/**
 * @param {string} stem
 * @param {string} correct
 * @param {string} topicId
 */
export function synthesizeReason(stem, correct, topicId) {
  const s = stem.toLowerCase();
  const c = correct.trim();

  if (/siguiente|figura|esquema|diagrama|gr[aá]fica|pantalla/i.test(s)) {
    return `Interpreta la figura junto con el enunciado: identifica qué magnitud, bloque o relación se pregunta. La opción que encaja es «${c}».`;
  }
  if (/ninguna de las (respuestas|anteriores)/i.test(c) || /ninguna de las anteriores/i.test(s)) {
    return `Las demás opciones no satisfacen todas las condiciones del enunciado a la vez; por eso la formulación válida es «${c}».`;
  }
  if (/provincia|ubicada en la provincia|cifra:/i.test(s) && /^\d+$/.test(c)) {
    return `La cifra del indicativo español identifica el distrito geográfico de la estación según la tabla oficial. Para este enunciado corresponde «${c}».`;
  }
  if (/deletrea|deletrear/i.test(s)) {
    return `El alfabeto fonético ICAO evita confusiones en fonía; deletrea letra a letra. La secuencia correcta es «${c}».`;
  }
  if (/c[oó]digo de colores|colores son/i.test(s)) {
    return `En el código de colores de resistencias, cada banda aporta cifras o tolerancia; calcula el valor antes de elegir. La respuesta es «${c}».`;
  }
  if (/detector de envolvente|modulaci[oó]n de amplitud|\bam\b/i.test(s) && /amplitud/i.test(c + s)) {
    return `En AM la información va en la amplitud de la portadora; el detector de envolvente recupera esa envolvente. La opción correcta es «${c}».`;
  }
  if (/portadora|sin modulaci/i.test(s)) {
    return `Sin modulación de información solo se transmite la portadora (potencia de portadora). La respuesta es «${c}».`;
  }
  if (/pol[ií]metro|mult[ií]metro/i.test(s)) {
    return `Tensión en paralelo, intensidad en serie; resistencia sin tensión de trabajo en el circuito. Para esta pregunta: «${c}».`;
  }
  if (/factor de potencia|coseno\s*φ|coseno\s*φ/i.test(s)) {
    return `El factor de potencia (coseno φ) relaciona potencia activa y aparente en CA y refleja el desfase entre tensión y corriente. «${c}».`;
  }
  if (/diodo/i.test(s) && /direcci[oó]n|sentido/i.test(s)) {
    return `El diodo conduce preferentemente en un sentido y bloquea en el inverso en el modelo ideal. «${c}».`;
  }
  if (/intermodulaci|no lineal|bloqueo|desensibiliz/i.test(s)) {
    return `Sistemas no lineales mezclan frecuencias y pueden bloquear el receptor con señales muy fuertes. «${c}».`;
  }
  if (/impedancia|radiales|cuarto de onda/i.test(s)) {
    return `La geometría del sistema radiante y los radiales modifican la impedancia de entrada de la antena. «${c}».`;
  }
  if (/mayday|socorro|sos\b/i.test(s)) {
    return `Las señales de socorro están reservadas a emergencias reales; su uso indebido es infracción. «${c}».`;
  }
  if (/lf\b|mf\b|hf\b|vhf|uhf|ondas kilom|ondas hectom/i.test(s)) {
    return `Cada abreviatura ITU designa un tramo del espectro; asocia LF/MF/HF/VHF/UHF con su banda. «${c}».`;
  }
  if (/megaohm|kiloohm|ohmio|faradio|henrio/i.test(s)) {
    return `Identifica la magnitud y su unidad SI antes de comparar opciones. «${c}».`;
  }
  if (/transistor|electrodos/i.test(s)) {
    return `Los transistores son dispositivos de tres terminales para amplificar o conmutar. «${c}».`;
  }
  if (/tierra|fusible|conducci[oó]n a tierra/i.test(s)) {
    return `La protección y la toma de tierra siguen reglas de seguridad eléctrica; no confundas con fusibles de línea. «${c}».`;
  }

  const topicHint = {
    "marco-normativo": "la normativa de aficionados y el BOE vigente",
    "licencias-indicativos": "licencias, indicativos y procedimientos CEPT",
    "electricidad-basica": "ley de Ohm, potencia y circuitos en CC/CA",
    "magnetismo-ondas": "campos, ondas y parámetros λ–f–v",
    componentes: "componentes pasivos y activos",
    "receptores-emisores": "cadenas de receptor y transmisor",
    "antenas-prop": "antenas, líneas y propagación",
    instalaciones: "instalaciones, seguridad y normativa de antenas",
    "operacion-seguridad": "operación, códigos Q y buenas prácticas",
  }[topicId] || "el temario del bloque";

  const stemBrief = stem.replace(/\s+/g, " ").trim().slice(0, 100);
  return `Pregunta sobre ${topicHint} («${stemBrief}${stem.length > 100 ? "…" : ""}»). La opción que responde al criterio del banco es «${c}».`;
}

/**
 * @param {string} stem
 * @param {string} correct
 * @param {string} text
 */
export function finalizeExplain(stem, correct, text) {
  let out = String(text || "").trim();
  if (!out) {
    out = synthesizeReason(stem, correct, "electricidad-basica");
  }
  if (!explainMentionsCorrect(out, correct)) {
    const core = out.replace(/\s*FEDI-EA\.?\s*$/i, "").trim();
    out = core ? `${core} La respuesta correcta es «${correct}».` : synthesizeReason(stem, correct, "electricidad-basica");
  }
  return repairSpanishText(out);
}

/**
 * Mejora explicación manual conservando el cuerpo si es buena.
 * @param {object} q
 * @param {string} [existing]
 */
export function refreshExplainForQuestion(q, existing) {
  const stem = repairSpanishText(String(q.stem || ""));
  const correct = repairSpanishText(String(q.options?.[q.correctIndex] ?? ""));
  const topic = inferExplainTopic(stem, q.topicId);

  if (
    existing &&
    !isGenericExplainText(existing) &&
    explainMentionsCorrect(existing, correct)
  ) {
    const cleaned = existing.replace(/\s*FEDI-EA\.?\s*$/i, "").trim();
    if (cleaned.length >= 40 && !/^Práctica (histórica|con figura)/i.test(cleaned)) {
      return finalizeExplain(stem, correct, cleaned);
    }
  }

  if (existing && !/^Práctica (histórica|con figura)/i.test(existing.trim())) {
    const merged = `${existing.replace(/\s*FEDI-EA\.?\s*$/i, "").trim()} La respuesta que marca el banco es «${correct}».`;
    return finalizeExplain(stem, correct, merged);
  }

  return synthesizeReason(stem, correct, topic);
}
