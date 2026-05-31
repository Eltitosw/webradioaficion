/**
 * Clasificación manual para enunciados ambiguos (prioridad sobre reglas automáticas).
 * part: 1 | 2 · topicId: bloque en data/topics.js
 */
export const CLASSIFICATION_OVERRIDES = {
  /** Circuito de repetidor: técnica P1, no reglamento por la palabra «repetidor». */
  "fedi-a-108": { part: 1, topicId: "receptores-emisores" },
  /** Objeto del servicio / límites de emisión: reglamento P2. */
  "quijotes-84-2071": { part: 2, topicId: "marco-normativo" },
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

  /** Tocar antena en TX: seguridad operativa P2 (no antenas-prop por palabra «antena»). */
  "ofic-024": { part: 2, topicId: "operacion-seguridad" },
  /** Escuchar antes de transmitir: operación P2. */
  "ofic-045": { part: 2, topicId: "operacion-seguridad" },
  /** Periodo T = 1/f: electricidad básica P1. */
  "ofic-050": { part: 1, topicId: "electricidad-basica" },
  /** 4,7 kΩ: componentes P1 (evita falso positivo «prefijo» en licencias). */
  "ofic-056": { part: 1, topicId: "componentes" },
  /** ROE e interferencias: técnica P1 antenas. */
  "ure-p1-q122": { part: 1, topicId: "antenas-prop" },

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
  /** Cambio de ubicación de antena: trámite administrativo P2. */
  "quijotes-84-1936": { part: 2, topicId: "instalaciones" },

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

  /**
   * Límites reglamentarios de bandas (potencia, geografía, modos permitidos): P2 marco-normativo.
   * Estaban en magnetismo-ondas (P1) por mencionar frecuencias o modos de emisión.
   */
  "quijotes-84-1904": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-1947": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-1963": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-2043": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-2060": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-2081": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-2104": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-2201": { part: 2, topicId: "marco-normativo" },
  "quijotes-84-2214": { part: 2, topicId: "marco-normativo" },
  /** GMDSS / alerta DSC en MF: operación P2. */
  "quijotes-84-2203": { part: 2, topicId: "operacion-seguridad" },
};
