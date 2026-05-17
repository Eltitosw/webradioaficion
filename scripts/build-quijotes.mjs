/**
 * Descarga el banco QSM de Radio Club Quijotes (EA3RCQ) con muestreo aleatorio repetido.
 *
 * Cada página solo incluye ~30 preguntas del pool; varias rondas descubren cientos por quiz.
 *
 * Uso:
 *   node scripts/build-quijotes.mjs
 *   node scripts/build-quijotes.mjs --rounds 50
 *   node scripts/build-quijotes.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  dedupeKey,
  discoverExamQuizUrls,
  detectQuizKey,
  fetchQuizPool,
  stableQuijotesId,
} from "../lib/quijotes-fetch.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "quijotes-ea3rcq.js");
const OUT_EXPLAIN = path.join(__dirname, "..", "data", "quijotes-explanations.js");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const roundsArg = args.find((a) => a.startsWith("--rounds="));
const ROUNDS = roundsArg ? parseInt(roundsArg.split("=")[1], 10) : 60;

/** IDs de trampa en app.js que deben conservarse tras regenerar (por stem). */
const TRAP_LEGACY_IDS = [
  "quijotes-020",
  "quijotes-039",
  "quijotes-044",
  "quijotes-047",
  "quijotes-051",
  "quijotes-057",
  "quijotes-058",
  "quijotes-062",
  "quijotes-070",
  "quijotes-077",
  "quijotes-087",
  "quijotes-093",
  "quijotes-095",
  "quijotes-106",
  "quijotes-110",
  "quijotes-111",
];

function inferPart(slug) {
  if (/reglamentacion|comunicaciones|normativa|licencia/i.test(slug)) return 2;
  return 1;
}

async function loadLegacyMaps() {
  const stemToExplain = new Map();
  const legacyById = new Map();
  try {
    const legacy = (await import(`../data/quijotes-ea3rcq.js?${Date.now()}`)).default;
    const explains = (await import(`../data/quijotes-explanations.js?${Date.now()}`)).default;
    for (const q of legacy) {
      legacyById.set(q.id, q);
      if (explains[q.id]) stemToExplain.set(dedupeKey(q.stem, q.options), explains[q.id]);
    }
  } catch {
    /* primera importación */
  }
  return { stemToExplain, legacyById };
}

function writeQuestionsModule(questions, sources) {
  const lines = [];
  lines.push("/**");
  lines.push(" * Radio Club Quijotes (EA3RCQ) — tests en línea.");
  lines.push(" * Generado por `node scripts/build-quijotes.mjs` (no editar el bloque masivo a mano).");
  lines.push(` * Rondas de muestreo por quiz: ${ROUNDS} (cada ronda ~30 preguntas aleatorias del pool).`);
  lines.push(" * Fuentes:");
  for (const s of sources) {
    lines.push(` *   - ${s.url} (quiz ${s.key}, ${s.slug})`);
  }
  lines.push(" * Se excluyen ítems con referencias FCC/ARRL u otros países, y enunciados que exigen figura.");
  lines.push(" */");
  lines.push("export default [");

  for (const it of questions) {
    const id = stableQuijotesId(it.quizKey, it.qid);
    const optStr = it.options.map((o) => JSON.stringify(o)).join(",\n      ");
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(id)},`);
    lines.push(`    part: ${it.part},`);
    lines.push(`    topicId: ${JSON.stringify(it.topicId)},`);
    lines.push(`    stem: ${JSON.stringify(it.stem)},`);
    lines.push(`    options: [\n      ${optStr},\n    ],`);
    lines.push(`    correctIndex: ${it.correctIndex},`);
    lines.push(
      `    explain: ${JSON.stringify(`Práctica histórica (Quijotes EA3RCQ · ${it.sourceSlug}, quiz ${it.quizKey}, pregunta ${it.qid}). Puede contener erratas; contrastar con BOE/convocatoria.`)}`,
    );
    lines.push("  },");
  }
  lines.push("];");
  lines.push("");
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
}

function writeExplanationsModule(questions, stemToExplain) {
  const entries = [];
  for (const it of questions) {
    const id = stableQuijotesId(it.quizKey, it.qid);
    const text = stemToExplain.get(dedupeKey(it.stem, it.options));
    if (text) entries.push({ id, text });
  }
  const lines = [
    "/**",
    " * Explicaciones didácticas para preguntas Quijotes (remapeadas por enunciado al regenerar el banco).",
    " */",
    "export default {",
  ];
  for (const { id, text } of entries) {
    lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(text)},`);
  }
  lines.push("};");
  lines.push("");
  fs.writeFileSync(OUT_EXPLAIN, lines.join("\n"), "utf8");
  return entries.length;
}

async function main() {
  const { stemToExplain, legacyById } = await loadLegacyMaps();
  const trapKeys = new Set();
  for (const id of TRAP_LEGACY_IDS) {
    const q = legacyById.get(id);
    if (q) trapKeys.add(dedupeKey(q.stem, q.options));
  }

  const discovered = await discoverExamQuizUrls();
  const sources = [];

  for (const { url, slug } of discovered) {
    process.stderr.write(`Detectando quiz en ${slug}…\n`);
    const key = await detectQuizKey(url);
    if (!key) {
      process.stderr.write(`  omitido (sin qmn_quiz_data)\n`);
      continue;
    }
    sources.push({
      url,
      slug,
      key,
      part: inferPart(slug),
    });
  }

  const merged = [];
  const seen = new Set();

  for (const src of sources) {
    process.stderr.write(`Muestreando ${src.slug} (quiz ${src.key}, ${ROUNDS} rondas)…\n`);
    const items = await fetchQuizPool({
      ...src,
      rounds: ROUNDS,
      slug: src.slug,
    });
    for (const it of items) {
      const k = dedupeKey(it.stem, it.options);
      if (seen.has(k)) continue;
      seen.add(k);
      merged.push({ ...it, sourceSlug: src.slug });
    }
    process.stderr.write(`  → ${items.length} del quiz, ${merged.length} acumuladas únicas\n`);
  }

  process.stderr.write(`\nTotal Quijotes: ${merged.length} preguntas únicas (${sources.length} quizzes).\n`);

  if (dryRun) {
    process.stderr.write("Modo --dry-run: no se escribieron archivos.\n");
    return;
  }

  writeQuestionsModule(merged, sources);
  const nExplain = writeExplanationsModule(merged, stemToExplain);
  process.stderr.write(`Escrito ${OUT}\n`);
  process.stderr.write(`Escrito ${OUT_EXPLAIN} (${nExplain} explicaciones remapeadas).\n`);

  if (trapKeys.size) {
    const newTraps = [];
    for (const it of merged) {
      if (trapKeys.has(dedupeKey(it.stem, it.options))) {
        newTraps.push(stableQuijotesId(it.quizKey, it.qid));
      }
    }
    process.stderr.write(
      `\nActualiza TRAP_QUESTION_IDS en app.js con:\n${newTraps.map((id) => `  "${id}",`).join("\n")}\n`,
    );
  }

  process.stderr.write("\nSiguiente: node scripts/verify-data.mjs\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
