/** Elimina preguntas importadas cuyo enunciado exige figura (verify-extra). */
import path from "path";
import { fileURLToPath } from "url";
import fedieaBloques from "../data/fediea-bloques.js";
import { stemNeedsFigure, writeQuestionModule } from "../lib/import-question-utils.mjs";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "fediea-bloques.js");
const kept = fedieaBloques.filter((q) => !stemNeedsFigure(q.stem));
process.stderr.write(`Eliminadas ${fedieaBloques.length - kept.length}, quedan ${kept.length}.\n`);
writeQuestionModule(
  out,
  "FEDI-EA — bloques históricos de práctica (001-592 y exámenes 2007-2011).\nÍndice: https://fediea.org/examen/ejercicios/\nAdvertencia FEDI: pueden contener fallos u obsolescencia.",
  kept,
);
