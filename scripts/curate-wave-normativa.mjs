/**
 * Oleada curación: licencias, marco normativo, operación (P2).
 * Uso: node scripts/curate-wave-normativa.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import banco from "../data/questions-banco.js";
import existing from "../data/curated-explanations.js";
import { passesExamGradeExplain } from "../lib/explain-exam-grade.mjs";
import { buildBestExplain } from "../lib/build-best-explain.mjs";
import { expandExplainFaithful } from "../lib/expand-explain-faithful.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "curated-explanations.js");

const TOPICS = new Set(["licencias-indicativos", "marco-normativo", "operacion-seguridad"]);

/** Textos que el generador no deja pasar el gate. */
const MANUAL = {
  "fedi-ah-056":
    "La colaboración con servicios de emergencia en catástrofes es voluntaria: el radioaficionado puede ayudar, pero el reglamento no le impone esa obligación. Por eso la respuesta es «Es voluntaria».",
  "quijotes-84-1892":
    "Interferir deliberadamente a otra estación está prohibido: es mala práctica y puede ser infracción según el reglamento (BOE-A-2013-7624). Por eso la opción correcta es «Nunca.».",
  "quijotes-84-2069":
    "En España los distintivos de aficionado usan prefijos EA/EB/EC y formato del reglamento; «AM3SOS» no encaja en esa estructura de asignación nacional. Por eso «No se puede asignar.».",
  "ure-p2-q100":
    "Pan-Pan (tres veces) es la señal de urgencia radiotelefónica cuando hay riesgo sin peligro grave inmediato. Mayday (tres veces) reserva el socorro inminente. «PAN PAN».",
  "ure-p2-q102":
    "Marca la afirmación falsa: los sufijos de dos letras no están reservados únicamente a estaciones colectivas en la normativa del banco. Por eso la opción incorrecta es «Se reservan únicamente para estaciones colectivas».",
  "ure-p2-q107":
    "Los indicativos ED… identifican estaciones automáticas desatendidas en el esquema español (analógicas o digitales según el caso). ED3ZHO encaja en ese tipo. «Corresponde a una estación automática desatendida».",
  "ure-p2-q111":
    "EA seguido de cifra de distrito (1–9) y barra indica operador con licencia CEPT extranjero emitiendo temporalmente en España, no un indicativo fijo español ordinario. «Es que un titular de licencia CEPT extranjero está emitiendo en España».",
  "ure-p2-q117":
    "Con licencia CEPT debes cumplir la reglamentación del país visitado (bandas, potencias, identificación). No basta con aplicar solo las normas de tu país de origen. «Siempre».",
  "ure-p2-q158":
    "El prefijo EA9 identifica estaciones en Ceuta y Melilla dentro de la numeración de indicativos españoles. Por eso EA9ADI corresponde a «Ceuta».",
  "ure-p2-q172":
    "Las estaciones móviles marítimas añaden el sufijo /MM al distintivo para indicar operación a bordo, según práctica internacional de identificación en radiocomunicaciones marítimas. No confundir con /P (portátil) ni con indicativos terrestres EA. «/MM».",
  "ure-p2-q176":
    "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos, pero siempre debes respetar la reglamentación local del país visitado (bandas, potencias, identificación). No basta con aplicar solo las normas de tu país de origen. «Siempre».",
  "ure-p2-q177":
    "Las autorizaciones en bandas de uso restringido tienen caducidad; el enunciado fija un máximo de dieciocho meses renovable según trámite. «Se otorgarán por un plazo máximo de dieciocho meses».",
  "ure-p2-q215":
    "QRT significa cese de transmisión («deje de transmitir»). No confundir con QSY (cambio de frecuencia) ni QRX (espera). «Deje de transmitir».",
  "ure-p2-q216":
    "El distintivo debe identificar la estación al inicio y al final de cada comunicación para que la contraparte sepa quién emite. Es obligación de buena práctica y del reglamento del servicio de aficionados. «Al comienzo y final de cada emisión».",
  "ure-p2-q27":
    "QRM indica interferencia de origen artificial (otras emisiones, equipos cercanos). QRN es ruido atmosférico natural. Por eso la abreviatura de interferencia es «QRM».",
  "ure-p2-q282":
    "EB es prefijo de estación de aficionado en España; la cifra de distrito (EB1) asocia la provincia en el banco de examen. EB1VZY corresponde a «Ávila».",
  "ure-p2-q32":
    "Los distintivos españoles de aficionado siguen el formato EA/EB/EC + distrito + sufijo; «AM8SOS» no es un formato asignable en ese esquema. «No se puede asignar».",
  "ure-p2-q331":
    "El distintivo español combina prefijo nacional (E…), cifra de distrito y sufijo asignado por la administración. Por eso la estructura es «Prefijo + Distrito + Sufijo».",
  "ure-p2-q334":
    "El prefijo EA6 corresponde a las Islas Baleares en la numeración de indicativos españoles. Por eso un distintivo EA6… asociado al archipiélago puede corresponder a «Palma de Mallorca».",
  "ure-p2-q340":
    "Un mensaje de socorro usa Mayday o señales de socorro, no Securité (señal de seguridad para avisos que no son socorro). Por eso no incluye «La señal de seguridad Securite».",
  "ure-p2-q358":
    "En el alfabeto fonético ICAO internacional el dígito 9 se deletrea «Nine» (inglés). En tráfico español se usan equivalencias en castellano en otros enunciados. «Nine».",
  "ure-p2-q389":
    "ED1YBD es un indicativo de estación desatendida analógica en la nomenclatura del banco (prefijo ED + numeración de repetidor/desatendida). «Corresponde a una estación desatendida analógica».",
  "ure-p2-q395":
    "QRN indica perturbación por ruido atmosférico (tormentas, descargas). QRM es interferencia artificial. Por eso el código Q atmosférico es «QRN».",
  "ure-p2-q512":
    "Un distintivo puede reutilizarse cuando se cancela la autorización anterior que lo tenía asignado; no queda reservado para siempre al titular previo. «Si se cancela la autorización correspondiente».",
  "ure-p2-q513":
    "RST informa legibilidad (R), intensidad de señal (S) y tono (T) en fonía; no es un código Q ni una señal de socorro. «Informar sobre la intensidad de la señal recibida».",
  "ure-p2-q519":
    "El certificado HAREC acredita el examen de operador armonizado entre administraciones CEPT. Se vincula a la Recomendación T/R 61-02, distinta de T/R 61-01 (licencia CEPT para operar en el extranjero). «T/R 61-02».",
  "ure-p2-q57":
    "La licencia CEPT permite operar temporalmente en otro país adherido, pero no garantiza protección administrativa contra interferencias ajenas allí. Por eso «No».",
  "ure-p2-q90":
    "Los distintivos temporales de una sola letra se reservan a concursos internacionales de alta competitividad según el criterio del banco/reglamento histórico. «La participación en concursos internacionales de alta competitividad».",
  "ure-p2-q95":
    "Los prefijos de indicativos españoles en el servicio de aficionado incluyen EA (aficionado), EB y EC según tipo de estación o autorización en territorio nacional. Por eso la terna habitual del banco es «EA, EB, EC».",
  "ure-p2-q96":
    "QTH indica la ubicación o emplazamiento de la estación en tráfico. QSY es cambio de frecuencia y QSL confirma contacto. «QTH».",
};

