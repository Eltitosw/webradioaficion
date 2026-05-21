#!/usr/bin/env node
/**
 * Alinea question-cribado.js con el banco publicado:
 * mantiene IDs en questions-banco.js o con el mismo enunciado+opciones (sustituto).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import questionsBanco from "../data/questions-banco.js";
import questions from "../data/questions.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import fedi from "../data/fediea-2011.js";
import fediBloques from "../data/fediea-bloques.js";
import quij from "../data/quijotes-ea3rcq.js";
import { CRIBADO_PREFERRED_IDS, CRIBADO_STATS, CRIBADO_MODE } from "../data/question-cribado.js";
import { dedupeKey, writeUtf8File } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "question-cribado.js");

const bancoIds = new Set(questionsBanco.map((q) => q.id));
const bancoByStem = new Map();
for (const q of questionsBanco) {
  bancoByStem.set(dedupeKey(q.stem, q.options), q);
}

const sources = [...questions, ...propias, ...ure, ...ureExtra, ...ureReg, ...fedi, ...fediBloques, ...quij];
const byId = new Map(sources.map((q) => [q.id, q]));

const kept = [];
const dropped = [];

for (const id of [...CRIBADO_PREFERRED_IDS].sort()) {
  if (bancoIds.has(id)) {
    kept.push(id);
    continue;
  }
  const src = byId.get(id);
  if (!src) {
    dropped.push({ id, reason: "sin fuente" });
    continue;
  }
  const key = dedupeKey(src.stem, src.options);
  if (bancoByStem.has(key)) {
    kept.push(id);
    continue;
  }
  dropped.push({ id, reason: "no en banco ni sustituto por enunciado" });
}

const lines = [];
lines.push("/**");
lines.push(" * Cribado por antigüedad de fuente (generado por `node scripts/cribado-recencia.mjs`).");
lines.push(" * Sincronizado con banco: `node scripts/sync-cribado-banco.mjs`.");
lines.push(` * Generado: ${new Date().toISOString().slice(0, 10)}`);
lines.push(" */");
lines.push(`export const CRIBADO_MODE = ${JSON.stringify(CRIBADO_MODE)};`);
lines.push("");
lines.push("/** IDs preferidos presentes en banco o representados por duplicado equivalente. */");
lines.push(`export const CRIBADO_PREFERRED_IDS = new Set(${JSON.stringify(kept, null, 2)});`);
lines.push("");
lines.push(`export const CRIBADO_STATS = ${JSON.stringify(
  {
    ...CRIBADO_STATS,
    preferredNormal: kept.length,
    preferredAmpliado: kept.length,
    preferredStrict: kept.length,
    prunedNotInBank: dropped.length,
    inBankById: kept.filter((id) => bancoIds.has(id)).length,
  },
  null,
  2,
)};`);
lines.push("");
lines.push("export function isCribadoPreferred(id) {");
lines.push("  return CRIBADO_PREFERRED_IDS.has(id);");
lines.push("}");
lines.push("");

writeUtf8File(OUT, lines.join("\n"));

console.log(`sync-cribado-banco: ${CRIBADO_PREFERRED_IDS.size} → ${kept.length} (eliminados ${dropped.length})`);
if (dropped.length) {
  console.log("Ejemplos eliminados:", dropped.slice(0, 5).map((d) => d.id).join(", "));
}
