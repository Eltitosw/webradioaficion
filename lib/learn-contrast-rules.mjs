/**
 * Reglas de contraste para feedback «por qué no encaja» (aprender mientras practicas).
 */
import { Q_CODES } from "../data/utilidades.js";
import { explainStemGuided } from "./learn-stem-guided.mjs";

const Q_MEANING = Object.fromEntries(
  Q_CODES.map(({ code, meaning }) => [code.toUpperCase(), meaning.split("/")[0].trim()]),
);
Q_MEANING.QRT = "cesar transmisión / dejar de emitir";
Q_MEANING.QRX = "esperar / standby";
Q_MEANING.QSD = "manipulación defectuosa";
Q_MEANING.QRG = "frecuencia exacta";

/** @param {string} text */
function extractQCode(text) {
  const m = String(text || "").match(/\b(Q[A-Z]{2,3})\b/i);
  return m ? m[1].toUpperCase() : null;
}

/** @param {string} stem @param {string} wrong @param {string} correct */
export function explainQCodeContrast(stem, wrong, correct) {
  const s = String(stem || "").toLowerCase();
  if (!/c[oó]digo\s*q|\bqrm\b|\bqrn\b|\bqsy\b|\bqrt\b|\bqth\b|\bqsl\b|\bqrk\b/i.test(s + wrong + correct)) {
    return "";
  }
  const qw = extractQCode(wrong);
  const qc = extractQCode(correct);
  if (!qw || !qc || qw === qc) return "";
  const mw = Q_MEANING[qw];
  const mc = Q_MEANING[qc];
  if (mw && mc) {
    return `«${wrong}» usa ${qw} (${mw}); aquí corresponde ${qc} (${mc}). No intercambies códigos Q: cada uno describe otra situación operativa.`;
  }
  return `Confundes códigos Q: ${qw} y ${qc} no significan lo mismo en tráfico de aficionados.`;
}

