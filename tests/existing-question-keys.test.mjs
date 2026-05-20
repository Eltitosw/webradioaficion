import { test } from "node:test";
import assert from "node:assert/strict";

import { loadExistingDedupeKeys } from "../lib/existing-question-keys.mjs";
import { dedupeKey } from "../lib/import-question-utils.mjs";

test("loadExistingDedupeKeys incluye banco y quijotes", async () => {
  const { keys, counts } = await loadExistingDedupeKeys();
  assert.ok(keys.size > 400, `pocas claves: ${keys.size}`);
  assert.ok(counts["questions-banco.js"] > 400);
  assert.ok(counts["quijotes-ea3rcq.js"] > 100);
});

test("dedupeKey coincide para misma pregunta URE y Quijotes", async () => {
  const { keys } = await loadExistingDedupeKeys();
  const sample = {
    stem: "El control automático de ganancia (CAG) en un receptor tiene como objetivo:",
    options: [
      "Mantener constante la amplitud de la señal de salida",
      "Anular el control de volumen",
      "Ajustar el nivel de silenciador",
      "Mantener constante el valor de la frecuencia intermedia",
    ],
  };
  assert.ok(keys.has(dedupeKey(sample.stem, sample.options)));
});
