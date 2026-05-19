/**
 * Verificación de fuentes y seguridad de explicaciones (sin inventar normativa).
 * Uso: node scripts/verify-sources.mjs
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import banco from "../data/questions-banco.js";
import regulatory from "../data/regulatory.js";
import {
  SOURCES_CATALOG,
  SOURCE_TIER_LABELS,
  getQuestionSourceMeta,
} from "../data/verification-sources.mjs";
import {
  auditBankSourceSafety,
  auditRegulatoryCatalog,
} from "../lib/source-verification.mjs";

const OUT = join(import.meta.dirname, "..", "data", "verify-sources-report.txt");

const boeDates = spawnSync(process.execPath, ["scripts/verify-boe-dates.mjs"], {
  cwd: join(import.meta.dirname, ".."),
  encoding: "utf8",
});
if (boeDates.status !== 0) {
  console.error(boeDates.stdout || boeDates.stderr);
  process.exit(boeDates.status ?? 1);
}

const BINDING_URLS = SOURCES_CATALOG.filter((s) => s.tier === "binding" && s.href).map((s) => s.href);

/** @type {{ url: string, ok: boolean, status?: number }[]} */
const urlChecks = [];

const FETCH_HEADERS = {
  "User-Agent": "RadioExamen-Verify/1.0 (educational; +https://github.com/)",
  Accept: "text/html,application/xhtml+xml",
};

for (const url of BINDING_URLS) {
  const isAdminSede = /digital\.gob\.es/i.test(url);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: FETCH_HEADERS,
    });
    const ok = res.ok || (isAdminSede && (res.status === 403 || res.status === 405));
    urlChecks.push({ url, ok, status: res.status });
  } catch {
    urlChecks.push({ url, ok: isAdminSede, status: isAdminSede ? "red" : undefined });
  }
}

const regMissing = auditRegulatoryCatalog(regulatory);
const bankAudit = auditBankSourceSafety(banco);

const byTier = {};
for (const q of banco) {
  const t = getQuestionSourceMeta(q).tier;
  byTier[t] = (byTier[t] || 0) + 1;
}

const lines = [
  `Verificación de fuentes · ${new Date().toISOString().slice(0, 19)}`,
  "",
  "=== Catálogo (data/verification-sources.mjs) ===",
  `Entradas: ${SOURCES_CATALOG.length}`,
  ...Object.entries(SOURCE_TIER_LABELS).map(([k, v]) => `- ${k}: ${v}`),
  "",
  "=== Preguntas del banco por nivel de fuente ===",
  ...Object.entries(byTier)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([t, n]) => `- ${t}: ${n}`),
  "",
  "=== Enlaces vinculantes (comprobación HTTP) ===",
  ...urlChecks.map((u) => `- ${u.ok ? "OK" : "FALLO"} ${u.status ?? "—"} ${u.url}`),
  "",
  "=== regulatory.js ===",
  regMissing.length ? `Faltan: ${regMissing.join(", ")}` : "OK: grupos y jerarquía presentes",
  "",
  "=== Explicaciones vs fuentes ===",
  `Fallos: ${bankAudit.fails.length}`,
  `Avisos: ${bankAudit.warns.length}`,
  "",
];

if (bankAudit.fails.length) {
  lines.push("--- Fallos (muestra 40) ---");
  for (const f of bankAudit.fails.slice(0, 40)) {
    const q = banco.find((x) => x.id === f.id);
    lines.push(`- ${f.id}: ${f.codes.join(", ")}`);
    if (q) lines.push(`  ${String(q.stem).replace(/\s+/g, " ").slice(0, 100)}`);
  }
  if (bankAudit.fails.length > 40) lines.push(`… y ${bankAudit.fails.length -  40} más`);
  lines.push("");
}

if (bankAudit.warns.length) {
  lines.push("--- Avisos (muestra 30) ---");
  for (const w of bankAudit.warns.slice(0, 30)) {
    lines.push(`- ${w.id}: ${w.codes.join(", ")}`);
  }
  if (bankAudit.warns.length > 30) lines.push(`… y ${bankAudit.warns.length - 30} más`);
  lines.push("");
}

lines.push("=== Por origen de pregunta ===");
for (const [label, counts] of Object.entries(bankAudit.bySource).sort((a, b) => b[1].fail - a[1].fail)) {
  lines.push(`- ${label}: ${counts.fail} fallos, ${counts.warn} avisos`);
}

lines.push("");
lines.push("PDF/libros en repo: ninguno (solo enlaces en regulatory.js y verification-sources.mjs).");
lines.push("Contraste manual: FUENTES_VERIFICACION.md + vista Normativa de la app.");

writeFileSync(OUT, lines.join("\n"));

console.log(lines.slice(0, 22).join("\n"));
console.log(`\nInforme: ${OUT}`);

const fail = regMissing.length > 0 || bankAudit.fails.length > 0 || bankAudit.warns.length > 0;
if (fail) {
  if (bankAudit.fails.length) {
    console.error(`FALLO: ${bankAudit.fails.length} explicación(es) con riesgo de dato no verificado`);
  }
  if (bankAudit.warns.length) {
    console.error(
      `FALLO: ${bankAudit.warns.length} explicación(es) sin cita BOE-A-2013-7624 (ejecuta: npm run sync:boe-explanations)`,
    );
  }
  process.exit(1);
}
console.log("OK: verificación de fuentes superada (0 fallos, 0 avisos)");
process.exit(0);