/** Pares simétricos: si wrong coincide con w y correct con c (o al revés), devuelve msg. */
const CONTRAST_PAIRS = [
  // CA / CC / rectificador
  {
    w: /continua en alterna|cc.*ca|corriente continua en alterna/,
    c: /alterna en continua|ca.*cc|un solo sentido/,
    msg: "Invierte el sentido: rectificar es pasar de alterna (CA) a continua (CC), no al revés.",
  },
  {
    w: /alterna en continua|ca.*cc/,
    c: /continua en alterna|inversor/,
    msg: "Aquí no se pide rectificar hacia continua; revisa si el enunciado pide el proceso inverso (inversor).",
  },
  {
    w: /zener|led|varicap|emite luz|estabiliz/,
    c: /rectific|un solo sentido|alterna en continua/,
    msg: "Mezclas tipos de diodo: Zener, LED o varicap tienen otras funciones distintas de rectificar CA→CC.",
  },
  {
    w: /fusible|limitar.*corriente|m[aá]ximo.*corriente|proteger.*picos/,
    c: /rectific|alterna en continua/,
    msg: "Proteger o limitar corriente no define un rectificador; es otra función de componentes o circuitos.",
  },
  {
    w: /polaridad|cambiar la polaridad/,
    c: /rectific|alterna en continua/,
    msg: "Cambiar polaridad no es la definición de rectificador en manual; rectificar es CA→CC.",
  },

  // Señales de prioridad
  {
    w: /\bmayday\b|socorro grave/,
    c: /securit[eé]|seguridad/,
    msg: "Mayday es socorro grave e inminente; Securité es aviso de seguridad (sin peligro inmediato).",
  },
  {
    w: /securit[eé]/,
    c: /\bmayday\b|socorro/,
    msg: "Securité no sustituye a Mayday: son señales distintas con gravedad distinta.",
  },
  {
    w: /\bmayday\b/,
    c: /pan[\s-]?pan|urgencia/,
    msg: "Mayday es socorro (peligro grave); Pan-Pan es urgencia sin peligro inmediato.",
  },
  {
    w: /pan[\s-]?pan/,
    c: /\bmayday\b/,
    msg: "Pan-Pan es urgencia; Mayday solo cuando hay peligro grave e inminente.",
  },
  {
    w: /pan[\s-]?pan/,
    c: /securit[eé]/,
    msg: "Pan-Pan es urgencia operativa; Securité es aviso de seguridad (meteorología, obstáculos, etc.).",
  },
  {
    w: /securit[eé]/,
    c: /pan[\s-]?pan/,
    msg: "Securité no es urgencia clínica ni avería: es información de seguridad para la navegación u operación.",
  },
  {
    w: /\brst\b|legibilidad.*intensidad|tono/,
    c: /securit[eé]|mayday|pan[\s-]?pan|socorro/,
    msg: "RST valora calidad de señal (R/S/T); no es palabra de socorro, urgencia ni seguridad.",
  },
  {
    w: /securit[eé]|mayday|pan[\s-]?pan/,
    c: /\brst\b/,
    msg: "RST es un informe de calidad de señal, no una señal de emergencia, urgencia o seguridad.",
  },
  {
    w: /\bsos\b/,
    c: /\bmayday\b|pan[\s-]?pan/,
    msg: "En radiotelefonía moderna se usan Mayday/Pan-Pan/Securité; SOS es histórico en telegrafía.",
  },

  // Bandas ITU (rangos orientativos examen)
  {
    w: /\blf\b|30.*300\s*khz|kilom[eé]tr|ondas kilom/,
    c: /\bhf\b|3.*30\s*mhz|megaherc|ondas hectom/,
    msg: "Confundes tramos ITU: LF (30–300 kHz) y HF (3–30 MHz) son bandas distintas.",
  },
  {
    w: /\bhf\b|3.*30\s*mhz|hectom[eé]tr/,
    c: /\blf\b|kilom[eé]tr/,
    msg: "HF no es LF: revisa la tabla ITU (kHz frente a MHz).",
  },
  {
    w: /\bmf\b|300.*3000\s*khz/,
    c: /\bhf\b|\bvhf\b/,
    msg: "MF (300 kHz–3 MHz) no coincide con HF ni VHF; contrasta el rango en kHz/MHz.",
  },
  {
    w: /\bvhf\b|30.*300\s*mhz/,
    c: /\bhf\b|3.*30\s*mhz/,
    msg: "VHF (30–300 MHz) está por encima de HF (3–30 MHz); no intercambies símbolos.",
  },
  {
    w: /\buhf\b|300.*3000\s*mhz/,
    c: /\bvhf\b|30.*300\s*mhz/,
    msg: "UHF y VHF son tramos distintos en la nomenclatura ITU.",
  },
  {
    w: /\bhf\b/,
    c: /\buhf\b|\bshf\b/,
    msg: "El símbolo de banda no coincide: HF, UHF y SHF ocupan tramos diferentes del espectro.",
  },

  // Modulación y cadena de RX/TX
  {
    w: /modulaci[oó]n de frecuencia|\bfm\b|frecuencia modulada/,
    c: /modulaci[oó]n de amplitud|\bam\b|amplitud modulada|envolvente/,
    msg: "FM varía la frecuencia de la portadora; AM varía la amplitud. El detector adecuado no es el mismo.",
  },
  {
    w: /modulaci[oó]n de amplitud|\bam\b|amplitud modulada/,
    c: /modulaci[oó]n de frecuencia|\bfm\b/,
    msg: "AM y FM son modos distintos; no confundas envolvente con discriminador de frecuencia.",
  },
  {
    w: /detector de envolvente|envolvente/,
    c: /discriminador|detector.*frecuencia|\bfm\b/,
    msg: "El detector de envolvente sirve para AM; la FM usa discriminador o equivalente.",
  },
  {
    w: /discriminador|detector.*frecuencia/,
    c: /envolvente|\bam\b/,
    msg: "El discriminador es típico de FM; para AM se usa detector de envolvente.",
  },
  {
    w: /banda lateral|usb\b|lsb\b|lado único/,
    c: /doble banda|amplitud modulada pura|\ba3e\b/i,
    msg: "SSB transmite una sola banda lateral; AM clásica lleva dos bandas laterales alrededor de la portadora.",
  },
  {
    w: /portadora sin modul|solo portadora/,
    c: /banda lateral|informaci[oó]n|modulad/,
    msg: "Sin modulación no hay información en bandas laterales; solo queda la portadora.",
  },
  {
    w: /oscilador local|mezclador/,
    c: /detector|demodul|envolvente/,
    msg: "Oscilador y mezclador desplazan frecuencia en superheterodino; el detector recupera la información de audio.",
  },
  {
    w: /detector|demodul/,
    c: /mezclador|frecuencia intermedia|\bfi\b/,
    msg: "La etapa FI amplifica y filtra a frecuencia intermedia; el detector va después, hacia audio.",
  },
  {
    w: /selectividad/,
    c: /sensibilidad/,
    msg: "Selectividad separa canales cercanos; sensibilidad es capacidad de oír señales débiles.",
  },
  {
    w: /sensibilidad/,
    c: /selectividad/,
    msg: "Sensibilidad no es lo mismo que selectividad: una es umbral mínimo, la otra separación entre canales.",
  },

  // Circuitos pasivos
  {
    w: /en serie.*suman|suma.*resistencias/,
    c: /en paralelo|paralelo.*equivalente/,
    msg: "En serie las resistencias se suman; en paralelo se combinan por inversas (1/Req = Σ1/Ri).",
  },
  {
    w: /en paralelo.*suman|paralelo.*capacidad/,
    c: /en serie|serie.*capacidad/,
    msg: "En condensadores, en paralelo se suman capacidades; en serie la equivalente baja.",
  },
  {
    w: /circuito abierto|cortocircuito ideal/,
    c: /cortocircuito|conducta en continua/,
    msg: "En CC estable el condensador ideal es abierto y la bobina ideal es corto (tras el transitorio); no los inviertas.",
  },
  {
    w: /bobina.*circuito abierto|inductor.*abierto/,
    c: /bobina.*corto|inductor.*corto/,
    msg: "La bobina en CC estable se comporta como cortocircuito ideal, no como abierto.",
  },
  {
    w: /condensador.*corto/,
    c: /condensador.*abierto|carga.*continua/,
    msg: "El condensador en CC estable no conduce: equivale a circuito abierto, no a corto.",
  },

  // Magnitudes eléctricas
  {
    w: /amperio|intensidad|corriente/,
    c: /voltio|tensi[oó]n/,
    msg: "Tensión (V) e intensidad (A) son magnitudes distintas; revisa qué pide el enunciado (V = I·R).",
  },
  {
    w: /voltio|tensi[oó]n/,
    c: /amperio|intensidad/,
    msg: "No confundas tensión con intensidad: el amperímetro va en serie, el voltímetro en paralelo.",
  },
  {
    w: /vatio|vatios|potencia/,
    c: /voltio|tensi[oó]n/,
    msg: "Potencia (W) es V·I, no confundir vatios con voltios.",
  },
  {
    w: /voltio/,
    c: /vatio|potencia/,
    msg: "Un voltio es tensión; un vatio es potencia (producto V×I).",
  },
  {
    w: /culombio|carga el[eé]ctrica/,
    c: /amperio|intensidad/,
    msg: "La carga se mide en culombios; la intensidad es carga por segundo (amperios).",
  },
  {
    w: /valor m[aá]ximo|pico/,
    c: /eficaz|rms|valor cuadr/,
    msg: "En CA sinusoidal el valor eficaz (RMS) no coincide con el pico; usa la relación del temario.",
  },
  {
    w: /eficaz|rms/,
    c: /valor m[aá]ximo|pico/,
    msg: "El eficaz equivale térmicamente a una continua; el pico es mayor en una senoidal.",
  },

  // Antenas y propagación
  {
    w: /cuarto de onda|λ\/4|lambda\/4/,
    c: /media onda|λ\/2|mitad de onda|longitud.*mitad/,
    msg: "λ/4 y λ/2 son longitudes resonantes distintas; la impedancia y el patrón no son equivalentes.",
  },
  {
    w: /media onda|λ\/2|mitad de onda/,
    c: /cuarto de onda|λ\/4/,
    msg: "Dipolo de media onda (λ/2) no es lo mismo que monopolo de cuarto de onda (λ/4) con radiales.",
  },
  {
    w: /omnidireccional|360/,
    c: /directiva|yagi|direccional/,
    msg: "Omnidireccional irradia por el plano horizontal; Yagi o directiva concentran hacia un azimut.",
  },
  {
    w: /directiva|yagi|parab[oó]lica/,
    c: /omnidireccional|dipolo simple/,
    msg: "Antena directiva maximiza en una dirección; un dipolo simple no tiene el mismo diagrama.",
  },
  {
    w: /polarizaci[oó]n vertical/,
    c: /polarizaci[oó]n horizontal/,
    msg: "La polarización debe coincidir entre antenas; vertical y horizontal no acoplan igual.",
  },
  {
    w: /ionosfera.*capa\s*f|capa\s*f.*ionosfera/,
    c: /capa\s*d|absorci[oó]n.*d/i,
    msg: "La capa F favorece reflexión HF; la capa D absorbe más de día en frecuencias medias.",
  },
  {
    w: /roe.*alta|roe.*elevada|roe.*2|roe.*3/,
    c: /roe.*1|roe.*cercan|buen acoplamiento/,
    msg: "ROE cercana a 1 indica buen acoplamiento; valores altos implican desadaptación y pérdidas.",
  },
  {
    w: /balun|balum/,
    c: /atenuador|amplificador/,
    msg: "El balun adapta impedancias balanceada/asimétrica; no amplifica ni atenúa por sí solo como etapa activa.",
  },

  // Transistores y amplificación
  {
    w: /conmutador|interruptor electr/,
    c: /amplific|ganancia/,
    msg: "El transistor puede conmutar o amplificar según el polarizado; el enunciado pide una función concreta.",
  },
  {
    w: /amplific.*clase\s*a\b|clase\s*a.*amplific/,
    c: /clase\s*c\b|clase\s*b\b/,
    msg: "Clase A conduce todo el ciclo (baja eficiencia); C es muy eficiente en RF pero más distorsión.",
  },
  {
    w: /clase\s*c\b/,
    c: /clase\s*a\b/,
    msg: "Clase C recorta gran parte del ciclo; clase A reproduce la señal completa con mayor consumo.",
  },

  // Licencias e indicativos
  {
    w: /distintivo.*inicio.*final|debe usarse al inicio/,
    c: /sufijo|asignar|clase\s+[abc]|especializaci|indicativo de especializaci/,
    msg: "La etiqueta de uso del distintivo no responde a asignación de sufijos o clases de licencia.",
  },
  {
    w: /indicativo de especializaci|especializaci[oó]n/,
    c: /distintivo ordinario|ea\d|estaci[oó]n base/,
    msg: "El indicativo de especialización no sustituye al distintivo EA… ordinario de la estación.",
  },
  {
    w: /m[oó]vil|port[aá]til|ea\d\/ea\d/,
    c: /fijo|estaci[oó]n fija/,
    msg: "Indicativo móvil/portátil cambia con distrito o servicio; el fijo es el asignado a la instalación.",
  },
  {
    w: /cept|harec|pa[ií]s visitado/,
    c: /licencia nacional|ministerio|secretar[ií]a/,
    msg: "CEPT/HAREC facilitan operar en el extranjero; no sustituyen la autorización nacional de tu país.",
  },

  // Normativa y potencia
  {
    w: /10\s*w|diez\s*w/i,
    c: /50\s*w|cincuenta\s*w/i,
    msg: "El reglamento distingue límites en casco urbano (típ. 10 W) y fuera (hasta 50 W salvo motivación).",
  },
  {
    w: /50\s*w|cincuenta\s*w/i,
    c: /10\s*w|diez\s*w/i,
    msg: "No inviertas el límite urbano con el exterior: en urbano suele ser menor la potencia permitida.",
  },
  {
    w: /tr[aá]fico comercial|publicidad|terceros/,
    c: /ensayo|formaci[oó]n|servicio de aficionados/,
    msg: "El servicio de aficionados no admite tráfico ajeno ni comercial; solo actividad propia del servicio.",
  },

  // Primeros auxilios y PAS
  {
    w: /socorrer|reanimar|primeros auxilios directos/,
    c: /proteger|asegurar la zona|evitar nuevos/,
    msg: "En PAS lo primero es Proteger la escena; Socorrer viene después de Avisar (112).",
  },
  {
    w: /avisar|llamar.*112/,
    c: /proteger|asegurar la zona/,
    msg: "Antes de avisar hay que proteger la zona para evitar más víctimas.",
  },
  {
    w: /pls|posici[oó]n lateral/,
    c: /rcp|reanimaci[oó]n card|compresiones/,
    msg: "La PLS es para inconsciente que respira; RCP es si no respira o no tiene pulso.",
  },

  // Unidades y magnitudes
  {
    w: /menor resistencia/,
    c: /mayor resistencia/,
    msg: "Al calentar el metal aumenta la resistividad: la resistencia sube, no baja.",
  },
  {
    w: /mayor resistencia/,
    c: /menor resistencia/,
    msg: "A mayor temperatura la resistencia del conductor aumenta, no disminuye.",
  },
  {
    w: /mil ohmios|mil kiloohm|mil gigaohm|mil megaohm/i,
    c: /mill[oó]n|megaohm|10\^6/i,
    msg: "Mega = 10⁶ ohmios; no confundas con mil ohmios (kΩ) ni con otros prefijos.",
  },
  {
    w: /mil kiloohm|mil megaohm/i,
    c: /mill[oó]n|un millón/i,
    msg: "Un megaohmio = 10⁶ Ω; mil kiloohmios serían 10⁶ Ω también, pero «mil mega» o «mil kilo» mal planteados confunden prefijos.",
  },
  {
    w: /producto de las resistencias|producto.*resistencias/i,
    c: /suma de las resistencias|suma.*resistencias/i,
    msg: "En serie se suman las R; el producto no define la resistencia equivalente.",
  },
  {
    w: /suma de las resistencias/i,
    c: /producto|inversa|paralelo/i,
    msg: "En paralelo no se suman las resistencias; se usa la suma de inversas.",
  },
  {
    w: /derivaci[oó]n|paralelo/i,
    c: /serie/i,
    msg: "El amperímetro va en serie; en derivación (paralelo) medirías tensión.",
  },
  {
    w: /serie/i,
    c: /derivaci[oó]n|paralelo/i,
    msg: "El voltímetro va en paralelo entre puntos; en serie no es la conexión habitual.",
  },
  {
    w: /faradio|henrio|vatio|culombio/i,
    c: /ohmio|ohmnio/i,
    msg: "El ohmio (Ω) es unidad de resistencia; faradio es capacidad, henrio inductancia.",
  },
  {
    w: /amperio|faradio/i,
    c: /vatio/i,
    msg: "V·I da vatios (potencia); amperio o faradio solos no son el producto V×I.",
  },
  {
    w: /ondas m[eé]tricas/i,
    c: /ondas decim[eé]tricas|decim[eé]tricas/i,
    msg: "UHF son ondas decimétricas; las métricas corresponden a VHF.",
  },
  {
    w: /ondas hectom[eé]tricas/i,
    c: /ondas decam[eé]tricas|decam[eé]tricas/i,
    msg: "HF = hectométricas; decamétricas es otro tramo (más bajo en frecuencia).",
  },
  {
    w: /ondas decam[eé]tricas|decam[eé]tricas/i,
    c: /ondas hectom[eé]tricas|hectom[eé]tricas/i,
    msg: "MF/ HF en examen usan hectométricas para HF; no confundas con decamétricas.",
  },
  {
    w: /ondas miriam[eé]tricas|miriam[eé]tricas/i,
    c: /ondas hectom[eé]tricas/i,
    msg: "MF (miriamétricas) y HF (hectométricas) son tramos ITU distintos.",
  },
  {
    w: /en ning[uú]n caso/i,
    c: /s[ií]|únicamente|hf|aislad/i,
    msg: "Cuando el banco responde «en ningún caso», las excepciones listadas son distractores.",
  },
  {
    w: /s[ií]|únicamente|solo si/i,
    c: /en ning[uú]n caso|nunca|prohibid/i,
    msg: "La norma aquí es prohibitiva o absoluta; no admite las excepciones del distractor.",
  },
  {
    w: /2 meses|3 meses|quince d[ií]as/i,
    c: /1 mes|un mes/i,
    msg: "El plazo del reglamento en este supuesto es un mes; no dos ni tres.",
  },
  {
    w: /9 meses|15 meses|18 meses/i,
    c: /12 meses|doce meses/i,
    msg: "La autorización especial suele ser por doce meses en la redacción del banco.",
  },
  {
    w: /seguir emitiendo|informar al interferido/i,
    c: /suspender|cesar|inmediat/i,
    msg: "Ante interferencia grave a servicio protegido hay que cesar la emisión de inmediato.",
  },
  {
    w: /corriente alterna|alterna solamente/i,
    c: /corriente continua|continua/i,
    msg: "El electroimán en CC mantiene campo estable; la alterna sola no es la respuesta típica del manual.",
  },
  {
    w: /aceite|grasa sobre/i,
    c: /agua|limpiando.*agua/i,
    msg: "No se aplican grasas en quemaduras; agua limpia y asistencia médica.",
  },
];

