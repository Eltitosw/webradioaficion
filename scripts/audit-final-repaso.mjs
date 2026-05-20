/**
 * Repaso final: duplicados, fuera de examen, normativa, encoding.
 * Uso: node scripts/audit-final-repaso.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import banco from "../data/questions-banco.js";
import estudio from "../data/questions-banco-estudio.js";
import { dedupeKey } from "../lib/import-question-utils.mjs";
import { areParaphraseDuplicates } from "../lib/question-paraphrase.mjs";
import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";
import { isNormativelyUnacceptableQuestion } from "../lib/question-recency.mjs";
import { isExcludedFromRadioaficionadoExam } from "../lib/question-pool.mjs";
import { SKIP_PATTERNS } from "../lib/quijotes-fetch.mjs";
import { repairQuestionFields } from "../lib/text-encoding.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "repaso-final-audit.txt");

const lines = [];
const push = (s = "") => lines.push(s);
let ok = true;
function fail(msg) {
  ok = false;
  push(`  ✗ ${msg}`);
}
function pass(msg) {
  push(`  ✓ ${msg}`);
}

function scan(name, list) {
  const keys = new Map();
  const dupExact = [];
  const dupId = new Set();
  const off = [];
  const norm = [];
  const excl = [];
  const us = [];
  const utf = [];

  for (const q of list) {
    const r = repairQuestionFields(q);
    const k = dedupeKey(r.stem, r.options);
    if (keys.has(k)) dupExact.push(`${keys.get(k)} ↔ ${r.id}`);
    else keys.set(k, r.id);
    if (dupId.has(r.id)) dupExact.push(`id repetido: ${r.id}`);
    dupId.add(r.id);
    if (isOffTopicForRadioaficionadoExam(r)) off.push(r.id);
    if (isNormativelyUnacceptableQuestion(r)) norm.push(r.id);
    if (isExcludedFromRadioaficionadoExam(r)) excl.push(r.id);
    if (JSON.stringify(r).includes("\uFFFD")) utf.push(r.id);
    const blob = `${r.stem}\n${(r.options || []).join("\n")}`;
    if (SKIP_PATTERNS.some((re) => re.test(blob))) us.push(r.id);
  }

  let dupPara = 0;
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (areParaphraseDuplicates(list[i], list[j])) dupPara += 1;
    }
  }

  push(`\n## ${name} (${list.length} preguntas)`);
  if (dupExact.length) fail(`Duplicados exactos: ${dupExact.length}`);
  else pass("Sin duplicados exactos (enunciado+opciones)");
  if (dupPara) push(`  ⚠ Parafraseos cercanos: ${dupPara} pares (estudio puede tener variantes si <5)`);
  else pass("Sin parafraseos cercanos");
  if (off.length) fail(`Fuera de examen: ${off.join(", ")}`);
  else pass("Nada fuera de ámbito radioaficionado");
  if (norm.length) fail(`Normativa obsoleta: ${norm.join(", ")}`);
  else pass("Sin ítems normativamente inaceptables");
  if (excl.length) fail(`IDs excluidos filtrados que aparecen: ${excl.join(", ")}`);
  else pass("Sin fugas de lista de exclusión");
  if (us.length) push(`  ⚠ Patrón FCC/ARRL: ${us.join(", ")}`);
  if (utf.length) fail(`UTF-8 corrupto: ${utf.join(", ")}`);
  else pass("UTF-8 OK");

  return { dupExact, dupPara, off, norm, excl };
}

push("=== Repaso final del banco ===");
push(`Fecha: ${new Date().toISOString()}`);
const exam = scan("Banco EXAMEN (simulacro)", banco);
const study = scan("Banco ESTUDIO (practicar)", estudio);

const examKeys = new Set(banco.map((q) => dedupeKey(q.stem, q.options)));
const missingExam = banco.filter((q) => {
  const k = dedupeKey(q.stem, q.options);
  return !estudio.some((e) => dedupeKey(e.stem, e.options) === k);
});
if (missingExam.length) fail(`Examen: ${missingExam.length} preguntas no están en banco estudio`);
else pass("Todas las preguntas examen están en banco estudio");

push("");
if (ok && !exam.dupExact.length && !exam.off.length && !exam.norm.length) {
  push("RESULTADO: OK para publicar y estudiar.");
} else {
  push("RESULTADO: Revisar incidencias ✗.");
}

fs.writeFileSync(OUT, `${lines.join("\n")}\n`, "utf8");
console.log(lines.join("\n"));
console.log(`\nInforme: ${OUT}`);
process.exit(ok ? 0 : 1);
