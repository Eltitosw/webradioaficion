/**
 * Genera explicaciones didácticas breves por tema (FEDI, URE, Quijotes, etc.).
 */
import { repairSpanishText } from "./text-encoding.mjs";
import { explainAnexoIPotencia, explainArt25hPotencia } from "./boe-explain.mjs";
import { tryExplainAficionadosReglamento } from "./explain-aficionados-reglamento.mjs";
import {
  explainItuBandRange,
  finalizeExplain,
  inferExplainTopic,
  synthesizeReason,
} from "./contextual-explain.mjs";

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainMarcoNormativo(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/estaciones autom[aá]ticas|desatendid/.test(s) && /potencia|w\b/i.test(s + c)) {
    return explainArt25hPotencia(c);
  }
  if (/potencia.*mhz|mhz.*potencia|50[,.]0.*51|anexo\s*i/i.test(s) && /\bw\b/i.test(c)) {
    return explainAnexoIPotencia(stem, c);
  }
  if (/transmisiones|comunicaciones/.test(s) && /limit/.test(s)) {
    return `El servicio de aficionados solo admite comunicaciones relacionadas con ensayos técnicos, formación y actividad propia del servicio, no tráfico ajeno. Por eso encaja «${c}».`;
  }
  if (/planes de banda|iaru/.test(s)) {
    return `Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «${c}».`;
  }
  if (/deletrea|fon[eé]tico|alfabeto/.test(s)) {
    return `El alfabeto fonético ICAO evita confusiones entre letras parecidas en fonía. La secuencia correcta del enunciado es «${c}».`;
  }
  if (/memoria descriptiva|licencia de una estaci[oó]n|estaci[oó]n fija/.test(s)) {
    return `La memoria descriptiva identifica emplazamiento, equipos y sistema radiante; no sustituye otros documentos que el reglamento exija aparte. La opción válida es «${c}».`;
  }
  if (/bandas de frecuencia|nomenclatura|gama de frecuencias|tramo espectral/i.test(s)) {
    const band = explainItuBandRange(stem, c);
    if (band) return band;
  }
  if (/asociaci[oó]n|socio/.test(s)) {
    return `Pertenecer a una asociación puede ser útil, pero no es requisito legal para operar con autorización vigente. Por eso «${c}».`;
  }
  if (/croacia|cept|harec|residencia|licencia/.test(s)) {
    return `HAREC y las recomendaciones CEPT facilitan reconocimiento entre administraciones; cada país mantiene su procedimiento nacional. Encaja «${c}».`;
  }
  if (/clase de emisi[oó]n|a3e|j3e|f3e/.test(s)) {
    return `Las clases ITU describen tipo de modulación y contenido; A3E indica AM con doble banda lateral y señal analógica de telefonía. La correcta es «${c}».`;
  }
  if (/inspecci[oó]n|telecomunicaciones|mitco|secretar[ií]a/.test(s)) {
    return `La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «${c}» es la formulación del banco.`;
  }
  if (/examen|prueba de capacitaci[oó]n/.test(s)) {
    return `La convocatoria oficial define dos pruebas independientes (técnica y reglamentación), alineadas con el programa de examen. La respuesta es «${c}».`;
  }
  if (/plazo|anticipaci[oó]n|mes|d[ií]as/.test(s)) {
    return `Los plazos administrativos del reglamento deben contrastarse con el BOE vigente; el banco fija la opción «${c}» para este enunciado.`;
  }
  if (/interferencia|ict|servicio autorizado/.test(s)) {
    return `Si una emisión perjudica servicios protegidos, el titular debe corregir o cesar; la buena práctica es actuar antes de que escale. «${c}».`;
  }
  if (/infracci[oó]n|sanci[oó]n|multa/.test(s)) {
    return `El régimen sancionador de telecomunicaciones clasifica infracciones según gravedad; la opción del banco refleja la redacción del supuesto. «${c}».`;
  }
  if (/señal de alarma en radiotelefon/i.test(s)) {
    return `La señal de alarma en radiotelefonía usa dos tonos alternos; en el banco son aproximadamente 2.220 Hz y 1.300 Hz. «${c}».`;
  }
  return synthesizeReason(stem, correct, "marco-normativo");
}

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainLicencias(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/sufijo\s+pan|\bpan\b.*distintivo|distintivo.*\bpan\b/i.test(s)) {
    return `El sufijo PAN está reservado a estaciones de interés público (REDERA), no a distintivos de aficionado clase A. Por eso «${c}».`;
  }
  if (/primeras letras.*distintivo|atribuyen.*conferencia europea/i.test(s)) {
    return `Las letras iniciales del indicativo identifican el país según la atribución internacional (CEPT/UIT); en España corresponde la letra E (EA, EB, EC). «${c}».`;
  }
  if (/menci[oó]n\s*\/p|\/p\s+al\s+indicativo|añade.*\/p/i.test(s)) {
    return `La barra /P indica operación portátil (estación fija/portátil fuera del emplazamiento habitual del titular). «${c}».`;
  }
  if (/baleares.*tenerife|santa cruz.*palmas|palmas.*baleares/i.test(s)) {
    return `En indicativos españoles, la cifra 6 corresponde a Baleares (EA6) y la 8 a Canarias (EA8). «${c}».`;
  }
  if (/ceuta.*melilla|melilla.*ceuta/i.test(s)) {
    return `Ceuta y Melilla comparten la cifra 9 del indicativo (EA9). «${c}».`;
  }
  if (/cifra\s+2.*huesca|identifica la provincia de:\s*huesca/i.test(s)) {
    return `Huesca pertenece al distrito EA2 (cifra 2), que agrupa Aragón y País Vasco en la tabla oficial. «${c}».`;
  }
  if (/no emite el distintivo|distintivo.*incorrecto.*incurre/i.test(s)) {
    return `Omitir o usar mal el distintivo al operar es infracción; el reglamento la califica como falta leve. «${c}».`;
  }
  if (/operada ocasionalmente por otro|operado.*otro radioaficionado/i.test(s)) {
    return `Si opera un invitado autorizado, se transmite el distintivo del titular seguido del del operador invitado. «${c}».`;
  }
  if (/cu[aá]ndo deben.*transmitir.*distintivos|durante sus emisiones.*distintivos/i.test(s)) {
    return `En este supuesto del banco la identificación va al comienzo, a mitad de la emisión y al final. «${c}».`;
  }
  if (/prefijo\s+ee\b/i.test(s)) {
    return `El prefijo EE delante del indicativo marca una autorización temporal de estación clase B según la nomenclatura del examen. «${c}».`;
  }
  if (/prefijo\s+eg\b/i.test(s)) {
    return `EG se usa para distintivos temporales ligados a eventos de relevancia local o autonómica. «${c}».`;
  }
  if (/prefijos.*espa[nñ]a|ea,?\s*eb,?\s*ec/i.test(s) && /prefijo/i.test(s)) {
    return `Los indicativos españoles empiezan por E: EA (aficionados), EB y EC según tipo de estación o autorización. «${c}».`;
  }
  if (/sufijo.*[\"']?y[\"']?|comience por [\"']?y[\"']? o [\"']?z[\"']?/i.test(s)) {
    return `Los sufijos que empiezan por Y o Z se reservan a estaciones automáticas desatendidas (analógicas y digitales). «${c}».`;
  }
  if (/cambio de residencia|cambia de residencia|nueva provincia de residencia/i.test(s)) {
    return `Si la nueva residencia está en otro distrito (otra cifra EA), no puedes conservar el mismo indicativo sin trámite. «${c}».`;
  }
  if (/repetidores anal[oó]gicos.*morse|morse.*repetidor/i.test(s)) {
    return `La identificación automática en CW del repetidor va a la velocidad que fija el banco (diez palabras por minuto). «${c}».`;
  }
  if (/distintivos temporales.*err[oó]nea|utilizaci[oó]n de distintivos temporales/i.test(s)) {
    return `La solicitud de distintivo temporal se presenta a la administración competente, no la autoriza por sí sola el radio club. La opción errónea es la que dice lo contrario. «${c}».`;
  }
  if (/distintivo de llamada se define|se define como/i.test(s) && /grupo de caracteres|identificaci[oó]n/i.test(c)) {
    return `El distintivo de llamada es el grupo de caracteres que identifica la estación en las emisiones. «${c}».`;
  }
  if (/constituido por|grupo alfanum[eé]rico/i.test(s) && /distintivo|indicativo/i.test(s)) {
    return `El distintivo asignado es un grupo alfanumérico (prefijo, cifra de distrito y sufijo según el caso). «${c}».`;
  }
  if (/reasignar|reasignaci[oó]n del distintivo|distintivo ya utilizado/i.test(s)) {
    return `Un distintivo liberado puede reasignarse cuando se cancela la autorización previa; no se hereda automáticamente por familiaridad. «${c}».`;
  }
  if (/ed\d|estaci[oó]n desatendid|desatendida anal[oó]gica|desatendida digital/i.test(s)) {
    return `Los indicativos ED… en el banco identifican estaciones desatendidas según el tipo (analógica o digital). «${c}».`;
  }
  if (/licencia cept extranjero|prefijo ea seguido de un determinado n[uú]mero/i.test(s)) {
    return `EA más cifra de distrito y barra indica un titular CEPT extranjero operando temporalmente en España. «${c}».`;
  }
  if (/m[oó]vil mar[ií]tima|\/mm\b/i.test(s)) {
    return `El sufijo /MM identifica emisiones de estación móvil marítima añadido al distintivo. «${c}».`;
  }
  if (/sufijo de una sola letra|una sola letra.*temporal/i.test(s)) {
    return `Los distintivos temporales de una letra se reservan a concursos internacionales de alta competitividad. «${c}».`;
  }
  if (/sufijos de dos letra.*fals|dos letra.*fals|colectivas/i.test(s)) {
    return `Lee qué afirmación es falsa: el banco no reserva los sufijos de dos letras solo a estaciones colectivas. «${c}».`;
  }
  if (/"distrito".*compone el distintivo|el "distrito"/i.test(s)) {
    return `La cifra de distrito coincide con la residencia del titular según la división geográfica del reglamento de aficionados. «${c}».`;
  }
  if (/qu[eé] es un indicativo de radio/i.test(s)) {
    return `No es un apodo informal: es el identificador oficial asignado por la administración para la estación. «${c}».`;
  }
  if (/atenci[oó]n atenci[oó]n/i.test(s)) {
    return `Anuncia un comunicado prioritario; debes callar y escuchar sin interferir. «${c}».`;
  }
  if (/\bef\d|ef6abc|prefijo\s+ef\b/i.test(s)) {
    return `EF marca distintivo temporal para eventos o autorizaciones no permanentes según el supuesto del banco. «${c}».`;
  }
  if (/indicativo de especializaci[oó]n|especializaci[oó]n/.test(s) && !/monitorizaci/i.test(s)) {
    return `El indicativo de especialización no es el distintivo ordinario de la estación (EA…): se vincula a una titulación, función o rol concreto del operador. Por eso el banco lo define como «${c}», frente a opciones como solo numérico, temporal o de emergencias.`;
  }
  if (/indicativo fijo/.test(s)) {
    return `Un indicativo fijo es el distintivo estable asignado a una estación concreta (no varía como el de una estación móvil al cambiar de emplazamiento). La opción correcta es «${c}».`;
  }
  if (/indicativo variable/.test(s)) {
    return `Un indicativo variable puede cambiar según el servicio o modalidad de operación (móvil, portátil, etc.). La respuesta correcta es «${c}».`;
  }
  if (/cept|licencia cept|pa[ií]s visitado|temporal/.test(s)) {
    return `La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «${c}».`;
  }
  if (/harec|certificado|diploma/.test(s)) {
    return `HAREC (T/R 61-02) acredita el programa de examen armonizado; facilita obtener autorización en países que lo reconocen. «${c}».`;
  }
  if (/prefijo|sufijo|distrito|cifra/.test(s)) {
    return `El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «${c}».`;
  }
  if (/indicativo|distintivo|llamada/.test(s) && !/cu[aá]ndo deben|medio|mitad|\/p|pan\b/i.test(s)) {
    return `El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «${c}».`;
  }
  if (/antena|comunidad|propiedad|instalaci[oó]n/.test(s)) {
    return `Instalar antenas en elementos comunes exige información y acuerdos con la comunidad según la normativa de antenas y propiedad horizontal. «${c}».`;
  }
  return synthesizeReason(stem, correct, "licencias-indicativos");
}

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainElectricidad(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/distorsi[oó]n/.test(s)) {
    return `La distorsión altera la forma de la señal: la salida ya no replica fielmente la entrada (armónicos, recorte o saturación). La opción correcta es «${c}».`;
  }
  if (/ohm|ley de ohm|v\s*=\s*i|intensidad|tensi[oó]n|resistencia/.test(s)) {
    return `En corriente continua, V = I·R y P = V·I son las relaciones base del examen. La magnitud o fórmula correcta aquí es «${c}».`;
  }
  if (/resistencias en serie|resistencias en paralelo|equivalente|paralelo|serie/.test(s)) {
    return `En serie las resistencias se suman; en paralelo la inversa de la equivalente es la suma de inversas. La respuesta es «${c}».`;
  }
  if (/condensador|capacidad|faradio|microfaradio/.test(s)) {
    return `En condensadores en paralelo se suman capacidades; en serie la capacidad equivalente baja. En CC estable el condensador ideal equivale a circuito abierto. «${c}».`;
  }
  if (/bobina|henrio|inductancia/.test(s)) {
    return `La bobina almacena energía en campo magnético; en CC estable se comporta como cortocircuito ideal tras el transitorio. «${c}».`;
  }
  if (/alterna|eficaz|rms|senoidal|periodo|frecuencia|ciclo/.test(s)) {
    return `En CA sinusoidal distinguimos valor máximo, eficaz y periodo; el eficaz es el que equivale térmicamente a una continua. «${c}».`;
  }
  if (/db|decibelio|dbm|dbµv/.test(s)) {
    return `Los decibelios expresan relaciones logarítmicas; dBm referencia potencia a 1 mW. La respuesta es «${c}».`;
  }
  if (/potencia|vatios|watt|kilovat/.test(s)) {
    return `Potencia es energía por unidad de tiempo; en CC P = V·I. Identifica unidad y fórmula antes de elegir. «${c}».`;
  }
  if (/carga el[eé]ctrica|coulomb|amperio-hora/.test(s)) {
    return `La carga se mide en culombios; intensidad es carga por segundo. La opción correcta es «${c}».`;
  }
  if (/resistividad|conductividad|secci[oó]n|longitud/.test(s)) {
    return `La resistencia depende de resistividad, longitud y sección: R = ρ·L/S. La pareja proporcional del enunciado es «${c}».`;
  }
  if (/energ[ií]a|julio|calor/.test(s)) {
    return `Energía en un condensador o resistencia se relaciona con V, I y tiempo según el elemento; revisa la fórmula del temario. «${c}».`;
  }
  if (/fuente|generador|bater[ií]a|alimentaci[oó]n/.test(s)) {
    return `Una fuente ideal de tensión mantiene V constante; una de corriente mantiene I constante. «${c}».`;
  }
  return synthesizeReason(stem, correct, "electricidad-basica");
}

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainMagnetismo(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/campo magn[eé]tico|im[aá]n|polo norte|polo sur/.test(s)) {
    return `El campo magnético orienta fuerzas sobre cargas en movimiento; las líneas van de norte a sur fuera del imán. «${c}».`;
  }
  if (/inducci[oó]n|faraday|lenz|flujo/.test(s)) {
    return `La inducción aparece cuando varía el flujo magnético; la ley de Lenz indica que la corriente inducida se opone a la causa. «${c}».`;
  }
  if (/onda electromagn[eé]tica|espectro|radiofrecuencia/.test(s)) {
    return `Las ondas EM combinan campo eléctrico y magnético; la luz y la RF son el mismo fenómeno a distinta frecuencia. «${c}».`;
  }
  if (/longitud de onda|lambda|λ|frecuencia|periodo|velocidad/.test(s)) {
    return `Relación clave: λ = c/f (en vacío c ≈ 3·10⁸ m/s) o λ = v/f en un medio. «${c}».`;
  }
  if (/polarizaci[oó]n|vertical|horizontal|circular/.test(s)) {
    return `La polarización describe la orientación del campo eléctrico de la onda; debe coincidir con la antena para máxima transferencia. «${c}».`;
  }
  if (/atenuaci[oó]n|absorci[oó]n|reflexi[oó]n|refracci[oó]n/.test(s)) {
    return `En propagación, la señal puede reflejarse, refractarse o atenuarse según medio y frecuencia. «${c}».`;
  }
  return synthesizeReason(stem, correct, "magnetismo-ondas");
}

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainComponentes(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/diodo semiconductor/i.test(s) && /detenci[oó]n/i.test(c)) {
    return `Aquí «detención» se refiere a limitar o recortar la señal (función de limitador con diodo), no a rectificar ni a emitir luz. «${c}».`;
  }
  if (/v[aá]lvula diodo/i.test(s)) {
    return `La válvula diodo tiene cátodo y placa (ánodo); el filamento permite la emisión termoiónica. «${c}».`;
  }
  if (/diodos zener|diodo zener/i.test(s)) {
    return `El diodo Zener mantiene una tensión de referencia en inversa; se usa en estabilizadores y limitadores de tensión. «${c}».`;
  }
  if (/diodo varicap|varicap equivale/i.test(s)) {
    return `El varicap se comporta como condensador variable controlado por la tensión inversa aplicada. «${c}».`;
  }
  if (/qu[eé] es un diodo/i.test(s)) {
    return `El diodo de estado sólido conduce preferentemente en un sentido y bloquea en el otro. «${c}».`;
  }
  if (/nombre gen[eé]rico de [\"']?diodo[\"']?|se conoce.*diodo/i.test(s)) {
    return `El diodo es un componente de dos terminales que permite el paso de corriente en un solo sentido. «${c}».`;
  }
  if (/rectificador/.test(s) && /funci[oó]n|consiste|misi[oó]n/.test(s)) {
    return (
      `Un rectificador obliga a que la corriente circule en un solo sentido: convierte la alterna (CA) en continua (CC). ` +
      `En la práctica se monta con diodos, pero la pregunta pide la definición del circuito. La correcta es «${c}».`
    );
  }
  if (/diodo/.test(s) && /(zener|led|varicap|tipos? de diodo|cu[aá]l de los siguientes diodos|para qu[eé] sirve)/.test(s)) {
    return `Cada diodo tiene función distinta: rectificar, estabilizar tensión (Zener), emitir luz (LED) o variar capacidad (varicap). La correcta es «${c}».`;
  }
  if (/\bdiodo\b/.test(s) && /(zener|led|varicap)/.test(s)) {
    if (/zener/.test(s)) {
      return `El diodo Zener conduce en inversa a tensión fija de ruptura y se usa para referencia o limitación de tensión. «${c}».`;
    }
    if (/led/.test(s)) return `El LED emite luz cuando conduce en directa; no rectifica una fuente de alimentación. «${c}».`;
    if (/varicap/.test(s)) return `El varicap varía su capacidad con la tensión inversa; no es la función de un rectificador de corriente. «${c}».`;
  }
  if (/transformador|espiras|primario|secundario|n[uú]cleo/.test(s)) {
    return `En el transformador ideal V1/V2 = N1/N2; un núcleo ferromagnético aumenta el acoplamiento y la inductancia. «${c}».`;
  }
  if (/condensador|bobina|reactancia|resonancia|factor q|filtro/.test(s)) {
    return `La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «${c}».`;
  }
  if (/transistor|bjt|fet|mosfet|amplific/.test(s)) {
    return `Transistores amplifican o conmutan con corriente de base/puerta; la clase de polarización define linealidad y eficiencia. «${c}».`;
  }
  if (/resistencia|potenci[oó]metro|termistor|ptc|ntc/.test(s)) {
    return `R disipa energía; PTC sube R con temperatura y NTC la baja. «${c}».`;
  }
  if (/fuente|rectificador|filtro|estabiliz/.test(s)) {
    return `Una fuente rectifica CA, filtra rizado y puede estabilizar tensión con Zener o regulador. «${c}».`;
  }
  return synthesizeReason(stem, correct, "componentes");
}

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainReceptores(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/superheterodino|mezclador|frecuencia intermedia|\bfi\b/.test(s)) {
    return `En superheterodino el mezclador con oscilador local traslada la señal a una FI fija para filtrar y amplificar con estabilidad. «${c}».`;
  }
  if (/detector|demodul|am\b|fm\b|ssb|cw|envolvente/.test(s)) {
    return `AM suele usar detector de envolvente; SSB/CW detector de producto; FM discriminador o equivalente de frecuencia. «${c}».`;
  }
  if (/cag|agc|ganancia|squelch|silenciador/.test(s)) {
    return `El CAG/AGC ajusta ganancia para mantener nivel de audio ante señales fuertes o débiles; no cambia la frecuencia sintonizada. «${c}».`;
  }
  if (/roe|vat[ií]metro|osciloscopio|espectro|frecuenc[ií]metro/.test(s)) {
    return `Cada instrumento mide una magnitud: potencia (vatímetro), forma de onda (osciloscopio), frecuencia (frecuencímetro) o espectro (analizador). «${c}».`;
  }
  if (/oscilador|pll|dds|cristal|vco/.test(s)) {
    return `Osciladores generan portadora; PLL y DDS mejoran estabilidad y resolución de frecuencia. «${c}».`;
  }
  if (/transmisor|amplificador de potencia|clase [abc]|arm[oó]nico/.test(s)) {
    return `La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «${c}».`;
  }
  if (/selectividad|sensibilidad|ruido|figura de ruido/.test(s)) {
    return `Selectividad separa señales cercanas; sensibilidad detecta señales débiles; el ruido limita el umbral mínimo. «${c}».`;
  }
  return synthesizeReason(stem, correct, "receptores-emisores");
}

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainAntenas(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/dipolo|longitud de onda|lambda|λ|cuarto de onda/.test(s)) {
    return `Un dipolo de media onda mide del orden de λ/2 en total; vertical de λ/4 necesita plano de tierra o radiales. «${c}».`;
  }
  if (/roe|adaptaci[oó]n|impedancia|l[ií]nea|balun/.test(s)) {
    return `ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «${c}».`;
  }
  if (/yagi|director|reflector|ganancia|parab[oó]lica|bocina/.test(s)) {
    return `Antenas directivas concentran radiación; Yagi usa reflector y directores, parabólicas enfocan por apertura. «${c}».`;
  }
  if (/propagaci[oó]n|ionosfera|visi[oó]n directa|hf|vhf|muf|cr[ií]tica/.test(s)) {
    return `HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «${c}».`;
  }
  if (/polarizaci[oó]n|vertical|horizontal/.test(s)) {
    return `La polarización de la antena debe alinearse con la de la onda para máxima transferencia. «${c}».`;
  }
  return synthesizeReason(stem, correct, "antenas-prop");
}

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainInstalaciones(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/comunidad|propiedad|terraza|desmontaje|obra/.test(s)) {
    return `Las antenas en comunidades de propietarios requieren procedimiento, comunicación y a veces acuerdos; no es libertad total ni prohibición absoluta. «${c}».`;
  }
  if (/seguro|responsabilidad/.test(s)) {
    return `El seguro de antenas cubre daños a terceros por la instalación; es parte de la responsabilidad del titular. «${c}».`;
  }
  if (/tierra|puesta a tierra|descarga|tormenta/.test(s)) {
    return `La toma de tierra protege personas y equipos; ante tormenta se desconecta la bajada, no se elimina la protección de tierra. «${c}».`;
  }
  return synthesizeReason(stem, correct, "instalaciones");
}

