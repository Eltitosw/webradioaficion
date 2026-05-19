/**
 * Clasificación del banco: prueba oficial (part) + bloque temario (topicId).
 * Prioriza contenido del enunciado sobre el bloque FEDI/Quijotes de origen.
 */
import { CLASSIFICATION_OVERRIDES } from "../data/question-classification-overrides.mjs";

/** Enunciado claramente de 1.ª prueba (técnica). */
export const PART1_TECHNICAL_STEM_RE =
  /transceptor|superheterodin|ley de ohm\b|condensador|volt[ií]metro|amper[ií]metro|osciloscopio|diodo|transistor|mezclador|demodul|dipolo|propagaci[oó]n|ionosfera|relaci[oó]n de ondas estacionarias|\broe\b|ganancia de radiofrecuencia|compresi[oó]n de un transceptor|squelch|control autom[aá]tico de ganancia|vox-man|amplificador a transistor|circuito resonante|bobina de inductancia|transformador|faradio|henrio|rectificador|clase de emisi[oó]n a3|modo de emisi[oó]n a[0-9]/i;

/** Código Q, socorro operativo, abreviaturas de tráfico. */
export const PART2_QCODE_STEM_RE =
  /\bq(?:sy|rm|sb|rt|ra|th|sl|rv)\b|abreviatura.*c[oó]digo\s*q|c[oó]digo\s*q\s+corresponde|del\s+c[oó]digo\s+q|qu[eé]\s+abreviatura\s+indica|jerga.*qsy|señal radiotelegr[aá]fica de socorro|señal radiotelef[oó]nica de socorro|llamada de socorro|mensaje de socorro|señal internacional de seguridad|pan\s*pan\b|buena pr[aá]ctica.*finalizar una comunicaci|abreviatura\s+ttt|abreviatura\s+xxx|abreviatura.*\bcl\b/i;

/** Enunciado claramente de 2.ª prueba (reglamentación / operación). */
export const PART2_REGULATORY_STEM_RE =
  /reglamento|boe-a|orden iet|distintivo|\bindicativo\b|autorizaci[oó]n|licencia de estaci|art[ií]culo\s+\d|anexo\s+i\b|dominio p[uú]blico radioel|comunidad de propietarios|mayday|securit[eé]|\bc[oó]digo q\b|\brst\b|fon[eé]tic|harec|\bcept\b|t\/r\s*61|extranjeros.*acredit|titular de una estaci|potencia m[aá]xima.*(salida|portadora|emitir).*estaci|estaci[oó]n autom[aá]tica desatendid|gestor de una estaci[oó]n desatendid|repetidor.*(autoriz|vhf|objetivo|instalar|acceso|anal[oó]gico|digital|podr[aá]n|desatendida)|emisi[oó]n de radioaficionado|servicio de radioaficionado|infracci[oó]n|sanci[oó]n|secretar[ií]a de estado|cnaf|uit\b|examen de radioaficionado|prueba de capacitaci[oó]n|diploma de (operador|radioaficionado)|estaci[oó]n(es)? de (radio)?aficionados?|radioaficionado ubicad|provincia de .{3,30} se identifica|estaci[oó]n de (radio)?aficionado ubicad|cifra \d+ identifica.*estaci|estaci[oó]n (fija|m[oó]vil|port[aá]til|portable|remota|colectiva|digital)\b|tr[aá]fico entre estaciones|transmisiones entre estaciones de radioaficionados|deber[aá]n estar provistas|quedan sometidas a la inspecci|conecte con otras instalaciones|qui[eé]n puede (hacer uso|operar)|operar estaciones en el pa[ií]s visitado|plazo.*(autorizaci|licencia|montaje)|edad m[ií]nima.*licencia|montaje de (su|la) estaci|normativa vigente|prueba de capacitaci[oó]n|ocultar deliberadamente|jefatura.*inspecci[oó]n|emitir m[uú]sica|falta grave|abonar.*canon|socio de una asociaci|pa[ií]s visitado|cambio de domicilio|radiobalizas|construcci[oó]n propia|definir[ií]a.*radiocomunicaci|qu[eé] es la radiocomunicaci|estaci[oó]n digital de aficionado|no es titular de la estaci|reglamentaci[oó]n vigente permite|interferencia perjudicial.*seguridad de la vida|comunicaci[oó]n entre distintas estaciones de un mismo titular|distritos de (ceuta|melilla|los indicativos)|menci[oó]n portable|e[a-z]\d{1,2}\/[a-z0-9]+\/[a-z]|planes de banda|\biaru\b|\bpse\b|abreviatura\s+f3\b|conductores de tierra deben|colaboraci[oó]n.*cat[aá]strofes|señale la proposici[oó]n incorrecta|es err[oó]neo afirmar|cu[aá]l de las siguientes alternativas es correcta/i;

