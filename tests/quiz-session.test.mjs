import { test } from "node:test";
import assert from "node:assert/strict";
import { shuffle, buildQuestionList } from "../lib/quiz-session.js";

const sample = [
  { id: "a", part: 1, topicId: "t1" },
  { id: "b", part: 1, topicId: "t2" },
  { id: "c", part: 2, topicId: "t1" },
];

test("shuffle conserva elementos", () => {
  const s = shuffle(sample);
  assert.equal(s.length, 3);
  assert.deepEqual(
    new Set(s.map((x) => x.id)),
    new Set(["a", "b", "c"]),
  );
});

test("buildQuestionList filtra por parte", () => {
  const list = buildQuestionList(sample, "1", "libre", "all", 30);
  assert.equal(list.length, 2);
  assert.ok(list.every((q) => q.part === 1));
});

test("buildQuestionList filtra por tema", () => {
  const list = buildQuestionList(sample, "1", "libre", "t1", 30);
  assert.equal(list.length, 1);
  assert.equal(list[0].id, "a");
});

test("buildQuestionList modo teorico acota", () => {
  const list = buildQuestionList(sample, "mix", "teorico", "all", 2);
  assert.equal(list.length, 2);
});

test("buildQuestionList respeta onlyIds", () => {
  const only = new Set(["b"]);
  const list = buildQuestionList(sample, "1", "libre", "all", 30, only);
  assert.equal(list.length, 1);
  assert.equal(list[0].id, "b");
});

test("buildQuestionList onlyIds vacío equivale a no filtrar", () => {
  const list = buildQuestionList(sample, "1", "libre", "all", 30, new Set());
  assert.equal(list.length, 2);
});
