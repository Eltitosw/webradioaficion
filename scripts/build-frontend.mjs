/**
 * Empaqueta la app en un solo módulo (evita fallos de import .mjs en hosting estático).
 */
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const entry = path.join(root, "app.js");
const outfile = path.join(root, "app.bundle.js");

const r = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["--yes", "esbuild", entry, "--bundle", "--format=esm", "--platform=browser", "--target=es2020", `--outfile=${outfile}`],
  { cwd: root, stdio: "inherit", shell: process.platform === "win32" },
);

if (r.status !== 0) {
  process.exit(r.status ?? 1);
}
console.log("build-frontend: app.bundle.js listo");
