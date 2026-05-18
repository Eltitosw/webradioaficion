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
  if (
    /\bpls\b|accidente de tr[aá]fico|primeros auxilios|creciente|decreciente|proteger la zona|pas\b|inconsciente y respira|breve.*comunicaci/i.test(
      s,
    )
  ) {
    return "operacion-seguridad";
  }
  if (/deletrea|alfabeto fon|c[oó]digo q\b|qsy|qrt|qrl|mayday|socorro|\brst\b|securit[eé]|fon[ií]a/i.test(s)) {
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
 * @returns {string|null}
 */
export function explainItuBandRange(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  const hay = `${s} ${c.toLowerCase()}`;
  const bands = [
    { keys: /\blf\b|30.*300\s*khz/i, label: "LF (Low Frequency)", range: "30–300 kHz" },
    { keys: /\bmf\b|300.*3000\s*khz/i, label: "MF (Medium Frequency)", range: "300–3000 kHz" },
    { keys: /\bhf\b|3.*30\s*mhz|3-30\s*mhz/i, label: "HF (High Frequency)", range: "3–30 MHz" },
    { keys: /\bvhf\b|30.*300\s*mhz|30-300\s*mhz/i, label: "VHF", range: "30–300 MHz" },
    { keys: /\buhf\b|300.*3000\s*mhz/i, label: "UHF", range: "300–3000 MHz" },
    { keys: /\bshf\b/i, label: "SHF", range: "3–30 GHz (tabla ITU)" },
  ];
  for (const b of bands) {
    if (b.keys.test(hay) || (/\bhf\b/i.test(s) && b.label.startsWith("HF"))) {
      return `En la nomenclatura ITU, ${b.label} designa el tramo aproximado de ${b.range}. Para este enunciado la respuesta correcta es «${c}».`;
    }
  }
  if (/\bhf\b/i.test(s) && /^hf\.?$/i.test(c)) {
    return `El símbolo HF corresponde al tramo de 3–30 MHz en la tabla ITU del examen. La respuesta es «${c}».`;
  }
  return null;
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
  if (/securit[eé]|señal de seguridad|seguridad en radiotelefon/i.test(s)) {
    return `La señal radiotelefónica internacional de seguridad es la palabra «Securité» (ortografía ITU), repetida tres veces. No confundir con Mayday (socorro) ni con RST. La opción correcta es «${c}».`;
  }
  if (/\bpls\b|posición lateral de seguridad/i.test(s)) {
    return `La PLS (posición lateral de seguridad) es una maniobra de primeros auxilios para mantener la vía aérea en personas inconscientes que respiran. Aparece en material de formación de operadores y emergencias; la respuesta es «${c}».`;
  }
  if (/accidente de tr[aá]fico|proteger la zona|pas\b/i.test(s) && /proteger|avisar|socorrer|llamar/i.test(c + s)) {
    return `En primeros auxilios el protocolo PAS ordena: Proteger la escena, Avisar (112), Socorrer. Lo primero es evitar nuevos daños antes de actuar. Por eso encaja «${c}».`;
  }
  if (/creciente|decreciente/i.test(s) && /numeraci/i.test(c)) {
    return `En señalización vial y mapas, «creciente» indica que la numeración de la calle aumenta en esa dirección (frente a decreciente). «${c}».`;
  }
  if (/breve.*comunicaci|comunicaci.*breve|significa.*breve/i.test(s)) {
    return `En operación por radio, «breve» significa ser claro con el mínimo de palabras necesarias (buena práctica y códigos Q). La respuesta es «${c}».`;
  }
  if (/informaci[oó]n relacionada.*servicio de aficionados|actividad del servicio de aficionados/i.test(c)) {
    return `El reglamento limita las emisiones del servicio de aficionados a ensayos técnicos, formación y actividad propia del servicio; no tráfico ajeno ni comercial. «${c}».`;
  }
  if (/lf\b|mf\b|hf\b|vhf|uhf|ondas kilom|ondas hectom|bandas de frecuencia|nomenclatura|gama de frecuencias/i.test(s)) {
    const band = explainItuBandRange(s, c);
    if (band) return band;
  }
  if (/acoplada al paso final|adaptadores y filtros/i.test(s + c)) {
    return `La etapa de potencia se acopla a la antena mediante filtros y adaptadores de impedancia según el diseño del equipo. «${c}».`;
  }
  if (/ea\d+\/ea\d|distintivo.*m[oó]vil|estaci[oó]n m[oó]vil del distrito/i.test(s + c)) {
    return `En indicativos españoles, la barra y la cifra de distrito indican operación móvil fuera del distrito de la estación base (p. ej. EA5/EA4…). «${c}».`;
  }
  if (/diel[eé]ctrico/i.test(s)) {
    return `Un dieléctrico es un material aislante que puede almacenar carga en un condensador (constante dieléctrica ε). «${c}».`;
  }
  if (/ondas de radio|naturaleza.*electromagn/i.test(s)) {
    return `Las ondas de radio son ondas electromagnéticas que se propagan en el espacio sin medio material. «${c}».`;
  }
  if (/sintonizada|sintonizaci[oó]n|resuena a la frecuencia/i.test(s)) {
    return `Una antena sintonizada resuena a la frecuencia de la señal y acopla mejor la energía radiada. «${c}».`;
  }
  if (/ancho de banda|selectividad/i.test(s)) {
    return `Al estrechar el ancho de banda del receptor se filtran más señales fuera del canal deseado; suele aumentar la selectividad. «${c}».`;
  }
  if (/volumen en rf|volumen.*radiofrecuencia/i.test(s)) {
    return `El control de volumen en RF ajusta el nivel de señal en radiofrecuencia antes de la etapa de audio. «${c}».`;
  }
  if (/digital display|dial de presentaci[oó]n|frecuencia de trabajo/i.test(s)) {
    return `El display digital del transceptor indica la frecuencia de sintonía o trabajo del equipo. «${c}».`;
  }
  if (/voltio.*amperio|producto de un voltio/i.test(s)) {
    return `Potencia eléctrica P = V·I; un voltio multiplicado por un amperio es un vatio (W). «${c}».`;
  }
  if (/cantidad de electricidad|culombio/i.test(s)) {
    return `La cantidad de electricidad (carga) se mide en culombios (C), no en amperios ni vatios. «${c}».`;
  }
  if (/flujo de electrones|corriente el[eé]ctrica/i.test(s)) {
    return `La corriente eléctrica es el flujo ordenado de cargas (electrones) por un conductor. «${c}».`;
  }
  if (/amper[ií]metro|conecta en serie/i.test(s)) {
    return `El amperímetro mide intensidad y debe ir en serie con la rama que quieres medir. «${c}».`;
  }
  if (/circuito oscilante|resonancia cuando/i.test(s)) {
    return `En resonancia las reactancias inductiva y capacitiva se compensan y la impedancia del circuito oscilante es mínima (serie) o máxima (paralelo) según el caso. «${c}».`;
  }
  if (/omnidireccional/i.test(s)) {
    return `Una antena omnidireccional irradia con patrón similar en el plano horizontal (360°). «${c}».`;
  }
  if (/modula un emisor|modulaci[oó]n/i.test(s) && /portadora/i.test(c + s)) {
    return `Modular es variar algún parámetro de la portadora (amplitud, frecuencia o fase) según la señal de información. «${c}».`;
  }
  if (/banda lateral superior|usb\b/i.test(s)) {
    return `USB (Upper Side Band) transmite la banda lateral superior de la modulación; el mando de modo debe seleccionar USB. «${c}».`;
  }
  if (/inductancia|autoinducci[oó]n|oponerse a la variaci[oó]n de corriente/i.test(s)) {
    return `La inductancia se opone a los cambios de corriente (efecto de autoinducción). «${c}».`;
  }
  if (/ondas estacionarias|roe\b|relaci[oó]n de ondas/i.test(s)) {
    return `La ROE (relación de ondas estacionarias) mide el acoplamiento línea–antena; valores cercanos a 1 indican buena adaptación. «${c}».`;
  }
  if (/\bbalun\b|\bbalum\b/i.test(s)) {
    return `El balun (balum) adapta impedancias y puede pasar de línea balanceada a coaxial (asimétrica). «${c}».`;
  }
  if (/superheterodin|superheterodyne|cag\b|\bfi\b/i.test(s) && /fi|cag|frecuencia intermedia/i.test(c + s)) {
    return `La superheterodinia traslada la señal a frecuencia intermedia para filtrar y amplificar; facilita el control automático de ganancia. «${c}».`;
  }
  if (/antena directiva|direcci[oó]n preferencial/i.test(s)) {
    return `Una antena directiva concentra radiación o recepción en una dirección preferente. «${c}».`;
  }
  if (/\bqrm\b|sufre una interferencia|interferencia.*c[oó]digo q|c[oó]digo q.*interferencia/i.test(s)) {
    return `QRM indica interferencia de origen artificial (otras emisiones o equipos). «${c}».`;
  }
  if (/\bqsd\b|manipulaci[oó]n defectuosa|defectuosa la manipulaci/i.test(s)) {
    return `QSD indica manipulación defectuosa o ilegible en telegrafía. «${c}».`;
  }
  if (/\bqrn\b|ruido atmosf/i.test(s)) {
    return `QRN indica ruido atmosférico o natural que afecta la recepción. «${c}».`;
  }
  if (/\bqsb\b|debilitan y fortalecen/i.test(s)) {
    return `QSB indica que la señal recibida varía de intensidad (fading). «${c}».`;
  }
  if (/\bqsy\b|cambio de frecuencia/i.test(s)) {
    return `QSY solicita o indica cambio de frecuencia de operación. «${c}».`;
  }
  if (/\bqth\b|ubicaci[oó]n/i.test(s) && /\bqth\b/i.test(c)) {
    return `QTH es la ubicación o emplazamiento de la estación en tráfico. «${c}».`;
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

  if (
    existing &&
    !isGenericExplainText(existing) &&
    !/^Práctica (histórica|con figura)/i.test(existing.trim())
  ) {
    const merged = `${existing.replace(/\s*FEDI-EA\.?\s*$/i, "").trim()} La respuesta que marca el banco es «${correct}».`;
    return finalizeExplain(stem, correct, merged);
  }

  return synthesizeReason(stem, correct, topic);
}
