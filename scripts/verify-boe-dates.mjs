/**
 * Contrasta consolidatedAt del catálogo con la fecha que publica boe.es.
 * Uso: node scripts/verify-boe-dates.mjs
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { BOE_CATALOG_REVIEWED_AT, BOE_NORMATIVA } from "../data/boe-normativa.mjs";

const OUT = join(import.meta.dirname, "..", "data", "boe-dates-report.txt");

/** @param {string} url */
async function fetchBoeConsolidationDate(url) {
  if (!url.includes("buscar/act.php")) return { skip: true, reason: "no consolidado HTML" };
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) });
  if (!res.ok) return { skip: true, reason: `HTTP ${res.status}` };
  const html = await res.text();
  if (!/Legislación consolidada/i.test(html)) {
    return { skip: true, reason: "página sin texto consolidado" };
  }
  const m = html.match(/Última actualización publicada el\s*([^<]+)/i);
  return { skip: false, live: m?.[1]?.trim() || null };
}

const lines = [
  `Verificación fechas BOE · ${new Date().toISOString().slice(0, 19)}`,
  `Catálogo revisado internamente: ${BOE_CATALOG_REVIEWED_AT}`,
  "",
];

/** @type {{ id: string, status: string, catalog?: string, live?: string }[]} */
const rows = [];
let mismatches = 0;

for (const b of BOE_NORMATIVA) {
  const result = await fetchBoeConsolidationDate(b.hrefHtml);
  if (result.skip) {
    const expected = b.consolidatedAt;
    rows.push({
      id: b.id,
      status: expected ? "WARN" : "OK",
      catalog: expected ?? "—",
      live: result.reason,
    });
    if (expected) {
      mismatches += 1;
      lines.push(`WARN ${b.id}: catálogo exige consolidado (${expected}) pero ${result.reason}`);
    } else {
      lines.push(`OK   ${b.id}: disposición aislada / sin fecha consolidado (${result.reason})`);
    }
    continue;
  }

  const catalog = b.consolidatedAt ?? null;
  const live = result.live;

  if (catalog && live && catalog !== live) {
    mismatches += 1;
    rows.push({ id: b.id, status: "MISMATCH", catalog, live });
    lines.push(`FAIL ${b.id}: catálogo=${catalog} · BOE=${live}`);
  } else if (catalog && !live) {
    mismatches += 1;
    rows.push({ id: b.id, status: "MISSING_LIVE", catalog, live: "—" });
    lines.push(`FAIL ${b.id}: catálogo=${catalog} · BOE no devolvió fecha`);
  } else if (catalog && live) {
    rows.push({ id: b.id, status: "OK", catalog, live });
    lines.push(`OK   ${b.id}: consolidado ${live}`);
  } else {
    rows.push({ id: b.id, status: "OK", catalog: "—", live: live ?? "sin modificaciones listadas" });
    lines.push(`OK   ${b.id}: ${live ?? "consolidado sin fecha de actualización en HTML"}`);
  }
}

lines.push("");
lines.push("=== Resumen por norma ===");
for (const b of BOE_NORMATIVA) {
  const row = rows.find((r) => r.id === b.id);
  lines.push(
    `- ${b.id} | publicación: ${b.published} | consolidado catálogo: ${b.consolidatedAt ?? "N/A"} | ${row?.status ?? "?"}`,
  );
}

writeFileSync(OUT, lines.join("\n"));
console.log(lines.slice(0, 15).join("\n"));
console.log(`\nInforme: ${OUT}`);

if (mismatches > 0) {
  console.error(`FALLO: ${mismatches} discrepancia(s) de fecha BOE — actualiza data/boe-normativa.mjs`);
  process.exit(1);
}
console.log("OK: fechas consolidado alineadas con boe.es");
process.exit(0);
