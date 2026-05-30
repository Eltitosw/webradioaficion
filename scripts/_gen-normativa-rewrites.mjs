/**
 * Genera data/normativa-explain-rewrites.mjs con explicaciones específicas por
 * pregunta (cada una con marcador de razonamiento + cita exacta de la opción
 * correcta tomada del banco) y valida contra el gate de calidad examen.
 */
import examen from "../data/questions-banco.js";
import { passesExamGradeExplain, examGradeExplainIssues } from "../lib/explain-exam-grade.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const byId = new Map(examen.map((q) => [q.id, q]));

/** Cuerpo de razonamiento por id (sin la cita; la cita se añade automáticamente). */
const BODIES = {
  // ---- Licencia CEPT e indicativos especiales ----
  "quijotes-84-1829":
    "Ante interferencias perjudiciales a otros servicios, en especial a la recepción de radiodifusión o televisión, el reglamento obliga a cesar la emisión hasta resolver la causa; la responsabilidad de no perturbar recae en el radioaficionado. Por eso deberá",
  "ure-p2-q104":
    "La Recomendación CEPT T/R 61-01 permite operar temporalmente, sin trámite adicional, en los países que la han adoptado, usando allí las bandas atribuidas al Servicio de Aficionados. Por eso la licencia CEPT",
  "ure-p2-q116":
    "En el país visitado solo puedes emplear las bandas atribuidas al aficionado en ese país, no las autorizadas en el tuyo. Por eso, entre las condiciones de uso de la licencia CEPT, la afirmación falsa es",
  "ure-p2-q153":
    "El certificado HAREC de la Recomendación T/R 61-02 está abierto también a administraciones que la adoptan aunque no sean miembros de la CEPT, para reconocer exámenes internacionalmente. Por eso pueden participar",
  "ure-p2-q168":
    "La licencia CEPT debe llevar datos de identificación, indicativo y referencia a la T/R 61-01, pero no la fecha en que se aprobó el examen, que es un dato administrativo previo. Por eso no es requisito que conste la",
  "ure-p2-q229":
    "Operando fuera de España con licencia CEPT te ajustas a las bandas y condiciones del país visitado, no a las españolas. Por eso, la licencia CEPT de un radioaficionado español",
  "ure-p2-q341":
    "El titular de una licencia CEPT debe respetar el Reglamento de Radiocomunicaciones y la reglamentación vigente tanto en origen como en el país visitado. Por eso la afirmación falsa es la de",
  "ure-p2-q409":
    "La habilitación temporal solo es válida en países que han adoptado la T/R 61-01; sin esa adopción no hay reconocimiento automático. Por eso, al visitar otro país, el titular podrá",
  "ure-p2-q43":
    "Los sufijos cortos especiales como AO son escasos y muy visibles, por lo que se reservan a acontecimientos de gran proyección. Por eso el sufijo AO se otorga para eventos temporales",
  "ure-p2-q461":
    "Con licencia CEPT te rigen las atribuciones del país donde operas, no las de origen. Por eso se permite emitir",
  "ure-p2-q471":
    "Un prefijo temporal (ED, EE, EF) sustituye solo al prefijo del distintivo; el sufijo personal permanente se conserva para seguir identificando al operador. Por eso",
  "ure-p2-q48":
    "La validez de la licencia CEPT, también para la operación móvil, depende de que el país de destino haya adoptado la Recomendación T/R 61-01. Por eso habilita",
  "ure-p2-q511":
    "El reglamento español equipara la licencia CEPT extranjera a la autorización nacional mientras se opera aquí, sin trámite añadido. Por eso toda licencia CEPT",
  "ure-p2-q523":
    "Los distintivos temporales se conceden para actividades concretas y limitadas en el tiempo, no para el uso ordinario. Por eso se puede solicitar uno",
  "ure-p2-q54":
    "La licencia CEPT del propio titular es su autorización nacional, de carácter permanente; lo temporal es solo la operación en el país visitado. Por eso la afirmación falsa es",

  // ---- Distritos, sufijos y prefijos ----
  "fedi-ah-039":
    "Los indicativos españoles incluyen una cifra de distrito según la provincia. Entre las opciones, la provincia adscrita al distrito 7 es",
  "ure-p2-q154":
    "Los sufijos de dos letras son más cortos y escasos, por lo que se reservan a operadores con experiencia acreditada. Por eso pueden asignarse",
  "ure-p2-q156":
    "El prefijo ED se reserva en España a estaciones automáticas y desatendidas. Por eso estas estaciones utilizarán el prefijo",
  "ure-p2-q165":
    "Hay que identificar qué grupo reúne más provincias del distrito 4. La proposición correcta es",
  "ure-p2-q167":
    "La cifra 0 en el distintivo es excepcional y se reserva a actos de especial relevancia institucional. Por eso solo se autoriza",
  "ure-p2-q207":
    "El sufijo de una sola letra es el más escaso del plan de indicativos, por lo que se limita a eventos de máxima relevancia. Por eso se reserva para",
  "ure-p2-q283":
    "El distintivo se forma con un prefijo (EA, EB, EC…) y un sufijo de letras; hay que reconocer cuál encaja en el plan de distintivos. Entre las opciones, el sufijo asignable es",
  "ure-p2-q31":
    "El indicativo lleva una cifra que identifica el distrito geográfico, y cada provincia está adscrita a uno de ellos. Entre las opciones, la provincia que pertenece al distrito 5 es",
  "ure-p2-q338":
    "El prefijo EG identifica usos temporales de relevancia regional, autonómica o local. Por eso el prefijo EG se relaciona con",
  "ure-p2-q404":
    "Hay que identificar el grupo con más provincias del distrito 1 (norte y noroeste). La proposición correcta es",
  "ure-p2-q449":
    "Los sufijos de dos letras ya no son exclusivos de unos pocos: se conceden cumpliendo ciertos requisitos. Por eso los distintivos con sufijo de 2 letras",
  "ure-p2-q58":
    "Las ciudades autónomas de Ceuta y Melilla también tienen su cifra de distrito en el indicativo. Entre las opciones, la ciudad adscrita al distrito 9 es",
  "ure-p2-q92":
    "Para los indicativos de llamada, el territorio español se reparte en distritos numerados que se reflejan en la cifra del distintivo. El número total de distritos es",

  // ---- Alfabeto fonético ICAO ----
  "fedi-ah-038":
    "El alfabeto fonético internacional asigna una palabra a cada letra para que el deletreo sea inequívoco en fonía. Por eso",
  "ure-p2-q151":
    "Con el alfabeto ICAO, T→Tango, O→Oscar y P→Papa. Por eso TOP se deletrea",
  "ure-p2-q213":
    "Con el alfabeto ICAO, M→Mike, A→Alfa y R→Romeo. Por eso MAR se deletrea",
  "ure-p2-q225":
    "Con el alfabeto ICAO, G→Golf, O→Oscar, L→Lima y F→Foxtrot. Por eso GOLF se deletrea",
  "ure-p2-q269":
    "Con el alfabeto ICAO, F→Foxtrot, I→India y N→November. Por eso FIN se deletrea",
  "ure-p2-q329":
    "Con el alfabeto ICAO, B→Bravo, O→Oscar y J→Juliett. Por eso BOJ se deletrea",
  "ure-p2-q445":
    "Con el alfabeto ICAO, C→Charlie, I→India y D→Delta. Por eso CID se deletrea",
  "ure-p2-q52":
    "Con el alfabeto ICAO, M→Mike, E→Echo, R→Romeo y O→Oscar. Por eso MERO se deletrea",
  "ure-p2-q91":
    "Con el alfabeto ICAO, R→Romeo, E→Echo e Y→Yankee. Por eso REY se deletrea",
  "ure-p2-q94":
    "El alfabeto fonético evita confusiones entre letras de sonido parecido al transmitir en fonía. Por eso sirve para",
  "ure-p2-q163":
    "El alfabeto fonético internacional asigna a cada letra una palabra fija para deletrear sin error en fonía. A la letra V le corresponde la palabra",
  "ure-p2-q298":
    "El alfabeto fonético internacional asigna a cada letra una palabra fija para deletrear sin error en fonía. A la letra U le corresponde la palabra",
  "ure-p2-q504":
    "Además de las letras, las cifras se transmiten con su palabra inglesa normalizada para evitar confusiones en fonía. El número 7 se deletrea como",
  "ure-p2-q531":
    "En el alfabeto fonético internacional, S→Sierra y L→Lima. Por eso a esas letras les corresponden",

  // ---- Planes de banda IARU ----
  "quijotes-84-1862":
    "Los planes de banda de la IARU son recomendaciones voluntarias de autoorganización del espectro; en la práctica deben seguirse para convivir. Por eso han de tenerse en cuenta",
  "ure-p2-q208":
    "El mundo se divide en tres Regiones de la UIT con atribuciones distintas, así que los planes IARU se adaptan a cada una. Por eso",
  "ure-p2-q273":
    "Los planes IARU no son ley, sino una guía consensuada para ordenar modos y segmentos en cada banda. Por eso",
  "ure-p2-q332":
    "Aunque son recomendaciones, los planes IARU de la Región 1 ordenan la convivencia en el espectro y se siguen por consenso. Por eso han de tenerse en cuenta",
  "ure-p2-q394":
    "Los planes de banda son una referencia internacional consensuada, no una norma legal. Por eso",
  "ure-p2-q451":
    "Los planes IARU recomiendan qué modo conviene en cada segmento (CW, fonía, datos…) para evitar interferencias. Por eso",
  "ure-p2-q514":
    "Los planes IARU se construyen respetando las atribuciones de bandas que fija el Reglamento de Radiocomunicaciones de la UIT. Por eso",

  // ---- Definiciones de estación y memoria descriptiva ----
  "ure-p2-q175":
    "Una estación fija remota es la que, estando en emplazamiento fijo, se gobierna a distancia por el operador. Por eso se define como",
  "ure-p2-q284":
    "La memoria descriptiva detalla emplazamiento, equipos y sistema radiante, pero no exige acreditar el padrón. Por eso no es preciso incluir el",
  "ure-p2-q292":
    "El radioaficionado puede operar solo en portable o móvil; no se le impone tener instalación fija. Por eso",
  "ure-p2-q47":
    "Una estación fija puede trasladarse y usarse de forma ocasional como portable sin perder su condición. Por eso una estación fija de radioaficionado",

  // ---- Cancelación, residencia, solicitud ----
  "ure-p2-q232":
    "La autorización es un derecho del titular, que puede renunciar a ella cuando quiera. Por eso la cancelación se efectúa",
  "ure-p2-q295":
    "El reconocimiento mutuo del HAREC exige que el país de destino aplique la Recomendación T/R 61-02 de la CEPT. Por eso podrá obtener licencia en Croacia si",
  "ure-p2-q397":
    "Para tramitar la licencia se acompaña una memoria que describe el conjunto de la instalación. Por eso es necesario presentar",

  // ---- Potencia de estaciones desatendidas ----
  "fedi-ah-040":
    "Según el art. 25.h del Reglamento IET/1311/2013, salvo causas justificadas, las estaciones desatendidas en VHF y UHF fuera del casco urbano se limitan en potencia. Por eso el máximo es",
  "ure-p2-q238":
    "El Reglamento limita la potencia de salida de las estaciones desatendidas en VHF y UHF fuera del casco urbano para reducir interferencias. Por eso, como norma general, será de",

  // ---- Objeto del servicio / reglamento ----
  "fedi-ah-053":
    "El servicio de aficionados es de instrucción individual, intercomunicación y estudios técnicos sin fin lucrativo; por eso las transmisiones deben limitarse a",
  "quijotes-84-1822":
    "El servicio de aficionados solo admite tráfico propio de la radioafición, sin fines comerciales ni ajenos. Por eso las transmisiones deben limitarse a",
  "ofic-008":
    "En España el reglamento del servicio de aficionados se aprueba por norma ministerial (la orden IET/1311/2013 y sus modificaciones). Por eso se aprueba mediante",
  "ure-p2-q51":
    "El reglamento contempla que el carácter de uso especial de bandas o frecuencias pueda revisarse a través del CNAF. Por eso el Reglamento de uso del dominio público radioeléctrico por aficionados",

  // ---- Código Q (QRX) ----
  "ofic-040":
    "En el código Q, QRX significa que la estación cesa de momento y volverá a llamar más tarde. Por eso QRX indica que",
  "ure-p2-q330":
    "La abreviatura que anuncia que el operador llamará de nuevo más tarde es QRX. Por eso el grupo correcto es",

  // ---- Socorro radiotelefónico ----
  "ure-p2-q120":
    "En radiotelefonía la señal internacional de socorro es la palabra Mayday, reservada a peligro grave e inminente. Por eso la señal es",
  "ure-p2-q233":
    "Para indicar peligro grave e inminente en fonía se emite la palabra Mayday. Por eso emitiremos",
  "ure-p2-q155":
    "La llamada de socorro en fonía repite Mayday tres veces, seguido de «aquí» o «de» y del distintivo de la estación en peligro. Por eso se compone de",
  "ure-p2-q271":
    "La señal de socorro en fonía es Mayday (tres veces), la palabra «aquí» o «de» y el distintivo (tres veces). Por eso se compone de",

  // ---- Extranjeros residentes ----
  "ure-p2-q166":
    "El acceso de extranjeros residentes a la autorización española se condiciona a la reciprocidad con su país de origen. Por eso podrán ser titulares",
  "ure-p2-q281":
    "Para obtener autorización en España, el extranjero residente debe acreditar su capacitación con el certificado HAREC. Por eso podrán obtenerla cuando",

  // ---- País visitado ----
  "ure-p2-q230":
    "En el país visitado debes poder acreditar tu habilitación ante la autoridad que la requiera. Por eso estás obligado a",
  "ure-p2-q56":
    "Operando temporalmente en el extranjero debes llevar y mostrar tu autorización si te la piden las autoridades. Por eso estás obligado a",
};

