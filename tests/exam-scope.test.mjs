import test from "node:test";
import assert from "node:assert/strict";

import { isOffTopicForRadioaficionadoExam } from "../lib/exam-scope.mjs";

test("excluye accidente de tráfico (DGT carreteras)", () => {
  assert.equal(
    isOffTopicForRadioaficionadoExam({
      id: "x-1",
      stem: "¿Qué es lo primero que hay que hacer al encontrar un accidente de tráfico?",
      options: ["Proteger", "Avisar", "Socorrer", "Huir"],
    }),
    true,
  );
});

test("excluye quiz Quijotes 85 (TETRA/EA3RCQ)", () => {
  assert.equal(
    isOffTopicForRadioaficionadoExam({
      id: "quijotes-85-2113",
      stem: "¿Qué significa VHF?",
      options: ["A", "B", "C", "D"],
    }),
    true,
  );
});

test("mantiene estación móvil en vehículo (radioaficionado)", () => {
  assert.equal(
    isOffTopicForRadioaficionadoExam({
      id: "fedi-d-574",
      stem: "¿SE PUEDE UTILIZAR UNA ESTACION MOVIL EN DIFERENTES VEHICULOS?",
      options: ["Si, cuando las matriculas estén en la licencia", "No", "Solo uno", "Nunca"],
    }),
    false,
  );
});

test("excluye ADSL / Internet de consumo", () => {
  assert.equal(
    isOffTopicForRadioaficionadoExam({
      id: "quijotes-1-2205",
      stem: 'Si un usuario tiene contratado un acceso a Internet "ADSL de 2 megas", esto significa que:',
      options: ["A", "B", "C", "D"],
    }),
    true,
  );
});

test("mantiene tráfico entre estaciones de aficionado", () => {
  assert.equal(
    isOffTopicForRadioaficionadoExam({
      id: "fedi-j-010",
      stem: "¿Cuál de las siguientes acciones está permitida realizar en el tráfico entre estaciones de aficionado?:",
      options: ["A", "B", "C", "D"],
    }),
    false,
  );
});
