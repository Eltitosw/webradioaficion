/**
 * Auditoría: temas del libro oficial (HAREC / temario) vs cobertura del banco activo.
 * Uso: node scripts/audit-libro-banco.mjs
 */
import questionsBanco from "../data/questions-banco.js";
import topicStudy from "../data/topics-study.js";
import topics from "../data/topics.js";
import { TEMARIO_BLOCK_ENRICHMENT } from "../data/temario-book-map.mjs";

/** Temas típicos del libro oficial 1.ª parte (electricidad) no siempre presentes en el banco URE. */
const LIBRO_ELECTRICIDAD_TOPICS = [
  { id: "coulomb", label: "Ley de Coulomb / cargas", keywords: ["coulomb", "carga", "cargas"] },
  { id: "campo-e", label: "Campo eléctrico (V/m)", keywords: ["campo eléctrico", "v/m", "intensidad de campo"] },
  { id: "campo-em", label: "Campo electromagnético / onda", keywords: ["electromagnét", "onda electromagn"] },
  { id: "codigo-colores", label: "Código de colores", keywords: ["código de colores", "colores", "violeta", "tolerancia"] },
  { id: "rms-pico", label: "Valor eficaz vs pico", keywords: ["eficaz", "rms", "pico", "√2", "raíz"] },
  { id: "periodo-f", label: "Periodo y frecuencia T=1/f", keywords: ["periodo", "frecuencia", "hertz", "ciclo"] },
  { id: "factor-potencia", label: "Factor de potencia / cos φ", keywords: ["factor de potencia", "cos φ", "coseno", "aparente"] },
  { id: "dbm", label: "dBm vs dB", keywords: ["dbm", "1 mw", "1 mW"] },
  { id: "instrumentos", label: "Instrumentos (V/I/R)", keywords: ["voltímetro", "amperímetro", "óhmetro", "vatímetro", "osciloscopio"] },
  { id: "condensador-cc", label: "Condensador en CC estable", keywords: ["condensador", "circuito abierto", "cc estable"] },
  { id: "bobina-cc", label: "Bobina en CC estable", keywords: ["bobina", "inductor", "cortocircuito", "cc estable"] },
  { id: "energia-c", label: "Energía en condensador", keywords: ["½c", "1/2 c", "energía almacenada", "condensador"] },
  { id: "fuentes-interna", label: "FEM y resistencia interna", keywords: ["resistencia interna", "fem", "f.e.m", "bornes"] },
  { id: "unidades-k", label: "Prefijos k, m (unidades)", keywords: ["kω", "kΩ", "ma", "mA", "kiloohm"] },
];

function stemHitsTopic(q, keywords) {
  const s = [q.stem, ...(q.options || []), q.explain]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return keywords.some((k) => s.includes(k.toLowerCase()));
}

const lines = [];
const push = (s = "") => lines.push(s);

push("=== Auditoría libro oficial ↔ banco ===");
push(`Fecha: ${new Date().toISOString().slice(0, 10)}`);
push(`Banco activo: ${questionsBanco.length} preguntas`);
push("");

/** @type {Record<string, object[]>} */
const byTopic = {};
for (const q of questionsBanco) {
  const t = q.topicId || "sin-tema";
  if (!byTopic[t]) byTopic[t] = [];
  byTopic[t].push(q);
}

push("Cobertura por bloque (preguntas en banco vs temario):");
push("─".repeat(72));
for (const part of topics.parts) {
  for (const block of part.blocks) {
    const n = byTopic[block.id]?.length ?? 0;
    const en = TEMARIO_BLOCK_ENRICHMENT[block.id];
    const libro = en?.libro ?? "—";
    const low = n < 25 ? " ⚠ poco banco" : "";
    push(`${block.id.padEnd(22)} ${String(n).padStart(4)} preg   libro: ${libro}${low}`);
  }
}
push("");

const elec = byTopic["electricidad-basica"] ?? [];
push(`Electricidad básica: ${elec.length} preguntas en banco`);
push("");

push("Temas del libro (1.ª parte · electricidad) vs preguntas del banco:");
push("─".repeat(72));

const gaps = [];
for (const topic of LIBRO_ELECTRICIDAD_TOPICS) {
  const hits = elec.filter((q) => stemHitsTopic(q, topic.keywords));
  const status = hits.length === 0 ? "SIN cobertura" : `${hits.length} pregunta(s)`;
  push(`${topic.label.padEnd(36)} ${status}`);
  if (hits.length === 0) gaps.push(topic.label);
  else if (hits.length <= 2) {
    hits.forEach((q) => push(`    · ${q.id}: ${q.stem.slice(0, 70)}…`));
  }
}

push("");
if (gaps.length) {
  push(`Huecos detectados (${gaps.length}): el temario y el PDF cubren estos temas; conviene ampliar preguntas propias (ofic-*).`);
  for (const g of gaps) push(`  • ${g}`);
} else {
  push("Todos los temas clave del libro tienen al menos una pregunta en el banco.");
}

push("");
push("Notas:");
push("  • El libro no se importa automáticamente (PDF escaneo); las propias citan HAREC + capítulo del libro.");
push("  • Tras añadir ofic-047… ejecuta: node scripts/cribado-recencia.mjs --examen && node scripts/build-banco-principal.mjs");
push("  • Objetivo electricidad: ~30–35 preguntas tras ampliación (sin duplicar enunciados URE).");

import path from "path";
import { fileURLToPath } from "url";
import { writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "docs", "LIBRO_BANCO_AUDIT.txt");
const text = lines.join("\n");
process.stdout.write(`${text}\n`);
writeUtf8File(outPath, `${text}\n`);
process.stderr.write(`\nEscrito ${outPath}\n`);
