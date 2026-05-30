import { test } from "node:test";
import assert from "node:assert/strict";

import { stemNeedsFigure } from "../lib/import-question-utils.mjs";

test("stemNeedsFigure: excluye falsos positivos de reglamentación", () => {
  assert.equal(
    stemNeedsFigure('De un batería, donde figure la siguiente inscripción "DC 19.2 v 2500 mAh"'),
    false,
  );
  assert.equal(
    stemNeedsFigure("La cancelación de la licencia se efectuará en el siguiente caso:"),
    false,
  );
  assert.equal(stemNeedsFigure("Si un radioaficionado emite con el siguiente indicativo: EA7UE."), false);
});

test("stemNeedsFigure: detecta enunciados con diagrama real", () => {
  assert.equal(
    stemNeedsFigure("En el siguiente esquema, el transmisor y la antena tienen la misma impedancia"),
    true,
  );
  assert.equal(stemNeedsFigure("En la siguiente gráfica de la pantalla de un osciloscopio"), true);
  assert.equal(stemNeedsFigure("El vatímetro de la figura conectado entre un transmisor y una antena"), true);
  assert.equal(
    stemNeedsFigure("Dados dos receptores con las siguientes curvas de respuesta en amplitud"),
    true,
  );
});

test("stemNeedsFigure: no marca curvas ya descritas en el propio enunciado", () => {
  assert.equal(
    stemNeedsFigure(
      "Dados dos receptores A y B cuyas curvas de respuesta muestran que la de A es más estrecha que la de B",
    ),
    false,
  );
});
