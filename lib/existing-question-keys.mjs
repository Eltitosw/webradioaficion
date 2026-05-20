/**
 * Claves de deduplicación de preguntas ya presentes en el proyecto (banco, URE, FEDI, etc.).
 * Usar al importar fuentes externas para no volver a traer el mismo enunciado+opciones.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { dedupeKey } from "./import-question-utils.mjs";
import { repairQuestionFields } from "./text-encoding.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, "..", "data");

/**
 * @param {object} q
 * @param {Set<string>} keys
 */
function addQuestionKeys(q, keys) {
  if (!q?.stem || !Array.isArray(q.options) || q.options.length < 2) return;
  const repaired = repairQuestionFields(q);
  keys.add(dedupeKey(repaired.stem, repaired.options));
}

/**
 * @param {string} relPath
 * @param {Set<string>} keys
 */
async function addFromModule(relPath, keys) {
  const full = path.join(DATA, relPath);
  if (!fs.existsSync(full)) return 0;
  const mod = await import(`../data/${relPath}?${Date.now()}`);
  const list = mod.default;
  if (!Array.isArray(list)) return 0;
  for (const q of list) addQuestionKeys(q, keys);
  return list.length;
}

/**
 * @param {{ includeQuijotes?: boolean, includeBanco?: boolean }} [opts]
 * @returns {Promise<{ keys: Set<string>, counts: Record<string, number> }>}
 */
export async function loadExistingDedupeKeys(opts = {}) {
  const includeQuijotes = opts.includeQuijotes !== false;
  const includeBanco = opts.includeBanco !== false;
  const keys = new Set();
  const counts = {};

  const modules = [
    "questions.js",
    "questions-examen-propias.js",
    "ure-electricidad.js",
    "ure-electricidad-extra.js",
    "ure-reglamentacion.js",
    "fediea-2011.js",
    "questions-figures.js",
  ];

  if (includeBanco) modules.unshift("questions-banco.js");
  if (includeQuijotes) modules.push("quijotes-ea3rcq.js");

  for (const rel of modules) {
    const n = await addFromModule(rel, keys);
    if (n) counts[rel] = n;
  }

  return { keys, counts };
}