function buildExplain(id, body) {
  const q = byId.get(id);
  if (!q) return { id, text: null, error: "sin pregunta en banco" };
  const correct = String(q.options?.[q.correctIndex] ?? "").trim().replace(/\s*\.$/, "");
  const text = `${body.trim()} «${correct}».`;
  const issues = examGradeExplainIssues({ ...q, explain: text });
  const fails = issues.filter((i) => i.level === "fail").map((i) => i.code);
  return { id, text, error: fails.length ? fails.join(",") : null, len: text.length };
}

const out = {};
const errors = [];
for (const [id, body] of Object.entries(BODIES)) {
  const r = buildExplain(id, body);
  if (r.error) errors.push(`${id}: ${r.error} (len ${r.len ?? "-"})`);
  else out[id] = r.text;
}

console.log(`OK ${Object.keys(out).length} · fallos ${errors.length}`);
errors.forEach((e) => console.log("  FAIL " + e));

if (!errors.length && !process.argv.includes("--check")) {
  const keys = Object.keys(out).sort();
  const lines = [
    "/**",
    " * Reescrituras manuales de explicaciones de NORMATIVA (2.ª prueba), UTF-8.",
    " * Cada texto es específico de su pregunta (no se comparte cuerpo entre preguntas).",
    " * Fuentes: Reglamento IET/1311/2013, Recomendaciones CEPT T/R 61-01 y 61-02,",
    " * alfabeto fonético ICAO, planes de banda IARU y código Q.",
    " */",
    "export const NORMATIVA_EXPLAIN_REWRITES = {",
  ];
  for (const id of keys) lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(out[id])},`);
  lines.push("};");
  lines.push("");
  writeUtf8File(new URL("../data/normativa-explain-rewrites.mjs", import.meta.url), lines.join("\n"));
  console.log("Escrito data/normativa-explain-rewrites.mjs");
}
