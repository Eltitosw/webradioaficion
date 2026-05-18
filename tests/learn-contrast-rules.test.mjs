import assert from "node:assert/strict";
import { test } from "node:test";
import {
  explainContrastPair,
  explainQCodeContrast,
  explainStemWrong,
  explainBridge,
} from "../lib/learn-contrast-rules.mjs";
import { explainStemGuided } from "../lib/learn-stem-guided.mjs";
import { buildWhyWrong } from "../lib/learn-while-test.mjs";

test("explainQCodeContrast: QRM frente a QRN", () => {
  const m = explainQCodeContrast(
    "El código Q que indica interferencia es:",
    "QRN",
    "QRM",
  );
  assert.match(m, /QRM|interferencia/i);
  assert.match(m, /QRN|ruido/i);
});

test("explainContrastPair: Mayday frente a Pan-Pan", () => {
  const m = explainContrastPair(
    "La señal de socorro es:",
    "Pan pan",
    "Mayday",
  );
  assert.match(m, /Mayday|socorro/i);
  assert.match(m, /Pan-Pan|urgencia/i);
});

test("explainContrastPair: VHF frente a HF", () => {
  const m = explainContrastPair(
    "La banda de 144 MHz es:",
    "HF",
    "VHF",
  );
  assert.match(m, /VHF|HF/i);
});

test("explainStemWrong: amperímetro en paralelo", () => {
  const m = explainStemWrong(
    "Para medir la intensidad se usa el amperímetro:",
    "En paralelo",
    "En serie",
  );
  assert.match(m, /serie|paralelo/i);
});

test("explainBridge: códigos Q en enunciado", () => {
  const b = explainBridge("Significado del código QRM:", "QRM");
  assert.match(b, /QRM|QRN/i);
});

test("buildWhyWrong usa contraste ampliado (no solo genérico)", () => {
  const w = buildWhyWrong(
    "La señal de urgencia sin peligro inmediato es:",
    "Mayday",
    "Pan pan",
    "operacion-seguridad",
  );
  assert.doesNotMatch(w, /^«Mayday» no encaja con lo que pide/);
});

test("explainStemGuided: conductor a mayor calor", () => {
  const m = explainStemGuided(
    "En un conductor eléctrico a mayor calor:",
    "Menor resistencia",
    "Mayor resistencia",
  );
  assert.match(m, /resistencia sube|aumenta/i);
});

test("explainStemGuided: provincia Huelva distrito 7", () => {
  const m = explainStemGuided(
    "Una estación ubicada en la provincia de Huelva se identifica por la cifra:",
    "1",
    "7",
  );
  assert.match(m, /distrito\s*7|7/i);
});

test("explainStemGuided: megaohmio", () => {
  const m = explainStemGuided("Un Megaohmio es:", "Mil ohmios", "Un millón de ohmios");
  assert.match(m, /10⁶|millón|mega/i);
});
