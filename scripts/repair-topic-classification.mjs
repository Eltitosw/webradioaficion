/**
 * Corrige topicId/part erróneos (p. ej. «transceptor» → licencias por /cept/).
 * Regenera fuentes FEDI y vuelve a materializar el banco.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import fediBloques from "../data/fediea-bloques.js";
import ureReg from "../data/ure-reglamentacion.js";
import quijotes from "../data/quijotes-ea3rcq.js";
import { classifyQuestion } from "../lib/question-classification.mjs";
import { repairQuestionFields } from "../lib/text-encoding.mjs";
import { writeQuestionModule } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function patchList(list) {
  let changed = 0;
  const out = list.map((q) => {
    const { part, topicId } = classifyQuestion({ stem: q.stem, sourcePart: q.part, id: q.id });
    if (part === q.part && topicId === q.topicId) return q;
    changed += 1;
    return repairQuestionFields({ ...q, part, topicId });
  });
  return { out, changed };
}

const fedi = patchList(fediBloques);
const ure = patchList(ureReg);
const qz = patchList(quijotes);

writeQuestionModule(
  path.join(ROOT, "data", "fediea-bloques.js"),
  "FEDI-EA bloques históricos.",
  fedi.out,
);
writeQuestionModule(
  path.join(ROOT, "data", "ure-reglamentacion.js"),
  "URE reglamentación (parte 2).",
  ure.out,
);
writeQuestionModule(path.join(ROOT, "data", "quijotes-ea3rcq.js"), "Quijotes EA3RCQ.", qz.out);

const total = fedi.changed + ure.changed + qz.changed;
process.stderr.write(
  `repair-topic-classification: ${total} preguntas (fedi ${fedi.changed}, ure ${ure.changed}, quijotes ${qz.changed})\n`,
);
