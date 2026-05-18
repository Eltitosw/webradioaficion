/**
 * Compara versiones locales vs sitio publicado.
 * node scripts/audit-live-deploy.mjs [url]
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const baseUrl = (process.argv[2] || "https://examenradioaficionado.online/").replace(/\/?$/, "/");

const localHtml = readFileSync(join(root, "index.html"), "utf8");
const localBundle = localHtml.match(/app\.bundle\.js\?v=([^"']+)/)?.[1] || "?";
const localCss = localHtml.match(/styles\.css\?v=([^"']+)/)?.[1] || "?";

let liveHtml = "";
try {
  const res = await fetch(baseUrl, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  liveHtml = await res.text();
} catch (e) {
  console.error(`No se pudo leer ${baseUrl}: ${e.message}`);
  process.exit(1);
}

const liveBundle = liveHtml.match(/app\.bundle\.js\?v=([^"']+)/)?.[1] || "(no encontrado)";
const liveCss = liveHtml.match(/styles\.css\?v=([^"']+)/)?.[1] || "(no encontrado)";
const hasSpeak = liveHtml.includes("temario-speak-start");
const hasOldAppJs = /<script[^>]+src=["']app\.js/.test(liveHtml);

console.log("=== Despliegue: local vs producción ===\n");
console.log(`URL: ${baseUrl}`);
console.log(`index.html  bundle: local ${localBundle}  |  live ${liveBundle}  ${localBundle === liveBundle ? "OK" : "DESFASE"}`);
console.log(`index.html  CSS:    local ${localCss}  |  live ${liveCss}  ${localCss === liveCss ? "OK" : "DESFASE"}`);
console.log(`TTS «Escuchar bloque»: live ${hasSpeak ? "sí" : "NO (HTML antiguo)"}`);
console.log(`Carga app.js suelto:  live ${hasOldAppJs ? "sí (obsoleto)" : "no"}`);

const checks = [
  ["app.bundle.js", `${baseUrl}app.bundle.js`],
  ["styles.css", `${baseUrl}styles.css`],
];
for (const [name, url] of checks) {
  try {
    const r = await fetch(url, { method: "HEAD", redirect: "follow" });
    const len = r.headers.get("content-length");
    const ct = r.headers.get("content-type") || "";
    console.log(`${name}: HTTP ${r.status}  ${ct.split(";")[0]}  ${len ? `${(Number(len) / 1024 / 1024).toFixed(2)} MB` : ""}`);
    if (name === "app.bundle.js" && r.ok && len && Number(len) < 500_000) {
      console.error(`  AVISO: ${name} parece demasiado pequeño`);
    }
    if (name === "app.bundle.js" && ct && !/javascript|ecmascript/i.test(ct)) {
      console.error(`  AVISO: MIME incorrecto para ${name} — la app no arrancará`);
    }
  } catch (e) {
    console.error(`${name}: error ${e.message}`);
  }
}

const localBundlePath = join(root, "app.bundle.js");
if (!existsSync(localBundlePath)) {
  console.error("\nFALTA app.bundle.js local — ejecuta npm run build:web");
  process.exit(1);
}

const desync = localBundle !== liveBundle || localCss !== liveCss || !hasSpeak;
if (desync) {
  console.log("\n>>> Acción: sube index.html, app.bundle.js y styles.css (npm run build:web) y recarga forzada en el móvil.");
  process.exit(1);
}
console.log("\nProducción alineada con el repo local.");
process.exit(0);