/**
 * @param {string} stem
 * @param {string} wrong
 * @param {string} correct
 */
export function explainContrastPair(stem, wrong, correct) {
  const w = String(wrong || "").toLowerCase();
  const c = String(correct || "").toLowerCase();
  const s = String(stem || "").toLowerCase();

  for (const p of CONTRAST_PAIRS) {
    if (p.w.test(w) && p.c.test(c)) return p.msg;
    if (p.w.test(c) && p.c.test(w)) return p.msg;
  }

  const q = explainQCodeContrast(stem, wrong, correct);
  if (q) return q;

  if (/rectificador/.test(s) && /funci[oó]n|consiste/.test(s) && w !== c) {
    return `El distractor cambia la función del circuito o invierte CA/CC; la definición de rectificador en manual es «${correct}».`;
  }

  if (/\d/.test(wrong) && /\d/.test(correct) && /\d/.test(stem)) {
    if (/potencia|vatios|ohm|resistencia|capacidad|frecuencia|longitud|λ|lambda|db\b/i.test(s + w + c)) {
      return "Los valores numéricos no cuadran con la fórmula o unidad del enunciado; repasa magnitudes (V, A, W, Ω, Hz, m) antes de elegir.";
    }
  }

  return "";
}

/** Reglas ancladas al enunciado (prioridad sobre pares genéricos). */
const STEM_WRONG_RULES = [
  {
    stem: /rectificador.*funci[oó]n|funci[oó]n.*rectificador/i,
    wrong: /limitar.*m[aá]ximo|m[aá]ximo.*corriente|picos de corriente/i,
    msg:
      "Limitar los máximos de corriente (proteger de picos) corresponde a fusibles, resistencias o limitadores; no define un rectificador. Si buscas estabilizar o limitar tensión, entra el diodo Zener en otro contexto.",
  },
  {
    stem: /rectificador/i,
    wrong: /continua en alterna|corriente continua en alterna/i,
    msg: "Eso describe un inversor (CC → CA), lo contrario de rectificar. El rectificador va de alterna a continua.",
  },
  {
    stem: /rectificador/i,
    wrong: /polaridad|cambiar la polaridad/i,
    msg: "Cambiar polaridad no es la definición de manual: rectificar es pasar de CA a CC.",
  },
  {
    stem: /c[oó]digo de colores|colores de la resistencia/i,
    wrong: /tolerancia|oro|plata|marr[oó]n/i,
    msg: "Cada banda aporta cifra, multiplicador o tolerancia; recalcula el valor en Ω antes de elegir solo por el color.",
  },
  {
    stem: /amper[ií]metro|medir.*intensidad/i,
    wrong: /paralelo|en derivaci[oó]n/i,
    msg: "El amperímetro va en serie con la rama a medir; en paralelo medirías tensión con un voltímetro.",
  },
  {
    stem: /volt[ií]metro|medir.*tensi[oó]n/i,
    wrong: /serie|en serie/i,
    msg: "El voltímetro se conecta en paralelo entre dos puntos; en serie alteraría la corriente del circuito.",
  },
  {
    stem: /superheterodin|frecuencia intermedia|\bfi\b/i,
    wrong: /antena|captaci[oó]n/i,
    msg: "La antena captura RF; la FI es una etapa intermedia interna del receptor, no la antena.",
  },
  {
    stem: /agc|control autom[aá]tico de ganancia/i,
    wrong: /manual|potenci[oó]metro de volumen/i,
    msg: "AGC ajusta ganancia según nivel de señal; el volumen de audio es otro control posterior.",
  },
  {
    stem: /puesta a tierra|toma de tierra/i,
    wrong: /fusible|interruptor/i,
    msg: "La toma de tierra deriva corrientes de fallo; el fusible protege por sobrecorriente en la línea activa.",
  },
  {
    stem: /provincia|cifra.*indicativo|distrito/i,
    wrong: /sufijo|letras finales/i,
    msg: "La cifra del indicativo identifica distrito/provincia; el sufijo es la parte asignada tras la cifra.",
  },
];

