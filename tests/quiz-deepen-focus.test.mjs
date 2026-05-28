import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pickDeepenFocusLines } from "../lib/quiz-deepen-focus.mjs";

describe("pickDeepenFocusLines", () => {
  it("prioriza líneas del temario que coinciden con el enunciado", () => {
    const lines = pickDeepenFocusLines({
      topicId: "electricidad-basica",
      stem: "En la siguiente gráfica de la pantalla de un osciloscopio, se puede afirmar que:",
      correctIndex: 3,
      options: ["A", "B", "C", "A es la amplitud y B es el periodo de la señal"],
    });
    assert.ok(lines.length >= 1);
    assert.ok(
      lines.some((l) => /osciloscopio|amplitud|periodo|horizontal|vertical/i.test(l)),
      `esperaba foco de osciloscopio, obtuvo: ${lines.join(" | ")}`,
    );
  });

  it("no devuelve siempre las primeras viñetas genéricas del bloque", () => {
    const lines = pickDeepenFocusLines({
      topicId: "electricidad-basica",
      stem: "En la pantalla del osciloscopio:",
      correctIndex: 0,
      options: ["ok", "no"],
    });
    const genericOhm = lines.every((l) => /^Magnitudes:/i.test(l) || /^Serie suma R/i.test(l));
    assert.equal(genericOhm, false);
  });
});
