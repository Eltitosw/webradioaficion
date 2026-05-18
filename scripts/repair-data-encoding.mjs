/**
 * Repara tildes y ñ en todos los módulos de preguntas y temario.
 */
import path from "node:path";
import { fileURLToPath } from "url";

import fediBloques from "../data/fediea-bloques.js";
import fedi2011 from "../data/fediea-2011.js";
import figures from "../data/questions-figures.js";
import ure from "../data/ure-electricidad.js";
import ureReg from "../data/ure-reglamentacion.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import quij from "../data/quijotes-ea3rcq.js";
import quijExpl from "../data/quijotes-explanations.js";
import propias from "../data/questions-examen-propias.js";
import base from "../data/questions.js";
import topicsStudy from "../data/topics-study.js";
import { repairQuestionFields, repairSpanishText } from "../lib/text-encoding.mjs";
import { writeQuestionModule, writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function countBad(list) {
  const t = JSON.stringify(list);
  return (t.match(/\uFFFD/g) || []).length;
}

function countSuspicious(list) {
  const t = JSON.stringify(list);
  return (
    (t.match(/\bqu circuito/gi) || []).length +
    (t.match(/\bQu valor\b/g) || []).length +
    (t.match(/grfico/gi) || []).length +
    (t.match(/\bincluira\b/gi) || []).length +
    (t.match(/\bbsico\b/gi) || []).length
  );
}

const packs = [
  { file: "data/fediea-bloques.js", data: fediBloques, header: "FEDI-EA bloques históricos.", repair: true },
  { file: "data/fediea-2011.js", data: fedi2011, header: "FEDI-EA 2011.", repair: true },
  {
    file: "data/questions-figures.js",
    data: figures,
    header: "Preguntas con figura. Regenerar con import:figures + build:banco.",
    repair: true,
  },
  { file: "data/ure-electricidad.js", data: ure, header: "URE electricidad.", repair: true },
  { file: "data/ure-reglamentacion.js", data: ureReg, header: "URE reglamentación.", repair: true },
  { file: "data/ure-electricidad-extra.js", data: ureExtra, header: "URE electricidad extra.", repair: true },
  { file: "data/quijotes-ea3rcq.js", data: quij, header: "Quijotes EA3RCQ.", repair: true },
  { file: "data/questions-examen-propias.js", data: propias, header: "Preguntas propias.", repair: true },
  { file: "data/questions.js", data: base, header: "Banco base.", repair: true },
];

for (const { file, data, header, repair } of packs) {
  const before = countBad(data) + countSuspicious(data);
  const fixed = repair ? data.map((q) => repairQuestionFields(q)) : data;
  const after = countBad(fixed) + countSuspicious(fixed);
  writeQuestionModule(path.join(ROOT, file), header, fixed);
  process.stderr.write(`${file}: problemas ${before} → ${after}\n`);
}

const tsBefore =
  (JSON.stringify(topicsStudy).match(/\uFFFD/g) || []).length +
  (JSON.stringify(topicsStudy).match(/\bqu circuito/gi) || []).length;
const tsFixed = JSON.parse(JSON.stringify(topicsStudy, (_, v) => (typeof v === "string" ? repairSpanishText(v) : v)));
const tsAfter =
  (JSON.stringify(tsFixed).match(/\uFFFD/g) || []).length +
  (JSON.stringify(tsFixed).match(/\bqu circuito/gi) || []).length;

const tsLines = [
  "/** Temario de estudio (textos reparados UTF-8). */",
  `export default ${JSON.stringify(tsFixed, null, 2)};`,
  "",
];
writeUtf8File(path.join(ROOT, "data/topics-study.js"), tsLines.join("\n"));
process.stderr.write(`data/topics-study.js: problemas ${tsBefore} → ${tsAfter}\n`);

const explLines = [
  "/** Explicaciones Quijotes (UTF-8). */",
  "export default {",
];
for (const [id, text] of Object.entries(quijExpl)) {
  explLines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(repairSpanishText(text))},`);
}
explLines.push("};", "");
writeUtf8File(path.join(ROOT, "data/quijotes-explanations.js"), explLines.join("\n"));

process.stderr.write("Siguiente: npm run build:banco && npm run verify:encoding\n");