/**
 * @param {string} stem
 * @param {string} wrong
 * @param {string} correct
 */
export function explainStemWrong(stem, wrong, correct) {
  const guided = explainStemGuided(stem, wrong, correct);
  if (guided) return guided;

  for (const r of STEM_WRONG_RULES) {
    if (r.stem.test(stem) && r.wrong.test(wrong)) {
      if (typeof r.msg === "function") return r.msg(wrong, correct);
      return r.msg;
    }
  }
  return "";
}

/** Pistas por tema cuando no hay contraste específico (mejor que plantilla vacía). */
const TOPIC_WRONG_HINTS = [
  {
    topic: "operacion-seguridad",
    stem: /mayday|socorro|urgencia|securit|pan/i,
    msg: "Orden de gravedad: Mayday (socorro) > Pan-Pan (urgencia) > Securité (seguridad). RST es calidad de señal.",
  },
  {
    topic: "operacion-seguridad",
    stem: /c[oó]digo q|\bqrm\b|\bqrn\b/i,
    msg: "Repasa el significado del código Q del enunciado; cada letra Q abrevia una situación distinta.",
  },
  {
    topic: "licencias-indicativos",
    stem: /indicativo|distintivo|prefijo|sufijo/i,
    msg: "Distingue prefijo E, cifra de distrito, sufijo asignado y reglas de móvil/fijo/especialización.",
  },
  {
    topic: "marco-normativo",
    stem: /potencia|w\b|vatios/i,
    msg: "Contrasta límites urbano/exterior y el artículo del reglamento citado en el temario.",
  },
  {
    topic: "electricidad-basica",
    stem: /ohm|resistencia|serie|paralelo|potencia/i,
    msg: "Aplica V = I·R y P = V·I; en serie sumas R, en paralelo usas inversas.",
  },
  {
    topic: "electricidad-basica",
    stem: /conductor|calor|resistividad|electroim[aá]n|quemadura|distorsi[oó]n/i,
    msg: "Relaciona magnitud física con efecto: calor↑→R↑, electroimán con CC, distorsión = forma de señal alterada.",
  },
  {
    topic: "electricidad-basica",
    stem: /deletrea|fon[eé]tico|provincia|cifra/i,
    msg: "ICAO para letras; tabla de distritos EA1–EA9 para cifras de provincia.",
  },
  {
    topic: "componentes",
    stem: /diodo|transistor|condensador|bobina/i,
    msg: "Cada componente tiene un comportamiento distinto en CC y CA; identifica cuál altera la magnitud que pregunta el enunciado.",
  },
  {
    topic: "receptores-emisores",
    stem: /receptor|transmisor|modulaci|demodul|detector/i,
    msg: "Sigue la cadena: RF → mezcla/FI → detección → audio; cada bloque tiene una función.",
  },
  {
    topic: "antenas-prop",
    stem: /antena|dipolo|yagi|propagaci|ionosfera/i,
    msg: "Relaciona longitud eléctrica (λ), polarización y banda; el diagrama de radiación no es opcional.",
  },
  {
    topic: "magnetismo-ondas",
    stem: /longitud de onda|frecuencia|λ|lambda/i,
    msg: "Usa λ = c/f (o λ = v/f en medio); frecuencia y longitud de onda son inversamente proporcionales.",
  },
  {
    topic: "marco-normativo",
    stem: /reglamento|ley general|infracci|dominio p[uú]blico|art[ií]culo\s*\d/i,
    msg: "Contrasta el artículo o plazo del BOE/reglamento; en examen suele cambiar un número, un plazo o el alcance de la obligación.",
  },
  {
    topic: "marco-normativo",
    stem: /examen|inspecci|anticipaci|autorizaci[oó]n especial|estaci[oó]n autom|iaru|interferencia/i,
    msg: "Fíjate en plazos (1 mes, 12 meses), prohibiciones absolutas («en ningún caso») y deber de cesar si hay interferencia.",
  },
  {
    topic: "marco-normativo",
    stem: /nomenclatura|ondas|s[ií]mbolo.*mf|s[ií]mbolo.*hf|s[ií]mbolo.*uhf/i,
    msg: "Tabla ITU: LF kilométricas, MF/HF hectométricas, VHF métricas, UHF decimétricas.",
  },
  {
    topic: "marco-normativo",
    stem: /transmisiones entre estaciones|servicio de aficionados|comunicaciones del servicio/i,
    msg: "El servicio de aficionados limita el tráfico a ensayos técnicos, formación y actividad propia; no mensajes ajenos ni comerciales.",
  },
  {
    topic: "instalaciones",
    stem: /conductores de tierra|puesta a tierra|toma de tierra/i,
    msg: "La puesta a tierra protege personas y equipos frente a fallos; no es lo mismo que fusible, magnetotérmico o seccionador de línea.",
  },
  {
    topic: "receptores-emisores",
    stem: /medidor\s*["']?s["']?|escala\s*s\b|indicador\s*s\b/i,
    msg: "La escala S del transceptor indica intensidad de señal recibida (relativa); no confundir con RST, potencia de TX ni SWR/ROE.",
  },
  {
    topic: "receptores-emisores",
    stem: /transceptor|receptor|emisora/i,
    msg: "Identifica si el enunciado habla de RF, FI, audio o potencia; cada etapa tiene función distinta en la cadena.",
  },
  {
    topic: "electricidad-basica",
    stem: /condensador|capacidad|faradio|microfaradio/i,
    msg: "En paralelo se suman C; en serie baja la equivalente; en CC estable el condensador ideal no conduce.",
  },
  {
    topic: "electricidad-basica",
    stem: /transformador|primario|secundario|espiras/i,
    msg: "En ideal V1/V2 = N1/N2; la potencia se transfiere por acoplamiento magnético, no es un divisor resistivo.",
  },
  {
    topic: "licencias-indicativos",
    stem: /residencia|empadron|pa[ií]s|cept|visita/i,
    msg: "Distingue licencia nacional, CEPT de visita y requisitos al cambiar de país de residencia.",
  },
];

/**
 * @param {string} topic
 * @param {string} stem
 * @param {string} wrong
 * @param {string} correct
 */
export function explainTopicWrongHint(topic, stem, wrong, correct) {
  for (const h of TOPIC_WRONG_HINTS) {
    if (h.topic === topic && h.stem.test(stem)) return h.msg;
  }
  return "";
}

/** Fallback didáctico por bloque (sustituye el mensaje vacío genérico). */
const BLOCK_PEDAGOGY = {
  "electricidad-basica":
    "Repasa magnitudes, unidades (Ω, V, A, W, F, H) y fórmulas V = I·R y P = V·I; el distractor suele mezclar unidades o confundir serie y paralelo.",
  "marco-normativo":
    "Contrasta plazo, alcance y prohibiciones del BOE/reglamento; en examen el distractor suele añadir una excepción o cifra que el artículo no admite.",
  componentes:
    "Identifica la función real del componente (diodo, transistor, C, L, transformador) y su comportamiento en CC frente a CA.",
  "receptores-emisores":
    "Sigue la cadena RF → FI → detección → audio y el tipo de modulación (AM, FM, SSB); cada etapa tiene una función distinta.",
  "antenas-prop":
    "Relaciona longitud eléctrica (λ), polarización, ROE y banda; el diagrama de radiación y la propagación no son accesorios.",
  "magnetismo-ondas":
    "Usa λ = c/f, campos E/B y parámetros de onda; frecuencia y longitud de onda son inversamente proporcionales.",
  instalaciones:
    "Normativa de antenas, tierra y seguridad: plazos, seguros y derechos en la comunidad de propietarios.",
  "licencias-indicativos":
    "Distingue indicativo EA (prefijo, cifra distrito, sufijo), CEPT/HAREC y quién puede operar cada estación.",
  "operacion-seguridad":
    "Señales Mayday/Pan-Pan/Securité, códigos Q y buenas prácticas; no confundas gravedad ni significados.",
};

/**
 * @param {string} topic
 * @param {string} stem
 * @param {string} wrong
 * @param {string} correct
 */
export function explainBlockPedagogy(topic, stem, wrong, correct) {
  const base = BLOCK_PEDAGOGY[topic];
  if (!base) return "";
  const w = String(wrong).trim();
  const c = String(correct).trim();
  return `«${w}» no encaja con lo que pide el enunciado. ${base} La respuesta que marca el banco es «${c}».`;
}

const BRIDGE_RULES = [
  {
    test: (s, c) => /rectificador/.test(s) && /funci[oó]n|consiste/.test(s),
    msg:
      "En la práctica el rectificador se monta con diodos (paso en un sentido). Zener, LED o varicap son otros usos del diodo; no los mezcles con la definición de rectificador.",
  },
  {
    test: (s, c) => /securit[eé]|mayday|pan[\s-]?pan|socorro|\brst\b/i.test(s + c),
    msg: "Recuerda: Mayday = socorro grave, Pan-Pan = urgencia, Securité = seguridad, RST = informe de señal (R/S/T).",
  },
  {
    test: (s) => /c[oó]digo\s*q|\bqrm\b|\bqrn\b|\bqsy\b|\bqrt\b/i.test(s),
    msg: "Agrupa códigos Q: QRM/QRN (perturbaciones), QRO/QRP (potencia), QSY/QRT (frecuencia y cese), QTH (ubicación), QSL (confirmación).",
  },
  {
    test: (s) => /\bhf\b|\blf\b|\bvhf\b|\buhf\b|bandas de frecuencia|nomenclatura|itu/i.test(s),
    msg: "Memoriza tramos ITU: LF/MF en kHz, HF en MHz (3–30), VHF/UHF en decenas/centenas de MHz.",
  },
  {
    test: (s) => /modulaci[oó]n|\bam\b|\bfm\b|envolvente|discriminador/i.test(s),
    msg: "AM → envolvente; FM → discriminador; SSB → una banda lateral. La portadora sola no lleva información.",
  },
  {
    test: (s) => /ohm|resistencia|serie|paralelo|potencia|vatios/i.test(s),
    msg: "Triángulo de examen: V = I·R, P = V·I; comprueba siempre unidades antes de marcar.",
  },
  {
    test: (s) => /antena|dipolo|yagi|λ|lambda|cuarto de onda/i.test(s),
    msg: "λ/2 dipolo y λ/4 con radiales no son equivalentes; revisa ROE y polarización al acoplar.",
  },
  {
    test: (s) => /indicativo|distintivo|cept|harec/i.test(s),
    msg: "EA + cifra distrito + sufijo; móvil EA5/EA4…; CEPT/HAREC para operar fuera con reglas locales.",
  },
  {
    test: (s) => /superheterodin|\bfi\b|mezclador|detector/i.test(s),
    msg: "Superheterodino: RF + oscilador → FI (filtra y amplifica) → detector → audio.",
  },
  {
    test: (s) => /pas\b|primeros auxilios|accidente/i.test(s),
    msg: "PAS: Proteger → Avisar (112) → Socorrer. PLS solo si respira y está inconsciente.",
  },
  {
    test: (s) => /megaohm|kiloohm|prefijo|unidad de/i.test(s),
    msg: "Prefijos SI: kilo 10³, mega 10⁶, giga 10⁹; comprueba siempre la unidad pedida (Ω, F, H, W).",
  },
  {
    test: (s) => /examen|inspecci|autorizaci|reglamento|boe/i.test(s),
    msg: "Normativa: plazos exactos, prohibiciones sin excepción y cese inmediato ante interferencia protegida.",
  },
  {
    test: (s) => /provincia|distrito|cifra.*indicativo/i.test(s),
    msg: "Memoriza EA1–EA9 y qué comunidades agrupa cada cifra del indicativo español.",
  },
];

/**
 * @param {string} stem
 * @param {string} correct
 */
export function explainBridge(stem, correct) {
  const s = String(stem || "").toLowerCase();
  const c = String(correct || "").toLowerCase();
  for (const r of BRIDGE_RULES) {
    if (r.test(s, c)) return r.msg;
  }
  return "";
}
