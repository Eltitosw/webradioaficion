/**
 * Comprueba que app.bundle.js incluye el banco estudio actualizado.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import estudio from "../data/questions-banco-estudio.js";
import { BANCO_ESTUDIO_STATS } from "../data/questions-banco-estudio.js";
import { strictAuditExplainBank } from "../lib/explain-verify.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bundlePath = path.join(__dirname, "..", "app.bundle.js");
const bundle = fs.readFileSync(bundlePath, "utf8");

const audit = strictAuditExplainBank(estudio);
const stat = fs.statSync(bundlePath);

let missing = 0;
for (const q of estudio) {
  const snippet = String(q.explain || "").slice(0, 48);
  if (snippet && !bundle.includes(snippet)) missing += 1;
}

const checks = [
  ["BANCO_ESTUDIO_STATS.count", bundle.includes(`"count": ${BANCO_ESTUDIO_STATS.count}`)],
  ["withPedagogicalExplain 542", bundle.includes('"withPedagogicalExplain": 542')],
  [
    "q1 explain parcheada",
    bundle.includes("ley de Ohm relaciona tensi") && bundle.includes("V = I"),
  ],
  [
    "ure-p1-q3 selectividad",
    bundle.includes("selectividad permite separar") || bundle.includes("Selectividad"),
  ],
  ["sin plantilla genérica masiva", !bundle.includes("En este enunciado («La capacidad de un receptor")],
];

console.log(`Bundle: ${(stat.size / 1e6).toFixed(2)} MB · modificado ${stat.mtime.toISOString().slice(0, 19)}`);
console.log(`Banco estudio: ${audit.ok}/${audit.total} explicaciones OK`);
console.log(`Explicaciones sin fragmento en bundle: ${missing}/${estudio.length}`);

let fail = audit.unacceptable.length > 0;
for (const [label, ok] of checks) {
  console.log(`${ok ? "OK" : "FALLO"}: ${label}`);
  if (!ok) fail = true;
}

if (fail) process.exit(1);
console.log("verify-bundle-estudio: OK");
