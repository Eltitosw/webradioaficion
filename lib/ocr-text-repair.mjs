/**
 * Reparación de texto OCR (Tesseract) del libro oficial · parte Técnica.
 * Complementa repairSpanishText() con patrones típicos del escaneo.
 */
import { repairSpanishText } from "./text-encoding.mjs";

/** Marcas de agua / pies de página del PDF — eliminar. */
const WATERMARK_RE =
  /https?[0-9]*[;:./\\7]*\/?\/?\/?\/?t\.?\s*me\/?[\s_]*RADIO[_\s.]*ENFERMOS?/gi;

/** Líneas que solo son basura de OCR (símbolos sueltos, URLs rotas). */
const JUNK_LINE_RE =
  /^(?:https?:?\/?\/?\/?\/?t\.?\s*me|RADIO[_\s.]*ENFERMOS?|\d{2,3}\s*https|\s*[|/\\_\-=]{3,}\s*)$/i;

/** @param {string} text */
export function stripOcrWatermark(text) {
  let t = String(text || "");
  t = t.replace(WATERMARK_RE, "");
  t = t.replace(/\bhttps?[0-9]*[;:./\\7]*[/]?\.?me[/]?\b[^\n]*/gi, "");
  t = t.replace(/\bhttps[;:./\\7]+\b/gi, "");
  t = t.replace(/\bRADIO[_\s.]*ENFERMOS?\b/gi, "");
  t = t.replace(/\bENFER!?\b/gi, "");
  return t;
}

/** Correcciones léxicas frecuentes (OCR español · libro técnico). */
const LEXICAL = [
  [/\bSotware\b/gi, "Software"],
  [/\bDefinied\b/gi, "Defined"],
  [/\bmen de Radioaficionado\b/gi, "Examen de Radioaficionado"],
  [/\bLibro-de Examen\b/gi, "Libro de Examen"],
  [/\bRad\s+ioaficionado\b/gi, "Radioaficionado"],
  [/\bgeogrfic/gi, "geográfic"],
  [/\bradioelectr\b/gi, "radioeléctr"],
  [/\belectrnic/gi, "electrónic"],
  [/\belectrcn/gi, "electrónic"],
  [/\bvalvula\b/gi, "válvula"],
  [/\bionosfer\b/gi, "ionosfera"],
  [/\bpararayos\b/gi, "pararrayos"],
  [/\bV\s*=\s*1,\s*x\s*R\b/g, "V = I × R"],
  [/\b1,\s*x\s*R\b/g, "I × R"],
  [/\besc:\s*0\s+a\s+la\b/gi, "escapa a la"],
  [/\best\s+“E\b/g, "está limitado al"],
  [/\bpi\s+my\b/gi, ""],
  [/\bOA90\b/g, "OA91"],
  [/\bTora\b/g, "toma"],
  [/\bConduelos\b/gi, "conductores"],
  [/\bCORAZÓN\b/g, "corazón"],
  [/\bLe vimieno\/el\b/gi, "Le vimos en el"],
  [/\bAFOR\b/g, ""],
  [/\bdel \. e\b/g, "del mismo"],
  [/\bcampo\. de-las\b/g, "campo de las"],
  [/\bA NE Y EI\b/g, ""],
  [/\bsentido Í 0,4\b/g, ""],
  [/'9no opuesto/gi, "signo opuesto"],
  [/\bhan'sido\b/gi, "han sido"],
  [/\bde bla\b/gi, "de la"],
  [/\bseforma\b/gi, "transforman"],
  [/\bormación\b/gi, "información"],
  [/\beleco\b/gi, "electromagnéticas"],
  [/\bmas:sim\b/gi, "más simple"],
  [/\bmas:sim Radio\)/gi, "más simples como el receptor de galena"],
  [/\btransporta:\s*i\b/gi, "transportada"],
  [/\binformaci\s+L\s*;\s*ci[oó]n\b/gi, "información"],
  [/\bgalvan[oó]metro\b/gi, "galvanómetro"],
  [/\bregla de la mano dere-\s*sd\s*cha\b/gi, "regla de la mano derecha"],
];

/** @param {string} line */
function applyLexical(line) {
  let t = line;
  for (const [re, rep] of LEXICAL) {
    t = t.replace(re, rep);
  }
  return t;
}

/** Une palabras partidas por salto de línea OCR (guiones finales). */
function joinHyphenatedLines(text) {
  return text.replace(/(\p{L})-\s*\n\s*(\p{L})/gu, "$1$2");
}

/** Recompone párrafos cuando el OCR quedó en una sola línea larga. */
export function rebreakOcrParagraphs(text) {
  let t = String(text || "").trim();
  if (!t) return t;

  const lines = t.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const longest = lines.reduce((m, l) => Math.max(m, l.length), 0);
  if (lines.length > 5 && longest < 260) return t;

  t = lines.join(" ");
  t = t
    .replace(/\s+(?=Capítulo\s+\d+)/gi, "\n\n")
    .replace(/\s+(?=Nota:)/g, "\n\n")
    .replace(/\s+(?=\d{1,2}\.\d{1,2}(?:\.\d{1,2})?\s+[A-ZÁÉÍÓÚÑ])/g, "\n")
    .replace(/\s+(?=Fig\.\s*\d+)/g, "\n")
    .replace(/(?<!Fig)\.\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/g, ".\n")
    .replace(/(?<!Fig)\.\s+(?=\d)/g, ".\n");
  return t;
}

/** Normaliza espacios y saltos conservando párrafos. */
function normalizeWhitespace(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  for (let line of lines) {
    line = line.replace(/[ \t]+/g, " ").trim();
    if (!line) {
      if (out.length && out[out.length - 1] !== "") out.push("");
      continue;
    }
    if (JUNK_LINE_RE.test(line)) continue;
    out.push(line);
  }
  let joined = out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  joined = joined.replace(/^Fig\.\s*\n(\d+)/gm, "Fig. $1");
  return joined;
}

/** @param {string} text */
export function repairOcrSpanishText(text) {
  if (!text || typeof text !== "string") return text;
  let t = joinHyphenatedLines(text);
  t = stripOcrWatermark(t);

  const rawLines = t.split(/\r?\n/);
  const repaired = rawLines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    return applyLexical(repairSpanishText(trimmed));
  });

  t = repaired.join("\n");
  t = rebreakOcrParagraphs(t);
  return normalizeWhitespace(t);
}
