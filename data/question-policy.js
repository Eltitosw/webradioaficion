export const EXACT_FIGURE_QUESTION_IDS = new Set([
  // Figura propia: el enunciado fue redactado para este esquema, por tanto no replica un banco externo.
  "ofic-019",
  // Figuras originales FEDI-EA descargadas desde el bloque público ag 22/10/2011.
  "fedi-ag-009",
  "fedi-ag-013",
  "fedi-ag-014",
  "fedi-ag-016",
  // Figuras originales FEDI-EA históricas con enunciado equivalente al banco importado.
  "ure-p1-02",
  // Figura original URE descargada desde la página pública de Electricidad y Radioelectricidad.
  "ure-p1-08",
  "ure-p1-15",
  "ure-p1-17",
  "ure-p1-27",
  "quijotes-039",
  "quijotes-040",
  "quijotes-044",
  "quijotes-051",
]);

export const EXCLUDED_UNTIL_EXACT_FIGURE_IDS = new Set([]);

export function isActiveQuestion(q) {
  return !!q && !EXCLUDED_UNTIL_EXACT_FIGURE_IDS.has(q.id);
}

