import { test } from "node:test";
import assert from "node:assert/strict";
import regulatory from "../data/regulatory.js";
import topics from "../data/topics.js";

test("regulatory export tiene estructura mínima", () => {
  assert.ok(regulatory.headline);
  assert.ok(Array.isArray(regulatory.normativaNav));
  assert.ok(regulatory.normativaNav.length > 0);
});

test("topics tiene partes y bloques", () => {
  assert.ok(Array.isArray(topics.parts));
  assert.ok(topics.parts.length >= 2);
  for (const p of topics.parts) {
    assert.ok(Array.isArray(p.blocks));
    assert.ok(p.blocks.length > 0);
  }
});
