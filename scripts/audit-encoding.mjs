/**
 * Auditoría de codificación en todos los módulos de preguntas y textos de estudio.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const DATA_FILES = [
  "data/questions-banco.js",
  "data/questions-figures.js",
  "data/fediea-bloques.js",
  "data/fediea-2011.js",
  "data/quijotes-ea3rcq.js",
  "data/ure-electricidad.js",
  "data/ure-electricidad-extra.js",
  "data/ure-reglamentacion.js",
  "data/questions.js",
  "data/questions-examen-propias.js",
  "data/topics-study.js",
  "data/topics.js",
  "data/quijotes-explanations.js",
];

const SUSPICIOUS = [
  { name: "U+FFFD", re: /\uFFFD/g },
  { name: "mojibake Ã", re: /Ã[¡©­³º±]/g },
  { name: "qu sin tilde (qué)", re: /\bqu (circuito|valor|tipo|esquema|funci)/gi },
  { name: "Qu sin tilde", re: /\bQu valor\b/g },
  { name: "grfico", re: /grfico/gi },
  { name: "geogrf", re: /geogrf/gi },
  { name: "indquelo", re: /indquelo/gi },
  { name: "incluira", re: /\bincluira\b/gi },
  { name: "unica sin tilde tras Qu", re: /\bunica\b/gi },
];

let totalIssues = 0;

for (const rel of DATA_FILES) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) continue;
  const text = fs.readFileSync(abs, "utf8");
  const fileIssues = [];
  for (const { name, re } of SUSPICIOUS) {
    const m = text.match(re);
    if (m?.length) fileIssues.push({ name, count: m.length });
  }
  if (fileIssues.length) {
    process.stderr.write(`\n${rel}:\n`);
    for (const i of fileIssues) {
      process.stderr.write(`  ${i.name}: ${i.count}\n`);
      totalIssues += i.count;
    }
  }
}

if (totalIssues) {
  process.stderr.write(`\nTotal indicios: ${totalIssues}\n`);
  process.exit(1);
}
process.stderr.write("audit-encoding: OK (sin indicios de texto corrupto).\n");
