/**
 * Genera data/emergencia-auxilio-ids.js: preguntas de primeros auxilios,
 * señalización vial u otras curiosidades del banco Quijotes que no son núcleo del examen.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import quijotes from "../data/quijotes-ea3rcq.js";

const OUT = join(import.meta.dirname, "..", "data", "emergencia-auxilio-ids.js");

const STEM_RE =
  /\bpls\b|posici[oó]n lateral|accidente de tr[aá]fico|accidentado|creciente|decreciente|proteger la zona|socorrer inmediatamente|primeros auxilios|reanimaci[oó]n|desfibrilador|hemorragia|quemadura|intoxicaci[oó]n|veneno|inconsciente y respira|señalizaci[oó]n vial|mapa de carreteras|numeraci[oó]n que (aumenta|baja)|calle cerrada|calle en obras|tetra\b|pas\b.*accidente|112\b.*emergencia/i;

const ids = [];
for (const q of quijotes) {
  if (!q?.id || q.topicId !== "operacion-seguridad") continue;
  const stem = String(q.stem || "");
  if (STEM_RE.test(stem)) ids.push(q.id);
}

ids.sort();

const body = `/**
 * Preguntas de cultura general / primeros auxilios en banco histórico.
 * Generado por \`node scripts/build-emergencia-auxilio-ids.mjs\`
 */
export const EMERGENCIA_AUXILIO_IDS = new Set(${JSON.stringify(ids, null, 2)});
`;

writeFileSync(OUT, body);
console.log(`emergencia-auxilio-ids: ${ids.length} id(s)`);
