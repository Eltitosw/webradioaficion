import { test } from "node:test";
import assert from "node:assert/strict";

import { repairOcrSpanishText, stripOcrWatermark } from "../lib/ocr-text-repair.mjs";

test("stripOcrWatermark elimina pies de página Telegram", () => {
  const raw = "Ohm V=IR https://t.me/RADIO_ ENFERMOS fin";
  assert.equal(stripOcrWatermark(raw), "Ohm V=IR  fin");
});

test("repairOcrSpanishText corrige léxico técnico habitual", () => {
  const raw = "SDR (Sotware Defined Radio) y Libro-de Examen men de Radioaficionado";
  const out = repairOcrSpanishText(raw);
  assert.match(out, /Software Defined Radio/);
  assert.match(out, /Libro de Examen/);
  assert.match(out, /Examen de Radioaficionado/);
});

test("repairOcrSpanishText conserva saltos de línea", () => {
  const raw = "Línea uno.\nLínea dos.\nFig. 20 Esquema.";
  const out = repairOcrSpanishText(raw);
  assert.ok(out.includes("\n"), "debe mantener varias líneas");
  assert.match(out, /Fig\.\s*20/);
});
