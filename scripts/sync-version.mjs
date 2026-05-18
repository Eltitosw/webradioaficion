/**
 * Sincroniza ?v= en index.html con data/version.js (ejecutar antes de publicar).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const versionPath = path.join(root, "data", "version.js");
const indexPath = path.join(root, "index.html");

const src = fs.readFileSync(versionPath, "utf8");
const m = src.match(/build:\s*["']([^"']+)["']/);
if (!m) {
  console.error("sync-version: no se encontró build en data/version.js");
  process.exit(1);
}
const build = m[1];
let html = fs.readFileSync(indexPath, "utf8");
html = html.replace(/href="styles\.css(\?v=[^"]*)?"/, `href="styles.css?v=${build}"`);
html = html.replace(/src="app\.js(\?v=[^"]*)?"/, `src="app.js?v=${build}"`);
fs.writeFileSync(indexPath, html, { encoding: "utf8" });
console.log(`sync-version: index.html actualizado con v=${build}`);
