/**
 * Detecta preguntas parafraseadas (mismo sentido, distinto redactado) para el banco de examen.
 */
import { dedupeKey, normalizeText } from "./import-question-utils.mjs";

/** @type {Set<string>} */
const STOP_WORDS = new Set([
  "el",
  "la",
  "los",
  "las",
  "un",
  "una",
  "unos",
  "unas",
  "de",
  "del",
  "al",
  "en",
  "que",
  "es",
  "son",
  "por",
  "para",
  "con",
  "se",
  "su",
  "sus",
  "o",
  "y",
  "a",
  "lo",
  "como",
  "si",
  "no",
  "mas",
  "muy",
  "tan",
  "ya",
  "le",
  "les",
  "nos",
  "hay",
  "ser",
  "esta",
  "este",
  "estos",
  "estas",
  "ese",
  "esa",
  "esos",
  "esas",
  "cual",
  "cuales",
  "donde",
  "cuando",
  "cada",
  "entre",
  "sobre",
  "segun",
  "tambien",
  "puede",
  "pueden",
  "debe",
  "deben",
  "tiene",
  "tienen",
  "tener",
  "hace",
  "hacer",
  "hecho",
  "dicho",
  "dice",
  "era",
  "fue",
  "sido",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
  "diez",
  "ante",
  "desde",
  "hasta",
  "hacia",
  "bajo",
  "tras",
  "contra",
  "sin",
  "solo",
  "sola",
  "mediante",
  "durante",
  "mismo",
  "misma",
  "mismos",
  "mismas",
  "otro",
  "otra",
  "otros",
  "otras",
  "todo",
  "toda",
  "todos",
  "todas",
  "algun",
  "alguna",
  "algunos",
  "algunas",
  "ningun",
  "ninguna",
  "quien",
  "quienes",
  "cuyo",
  "cuya",
  "cuyos",
  "cuyas",
  "cuanto",
  "cuanta",
  "cuantos",
  "cuantas",
  "sea",
  "sean",
  "sido",
  "siendo",
  "haber",
  "habra",
  "habia",
  "han",
  "has",
  "hemos",
  "indique",
  "indica",
  "señale",
  "señala",
  "marque",
  "marca",
  "cuál",
  "cual",
  "cuáles",
  "cuales",
  "siguiente",
  "siguientes",
  "pregunta",
  "respuesta",
  "opcion",
  "opción",
  "opciones",
  "correcta",
  "correcto",
  "anteriores",
  "ninguna",
  "ninguno",
  "todas",
  "todas",
]);

/**
 * @param {string} stem
 */
export function stemTokens(stem) {
  return normalizeText(stem)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

/**
 * @param {string[]} a
 * @param {string[]} b
 */
export function tokenJaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (!A.size && !B.size) return 1;
  let inter = 0;
  for (const x of A) {
    if (B.has(x)) inter += 1;
  }
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}

/**
 * @param {string} stemA
 * @param {string} stemB
 */
export function stemSimilarity(stemA, stemB) {
  return tokenJaccard(stemTokens(stemA), stemTokens(stemB));
}

/**
 * @param {string[]} options
 */
export function optionsSignature(options) {
  if (!Array.isArray(options)) return "";
  return [...options].map((o) => normalizeText(o)).sort().join("¦");
}

/**
 * @param {string[]} optionsA
 * @param {string[]} optionsB
 */
export function optionsOverlapRatio(optionsA, optionsB) {
  if (!Array.isArray(optionsA) || !Array.isArray(optionsB) || !optionsA.length || !optionsB.length) {
    return 0;
  }
  const a = optionsA.map((o) => normalizeText(o));
  const b = optionsB.map((o) => normalizeText(o));
  let matches = 0;
  for (const x of a) {
    if (b.includes(x)) matches += 1;
  }
  return matches / Math.max(a.length, b.length);
}

/**
 * Misma pregunta de examen redactada distinto (no requiere opciones idénticas carácter a carácter).
 * @param {object} q1
 * @param {object} q2
 */
export function areParaphraseDuplicates(q1, q2) {
  if (!q1 || !q2 || q1.id === q2.id) return false;
  if (q1.part !== q2.part) return false;

  if (dedupeKey(q1.stem, q1.options) === dedupeKey(q2.stem, q2.options)) return true;

  const stemSim = stemSimilarity(q1.stem, q2.stem);
  const optSig1 = optionsSignature(q1.options);
  const optSig2 = optionsSignature(q2.options);
  const optOverlap = optionsOverlapRatio(q1.options, q2.options);

  if (optSig1 && optSig1 === optSig2 && stemSim >= 0.58) return true;
  if (stemSim >= 0.82) return true;
  if (optOverlap >= 0.9 && stemSim >= 0.55) return true;

  const correct1 = normalizeText(q1.options?.[q1.correctIndex] ?? "");
  const correct2 = normalizeText(q2.options?.[q2.correctIndex] ?? "");
  if (correct1 && correct1 === correct2 && stemSim >= 0.68) return true;

  return false;
}
