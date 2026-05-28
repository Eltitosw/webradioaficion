/**
 * Líneas de repaso para modo «ampliar temario/PDF» — ligadas al enunciado, no al bloque entero.
 */
import topicStudy from "../data/topics-study.js";
import { LIBRO_TEMA_TEORIA } from "../data/libro-temario-sync.mjs";

const STOP = new Set([
  "que",
  "con",
  "por",
  "para",
  "del",
  "las",
  "los",
  "una",
  "uno",
  "son",
  "ser",
  "est",
  "esta",
  "este",
  "como",
  "cual",
  "cuál",
  "siguiente",
  "puede",
  "debe",
  "tiene",
  "entre",
  "sobre",
  "desde",
  "hasta",
  "donde",
  "cuando",
  "cada",
  "otro",
  "otra",
  "más",
  "menos",
  "solo",
  "sola",
  "toda",
  "todo",
  "todos",
  "todas",
  "pregunta",
  "respuesta",
  "opción",
  "opciones",
  "correcta",
  "afirmar",
  "indique",
  "señale",
  "señalar",
  "calcular",
  "corresponde",
  "corresponden",
  "figura",
  "gráfica",
  "gráfico",
  "esquema",
  "diagrama",
  "pantalla",
]);

/** @param {string} text */
function tokens(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .match(/[a-z0-9áéíóúüñ]{3,}/gi)
    ?.filter((t) => !STOP.has(t)) ?? [];
}

/** @param {string} line @param {Set<string>} stemSet @param {Set<string>} extra */
function scoreLine(line, stemSet, extra) {
  const lt = new Set(tokens(line));
  let s = 0;
  for (const t of stemSet) if (lt.has(t)) s += 2;
  for (const t of extra) if (lt.has(t)) s += 1;
  return s;
}

/** @param {unknown} study */
function collectCandidateLines(study, libroResumen) {
  const out = [];
  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    for (const item of arr) {
      if (typeof item === "string" && item.trim()) out.push(item.trim());
    }
  };
  push(study?.trapWarnings);
  push(study?.expressBullets);
  push(study?.memoryHooks);
  if (Array.isArray(study?.quickSession)) {
    for (const para of study.quickSession) {
      const parts = String(para)
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length >= 24);
      out.push(...parts);
    }
  }
  push(libroResumen);
  return out;
}

/**
 * @param {object} q
 * @param {{ max?: number, minScore?: number }} [opts]
 * @returns {string[]}
 */
export function pickDeepenFocusLines(q, opts = {}) {
  const max = opts.max ?? 3;
  const minScore = opts.minScore ?? 2;
  const blockId = String(q?.topicId ?? "");
  const study = topicStudy[blockId];
  const libroResumen = LIBRO_TEMA_TEORIA[blockId]?.resumenMemorizar;
  const candidates = collectCandidateLines(study, libroResumen);
  if (!candidates.length) return [];

  const correct =
    typeof q?.correctIndex === "number" && Array.isArray(q?.options)
      ? String(q.options[q.correctIndex] ?? "")
      : "";
  const stemSet = new Set([...tokens(q?.stem), ...tokens(correct)]);
  const extra = new Set(tokens(q?.stemFigureAlt));

  const ranked = candidates
    .map((line) => ({ line, score: scoreLine(line, stemSet, extra) }))
    .filter((x) => x.score >= minScore)
    .sort((a, b) => b.score - a.score);

  const seen = new Set();
  const picked = [];
  for (const { line } of ranked) {
    const key = line.slice(0, 72);
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(line);
    if (picked.length >= max) break;
  }
  return picked;
}
