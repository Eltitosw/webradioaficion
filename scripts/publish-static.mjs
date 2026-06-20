#!/usr/bin/env node
/**
 * Lista archivos mínimos para publicar en examenradioaficionado.online
 * y comprueba versiones locales antes de subir.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import version from "../data/version.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const cssV = html.match(/styles\.css\?v=([^"]+)/)?.[1];
const bundleV = html.match(/app\.bundle\.js\?v=([^"]+)/)?.[1];

const required = ["index.html", "app.bundle.js", "styles.css", "app.bundle.js"];
const missing = required.filter((f) => !fs.existsSync(path.join(root, f)));

console.log("=== Publicación estática ===\n");
console.log(`Versión data/version.js: ${version.build}`);
console.log(`index.html  styles.css?v=${cssV}`);
console.log(`index.html  app.bundle.js?v=${bundleV}`);
if (cssV !== version.build || bundleV !== version.build) {
  console.error("\nAVISO: desfase entre version.js e index.html — ejecuta: npm run sync-version");
  process.exit(1);
}
if (missing.length) {
  console.error("Faltan:", missing.join(", "));
  process.exit(1);
}
console.log("\nSube al hosting (raíz del dominio):");
for (const f of ["index.html", "app.bundle.js", "styles.css", "robots.txt", "_headers", ".htaccess"]) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) {
    console.log(`  - ${f}  (opcional / no presente)`);
    continue;
  }
  const st = fs.statSync(p);
  console.log(`  - ${f}  (${(st.size / 1024).toFixed(1)} KB)`);
}
console.log("  - images/quiz/  (carpeta completa si cambiaste figuras)");
console.log("\nNO subas data/, lib/ ni scripts/ — el banco va solo dentro de app.bundle.js.");
console.log("\nDespués: recarga forzada (Ctrl+F5) en el navegador.");
