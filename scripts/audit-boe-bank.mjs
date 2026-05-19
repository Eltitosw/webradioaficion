/**
 * Informe de preguntas con texto normativo obsoleto en banco activo.
 * Uso: node scripts/audit-boe-bank.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { applyBoeBankRules } from "../lib/boe-bank-rules.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "boe-audit-report.txt");

const OBSOLETE_PATTERNS = [
  { id: "ley-32-2003", re: /Ley 32\/2003/i, label: "Ley 32/2003 (sustituir por Ley 11/2022)" },
  { id: "itc-1791", re: /ITC\/1791\/2006/i, label: "Orden ITC/1791/2006 (derogada)" },
  {
    id: "dgt-telecom",
    re: /Direcci[oó]n General de Telecomunicaciones|\bDGTel\b/i,
    label:
      "Dirección General de Telecomunicaciones / DGTel (telecomunicaciones; no confundir con DGT de Tráfico)",
  },
  {
    id: "min-industria",
    re: /Ministerio de Industria, Turismo y Comercio/i,
    label: "Ministerio Industria (obsoleto como autoridad)",
  },
  { id: "setsis", re: /\bSETSI\b/i, label: "SETSI (obsoleto)" },
  {
    id: "repetidor-ningun-caso",
    re: /repetidor|desatendid/i,
    optRe: /^En ning[uú]n caso/i,
    label: "«En ningún caso» en repetidor/desatendida",
  },
  {
    id: "potencia-25-fuera",
    re: /fuera del casco urbano.*desatendid|desatendid.*fuera del casco urbano/i,
    correctRe: /\b25\s*w/i,
    label: "25 W como correcta fuera del casco urbano (BOE: 50 W art. 25.h)",
  },
];

/**
 * @param {object} q
 */
function scanQuestion(q) {
  const hits = [];
  const stem = String(q.stem || "");
  const opts = q.options || [];
  const correct = opts[q.correctIndex] ?? "";

  for (const p of OBSOLETE_PATTERNS) {
    if (p.optRe) {
      if (!p.re.test(stem)) continue;
      const bad = opts.findIndex((o) => p.optRe.test(String(o || "")));
      if (bad >= 0 && bad === q.correctIndex) {
        hits.push(p.label);
      }
      continue;
    }
    if (p.correctRe) {
      if (p.re.test(stem) && p.correctRe.test(String(correct))) {
        hits.push(p.label);
      }
      continue;
    }
    if (p.re.test(stem) || opts.some((o) => p.re.test(String(o || "")))) {
      if (p.id === "repetidor-ningun-caso") continue;
      hits.push(p.label);
    }
  }

  const fixed = applyBoeBankRules({ ...q });
  const wouldChange =
    fixed.stem !== q.stem ||
    fixed.correctIndex !== q.correctIndex ||
    (fixed.options || []).some((o, i) => o !== (q.options || [])[i]);

  return { hits, wouldChange };
}

const bancoPath = path.join(ROOT, "data", "questions-banco.js");
const mod = await import(pathToFileURL(bancoPath).href);
const questions = mod.default ?? mod.QUESTIONS ?? [];

const lines = [
  `Auditoría BOE — banco activo (${questions.length} preguntas)`,
  `Generado: ${new Date().toISOString()}`,
  "",
];

let obsolete = 0;
let fixable = 0;

for (const q of questions) {
  const { hits, wouldChange } = scanQuestion(q);
  if (hits.length === 0 && !wouldChange) continue;
  if (hits.length) obsolete += 1;
  if (wouldChange) fixable += 1;
  lines.push(`— ${q.id}`);
  if (hits.length) lines.push(`  Obsoleto: ${hits.join("; ")}`);
  if (wouldChange) lines.push("  Pendiente de applyBoeBankRules en fuentes/banco");
  lines.push("");
}

lines.push(`Resumen: ${obsolete} con patrón obsoleto · ${fixable} aún no alineadas por reglas`);
lines.push("Ejecutar: npm run apply:boe-bank && npm run build:banco");

fs.writeFileSync(OUT, lines.join("\n"), { encoding: "utf8" });
process.stderr.write(`audit-boe-bank: ${obsolete} hallazgos → ${OUT}\n`);