/**
 * @param {string} stem
 * @param {string} correct
 */
function explainOperacion(stem, correct) {
  const s = stem.toLowerCase();
  const c = correct.trim();
  if (/c[oó]digo q|qrm|qrn|qsy|qrt|qro|qrp|qrl|qrx/.test(s)) {
    return `Los códigos Q abrevian situaciones: QRL ocupado, QRX esperando, QSY cambio de frecuencia, QRT cese. «${c}».`;
  }
  if (/fon[eé]tico|deletrea|icao/.test(s)) {
    return `El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «${c}».`;
  }
  if (/securit[eé]|señal.*seguridad|internacional de seguridad|seguridad en radiotelefon/i.test(s)) {
    return `La señal radiotelefónica internacional de seguridad es la palabra «Securité» repetida tres veces (ITU). No confundir con Mayday ni con RST. «${c}».`;
  }
  if (/\brst\b|reporte de señal/i.test(s) && !/securit[eé]/i.test(s)) {
    return `RST resume legibilidad, intensidad y tono; en fonía se usan normalmente R y S. «${c}».`;
  }
  if (/socorro|sos|mayday|emergencia/.test(s)) {
    return `Las señales de socorro están reservadas a emergencias reales; su uso indebido es infracción grave. «${c}».`;
  }
  return synthesizeReason(stem, correct, "operacion-seguridad");
}

