import banco from "../data/questions-banco.js";
import { buildQuestionList } from "../lib/quiz-session.js";
import { filterQuestionsForSession } from "../lib/question-pool.mjs";

const base = filterQuestionsForSession(banco);
const pool = buildQuestionList(base, "1", "teorico", "electricidad-basica", 30);
const re =
  /\bq(?:rm|rn|sy|rt|sl|th|ro|rp)\b|c[oó]digo\s*["']?\s*q|distintivo|\bindicativo\b|\bcept\b|\bharec\b|mayday|transceptor|superheterodin|mezclador/i;

console.log("Pool electricidad-basica (30):");
for (const q of pool) {
  const hit = re.test(q.stem);
  console.log(hit ? "BAD" : "ok ", q.id, q.stem.slice(0, 75));
}
