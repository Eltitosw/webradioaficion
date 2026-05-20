/**
 * Coherencia enunciado ↔ tema publicado. Evita “cajón basura” en electricidad/marco.
 */

/** Palabras que descalifican un tema (contaminación clara). */
export const TOPIC_STEM_FORBID = {
  "electricidad-basica": [
    /c[oó]digo\s*["']?\s*q|\bq(?:rm|rn|sy|rt|sl|th|ro|rp)\b/i,
    /distintivo|\bindicativo\b|\bcept\b|\bharec\b|mayday|securit[eé]/i,
    /señal\s+.*\bsocorro\b|radiotelegr\w*fica\s+de\s+socorro/i,
    /transceptor|superheterodin|mezclador|compresi[oó]n de un transceptor/i,
    /acceso a internet|\badsl\b|autorizaci[oó]n de radioaficionado|licencia cept/i,
    /gama de frecuenc.*\d+.*mhz|reflexiones lunares|conmutador de banda/i,
    /modulaci[oó]n de banda lateral|sobremodulaci[oó]n/i,
    /repetidor.*vhf|estaci[oó]n autom[aá]tica desatendid/i,
  ],
  "licencias-indicativos": [
    /transceptor|compresi[oó]n de un transceptor|ley de ohm\b|condensador|volt[ií]metro|mezclador|superheterodin/i,
  ],
  "magnetismo-ondas": [/distintivo de llamada|licencia de estaci[oó]n/i],
  "operacion-seguridad": [/ley de ohm\b|condensador|faradio|henrio\b|dipolo|transformador el[eé]ctrico/i],
};

/** Temas “cajón por defecto”: exigen señal mínima en el enunciado. */
export const TOPIC_STEM_REQUIRE = {
  "electricidad-basica":
    /ohm|volt|amper|vat|watt|resist|condens|induct|transform|farad|henr|coulomb|pilas?|bater[ií]a|circuito|corriente|tensi[oó]n|potencia|fusible|electroim[aá]n|osciloscopio|pol[ií]metro|mult[ií]metro|termistor|semiconductor|electr[oó]n|conductor|diel[eé]ctrico|autoinducci|válvula|tubo electr|fuente de alimentaci|electr[oó]cit|descarga.*electric|incendio.*electric|unidades el[eé]ctric|db[μuµ]?v|dbm\b|dbw\b|factor de potencia|wattios|kiloohm/i,
  "marco-normativo":
    /estaci[oó]n|radioaficionado|licencia|autorizaci|reglament|art[ií]culo|anexo|titular|inspecci|infracci|sanci[oó]n|boe|secretar[ií]a|potencia.*(emitir|salida|m[aá]xima)|repetidor|servicio de radioaficionado|examen de radioaficionado|prueba de capacitaci|plan.*banda|iaru\b|convocatoria|comunicaciones.*ocultar|normativa vigente/i,
};

const DEFAULT_TOPICS = new Set(["electricidad-basica", "marco-normativo"]);

/**
 * @param {string} stem
 * @param {string} topicId
 */
export function stemForbiddenInTopic(stem, topicId) {
  const list = TOPIC_STEM_FORBID[topicId];
  return Array.isArray(list) && list.some((re) => re.test(stem));
}

/**
 * @param {string} stem
 * @param {string} topicId
 */
export function stemRequiredForTopic(stem, topicId) {
  const re = TOPIC_STEM_REQUIRE[topicId];
  return re ? re.test(stem) : true;
}

/**
 * @param {string} stem
 * @param {string} topicId
 * @param {{ ruleId?: string; confidence?: string }} classification
 */
export function isStemCoherentWithTopic(stem, topicId, classification = {}) {
  const s = String(stem || "");
  if (stemForbiddenInTopic(s, topicId)) return false;

  const { ruleId = "", confidence = "medium" } = classification;

  if (ruleId === "default-topic-ok") return false;

  if (DEFAULT_TOPICS.has(topicId)) {
    if (!stemRequiredForTopic(s, topicId)) return false;
    if (confidence === "low" || ruleId === "fallback-review") return false;
  }

  if (ruleId === "fallback-review") return false;

  return true;
}
