import banco from "../data/questions-banco.js";
import curated from "../data/curated-explanations.js";
import { pedagogicalExplain } from "../lib/explain-quality.mjs";
import { isStemExplainTopicConflict, isGenericExplainText } from "../lib/explain-faithfulness.mjs";
import { passesExamGradeExplain } from "../lib/explain-exam-grade.mjs";

const PADDING_RE = /Contrastar con el temario del bloque si el distractor/;
const FIG_RE = /Interpreta la figura junto con el enunciado/;

let dupQuote = 0;
let padding = 0;
let figWeak = 0;
let conflict = 0;
let under180 = 0;

for (const q of banco) {
  const p = pedagogicalExplain(q);
  const correct = String(q.options?.[q.correctIndex] ?? "");
  if (PADDING_RE.test(p)) padding += 1;
  if (FIG_RE.test(p)) figWeak += 1;
  if (isStemExplainTopicConflict(p, q.stem)) conflict += 1;
  if (p.length < 180) under180 += 1;
  if (correct) {
    const idx = p.indexOf(`«${correct}»`);
    if (idx >= 0 && p.indexOf(`«${correct}»`, idx + 1) >= 0) dupQuote += 1;
  }
}

console.log(JSON.stringify({
  total: banco.length,
  gateOk: banco.filter(passesExamGradeExplain).length,
  avgLen: Math.round(banco.reduce((s, q) => s + pedagogicalExplain(q).length, 0) / banco.length),
  under180Chars: under180,
  paddingPhrase: padding,
  figuraTemplate: figWeak,
  dupCorrectQuote: dupQuote,
  topicConflict: conflict,
  curated: Object.keys(curated).length,
}, null, 2));
