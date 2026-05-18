/**
 * Falla si hay caracteres corruptos o tildes rotas en datos activos.
 * Ejecutar en CI: npm run verify:encoding
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const audit = spawnSync(process.execPath, [path.join(__dirname, "audit-encoding.mjs")], {
  encoding: "utf8",
});

if (audit.stdout) process.stdout.write(audit.stdout);
if (audit.stderr) process.stderr.write(audit.stderr);
process.exit(audit.status ?? 1);