/** Señales técnicas P1 (bloques FEDI mezclados). */
export const PART1_WEAK_TECH_STEM_RE =
  /conductor el[eé]ctrico|electroim[aá]n|conducciones a tierra|ley de ohm|resistencia el[eé]ctrica|condensador|inductancia|transformador|semiconductor|vatios?\b|amperios?\b|voltios?\b|osciloscopio|mult[ií]metro|pol[ií]metro|bobina de|n[uú]cleo de hierro|diodo|transistor|tubo electr|válvula\b|corriente alterna|corriente continua|pilas se acoplan|fuente de alimentaci|neutralizaci[oó]n|ruido est[aá]tico|cantidad de electricidad|unidad de potencia|completa un ciclo|hercio|periodo\b|coulomb|descarga cuando trabaja en una instalaci[oó]n el[eé]ctrica|medida de corriente de placa|radiaci[oó]n perturbadora|flujo de electrones|pila el[eé]ctrica|circuito oscilante|capacidad est[aá] dada|fusibles|toma de tierra|balum|diel[eé]ctrico|factor de potencia|acumulador|fuerza electromotriz|autoinducci[oó]n|excitador|amplificador|emisor de|detecci[oó]n sirve|send.?rec|agc\b|s-meter|medidor.?s\b|mando vox|micr[oó]fono|reflexiones lunares|capas ionizadas|termistor|dsp\b|resonador de cuarzo|db[wμ]v|fading|intermodulaci|arm[oó]nic|espurias|ssb\b|usb.*lsb|incendio producido por electricidad|protecci[oó]n personal|emc\b|tormenta.*antena/i;

/** Señales reglamento P2 sin palabra «reglamento». */
export const PART2_WEAK_REG_STEM_RE =
  /estaci[oó]n(es)? de (radio)?aficionados?|servicio de (radio)?aficionados?|titular de (la|una) (licencia|autorizaci)|inspecci[oó]n de las estaciones/i;

