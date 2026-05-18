/**
 * Reclasifica ítems Quijotes de primeros auxilios / señalización vial
 * desde marco-normativo → operacion-seguridad.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const path = join(import.meta.dirname, "..", "data", "quijotes-ea3rcq.js");
let src = readFileSync(path, "utf8");

const RE = /topicId:\s*"marco-normativo"([\s\S]*?stem:\s*"([^"]+)")/g;
let n = 0;
src = src.replace(RE, (full, mid, stem) => {
  const s = stem.toLowerCase();
  const move =
    /\bpls\b|accidente de tr[aá]fico|creciente|decreciente|proteger la zona|accidentado|inconsciente y respira|primeros auxilios|breve.*comunicaci/i.test(
      s,
    );
  if (!move) return full;
  n += 1;
  return full.replace('topicId: "marco-normativo"', 'topicId: "operacion-seguridad"');
});

writeFileSync(path, src);
console.log(`patch-quijotes-topics: ${n} ítem(s) → operacion-seguridad`);