const TOPIC_LABELS = {
  "marco-normativo": "reglamentación",
  "licencias-indicativos": "licencias e indicativos",
  "electricidad-basica": "electricidad básica",
  "magnetismo-ondas": "magnetismo y ondas",
  componentes: "componentes",
  "receptores-emisores": "receptores y emisores",
  "antenas-prop": "antenas y propagación",
  instalaciones: "instalaciones",
  "operacion-seguridad": "operación y seguridad",
};

/**
 * @param {object} q
 */
export function generatePedagogicalExplain(q) {
  const stem = repairSpanishText(String(q.stem || ""));
  const options = Array.isArray(q.options) ? q.options : [];
  const correct = repairSpanishText(String(options[q.correctIndex] ?? ""));
  if (!correct) {
    return "No se pudo determinar la opción correcta en el banco; contrasta con el temario del bloque.";
  }

  if (/estaciones autom[aá]ticas|desatendid/.test(stem.toLowerCase()) && /potencia|w\b/i.test(stem + correct)) {
    return finalizeExplain(stem, correct, explainArt25hPotencia(correct));
  }

  const reglamento = tryExplainAficionadosReglamento(stem, correct);
  if (reglamento) {
    return finalizeExplain(stem, correct, reglamento);
  }

  const topic = inferExplainTopic(stem, q.topicId);
  /** @type {string} */
  let draft;
  switch (topic) {
    case "marco-normativo":
      draft = explainMarcoNormativo(stem, correct);
      break;
    case "licencias-indicativos":
      draft = explainLicencias(stem, correct);
      break;
    case "electricidad-basica":
      draft = explainElectricidad(stem, correct);
      break;
    case "magnetismo-ondas":
      draft = explainMagnetismo(stem, correct);
      break;
    case "componentes":
      draft = explainComponentes(stem, correct);
      break;
    case "receptores-emisores":
      draft = explainReceptores(stem, correct);
      break;
    case "antenas-prop":
      draft = explainAntenas(stem, correct);
      break;
    case "instalaciones":
      draft = explainInstalaciones(stem, correct);
      break;
    case "operacion-seguridad":
      draft = explainOperacion(stem, correct);
      break;
    default: {
      draft = synthesizeReason(stem, correct, topic);
    }
  }
  return finalizeExplain(stem, correct, draft);
}

/** @deprecated Usa generatePedagogicalExplain */
export const generateQuijotesExplain = generatePedagogicalExplain;
