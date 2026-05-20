/**
 * Parche final: 10 explicaciones que no pasaban verificación estricta.
 */
import path from "path";
import { fileURLToPath } from "url";

import estudio from "../data/questions-banco-estudio.js";
import generated from "../data/generated-explanations.js";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const FIX_IDS = [
  "q1",
  "q3",
  "q6",
  "q11",
  "ure-p1-q3",
  "ure-p1-q6",
  "ure-p1-q259",
  "ure-p1-q444",
  "ure-p1-q482",
  "ure-p1-q71",
];

/** @param {object} q */
function fixText(q) {
  const c = String(q.options[q.correctIndex] ?? "").trim();
  const id = q.id;
  if (id === "q1") {
    return `En corriente continua, la ley de Ohm relaciona tensión, intensidad y resistencia. «${c}».`;
  }
  if (id === "q3") {
    return `En el vacío, la relación entre longitud de onda y frecuencia es λ = c/f. «${c}».`;
  }
  if (id === "q6") {
    return `ROE elevada indica reflexiones por desadaptación de impedancias en la línea o antena. «${c}».`;
  }
  if (id === "q11") {
    return `En comunidades de propietarios suelen aplicarse límites, comunicación y acuerdos según normativa y estatutos. «${c}».`;
  }
  if (id === "ure-p1-q3") {
    return `La selectividad permite separar señales de frecuencias muy próximas; la sensibilidad es captar señales débiles. «${c}».`;
  }
  if (id === "ure-p1-q6") {
    return `En analógico, la señal puede tomar infinitos valores intermedios entre mínimo y máximo. «${c}».`;
  }
  if (id === "ure-p1-q259") {
    return `Por reciprocidad, el diagrama de radiación de una antena pasiva es el mismo en transmisión y recepción. «${c}».`;
  }
  if (id === "ure-p1-q444") {
    return `Para bajar la frecuencia de resonancia hay que alargar el dipolo (mayor longitud eléctrica). «${c}».`;
  }
  if (id === "ure-p1-q482") {
    return `dBm es potencia referida a 1 mW en escala logarítmica. «${c}».`;
  }
  if (id === "ure-p1-q71") {
    return `El índice de modulación m es típico de AM; este enunciado se refiere al tipo de modulación. «${c}».`;
  }
  return "";
}

const next = { ...generated };
let ok = 0;
for (const id of FIX_IDS) {
  const q = estudio.find((x) => x.id === id);
  if (!q) continue;
  const text = fixText(q);
  if (!isExplainAcceptable(q, text)) {
    console.error("sigue mal:", id);
    process.exit(1);
  }
  next[id] = text;
  ok += 1;
}

const keys = Object.keys(next).sort();
const lines = [
  "/** Explicaciones generadas (UTF-8). refresh + parche repaso final */",
  "export default {",
  ...keys.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(next[k])},`),
  "};",
  "",
];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
writeUtf8File(path.join(__dirname, "..", "data", "generated-explanations.js"), lines.join("\n"));
console.log(`Parcheadas ${ok} explicaciones en generated-explanations.js`);
