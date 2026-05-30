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
  /** SSB / banda lateral: modulación P1. */
  "ofic-030": { part: 1, topicId: "magnetismo-ondas" },
  /** Modos de emisión en transceptor (USB/LSB). */
  "fedi-b-297": { part: 1, topicId: "receptores-emisores" },
  /** Interferencias y amplificadores de potencia. */
  "quijotes-1-0140": { part: 1, topicId: "receptores-emisores" },
  /** Fading / desvanecimiento. */
  "quijotes-1-0182": { part: 1, topicId: "magnetismo-ondas" },

  /**
   * Normativa de instalación de antenas (Ley de Antenas / propiedad horizontal /
   * comunidad): 2.ª prueba, bloque instalaciones. Estaban en «antenas-prop» (P1)
   * solo por contener la palabra «antena».
   */
  "ure-p2-q37": { part: 2, topicId: "instalaciones" },
  "ure-p2-q38": { part: 2, topicId: "instalaciones" },
  "ure-p2-q106": { part: 2, topicId: "instalaciones" },
  "ure-p2-q108": { part: 2, topicId: "instalaciones" },
  "ure-p2-q174": { part: 2, topicId: "instalaciones" },
  "ure-p2-q222": { part: 2, topicId: "instalaciones" },
  "ure-p2-q408": { part: 2, topicId: "instalaciones" },
  "ure-p2-q468": { part: 2, topicId: "instalaciones" },
  /** Duplicada (solo estudio) de ure-p2-q408: misma normativa de instalación. */
  "quijotes-84-1910": { part: 2, topicId: "instalaciones" },

  /** Procedimiento de operación (fonía/telegrafía, frecuencias de llamada, alarma): 2.ª prueba. */
  "ure-p2-q101": { part: 2, topicId: "operacion-seguridad" },
  "ure-p2-q160": { part: 2, topicId: "operacion-seguridad" },
  "ure-p2-q211": { part: 2, topicId: "operacion-seguridad" },
  "ure-p2-q270": { part: 2, topicId: "operacion-seguridad" },
  "ure-p2-q335": { part: 2, topicId: "operacion-seguridad" },

  /** Definiciones y límites reglamentarios (potencia/ganancia de estaciones desatendidas): 2.ª prueba. */
  "ure-p2-q237": { part: 2, topicId: "marco-normativo" },
  "ure-p2-q396": { part: 2, topicId: "marco-normativo" },
  "ure-p2-q398": { part: 2, topicId: "marco-normativo" },
  "ure-p2-q446": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-1810": { part: 2, topicId: "marco-normativo" },
};
