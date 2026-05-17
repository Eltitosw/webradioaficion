/**
 * Clasificación de antigüedad por ID de pregunta (heurística por fuente de importación).
 * Tier A = más reciente / mantenido · B = aceptable · C = histórico (bancos 2006–2009).
 */

/** @typedef {"A"|"B"|"C"} RecencyTier */

/**
 * @returns {{ tier: RecencyTier, year: number|null, source: string, label: string }}
 */
export function getRecencyMeta(id) {
  if (!id || typeof id !== "string") {
    return { tier: "C", year: null, source: "desconocido", label: "Sin clasificar" };
  }

  if (id.startsWith("ofic-")) {
    return { tier: "A", year: 2026, source: "propias", label: "Propias (BOE/CEPT, 2026)" };
  }

  const quij = id.match(/^quijotes-(\d+)-(\d+)$/);
  if (quij) {
    const qid = parseInt(quij[2], 10);
    if (qid >= 1800) {
      return {
        tier: "A",
        year: 2024,
        source: "quijotes",
        label: "Quijotes EA3RCQ (pool reciente, qid alto)",
      };
    }
    if (qid >= 900) {
      return { tier: "B", year: 2020, source: "quijotes", label: "Quijotes EA3RCQ (pool medio)" };
    }
    return { tier: "B", year: 2016, source: "quijotes", label: "Quijotes EA3RCQ (pool antiguo)" };
  }

  if (id.startsWith("fedi-ag-") || id.startsWith("fedi-ah-")) {
    return { tier: "A", year: 2011, source: "fedi", label: "FEDI-EA examen 22/10/2011" };
  }

  const fediExam2010 = id.match(/^fedi-(aa|ab|w|x)-/);
  if (fediExam2010) {
    return { tier: "B", year: 2010, source: "fedi", label: "FEDI-EA examen 2010" };
  }

  const fediExam2009 = id.match(/^fedi-(s|t|o|p)-/);
  if (fediExam2009) {
    return { tier: "C", year: 2009, source: "fedi", label: "FEDI-EA examen 2009" };
  }

  const fediExam2008 = id.match(/^fedi-(m|n|k|l|i|j)-/);
  if (fediExam2008) {
    return { tier: "C", year: 2008, source: "fedi", label: "FEDI-EA examen 2008" };
  }

  const fediExam2007 = id.match(/^fedi-(g|h|e|f)-/);
  if (fediExam2007) {
    return { tier: "C", year: 2007, source: "fedi", label: "FEDI-EA examen 2007" };
  }

  const fediBlock = id.match(/^fedi-([abcd])-/);
  if (fediBlock) {
    return { tier: "C", year: 2006, source: "fedi-bloque", label: "FEDI-EA bloque histórico (001–592)" };
  }

  if (id.startsWith("ure-p1x-") || id.startsWith("ure-p2-")) {
    return {
      tier: "B",
      year: 2015,
      source: "ure",
      label: "URE web (exámenes papel en test online)",
    };
  }

  if (id.startsWith("ure-p1-")) {
    return { tier: "B", year: 2014, source: "ure", label: "URE electricidad (listado web)" };
  }

  if (/^q\d+$/.test(id)) {
    return { tier: "B", year: 2024, source: "base", label: "Banco base del proyecto" };
  }

  if (id.startsWith("fedi-")) {
    return { tier: "C", year: 2008, source: "fedi", label: "FEDI-EA (otro)" };
  }

  return { tier: "C", year: null, source: "otro", label: "Otra fuente" };
}

/** Puntuación para quedarse con la versión más reciente entre duplicados de enunciado. */
export function recencyScore(tier) {
  if (tier === "A") return 300;
  if (tier === "B") return 200;
  return 100;
}

/** Indicios de redacción muy antigua o normativa superada (revisión manual recomendada). */
export function hasObsoleteHint(stem, options = []) {
  const blob = `${stem}\n${options.join("\n")}`.toLowerCase();
  return (
    /secretar[ií]a de estado de telecomunicaciones/.test(blob) ||
    /ministerio de industria, energ[ií]a y turismo/.test(blob) ||
    /cuerpo nacional de polic[ií]a/.test(blob) ||
    /88[,.]5\s*-\s*99[,.]0\s*mhz/.test(blob) ||
    /plan nacional de atribuci[oó]n de frecuencias de 1992/.test(blob)
  );
}

/**
 * @param {RecencyTier} tier
 * @param {"estricto"|"normal"} mode
 */
export function tierPassesCribado(tier, mode = "normal") {
  if (mode === "estricto") return tier === "A";
  return tier === "A" || tier === "B";
}
