/**
 * Comprueba HTML local vs referencias rotas y coherencia de despliegue.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const html = readFileSync(join(root, "index.html"), "utf8");
let issues = 0;

function issue(msg) {
  console.error(`ISSUE: ${msg}`);
  issues += 1;
}
function note(msg) {
  console.log(`NOTE: ${msg}`);
}

// No debe cargar app.js suelto en producción
if (/\bsrc=["']app\.js/.test(html) && !html.includes("app.bundle.js")) {
  issue("index.html carga app.js sin bundle (fallará en hosting sin data/)");
}

const bundleMatch = html.match(/app\.bundle\.js\?v=([^"']+)/);
if (!bundleMatch) issue("Falta app.bundle.js con query de versión");
else note(`Bundle cache-bust: ${bundleMatch[1]}`);

const cssMatch = html.match(/styles\.css\?v=([^"']+)/);
if (!cssMatch) issue("Falta styles.css con query de versión");
else note(`CSS cache-bust: ${cssMatch[1]}`);

if (!existsSync(join(root, "app.bundle.js"))) {
  issue("app.bundle.js no existe en disco — ejecuta npm run build:web");
} else {
  const size = readFileSync(join(root, "app.bundle.js")).length;
  note(`app.bundle.js local: ${(size / 1024 / 1024).toFixed(2)} MB`);
  if (size < 500_000) issue("app.bundle.js parece demasiado pequeño");
}

// IDs duplicados
const idRe = /\bid=["']([^"']+)["']/g;
const ids = new Map();
let m;
while ((m = idRe.exec(html)) !== null) {
  const id = m[1];
  ids.set(id, (ids.get(id) || 0) + 1);
}
for (const [id, n] of ids) {
  if (n > 1) issue(`ID duplicado en index.html: #${id} (${n} veces)`);
}

// Enlaces internos rotos (solo #hash)
const hrefRe = /href=["']#([^"']+)["']/g;
const validHashes = new Set([
  "inicio",
  "temario",
  "normativa",
  "metodologia",
  "practicar",
  "examen",
  "cuaderno",
  "tarjetas",
  "ayuda",
  "fuentes",
  "main",
]);
while ((m = hrefRe.exec(html)) !== null) {
  const h = m[1];
  if (h.startsWith("temario--") || h.startsWith("normativa--")) continue;
  if (!validHashes.has(h) && !h.includes("--")) {
    note(`Hash interno no estándar: #${h} (puede ser válido vía router)`);
  }
}

// Referencias obsoletas en ayuda
if (html.includes("app.js") && html.includes("data/") && html.includes("lib/")) {
  note("Ayuda/footer aún menciona app.js + data/ (confuso si solo se sube el bundle)");
}

console.log(`\n=== audit-live-html: ${issues} issue(s) ===`);
process.exit(issues > 0 ? 1 : 0);
