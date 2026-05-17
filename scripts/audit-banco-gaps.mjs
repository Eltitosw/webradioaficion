/**
 * Repaso: preguntas que exigen figura y no están en questions-figures.js / banco.
 */
import questionsBanco from "../data/questions-banco.js";
import figures from "../data/questions-figures.js";
import questions from "../data/questions.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import fedi from "../data/fediea-2011.js";
import fediBloques from "../data/fediea-bloques.js";
import quij from "../data/quijotes-ea3rcq.js";
import { dedupeKey, stemNeedsFigure } from "../lib/import-question-utils.mjs";
import { pickFediImageFiles } from "../lib/figure-import.mjs";
import { fetchFediBlock } from "../lib/parse-fedi-html.mjs";

const all = [...questions, ...propias, ...ure, ...ureExtra, ...ureReg, ...fedi, ...fediBloques, ...quij];
const figureIds = new Set(figures.map((q) => q.id));
const bancoIds = new Set(questionsBanco.map((q) => q.id));
const bancoStems = new Map(questionsBanco.map((q) => [dedupeKey(q.stem, q.options), q.id]));

const needsFig = [];
for (const q of all) {
  if (!stemNeedsFigure(q.stem)) continue;
  if (figureIds.has(q.id)) continue;
  const key = dedupeKey(q.stem, q.options);
  if (bancoStems.has(key) && questionsBanco.find((b) => b.id === bancoStems.get(key))?.stemFigure) continue;
  needsFig.push(q);
}

console.log("=== Repaso banco ===");
console.log("Banco:", questionsBanco.length, "| con figura:", questionsBanco.filter((q) => q.stemFigure).length);
console.log("questions-figures.js:", figures.length);
console.log("Fuentes con enunciado que exige figura pero sin entrada en figures:", needsFig.length);

const byPrefix = {};
for (const q of needsFig) {
  const p = q.id.split("-").slice(0, 2).join("-");
  byPrefix[p] = (byPrefix[p] || 0) + 1;
}
console.log("Por prefijo (muestra):", byPrefix);

needsFig.slice(0, 15).forEach((q) => console.log(" ", q.id, q.stem.slice(0, 70)));

console.log("\n=== FEDI en vivo: preguntas con <img> no importadas ===");
const FEDI_BLOCKS = ["ag", "ah", "w", "aa", "s", "o", "k"];
let fediMiss = 0;
for (const bloque of FEDI_BLOCKS) {
  const data = await fetchFediBlock(bloque, { delayMs: 0, staleLimit: 6 });
  for (const [num, q] of data.questions) {
    const files = pickFediImageFiles(bloque, q.rawChunk || "");
    if (!files.length) continue;
    const id = `fedi-${bloque}-${String(num).padStart(3, "0")}`;
    if (figureIds.has(id)) continue;
    fediMiss += 1;
    if (fediMiss <= 10) console.log(" ", id, q.stem.slice(0, 60));
  }
}
console.log("FEDI con img no en figures (muestra bloques):", fediMiss);
