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

import { loadExistingDedupeKeys } from "../lib/existing-question-keys.mjs";
import { dedupeKey } from "../lib/import-question-utils.mjs";
import {
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
const allowDuplicates = args.includes("--allow-duplicates");
const slugFilter = args.find((a) => a.startsWith("--slug="))?.split("=")[1]?.replace(/\/$/, "");
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

  let existingKeys = new Set();
  if (!allowDuplicates) {
    const loaded = await loadExistingDedupeKeys();
    existingKeys = loaded.keys;
    process.stderr.write(
      `Claves ya en proyecto: ${existingKeys.size} (${Object.entries(loaded.counts)
        .map(([f, n]) => `${f}:${n}`)
        .join(", ")})\n`,
    );
  }

  let discovered = await discoverExamQuizUrls();
  if (slugFilter) {
    discovered = discovered.filter((d) => d.slug === slugFilter || d.slug.includes(slugFilter));
    if (!discovered.length) {
      console.error(`No hay quiz con slug «${slugFilter}».`);
      process.exit(1);
    }
  }

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

  /** @type {Map<string, object>} */
  const mergedByKey = new Map();
  for (const q of legacyById.values()) {
    mergedByKey.set(dedupeKey(q.stem, q.options), q);
  }

  let skippedExisting = 0;
  let skippedDupRun = 0;
  let addedNew = 0;

  for (const src of sources) {
    process.stderr.write(`Muestreando ${src.slug} (quiz ${src.key}, ${ROUNDS} rondas)…\n`);
    const items = await fetchQuizPool({
      ...src,
      rounds: ROUNDS,
      slug: src.slug,
    });
    for (const it of items) {
      const k = dedupeKey(it.stem, it.options);
      if (existingKeys.has(k)) {
        skippedExisting += 1;
        continue;
      }
      if (mergedByKey.has(k)) {
        skippedDupRun += 1;
        continue;
      }
      const row = {
        id: stableQuijotesId(it.quizKey, it.qid),
        part: it.part,
        topicId: it.topicId,
        stem: it.stem,
        options: it.options,
        correctIndex: it.correctIndex,
        explain: `Práctica histórica (Quijotes EA3RCQ · ${src.slug}, quiz ${it.quizKey}, pregunta ${it.qid}). Puede contener erratas; contrastar con BOE/convocatoria.`,
      };
      mergedByKey.set(k, row);
      existingKeys.add(k);
      addedNew += 1;
    }
    process.stderr.write(
      `  → ${items.length} del quiz, +${addedNew} nuevas, ${skippedExisting} ya en banco/fuentes, ${skippedDupRun} duplicadas en esta pasada\n`,
    );
  }

  const merged = [...mergedByKey.values()];
  process.stderr.write(
    `\nTotal Quijotes: ${merged.length} (${addedNew} añadidas, ${skippedExisting} omitidas por ya existir, ${legacyById.size} legado conservado).\n`,
  );

  if (dryRun) {
    process.stderr.write("Modo --dry-run: no se escribieron archivos.\n");
    return;
  }

  const forWrite = merged.map((q) => ({
    quizKey: q.id.match(/^quijotes-(\d+)-/)?.[1] ?? "0",
    qid: q.id.replace(/^quijotes-\d+-/, ""),
    part: q.part,
    topicId: q.topicId,
    stem: q.stem,
    options: q.options,
    correctIndex: q.correctIndex,
    sourceSlug: q.explain?.match(/Quijotes EA3RCQ · ([^,]+),/)?.[1] ?? "quijotes",
  }));

  writeQuestionsModule(forWrite, sources);
  const nExplain = writeExplanationsModule(forWrite, stemToExplain);
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
