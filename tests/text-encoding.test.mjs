import { test } from "node:test";
import assert from "node:assert/strict";

import { decodeHtmlEntities, repairLostAccents, repairSpanishText } from "../lib/text-encoding.mjs";
import { cleanStem } from "../lib/import-question-utils.mjs";

test("decodeHtmlEntities: entidades con nombre y hexadecimal", () => {
  assert.equal(decodeHtmlEntities("qu&eacute; circuito &ntilde;o"), "qué circuito ño");
  assert.equal(decodeHtmlEntities("&#233;"), "é");
  assert.equal(decodeHtmlEntities("&#xFA;"), "ú");
});

test("repairLostAccents: corrige tildes omitidas", () => {
  assert.match(repairLostAccents("qu circuito incluira"), /qué circuito incluirá/);
  assert.match(repairLostAccents("grfico geogrfico"), /gráfico geográfico/);
});

test("cleanStem integra reparación completa", () => {
  const s = cleanStem("Se&ntilde;ale el diagrama de radiaci&oacute;n");
  assert.match(s, /Señale/);
  assert.match(s, /radiación/);
});
