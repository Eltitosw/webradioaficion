/**
 * Reglas pedagógicas ancladas al enunciado (máxima cobertura por bloque temático).
 */
import { EA_DISTRICTS } from "../data/utilidades.js";

const PHONETIC_ICAO = {
  A: "Alfa",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliet",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
};

/** @type {{ re: RegExp, id: string }[]} */
const PROVINCE_DISTRICT = [];
for (const d of EA_DISTRICTS) {
  const chunk = d.provinces.replace(/\([^)]*\)/g, " ");
  for (const part of chunk.split(/[,;]/)) {
    let name = part.replace(/^(y|e)\s+/i, "").trim();
    name = name.replace(/\s+y\s+.*$/i, "").trim();
    if (name.length < 4 || /castilla|comunidad|país|región|illes|ciudades|galicia|andalucía|extremadura|valencia|murcia|baleares|canarias|vasco|navarra|aragon|cataluña|madrid/i.test(name)) {
      continue;
    }
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    PROVINCE_DISTRICT.push({ re: new RegExp(`\\b${esc}\\b`, "i"), id: d.id });
  }
}

/** @param {string} stem @param {string} wrong @param {string} correct */
function explainDistrict(stem, wrong, correct) {
  if (!/provincia|cifra|distrito|identifica.*estaci/i.test(stem)) return "";
  const w = String(wrong).trim();
  const c = String(correct).trim();
  if (!/^\d+$/.test(w) || !/^\d+$/.test(c) || w === c) return "";
  for (const { re, id } of PROVINCE_DISTRICT) {
    if (re.test(stem)) {
      return `Esa provincia pertenece al distrito ${id} (cifra «${id}» en el indicativo EA…). «${w}» no es la cifra de ese distrito; aquí corresponde «${c}».`;
    }
  }
  return `La cifra del indicativo español identifica el distrito geográfico; para este enunciado la tabla oficial marca «${c}», no «${w}».`;
}

