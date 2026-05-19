/**
 * Informe de preguntas con clasificación de baja confianza (revisión editorial).
 * Uso: node scripts/review-classification-fallback.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import questionsBanco from "../data/questions-banco.js";
import { classifyQuestion } from "../lib/question-classification.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "classification-review-fallback.txt");

/** @type {Record<string, { count: number; samples: string[] }>} */
const groups = {};

for (const q of questionsBanco) {
  const c = classifyQuestion({ stem: q.stem, sourcePart: q.part, id: q.id });
  if (c.confidence !== "low") continue;
  const key = `${q.part}/${q.topicId}`;
  const g = groups[key] || { count: 0, samples: [] };
  g.count += 1;
  if (g.samples.length < 5) {
    g.samples.push(`${q.id}\t${q.stem.slice(0, 100).replace(/\s+/g, " ")}`);
  }
  groups[key] = g;
}

const lowTotal = Object.values(groups).reduce((n, g) => n + g.count, 0);
const lines = [];
const push = (s = "") => lines.push(s);

push("=== Revisión: clasificación de baja confianza ===");
push(`Fecha: ${new Date().toISOString().slice(0, 10)}`);
push(`Total banco: ${questionsBanco.length}`);
push(`Revisión pendiente (fallback-review): ${lowTotal}`);
push("");
push("Agrupado por parte/tema almacenado. Añade reglas en lib/question-classification.mjs");
push("o entradas en data/question-classification-overrides.mjs");
push("");

for (const [key, g] of Object.entries(groups).sort((a, b) => b[1].count - a[1].count)) {
  push(`── ${g.count} × ${key} ──`);
  for (const s of g.samples) push(`  ${s}`);
  if (g.count > g.samples.length) push(`  … ${g.count - g.samples.length} más`);
  push("");
}

const text = lines.join("\n");
fs.writeFileSync(OUT, `${text}\n`, { encoding: "utf8" });
console.log(text);
console.error(`\nEscrito ${OUT}`);
