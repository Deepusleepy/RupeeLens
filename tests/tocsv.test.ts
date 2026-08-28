import { test } from "node:test";
import assert from "node:assert/strict";
import { toCsv } from "../lib/labs.ts";
import { parseCsvWithHeaders } from "../lib/csv.ts";

test("empty array → empty string", () => {
  assert.equal(toCsv([]), "");
});

test("single row → header\\nvalue", () => {
  const result = toCsv([{ name: "Alice", age: 30 }]);
  assert.equal(result, "name,age\n\"Alice\",\"30\"");
});

test("values with commas → properly quoted", () => {
  const result = toCsv([{ note: "hello, world" }]);
  assert.ok(result.includes('"hello, world"'));
});

test("values with quotes → escaped", () => {
  const result = toCsv([{ text: 'say "hi"' }]);
  assert.ok(result.includes('"say ""hi"""'));
});

test("null/undefined → empty string", () => {
  const result = toCsv([{ a: null, b: undefined }]);
  assert.ok(result.includes('"",""'));
});

test("round-trip: parseCsvWithHeaders(toCsv(rows)) recovers data", () => {
  const rows = [
    { name: "Alice", age: "30", city: "New York" },
    { name: "Bob", age: "25", city: "Los Angeles" },
  ];
  const csv = toCsv(rows);
  const parsed = parseCsvWithHeaders(csv);
  assert.deepEqual(parsed.headers, ["name", "age", "city"]);
  assert.equal(parsed.rows.length, 2);
  assert.equal(parsed.rows[0]!.name, "Alice");
  assert.equal(parsed.rows[0]!.age, "30");
  assert.equal(parsed.rows[0]!.city, "New York");
  assert.equal(parsed.rows[1]!.name, "Bob");
  assert.equal(parsed.rows[1]!.age, "25");
  assert.equal(parsed.rows[1]!.city, "Los Angeles");
});
