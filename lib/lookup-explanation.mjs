/**
 * Prioridad de explicaciones: curadas > Quijotes > generadas.
 */
import curated from "../data/curated-explanations.js";
import quijotes from "../data/quijotes-explanations.js";
import generated from "../data/generated-explanations.js";

/**
 * @param {string} id
 * @returns {string}
 */
export function lookupStoredExplain(id) {
  return curated[id] || quijotes[id] || generated[id] || "";
}
