import assert from "node:assert/strict";
import test from "node:test";
import { parseCsv, parseCsvWithHeaders } from "../lib/csv.ts";

test("parses basic comma-separated values", () => {
  assert.deepEqual(parseCsv("a,b,c\n1,2,3"), [["a", "b", "c"], ["1", "2", "3"]]);
});

test("handles quoted fields with commas inside", () => {
  assert.deepEqual(parseCsv('name,note\n"hello, world",test'), [["name", "note"], ["hello, world", "test"]]);
});

test("handles escaped quotes", () => {
  assert.deepEqual(parseCsv('text\n"say ""hi"""'), [["text"], ['say "hi"']]);
});

test("handles mixed line endings", () => {
  assert.deepEqual(parseCsv("a,b\r\nc,d\ne,f"), [["a", "b"], ["c", "d"], ["e", "f"]]);
});

test("filters empty lines", () => {
  assert.deepEqual(parseCsv("a,b\n\n\nc,d"), [["a", "b"], ["c", "d"]]);
});

test("returns empty array for empty input", () => {
  assert.deepEqual(parseCsv(""), []);
});

test("parseCsvWithHeaders returns headers and row objects", () => {
  const { headers, rows } = parseCsvWithHeaders("name,age\nAlice,30\nBob,25");
  assert.deepEqual(headers, ["name", "age"]);
  assert.equal(rows.length, 2);
  assert.equal(rows[0]!.name, "Alice");
  assert.equal(rows[0]!.age, "30");
  assert.equal(rows[1]!.name, "Bob");
});

test("parseCsvWithHeaders handles empty input", () => {
  const { headers, rows } = parseCsvWithHeaders("");
  assert.deepEqual(headers, []);
  assert.equal(rows.length, 0);
});
