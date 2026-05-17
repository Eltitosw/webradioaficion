/**
 * Elimina raster *-original.* en images/quiz/ que no referencia el banco activo.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import questionsBanco from "../data/questions-banco.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUIZ_DIR = path.join(__dirname, "..", "images", "quiz");

const used = new Set(
  questionsBanco.filter((q) => q.stemFigure).map((q) => path.basename(String(q.stemFigure))),
);

let removed = 0;
for (const name of fs.readdirSync(QUIZ_DIR)) {
  if (!/-original\.(jpg|jpeg|png|webp)$/i.test(name)) continue;
  if (used.has(name)) continue;
  fs.unlinkSync(path.join(QUIZ_DIR, name));
  process.stderr.write(`Eliminado huérfano: ${name}\n`);
  removed += 1;
}
process.stderr.write(`Raster huérfanos eliminados: ${removed}\n`);
