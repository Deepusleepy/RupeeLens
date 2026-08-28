import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCsv, parseCsvWithHeaders } from "../lib/csv.ts";

test("parseCsvWithHeaders with only headers, no data → empty rows", () => {
  const { headers, rows } = parseCsvWithHeaders("name,age,city");
  assert.deepEqual(headers, ["name", "age", "city"]);
  assert.equal(rows.length, 0);
});

test("parseCsv with quoted field spanning multiple lines → preserved", () => {
  const result = parseCsv('text\n"line1\nline2"');
  assert.deepEqual(result, [["text"], ["line1\nline2"]]);
});

test("parseCsv with empty quoted field in multi-column row → preserved", () => {
  const result = parseCsv('col1,col2\n"",val');
  assert.deepEqual(result, [["col1", "col2"], ["", "val"]]);
});

test("parseCsvWithHeaders with ragged rows → missing columns padded with empty string", () => {
  const { headers, rows } = parseCsvWithHeaders("a,b,c\n1,2\nx,y,z,w");
  assert.deepEqual(headers, ["a", "b", "c"]);
  assert.equal(rows.length, 2);
  assert.equal(rows[0]!.a, "1");
  assert.equal(rows[0]!.b, "2");
  assert.equal(rows[0]!.c, "");
  assert.equal(rows[1]!.a, "x");
  assert.equal(rows[1]!.b, "y");
  assert.equal(rows[1]!.c, "z");
});

test("parseCsvWithHeaders with extra columns → extra values dropped", () => {
  const { headers, rows } = parseCsvWithHeaders("a,b\n1,2,3,4");
  assert.deepEqual(headers, ["a", "b"]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0]!.a, "1");
  assert.equal(rows[0]!.b, "2");
});
