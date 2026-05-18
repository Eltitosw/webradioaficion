/**
 * Auditoría: cobertura del temario (topics-study) frente al banco activo.
 * Uso: node scripts/audit-temario-banco.mjs
 */
import questionsBanco from "../data/questions-banco.js";
import { BANCO_STATS } from "../data/questions-banco.js";
import topics from "../data/topics.js";
import topicStudy from "../data/topics-study.js";
import { pedagogicalExplain, isTemplateOnlyExplain } from "../lib/explain-quality.mjs";

const SECTIONS = [
  "memoryHooks",
  "expressBullets",
  "readMore",
  "fedieaSyllabus",
  "bookGuide",
  "practiceDrills",
  "quickSession",
  "examChecklist",
  "trapWarnings",
  "flashcards",
];

const lines = [];
const push = (s = "") => lines.push(s);

push("=== Auditoría temario ↔ banco ===");
push(`Fecha: ${new Date().toISOString().slice(0, 10)}`);
push(`Banco activo: ${questionsBanco.length} preguntas (mín. 900)`);
push(`Figuras certificadas: ${BANCO_STATS.withFigure ?? "?"}`);
push("");

/** @type {Record<string, { count: number, fig: number, ped: number, template: number }>} */
const byTopic = {};

for (const q of questionsBanco) {
  const t = byTopic[q.topicId] || { count: 0, fig: 0, ped: 0, template: 0 };
  t.count += 1;
  if (q.stemFigure) t.fig += 1;
  if (pedagogicalExplain(q)) t.ped += 1;
  if (isTemplateOnlyExplain(q.explain)) t.template += 1;
  byTopic[q.topicId] = t;
}

let totalPed = 0;
let totalTemplate = 0;
for (const q of questionsBanco) {
  if (pedagogicalExplain(q)) totalPed += 1;
  if (isTemplateOnlyExplain(q.explain)) totalTemplate += 1;
}

push("Resumen didáctico del banco:");
push(`  Explicación útil en feedback: ${totalPed} (${Math.round((100 * totalPed) / questionsBanco.length)}%)`);
push(`  Solo plantilla histórica:     ${totalTemplate} (${Math.round((100 * totalTemplate) / questionsBanco.length)}%)`);
push("");
push("Bloque (parte) · preguntas · figuras · didáctica · plantilla · estudio");
push("─".repeat(72));

const imbalances = [];

for (const part of topics.parts) {
  for (const block of part.blocks) {
    const study = topicStudy[block.id];
    const q = byTopic[block.id] || { count: 0, fig: 0, ped: 0, template: 0 };
    const partNum = part.id === "p2" ? 2 : 1;
    const missingSections = SECTIONS.filter((k) => !study?.[k]?.length);
    const flashCount = study?.flashcards?.length ?? 0;
    const trapCount = study?.trapWarnings?.length ?? 0;
    const studyKb = study ? Math.round(JSON.stringify(study).length / 1024) : 0;

    push(
      `${block.id.padEnd(22)} P${partNum}  ${String(q.count).padStart(4)} preg  ${String(q.fig).padStart(2)} fig  ${String(q.ped).padStart(4)} did  ${String(q.template).padStart(4)} plat  ${String(studyKb).padStart(2)} KB  flash:${flashCount} traps:${trapCount}`,
    );

    if (!study) {
      imbalances.push(`CRÍTICO: sin topics-study para «${block.id}»`);
    } else if (missingSections.length) {
      imbalances.push(`Secciones vacías en «${block.id}»: ${missingSections.join(", ")}`);
    }

    if (q.count >= 80 && flashCount < 4) {
      imbalances.push(
        `«${block.id}»: ${q.count} preguntas pero solo ${flashCount} tarjetas (recomendado ≥4 en bloques grandes)`,
      );
    }
    if (q.count >= 50 && q.ped / Math.max(q.count, 1) < 0.15 && q.count > 60) {
      imbalances.push(
        `«${block.id}»: pocas explicaciones didácticas en banco (${q.ped}/${q.count}); el temario compensa, pero conviene ampliar quijotes-explanations o propias`,
      );
    }
  }
}

const p1 = questionsBanco.filter((q) => q.part === 1).length;
const p2 = questionsBanco.filter((q) => q.part === 2).length;
push("");
push(`Parte 1: ${p1} preguntas · Parte 2: ${p2} preguntas`);
push("");

if (imbalances.length) {
  push("Sugerencias de mejora:");
  for (const msg of imbalances) push(`  • ${msg}`);
} else {
  push("Estructura del temario: completa en los 9 bloques (todas las secciones editoriales presentes).");
}

push("");
push("Notas:");
push("  • El temario no necesita 1:1 con cada pregunta; debe cubrir el programa HAREC/BOE por bloque.");
push("  • Tras deduplicar parafraseos, el banco prioriza una sola redacción por idea.");
push("  • Preguntas con solo plantilla FEDI/Quijotes dependen del temario en «Ampliación» y enlaces.");

const text = lines.join("\n");
process.stdout.write(`${text}\n`);
