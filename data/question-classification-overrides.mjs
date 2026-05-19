/**
 * Clasificación manual para enunciados ambiguos (prioridad sobre reglas automáticas).
 * part: 1 | 2 · topicId: bloque en data/topics.js
 */
export const CLASSIFICATION_OVERRIDES = {
  /** Circuito de repetidor: técnica P1, no reglamento por la palabra «repetidor». */
  "fedi-a-108": { part: 1, topicId: "receptores-emisores" },
  /** Objeto del servicio / límites de emisión: reglamento P2. */
  "quijotes-84-2071": { part: 2, topicId: "marco-normativo" },
  /** Clases de emisión en banda de 40 m: técnica modulación (P1). */
  "quijotes-84-2214": { part: 1, topicId: "magnetismo-ondas" },
  /** Emisiones no deseadas / espurias: técnica P1. */
  "quijotes-84-1963": { part: 1, topicId: "magnetismo-ondas" },
  "quijotes-84-2060": { part: 1, topicId: "magnetismo-ondas" },
  /** Designación de clase de emisión (UIT): técnica P1. */
  "ofic-033": { part: 1, topicId: "magnetismo-ondas" },
  "quijotes-84-1856": { part: 1, topicId: "magnetismo-ondas" },
  /** RF en altavoces: técnica P1. */
  "ofic-025": { part: 1, topicId: "receptores-emisores" },
  /** Repetidor: reglamento P2 (licencias/instalaciones). */
  "quijotes-84-1883": { part: 2, topicId: "licencias-indicativos" },
};