/** Equipo en bloques FEDI mal etiquetados como P2 (legacy). */
export const PART2_MISFILED_TECH_STEM_RE =
  /transceptor|superheterodin|squelch|medidor\s*["']?s["']?|compresi[oó]n de un transceptor|ganancia de radiofrecuencia|conmutador.*modo de emisi[oó]n|control autom[aá]tico de ganancia|vox-man|mezclador.*receptor|etapas de (radio)?frecuencia|transistor pnp|transistor npn|amplificador a transistor|sintonizamos un emisor|load knob|control de carga|entra en altavoces|rf de una estaci[oó]n entra/i;

const PART2_LICENCIAS_STEM_RE =
  /distintivo|\bindicativo\b|\bed[0-9][a-z0-9]*\b|\bcept\b|\bharec\b|t\/r\s*61|autorizaci|sufijo|prefijo|licencia de estaci|distrito\s+\d|deletre|menci[oó]n\s+\/(p|m|mm|am|portable|m[oó]vil)|provincia de .+ se identifica|estaci[oó]n de (radio)?aficionado ubicad|cifra \d+ identifica.*estaci|ubicada en (la provincia|alicante|valencia|madrid|barcelona)|suspender.*licencia|identifica como\s+e[a-z]\d|distritos de (ceuta|melilla|los indicativos)|menci[oó]n portable al indicativ|acceso a los repetidores|objetivo.*instalar un repetidor|desatendidas podr[aá]n autorizarse|pa[ií]s visitado|traslade su residencia/i;

const PART2_INSTALACIONES_STEM_RE =
  /inmueble|comunidad de propietarios|propietarios|fachada|terraza|desmontaje.*antena|instalaci[oó]n de una antena.*(edificio|fachada|terraza)/i;

const PART2_OPERACION_STEM_RE =
  /mayday|securit[eé]|\bc[oó]digo q\b|\brst\b|fon[eé]tic|deletreo|socorro inminente|urgencia radi|señal de socorro|señal de urgencia|señal de seguridad|señal radiotelegr[aá]fica de socorro|señal internacional de seguridad|\bq(?:sy|rm|sb|rt|ra|th|sl|rv)\b|abreviatura.*c[oó]digo\s*q|c[oó]digo\s+q\s+corresponde|qu[eé]\s+abreviatura\s+indica|jerga.*qsy|llamada de socorro|mensaje de socorro|pan\s*pan\b|buena pr[aá]ctica.*finalizar una comunicaci/i;

/**
 * @param {string} stem
 */
export function topicIdPart1(stem) {
  const s = stem.toLowerCase();
  if (
    /antena|dipolo|radial|propagaci|ionosfera|troposfera|coaxial|yagi|balun|guia de onda|diagrama.*radiaci/i.test(
      s,
    ) &&
    !PART2_INSTALACIONES_STEM_RE.test(s)
  ) {
    return "antenas-prop";
  }
  if (
    /receptor|transmis|transceptor|mezclad|modul|demodul|oscilador|portadora|squelch|selectividad|sensibilidad|superheterodin|intermodulaci|ganancia de radiofrecuencia|emisor de|amplificador|detecci[oó]n sirve|send.?rec|agc\b|s-meter|medidor.?s\b|mando vox|conmutador.*emis|paso final|alta tensi[oó]n de placa|excitador|sintoniz/i.test(
      s,
    )
  ) {
    return "receptores-emisores";
  }
  if (
    /transformador|condens|resist|ohm|farad|amper|volt|bobin|circuito resonante|diodo|rectific|induct|transistor/i.test(
      s,
    )
  ) {
    return "componentes";
  }
  if (
    /onda|polarizaci|frecuencia|hf\b|vhf|uhf|ancho de banda|espectro|dbm|dbuv|clase de emisi|abreviatura (lf|mf|hf|vhf|uhf)|\b(lf|mf|hf|vhf|uhf)\b indica|nomenclatura de bandas|s[ií]mbolo (lf|mf|hf)|decibelio|modo de emisi[oó]n.*\bcw\b/i.test(
      s,
    )
  ) {
    return "magnetismo-ondas";
  }
  if (/digital display|dial de presentaci|distorsi[oó]n|arm[oó]nico/i.test(s)) {
    return "receptores-emisores";
  }
  return "electricidad-basica";
}

/**
 * @param {string} stem
 */
export function topicIdPart2(stem) {
  const s = stem.toLowerCase();
  if (
    PART2_OPERACION_STEM_RE.test(s) &&
    !/distintivo de llamada|autorizaci[oó]n de radioaficionado|plazo.*autorizaci/i.test(s)
  ) {
    return "operacion-seguridad";
  }
  if (PART2_LICENCIAS_STEM_RE.test(s) && !PART2_MISFILED_TECH_STEM_RE.test(s)) {
    return "licencias-indicativos";
  }
  if (PART2_INSTALACIONES_STEM_RE.test(s)) {
    return "instalaciones";
  }
  if (/antena|sistema radiante/i.test(s) && /instalaci|comunidad|propietario|desmontaje|fachada/i.test(s)) {
    return "instalaciones";
  }
  if (
    /examen de radioaficionado|prueba de capacitaci|objeto del servicio|organismos? (de|del) telecomunicaciones|secretar[ií]a de estado|potencia m[aá]xima|ganancia del sistema radiante|colaboraci[oó]n.*emergencia|planes de banda|abreviatura (pse|f3)\b|normativa vigente|comunicaciones.*ocultar|jefatura.*inspecci|interferencia perjudicial|definir[ií]a.*radiocomunicaci|reglamentaci[oó]n vigente|equipos.*construcci[oó]n propia|radiobalizas|estaci[oó]n digital de aficionado|obligado a informar/i.test(
      s,
    )
  ) {
    return "marco-normativo";
  }
  return "marco-normativo";
}

/**
 * @param {string} stem
 * @param {number} part
 */
export function inferTopicId(stem, part) {
  return part === 1 ? topicIdPart1(stem) : topicIdPart2(stem);
}

/**
 * @param {string} stem
 * @param {number} [sourcePart]
 */
export function isStrongPart1TechnicalStem(stem, sourcePart = 2) {
  if (PART2_MISFILED_TECH_STEM_RE.test(stem)) return true;
  if (PART1_TECHNICAL_STEM_RE.test(stem) && !PART2_REGULATORY_STEM_RE.test(stem)) return true;
  if (PART1_WEAK_TECH_STEM_RE.test(stem) && !PART2_REGULATORY_STEM_RE.test(stem)) return true;
  if (sourcePart === 2) {
    const p1 = topicIdPart1(stem);
    if (p1 !== "electricidad-basica" && !PART2_LICENCIAS_STEM_RE.test(stem)) return true;
  }
  return false;
}

/**
 * @param {string} stem
 */
export function isStrongPart2RegulatoryStem(stem) {
  if (PART2_MISFILED_TECH_STEM_RE.test(stem)) return false;
  if (PART2_REGULATORY_STEM_RE.test(stem)) return true;
  if (PART2_QCODE_STEM_RE.test(stem)) return true;
  if (PART2_LICENCIAS_STEM_RE.test(stem)) return true;
  if (PART2_OPERACION_STEM_RE.test(stem)) return true;
  if (PART2_INSTALACIONES_STEM_RE.test(stem)) return true;
  if (PART2_WEAK_REG_STEM_RE.test(stem) && !PART1_WEAK_TECH_STEM_RE.test(stem)) return true;
  return false;
}

/**
 * @param {string} stem
 * @param {number} sourcePart
 */
export function inferExamPart(stem, sourcePart = 2) {
  const s = String(stem || "");
  const p1Strong = isStrongPart1TechnicalStem(s, sourcePart);
  const p2Strong = isStrongPart2RegulatoryStem(s);
  if (p1Strong && !p2Strong) return 1;
  if (p2Strong && !p1Strong) return 2;
  const weakP1 = PART1_WEAK_TECH_STEM_RE.test(s);
  const weakP2 = PART2_WEAK_REG_STEM_RE.test(s) || PART2_LICENCIAS_STEM_RE.test(s);
  if (weakP2 && !weakP1) return 2;
  if (weakP1 && !weakP2) return 1;
  if (sourcePart === 1 || sourcePart === 2) return sourcePart;
  return 2;
}

/**
 * @param {string} topicId
 * @param {number} part
 */
function isDefaultTopic(topicId, part) {
  return part === 1 ? topicId === "electricidad-basica" : topicId === "marco-normativo";
}

/**
 * Tema «por defecto» pero coherente con el enunciado (no requiere revisión urgente).
 * @param {string} stem
 * @param {number} part
 * @param {string} topicId
 */
function isStemAlignedDefaultTopic(stem, part, topicId) {
  const s = String(stem || "").toLowerCase();
  if (isStrongPart2RegulatoryStem(stem) || PART2_QCODE_STEM_RE.test(stem)) return false;
  if (part === 1 && topicId === "electricidad-basica") {
    return true;
  }
  if (part === 2 && topicId === "marco-normativo") {
    return true;
  }
  if (part === 2 && (topicId === "licencias-indicativos" || topicId === "operacion-seguridad")) {
    return true;
  }
  if (part === 1 && topicId !== "electricidad-basica") {
    return PART1_WEAK_TECH_STEM_RE.test(s) || PART1_TECHNICAL_STEM_RE.test(s);
  }
  return false;
}

/**
 * @param {string} stem
 * @param {number} part
 */
export function isMisfiledPart2TechnicalStem(stem, part = 2) {
  return part === 2 && isStrongPart1TechnicalStem(stem, part);
}

/**
 * @param {object} opts
 * @param {string} opts.stem
 * @param {number} [opts.sourcePart]
 * @param {string} [opts.id]
 * @returns {{ part: number; topicId: string; ruleId: string; confidence: "high" | "medium" | "low" }}
 */
export function classifyQuestion({ stem, sourcePart = 2, id = "" }) {
  const override = id && CLASSIFICATION_OVERRIDES[id];
  if (override) {
    return {
      part: override.part,
      topicId: override.topicId,
      ruleId: "override",
      confidence: "high",
    };
  }

  const s = String(stem || "");
  const p1 = isStrongPart1TechnicalStem(s, sourcePart);
  const p2 = isStrongPart2RegulatoryStem(s);

  if (p1 && !p2) {
    return { part: 1, topicId: topicIdPart1(s), ruleId: "p1-technical", confidence: "high" };
  }
  if (p2 && !p1) {
    return { part: 2, topicId: topicIdPart2(s), ruleId: "p2-regulatory", confidence: "high" };
  }
  if (p1 && p2) {
    if (PART2_MISFILED_TECH_STEM_RE.test(s)) {
      return { part: 1, topicId: topicIdPart1(s), ruleId: "p1-tech-over-reg", confidence: "high" };
    }
    return { part: 2, topicId: topicIdPart2(s), ruleId: "p2-reg-over-tech", confidence: "medium" };
  }

  const part = inferExamPart(s, sourcePart);
  const topicId = inferTopicId(s, part);
  const partChanged = part !== sourcePart;
  const topicDefault = isDefaultTopic(topicId, part);

  if (part === 2 && isMisfiledPart2TechnicalStem(s, 2)) {
    return { part: 1, topicId: topicIdPart1(s), ruleId: "p2-misfiled-tech", confidence: "medium" };
  }
  if (partChanged) {
    return { part, topicId, ruleId: "inferred-part", confidence: "medium" };
  }
  if (!topicDefault) {
    return { part, topicId, ruleId: "inferred-topic", confidence: "medium" };
  }
  if (isStemAlignedDefaultTopic(s, part, topicId)) {
    return { part, topicId, ruleId: "default-topic-ok", confidence: "medium" };
  }
  return { part, topicId, ruleId: "fallback-review", confidence: "low" };
}

/**
 * @param {string} stem
 * @param {number} sourcePart
 * @returns {{ part: number; topicId: string }}
 */
export function reconcilePartAndTopic(stem, sourcePart) {
  const c = classifyQuestion({ stem, sourcePart });
  return { part: c.part, topicId: c.topicId };
}
