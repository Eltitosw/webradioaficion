/**
 * Verifica que questions-banco.js solo contiene preguntas del examen oficial.
 */
import banco from "../data/questions-banco.js";
import { isExamAlignedSourceId, isExcludedStudyOrClubSourceId } from "../lib/exam-aligned-sources.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { isExcludedFromRadioaficionadoExam } from "../lib/question-pool.mjs";
import { isPublishableEnrichedQuestion } from "../lib/banco-quality.mjs";
import {
  getRecencyMeta,
  hasObsoleteCorrectAnswer,
  hasObsoleteHint,
  isNormativelyUnacceptableQuestion,
} from "../lib/question-recency.mjs";
import { isExplainAcceptable } from "../lib/explain-verify.mjs";
import { isGenericPedagogicalExplain } from "../lib/explain-faithfulness.mjs";

const errors = [];

for (const q of banco) {
  if (!q?.id) errors.push("(sin id)");
  else if (isExcludedFromRadioaficionadoExam(q)) errors.push(`${q.id}: en EXCLUDED_EXAM_IDS`);
  else if (isOffTopicForRadioaficionadoExam(q)) errors.push(`${q.id}: fuera de examen (scope)`);
  else if (isExcludedStudyOrClubSourceId(q.id)) errors.push(`${q.id}: bloque estudio/club`);
  else if (!isExamAlignedSourceId(q.id)) errors.push(`${q.id}: fuente no alineada con examen`);
  else if (isNormativelyUnacceptableQuestion(q)) errors.push(`${q.id}: normativa obsoleta`);
  else if (hasObsoleteCorrectAnswer(q)) errors.push(`${q.id}: respuesta correcta obsoleta`);
  else if (isGenericPedagogicalExplain(q)) errors.push(`${q.id}: explicación genérica`);
  else if (!isExplainAcceptable(q)) errors.push(`${q.id}: explicación no aceptable`);
  else if (getRecencyMeta(q.id).tier === "C") errors.push(`${q.id}: tier C histórico`);
  else if (getRecencyMeta(q.id).tier === "B") errors.push(`${q.id}: tier B (no examen reciente)`);
  else if (!isPublishableEnrichedQuestion(q)) errors.push(`${q.id}: no publicable`);
}

if (errors.length) {
  console.error(`verify-exam-banco: ${errors.length} problema(s):`);
  errors.slice(0, 30).forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

const tierA = banco.filter((q) => getRecencyMeta(q.id).tier === "A").length;
console.log(`verify-exam-banco: OK · ${banco.length} preguntas · tier A: ${tierA}`);
