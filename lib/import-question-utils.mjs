/** Utilidades compartidas para scripts de importación de bancos externos. */
import fs from "fs";

import { decodeHtmlEntities, fixMojibake, repairSpanishText } from "./text-encoding.mjs";

export { decodeHtmlEntities, fixMojibake, repairSpanishText };

export function normalizeText(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[¿?¡!.:;,]+$/g, "")
    .trim();
}

export function dedupeKey(stem, options) {
  return `${normalizeText(stem)}|${options.map(normalizeText).join("¦")}`;
}

export {
  topicIdPart1,
  topicIdPart2,
  inferTopicId,
  isMisfiledPart2TechnicalStem,
  reconcilePartAndTopic,
  classifyQuestion,
} from "./question-classification.mjs";

/** Alineado con EXPLICIT_FIGURE_STEM_RE en lib/stem-figure-check.mjs */
export const EXPLICIT_FIGURE_STEM_RE =
  /(siguiente\s+(esquema|gr[aá]fico|figura|diagrama|circuito)|ver\s+(gr[aá]fico|figura|diagrama|circuito)|pantalla de un osciloscopio|señal representada|senal representada)/i;

/** Alineado con figureRequiredRe en scripts/verify-extra.mjs */
export const FIGURE_REQUIRED_STEM_RE =
  /(?:(?:en el|la|el)\s+siguiente\s+(?:esquema|gr[aá]fic[oa]?|figura|diagrama|circuito|dibujo|pantalla|forma de onda)|siguiente\s+(?:esquema|gr[aá]fic[oa]?|figura|diagrama|circuito)|ver\s+(?:diagrama|gr[aá]fic[oa]?|circuito|figura|esquema)|\(ver)/i;

/** Enunciados que citan “siguiente”/“figure” sin diagrama (reglamentación, indicativo, inscripción). */
export const FIGURE_STEM_EXCLUDE_RE =
  /donde\s+figure\s+la\s+siguiente\s+inscripci[oó]n|en\s+el\s+siguiente\s+caso\b|con\s+el\s+siguiente\s+indicativo\b|en el esquema habitual\b|en el diagrama de radiaci[oó]n de una antena, la relaci[oó]n\b/i;

const FIGURE_NOUN_RE =
  /\b(esquema|diagrama de bloques|diagrama de radiaci[oó]n|gr[aá]fic[oa]?|señale el diagrama|ilustra)\b|(?:\bfigura\b.*(?:muestra|conectad|corresponde|representa|siguiente|observa))|(?:\b(?:de la|del)\s+figura\b)/i;

export function stemNeedsFigure(htmlOrStem) {
  const s = String(htmlOrStem);
  if (FIGURE_STEM_EXCLUDE_RE.test(s)) return false;
  return (
    /<img[\s>]/i.test(s) ||
    EXPLICIT_FIGURE_STEM_RE.test(s) ||
    FIGURE_REQUIRED_STEM_RE.test(s) ||
    FIGURE_NOUN_RE.test(s)
  );
}

export function cleanStem(text) {
  return repairSpanishText(text);
}

/** @param {string} filePath @param {string} content */
export function writeUtf8File(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

/**
 * @param {object} q
 * @param {string} id
 */
export function formatQuestionEntry(q, id) {
  const lines = [];
  lines.push("  {");
  lines.push(`    id: ${JSON.stringify(id)},`);
  lines.push(`    part: ${q.part},`);
  lines.push(`    topicId: ${JSON.stringify(q.topicId)},`);
  lines.push(`    stem: ${JSON.stringify(q.stem)},`);
  if (q.stemFigure) {
    lines.push(`    stemFigure: ${JSON.stringify(q.stemFigure)},`);
    if (q.stemFigureAlt) lines.push(`    stemFigureAlt: ${JSON.stringify(q.stemFigureAlt)},`);
  }
  lines.push(`    options: [\n      ${q.options.map((o) => JSON.stringify(o)).join(",\n      ")},\n    ],`);
  lines.push(`    correctIndex: ${q.correctIndex},`);
  lines.push(`    explain: ${JSON.stringify(q.explain)},`);
  if (q.sourceRef) lines.push(`    sourceRef: ${JSON.stringify(q.sourceRef)},`);
  lines.push("  },");
  return lines.join("\n");
}

/**
 * @param {string} path
 * @param {string} headerComment
 * @param {object[]} questions
 */
export function writeQuestionModule(filePath, headerComment, questions) {
  const lines = [];
  lines.push("/**");
  for (const line of headerComment.split("\n")) {
    lines.push(` * ${line}`);
  }
  lines.push(" * Generado por `pnpm run import:banks` — no editar el bloque masivo a mano.");
  lines.push(" */");
  lines.push("export default [");
  for (const q of questions) {
    lines.push(formatQuestionEntry(q, q.id));
  }
  lines.push("];");
  lines.push("");
  writeUtf8File(filePath, lines.join("\n"));
}