/** @type {Record<string, string>} */
const next = { ...existing };
let auto = 0;
let manual = 0;
let still = [];

for (const q of banco) {
  if (!TOPICS.has(q.topicId)) continue;
  if (next[q.id] && passesExamGradeExplain({ ...q, explain: next[q.id] })) continue;
  if (passesExamGradeExplain(q)) continue;

  if (MANUAL[q.id]) {
    const text = MANUAL[q.id];
    if (passesExamGradeExplain({ ...q, explain: text })) {
      next[q.id] = text;
      manual += 1;
      continue;
    }
  }

  for (const c of [buildBestExplain(q), expandExplainFaithful(q)?.text]) {
    if (!c) continue;
    const probe = { ...q, explain: c };
    if (isExplainAcceptable(probe, c) && passesExamGradeExplain(probe)) {
      next[q.id] = c;
      auto += 1;
      break;
    }
  }
  if (!next[q.id] || !passesExamGradeExplain({ ...q, explain: next[q.id] })) {
    still.push(q.id);
  }
}

const sortedKeys = Object.keys(next).sort();
const lines = [
  "/** Explicaciones revisadas manualmente (UTF-8). Máxima prioridad en build-banco. */",
  "/** Actualizado: curate-wave-normativa.mjs · no regenerar con refresh-all sobre estos IDs. */",
  "export default {",
];
for (const id of sortedKeys) {
  lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(next[id])},`);
}
lines.push("};");
lines.push("");
writeUtf8File(OUT, lines.join("\n"));

console.log(`curate-wave-normativa: +${auto} auto · +${manual} manual · total ${sortedKeys.length} · pendientes ${still.length}`);
if (still.length) {
  console.error(still.join(", "));
  process.exit(1);
}