/** @param {string} stem @param {string} wrong @param {string} correct */
function explainPhonetic(stem, wrong, correct) {
  if (!/deletrea|alfabeto fon[eé]tico|fon[eé]tico internacional|c[oó]digo icao/i.test(stem)) {
    return "";
  }
  const m = stem.match(/letra\s+["']?([A-Z])["']?/i) || stem.match(/letra\s+([A-Z])\s+se/i);
  if (!m) return "";
  const letter = m[1].toUpperCase();
  const icao = PHONETIC_ICAO[letter];
  if (!icao) return "";
  const w = wrong.toLowerCase();
  const c = correct.toLowerCase();
  if (c.includes(icao.toLowerCase()) && !w.includes(icao.toLowerCase())) {
    return `En el alfabeto fonético ICAO la letra ${letter} es «${icao}», no palabras españolas ni nombres propios («${wrong}»).`;
  }
  return "";
}

/**
 * Reglas { stem, wrong?, correct?, msg } — wrong/correct opcionales.
 * @type {{ stem: RegExp, wrong?: RegExp, correct?: RegExp, msg: string | ((w: string, c: string) => string) }[]}
 */
const GUIDED_RULES = [
  // —— Electricidad básica ——
  {
    stem: /conductor.*mayor calor|mayor calor.*conductor/i,
    wrong: /menor resistencia|m[aá]s intensidad|capacidad/i,
    msg: "Al calentar el conductor aumenta su resistividad: la resistencia sube, no baja. Tampoco cambia la capacidad ni la intensidad por el solo hecho del calor.",
  },
  {
    stem: /electroim[aá]n.*almacene|almacene energ[ií]a.*electroim/i,
    wrong: /alterna|condensador|resistencia en paralelo/i,
    msg: "El electroimán almacena energía en el campo magnético con corriente continua que crea el núcleo; la CA o un condensador en paralelo no son la respuesta de manual.",
  },
  {
    stem: /quemadura|quemaduras/i,
    wrong: /aceite|grasa|lana|dec[uú]bito supino/i,
    msg: "En quemaduras no se aplican grasas ni aceites; se enfría con agua limpia y se avisa al médico. La posición supina no sustituye esa actuación.",
  },
  {
    stem: /conducciones a tierra|conductores de tierra/i,
    wrong: /calefacci[oó]n|no deben ser de cobre|hierro/i,
    msg: "La toma de tierra debe ser conductora y permanente; no se conecta a calefacción ni se prohíbe el cobre por norma básica. Lo crítico: no llevar fusible en el conductor de protección.",
  },
  {
    stem: /distorsi[oó]n/i,
    wrong: /disminuye|decibelio|se quema|quema/i,
    msg: "Distorsión significa que la forma de la señal de salida ya no replica la de entrada (armónicos, saturación); no es solo nivel en dB ni avería del equipo.",
  },
  {
    stem: /megaohmio|megaohm/i,
    msg: (w, c) =>
      `Mega = 10⁶: un megaohmio son un millón de ohmios. «${w}» mezcla prefijos (kilo, mega, giga) o magnitudes.`,
  },
  {
    stem: /kiloohmio|kiloohm/i,
    msg: (w) => `Kilo = 10³: un kiloohmio son mil ohmios, no un millón ni un gigaohmio.`,
  },
  {
    stem: /producto de un voltio.*amperio|voltio y un amperio/i,
    wrong: /amperio|faradio|ohm/i,
    msg: "P = V·I: el producto voltio × amperio da vatios (potencia), no ohmios ni faradios.",
  },
  {
    stem: /resistencias en serie|resistencia total.*serie/i,
    wrong: /producto|mayor|menor/i,
    msg: "En serie las resistencias se suman: Req = R1 + R2 + …; no es el producto ni solo la mayor o menor.",
  },
  {
    stem: /resistencias en paralelo|paralelo.*resistencias/i,
    wrong: /suma de las resistencias|producto/i,
    msg: "En paralelo la conductancia se suma: 1/Req = 1/R1 + 1/R2 + …; no se suman las resistencias directamente.",
  },
  {
    stem: /unidad de resistencia|resistencia es el/i,
    wrong: /faradio|voltio|vatio|henrio|culombio/i,
    msg: "La unidad de resistencia en SI es el ohmio (Ω); faradio es capacidad, henrio inductancia, vatio potencia.",
  },
  {
    stem: /unidad de capacidad|capacidad es el/i,
    wrong: /ohmio|henrio|vatio|amperio/i,
    msg: "La capacidad se mide en faradios (F) o submúltiplos; el ohmio es resistencia.",
  },
  {
    stem: /unidad de inductancia|inductancia es el/i,
    wrong: /faradio|ohmio|vatio/i,
    msg: "La inductancia se mide en henrios (H); no confundir con faradio ni ohmio.",
  },
  {
    stem: /amper[ií]metro se conecta|conecta.*amper[ií]metro/i,
    wrong: /derivaci[oó]n|paralelo|transformador/i,
    msg: "El amperímetro mide intensidad en la rama: va en serie. En derivación medirías con un voltímetro.",
  },
  {
    stem: /volt[ií]metro se conecta|conecta.*volt[ií]metro/i,
    wrong: /serie/i,
    msg: "El voltímetro se conecta en paralelo entre dos puntos; en serie alteraría la corriente.",
  },
  {
    stem: /condensadores en paralelo|capacidad.*paralelo/i,
    wrong: /serie|disminuye|inversa.*serie/i,
    msg: "En paralelo las capacidades se suman; en serie la equivalente es menor (suma de inversas).",
  },
  {
    stem: /condensador.*corriente continua|continua.*condensador/i,
    wrong: /cortocircuito|corta|conduce siempre/i,
    msg: "En CC estable el condensador ideal termina cargado y no conduce (circuito abierto), no en corto permanente.",
  },
  {
    stem: /bobina.*corriente continua|continua.*bobina/i,
    wrong: /circuito abierto|abierto/i,
    msg: "En CC estable la bobina ideal se comporta como cortocircuito (después del transitorio), no como abierto.",
  },
  {
    stem: /ley de ohm|v\s*=\s*i|tensi[oó]n.*intensidad.*resistencia/i,
    wrong: /potencia|faradio|capacidad/i,
    msg: "La ley de Ohm relaciona V, I y R (V = I·R); potencia es P = V·I, otra magnitud.",
  },
  {
    stem: /potencia el[eé]ctrica|vatios/i,
    wrong: /voltio|amperio solo|ohmio/i,
    msg: "Potencia (W) = V × I; no confundir unidad de potencia con tensión o resistencia aisladas.",
  },
  {
    stem: /valor eficaz|rms|eficaz.*alterna/i,
    wrong: /m[aá]ximo|pico|cresta/i,
    msg: "El valor eficaz (RMS) equivale térmicamente a una CC; el pico de una senoidal es mayor (√2 veces el eficaz).",
  },
  {
    stem: /decibelio|dbm|dbµv/i,
    wrong: /vatios lineales|voltios lineales|ohmios/i,
    msg: "Los dB expresan relaciones logarítmicas; dBm referencia 1 mW. No sustituyen una medida lineal sin convertir.",
  },
  {
    stem: /autotransformador/i,
    wrong: /automotor|aut[oó]noma|autodevanad/i,
    msg: "Autotransformador comparte parte del devanado (una sola bobina con toma), no es un transformador «de coche» ni bobinas totalmente separadas.",
  },
  {
    stem: /transformador elevador|elevador/i,
    wrong: /mismas espiras|primario.*m[aá]s espiras/i,
    msg: "En elevador el secundario tiene más espiras que el primario (V2 > V1); a igual espiras no hay elevación.",
  },
  {
    stem: /transformador reductor|reductor/i,
    wrong: /secundario.*m[aá]s espiras/i,
    msg: "En reductor el secundario tiene menos espiras que el primario; más espiras en secundario sería elevador.",
  },
  {
    stem: /flujo de electrones|corriente el[eé]ctrica/i,
    wrong: /tensi[oó]n|voltio|potencia/i,
    msg: "Corriente es flujo de carga (A); tensión es diferencia de potencial (V). No intercambies magnitudes.",
  },
  {
    stem: /cantidad de electricidad|carga el[eé]ctrica|culombio/i,
    wrong: /amperio|vatio|ohmio/i,
    msg: "La carga se mide en culombios; el amperio es carga por segundo (intensidad).",
  },
  {
    stem: /factor de potencia|coseno/i,
    wrong: /resistencia pura|vatios aparentes solo/i,
    msg: "El factor de potencia (cos φ) relaciona potencia activa y aparente en CA por el desfase entre V e I.",
  },

  // —— Componentes ——
  {
    stem: /transistor.*tres|tres electrodos|base.*emisor.*colector/i,
    wrong: /dos terminales|diodo|ánodo.*c[aá]todo solo/i,
    msg: "El transistor tiene base, emisor y colector (BJT) o puerta, fuente y drenaje (FET); no es un dipolo como el diodo.",
  },
  {
    stem: /diodo.*sentido|sentido.*diodo|conduce.*diodo/i,
    wrong: /ambos sentidos|sin polaridad/i,
    msg: "El diodo conduce preferentemente en directa y bloquea en inversa (modelo ideal).",
  },
  {
    stem: /c[oó]digo de colores|colores de la resistencia/i,
    msg: "Lee las bandas en orden: cifras, multiplicador y tolerancia; convierte a ohmios antes de elegir.",
  },

  // —— Marco normativo ——
  {
    stem: /estaci[oó]n autom[aá]tica|desatendid/i,
    wrong: /s[ií]|únicamente|hf|aislad|15 a[nñ]os/i,
    msg: "El radioaficionado no puede instalar estación automática desatendida; el banco marca prohibición absoluta.",
  },
  {
    stem: /examen de radioaficionado|prueba de capacitaci[oó]n/i,
    wrong: /emisiones|una vez al a[nñ]o|s[oó]lo.*espa[nñ]a/i,
    msg: "El examen acredita conocimientos para operar con autorización; no autoriza por sí solo a emitir sin trámite ni es anual único.",
  },
  {
    stem: /anticipaci[oó]n.*emisiones|comienzo de las emisiones/i,
    wrong: /2 meses|3 meses|ninguno|quince d[ií]as/i,
    msg: "El plazo de preaviso al iniciar emisiones en el banco es de un mes, no dos ni tres.",
  },
  {
    stem: /inspecci[oó]n.*telecomunicaciones|sometidas a la inspecci/i,
    wrong: /únicamente|solo si|500\s*w/i,
    msg: "Las estaciones de aficionado pueden ser inspeccionadas siempre, no solo por interferencias o alta potencia.",
  },
  {
    stem: /autorizaci[oó]n especial.*emisiones|periodo que duren/i,
    wrong: /9 meses|15 meses|18 meses|6 meses/i,
    msg: "La autorización especial de emisiones suele otorgarse por doce meses en el supuesto del banco.",
  },
  {
    stem: /interferencias.*radiodifusi[oó]n|interferencia.*broadcast/i,
    wrong: /informar|seguir emitiendo|telecomunicaciones y seguir/i,
    msg: "Ante interferencia a radiodifusión protegida hay que suspender de inmediato, no continuar emitiendo.",
  },
  {
    stem: /planes de banda.*iaru|iaru.*plan/i,
    wrong: /91[,.]5|no prev[eé]n|hemisferio sur|digital.*91/i,
    msg: "Los planes IARU orientan segmentos y repetidores en bandas de aficionado (p. ej. 433 MHz en Región 1), no sustituyen al BOE.",
  },
  {
    stem: /clase de emisi[oó]n|a3e|j3e|f3e|f1b/i,
    wrong: /telegraf[ií]a sin|solo datos|televisi[oó]n/i,
    msg: "Las clases ITU describen modulación y contenido (A3E telefonía AM, J3E SSB, F1B RTTY, etc.).",
  },
  {
    stem: /memoria descriptiva/i,
    wrong: /licencia|sustituye|no es necesaria/i,
    msg: "La memoria descriptiva documenta la estación; no sustituye la licencia ni otros requisitos del reglamento.",
  },
  {
    stem: /infracci[oó]n|sanci[oó]n|multa/i,
    wrong: /leve siempre|sin sanci[oó]n|advertencia oral/i,
    msg: "El régimen sancionador clasifica infracciones por gravedad; contrasta la redacción del supuesto.",
  },
  {
    stem: /transmisiones entre estaciones|comunicaciones del servicio de aficionados/i,
    wrong: /comercial|terceros|ajeno|publicidad/i,
    msg: "Solo tráfico propio del servicio (ensayo técnico, formación, actividad de aficionados), no mensajes comerciales ni ajenos.",
  },
  {
    stem: /potencia.*urbano|casco urbano|fuera del casco/i,
    wrong: /50.*urbano|10.*fuera|100\s*w/i,
    msg: "En urbano el límite habitual es menor (10 W); fuera del casco puede llegar a 50 W salvo motivación.",
  },
  {
    stem: /asociaci[oó]n|socio de una asociaci/i,
    wrong: /obligatorio|requisito indispensable|sin licencia/i,
    msg: "Pertenecer a una asociación es voluntario; la autorización individual sigue siendo obligatoria para operar.",
  },
  {
    stem: /cept|harec|pa[ií]s visitado/i,
    wrong: /sustituye|nacional|sin tr[aá]mite/i,
    msg: "CEPT/HAREC facilitan operar en el extranjero con reglas locales; no eliminan la normativa del país visitado.",
  },
  {
    stem: /n[uú]mero de provincias|provincias.*distrito/i,
    msg: "Cuenta provincias reales del distrito según la tabla URE; no confundas distritos ni dupliques provincias.",
  },

  // —— Nomenclatura ondas / bandas ——
  {
    stem: /\buhf\b.*ondas|ondas.*\buhf\b|subdivisi[oó]n m[eé]trica.*uhf/i,
    wrong: /m[eé]tricas(?!.*deci)|hectom[eé]tricas|kilom[eé]tricas/i,
    msg: "UHF corresponde a ondas decimétricas (decenas de cm), no métricas ni hectométricas.",
  },
  {
    stem: /\buhf\b|ultra.?alta frecuencia/i,
    wrong: /m[eé]tricas(?!.*deci)/i,
    msg: "UHF = ondas decimétricas en nomenclatura ITU.",
  },
  {
    stem: /\bvhf\b.*ondas|ondas.*\bvhf\b/i,
    wrong: /decim[eé]tricas|hectom[eé]tricas|kilom[eé]tricas/i,
    msg: "VHF son ondas métricas (30–300 MHz), no decimétricas ni hectométricas.",
  },
  {
    stem: /\bhf\b.*ondas|s[ií]mbolo hf|ondas.*\bhf\b/i,
    wrong: /m[eé]tricas|decim[eé]tricas|kilom[eé]tricas/i,
    msg: "HF son ondas hectométricas (3–30 MHz), no métricas ni decimétricas.",
  },
  {
    stem: /\bmf\b|s[ií]mbolo mf/i,
    wrong: /decam[eé]tricas|kilom[eé]tricas|m[eé]tricas/i,
    msg: "MF son ondas hectométricas (300 kHz–3 MHz) en la tabla del examen, no decamétricas.",
  },
  {
    stem: /\blf\b|s[ií]mbolo lf/i,
    wrong: /hectom[eé]tricas|decam[eé]tricas|m[eé]tricas/i,
    msg: "LF son ondas kilométricas (30–300 kHz), no hectométricas.",
  },
  // —— Receptores / emisores ——
  {
    stem: /portadora no modulada|portadora sin modul|no manipulada/i,
    wrong: /s[ií].*permit|siempre|libre/i,
    msg: "Emitir portadora sin información útil desperdicia espectro; en examen suele prohibirse o limitarse.",
  },
  {
    stem: /banda lateral superior|usb\b|modo.*usb/i,
    wrong: /am\b|doble banda|lsb solo/i,
    msg: "USB selecciona la banda lateral superior; no es AM de doble banda lateral ni LSB.",
  },
  {
    stem: /modula un emisor|cuando se modula/i,
    wrong: /amplifica|filtra|solo antena/i,
    msg: "Modular es variar un parámetro de la portadora (amplitud, frecuencia o fase) con la información.",
  },
  {
    stem: /ancho de banda.*disminuye|disminuye.*ancho de banda/i,
    wrong: /sensibilidad|potencia transmitida/i,
    msg: "Al estrechar el ancho de banda aumenta la selectividad (filtra mejor canales vecinos); no es lo mismo que sensibilidad.",
  },

  // —— Antenas / propagación ——
  {
    stem: /relaci[oó]n de ondas estacionarias|roe\b/i,
    wrong: /alta es buena|cuanto m[aá]s alta|infinito deseable/i,
    msg: "ROE cercana a 1 indica buen acoplamiento; ROE alta implica desadaptación y pérdidas.",
  },
  {
    stem: /ondas de radio.*naturaleza|naturaleza.*ondas de radio/i,
    wrong: /sonoras|mec[aá]nicas|longitudinales/i,
    msg: "Las ondas de radio son electromagnéticas (E y B en el vacío), no sonoras ni mecánicas.",
  },
  {
    stem: /capas ionizadas|ionosfera.*propagaci/i,
    wrong: /troposfera solo|sin reflexi[oó]n|solo vhf/i,
    msg: "La ionosfera (capas F, E…) permite reflexión y propagación HF a larga distancia; no es lo mismo que troposfera.",
  },

  // —— Instalaciones ——
  {
    stem: /antelaci[oó]n.*desmontaje|propiedad del inmueble/i,
    wrong: /sin plazo|inmediato|un a[nñ]o/i,
    msg: "Salvo urgencia, el propietario puede exigir desmontaje con plazo previo (en el banco suele ser un mes).",
  },
  {
    stem: /seguro.*responsabilidad|contrato de seguro/i,
    wrong: /opcional siempre|no es necesario|estado/i,
    msg: "La responsabilidad civil de la instalación puede exigir cobertura según normativa de antenas y comunidad.",
  },
  {
    stem: /ley\s*19\/1983|antenas.*estaciones/i,
    wrong: /telecomunicaciones generales|solo tv/i,
    msg: "La Ley 19/1983 regula instalaciones de antenas y derechos en edificios, no sustituye todo el reglamento de telecom.",
  },

  // —— Operación / seguridad ——
  {
    stem: /alfabeto fon[eé]tico internacional/i,
    wrong: /espa[nñ]ol|nato solo|n[uú]meros/i,
    msg: "El alfabeto fonético ICAO estandariza letras (Alfa, Bravo…) para evitar confusiones en fonía.",
  },
  {
    stem: /\bpse\b/i,
    wrong: /por favor|gracias|fin/i,
    msg: "PSE (please) pide consideración o «por favor» en tráfio; no significa fin de mensaje ni QSL.",
  },
  {
    stem: /transmisiones entre estaciones.*limitar/i,
    wrong: /comercial|ajeno|cualquier tema/i,
    msg: "El tráfico debe limitarse a fines del servicio de aficionados (técnico, formación, hobby).",
  },

  // —— Licencias ——
  {
    stem: /extranjeros.*residentes|condici[oó]n de residente/i,
    wrong: /sin tr[aá]mite|autom[aá]tico|solo turista/i,
    msg: "Residir en España implica cumplir requisitos nacionales; la condición de residente no exime de autorización.",
  },
  {
    stem: /qui[eé]n puede hacer uso de una estaci[oó]n/i,
    wrong: /cualquiera|sin licencia|solo el fabricante/i,
    msg: "Debe ser radioaficionado autorizado, con permiso del titular de la estación cuando no es el propietario.",
  },
  {
    stem: /provincias.*distrito\s*7|distrito\s*7/i,
    wrong: /madrid|barcelona|valencia/i,
    msg: "El distrito 7 agrupa Andalucía (Huelva, Sevilla, Málaga…), no provincias del centro o levante.",
  },
];

/**
 * @param {string} stem
 * @param {string} wrong
 * @param {string} correct
 */
export function explainStemGuided(stem, wrong, correct) {
  const district = explainDistrict(stem, wrong, correct);
  if (district) return district;

  const phon = explainPhonetic(stem, wrong, correct);
  if (phon) return phon;

  for (const r of GUIDED_RULES) {
    if (!r.stem.test(stem)) continue;
    if (r.wrong && !r.wrong.test(wrong)) continue;
    if (r.correct && !r.correct.test(correct)) continue;
    if (typeof r.msg === "function") return r.msg(wrong, correct);
    return r.msg;
  }

  return "";
}
