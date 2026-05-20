/**
 * Clasificación de antigüedad por ID de pregunta (heurística por fuente de importación).
 * Tier A = más reciente / mantenido · B = aceptable · C = histórico (bancos 2006–2009).
 */

/** @typedef {"A"|"B"|"C"} RecencyTier */

const FEDI_STUDY_BLOCK_ID_RE = /^fedi-[abcd]-\d+/;

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
    const quiz = parseInt(quij[1], 10);
    const qid = parseInt(quij[2], 10);
    if (quiz === 84) {
      return {
        tier: "A",
        year: 2024,
        source: "quijotes-examen",
        label: "Quijotes EA3RCQ · quiz 84 (reglamentación / examen)",
      };
    }
    if (quiz === 85 || quiz === 1 || quiz === 83) {
      return { tier: "C", year: null, source: "quijotes-club", label: "Quijotes fuera de examen oficial" };
    }
    if (qid >= 1800) {
      return {
        tier: "B",
        year: 2020,
        source: "quijotes",
        label: "Quijotes EA3RCQ (pool genérico)",
      };
    }
    return { tier: "C", year: 2016, source: "quijotes", label: "Quijotes EA3RCQ (pool antiguo)" };
  }

  if (FEDI_STUDY_BLOCK_ID_RE.test(id)) {
    return { tier: "C", year: 2006, source: "fedi-bloque", label: "FEDI-EA bloque estudio (no examen)" };
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
    return { tier: "B", year: 2009, source: "fedi", label: "FEDI-EA examen 2009" };
  }

  const fediExam2008 = id.match(/^fedi-(m|n|k|l|i|j)-/);
  if (fediExam2008) {
    return { tier: "B", year: 2008, source: "fedi", label: "FEDI-EA examen 2008" };
  }

  const fediExam2007 = id.match(/^fedi-(g|h|e|f)-/);
  if (fediExam2007) {
    return { tier: "B", year: 2007, source: "fedi", label: "FEDI-EA examen 2007" };
  }

  if (id.startsWith("ure-p1-q") || id.startsWith("ure-p2-q")) {
    return {
      tier: "A",
      year: 2020,
      source: "ure",
      label: "URE web (pool examen rotatorio)",
    };
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
    /ministerio de industria, turismo y comercio/.test(blob) ||
    /cuerpo nacional de polic[ií]a/.test(blob) ||
    /88[,.]5\s*-\s*99[,.]0\s*mhz/.test(blob) ||
    /repetidores anal[oó]gicos en la banda 88[,.]5/.test(blob) ||
    /jefatura provincial(es)? de inspecci[oó]n de telecomunicaciones/.test(blob) ||
    /\bjpit\b/.test(blob) ||
    /plan nacional de atribuci[oó]n de frecuencias de 1992/.test(blob)
  );
}

/**
 * La opción marcada como correcta exige normativa u organismo derogado.
 * @param {{ stem?: string, options?: string[], correctIndex?: number }} q
 */
export function hasObsoleteCorrectAnswer(q) {
  const correct = String(q?.options?.[q.correctIndex ?? -1] ?? "");
  if (!correct) return false;
  const c = correct.toLowerCase();
  if (hasObsoleteHint("", [correct])) return true;
  if (/direcci[oó]n general de telecomunicaciones/.test(c)) return true;
  if (/disponer de distintivo de llamada sin tener una licencia/i.test(correct)) return true;
  if (/distintivo de llamada sin tener una licencia de estaci[oó]n/i.test(correct)) return true;
  return false;
}

/**
 * No publicar: enunciado obsoleto o respuesta correcta ligada a normativa antigua.
 * @param {{ stem?: string, options?: string[], correctIndex?: number }} q
 */
export function isNormativelyUnacceptableQuestion(q) {
  if (hasObsoleteCorrectAnswer(q)) return true;
  if (hasObsoleteHint(String(q?.stem || ""), [])) return true;
  return false;
}

/**
 * @param {RecencyTier} tier
 * @param {"estricto"|"normal"|"ampliado"} mode
 */
export function tierPassesCribado(tier, mode = "normal") {
  if (mode === "estricto") return tier === "A";
  if (mode === "ampliado") return tier === "A" || tier === "B" || tier === "C";
  return tier === "A" || tier === "B";
}

/**
 * Mínimo de preguntas en el banco principal (cribado A+B + filtros de calidad).
 * Tras excluir tier C y preguntas sin coherencia tema↔enunciado, ~550–650 es habitual.
 */
export const MIN_BANCO_QUESTIONS = 400;
