/**
 * Añade sourceRef a preguntas propias (ofic-*) según tema y parte.
 * Uso: node scripts/repair-propias-sourceref.mjs
 */
import path from "path";
import { fileURLToPath } from "url";

import propias from "../data/questions-examen-propias.js";
import { writeQuestionModule } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "questions-examen-propias.js");

/** @type {Record<string, string>} */
const SOURCE_BY_TOPIC = {
  "electricidad-basica":
    "Elaboración propia (2026) · programa HAREC / electricidad básica; contrastar con manuales URE.",
  "magnetismo-ondas": "Elaboración propia (2026) · programa HAREC / magnetismo y ondas electromagnéticas.",
  "antenas-prop": "Elaboración propia (2026) · programa HAREC / antenas y propagación.",
  componentes: "Elaboración propia (2026) · programa HAREC / componentes y circuitos.",
  "receptores-emisores": "Elaboración propia (2026) · programa HAREC / receptores y emisores.",
  "marco-normativo":
    "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente en BOE.",
  "licencias-indicativos":
    "Elaboración propia (2026) · Orden IET/1311/2013 y CEPT T/R 61-01 (licencia CEPT).",
  "operacion-seguridad":
    "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE).",
  instalaciones:
    "Elaboración propia (2026) · Orden IET/1311/2013 / instalaciones, seguridad y EMC.",
};

const SOURCE_PART2_DEFAULT =
  "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente.";
const SOURCE_PART1_DEFAULT =
  "Elaboración propia (2026) · programa HAREC (CEPT T/R 61-02) / 1.ª parte del examen.";

let updated = 0;
const next = propias.map((q) => {
  if (q.sourceRef && String(q.sourceRef).trim()) return q;
  const sourceRef =
    SOURCE_BY_TOPIC[q.topicId] ||
    (q.part === 2 ? SOURCE_PART2_DEFAULT : SOURCE_PART1_DEFAULT);
  updated += 1;
  return { ...q, sourceRef };
});

writeQuestionModule(
  OUT,
  "Preguntas propias del proyecto (tier A). Cada ítem incluye sourceRef para trazabilidad.\nReparar: node scripts/repair-propias-sourceref.mjs",
  next,
);

process.stderr.write(`repair-propias-sourceref: ${updated} sourceRef añadidos en ${OUT}\n`);
