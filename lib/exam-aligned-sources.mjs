/**
 * Fuentes alineadas con el examen oficial de radioaficionado en España.
 * Excluye bloques FEDI de estudio (a–d), quizzes genéricos Quijotes 1/83/85, etc.
 */

/** Bloques FEDI de estudio (no exámenes tipo test ministerio). */
const FEDI_STUDY_BLOCK_RE = /^fedi-[abcd]-\d+/;

/** Exámenes FEDI-EA publicados (2007–2011). */
const FEDI_EXAM_RE = /^fedi-(ag|ah|aa|ab|w|x|s|t|o|p)-\d+/;

/** Quijotes: solo quiz 84 (reglamentación / estilo examen EA3RCQ). */
const QUIJOTES_EXAM_RE = /^quijotes-84-\d+$/;

/**
 * @param {string} [id]
 */
export function isExamAlignedSourceId(id) {
  if (!id || typeof id !== "string") return false;
  if (id.startsWith("ofic-")) return true;
  if (FEDI_EXAM_RE.test(id)) return true;
  if (id.startsWith("ure-p1") || id.startsWith("ure-p2") || id.startsWith("ure-reg")) return true;
  if (QUIJOTES_EXAM_RE.test(id)) return true;
  if (/^q\d+$/.test(id)) return true;
  return false;
}

/**
 * @param {string} [id]
 */
export function isExcludedStudyOrClubSourceId(id) {
  if (!id) return true;
  if (FEDI_STUDY_BLOCK_RE.test(id)) return true;
  if (/^quijotes-(1|83|85)-/.test(id)) return true;
  return false;
}

/**
 * Prioridad al materializar banco (mayor = antes en relleno).
 * @param {string} id
 */
export function examSourcePriority(id) {
  if (id.startsWith("ofic-")) return 100;
  if (id.startsWith("ure-reg")) return 90;
  if (id.startsWith("ure-p2")) return 88;
  if (id.startsWith("ure-p1")) return 85;
  if (/^fedi-(ag|ah)-/.test(id)) return 80;
  if (/^fedi-(aa|ab|w|x)-/.test(id)) return 75;
  if (QUIJOTES_EXAM_RE.test(id)) return 70;
  if (/^fedi-(s|t|o|p)-/.test(id)) return 65;
  if (/^q\d+$/.test(id)) return 50;
  return 0;
}
