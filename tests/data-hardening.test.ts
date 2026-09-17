import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreTransaction, generateTransactions, forecastSeries, toCsv } from "../lib/labs.ts";
import { parseCsv, parseCsvWithHeaders } from "../lib/csv.ts";

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

const baseInput = {
  amount: 1000, hour: 14, location: "Mumbai", type: "P2P",
  senderBank: "SBI", receiverBank: "HDFC", newDevice: false, failedAttempts: 0,
};

test("scoreTransaction with NaN amount returns finite score", () => {
  const result = scoreTransaction({ ...baseInput, amount: NaN });
  assert.ok(isFiniteNumber(result.score));
  assert.ok(isFiniteNumber(result.rfScore));
  assert.ok(isFiniteNumber(result.xgbScore));
});

test("scoreTransaction with NaN hour returns finite score", () => {
  const result = scoreTransaction({ ...baseInput, hour: NaN });
  assert.ok(isFiniteNumber(result.score));
});

test("scoreTransaction with NaN failedAttempts returns finite score", () => {
  const result = scoreTransaction({ ...baseInput, failedAttempts: NaN });
  assert.ok(isFiniteNumber(result.score));
});

test("generateTransactions with fraudPercent=150 keeps fraud count within array length", () => {
  const txns = generateTransactions(500, 150);
  const fraudCount = txns.filter((t) => t.fraud).length;
  assert.ok(fraudCount <= txns.length);
});

test("generateTransactions with fraudPercent=-5 produces no fraud", () => {
  const txns = generateTransactions(500, -5);
  const fraudCount = txns.filter((t) => t.fraud).length;
  assert.equal(fraudCount, 0);
});

test("generateTransactions with fraudPercent=NaN returns valid array without crashing", () => {
  const txns = generateTransactions(500, NaN);
  assert.ok(Array.isArray(txns));
  assert.ok(txns.length > 0);
  for (const t of txns) assert.ok(isFiniteNumber(t.score));
});

test("forecastSeries with 2 values yields finite confidence bands", () => {
  const result = forecastSeries([10, 20], 3, false);
  assert.equal(result.length, 3);
  for (const point of result) {
    assert.ok(isFiniteNumber(point.value));
    assert.ok(isFiniteNumber(point.low));
    assert.ok(isFiniteNumber(point.high));
  }
});

test("forecastSeries with constant [5,5,5] yields all finite values", () => {
  const result = forecastSeries([5, 5, 5], 3, false);
  assert.equal(result.length, 3);
  for (const point of result) {
    assert.ok(isFiniteNumber(point.value));
    assert.ok(isFiniteNumber(point.low));
    assert.ok(isFiniteNumber(point.high));
  }
});

test("forecastSeries with NaN in input returns zeros with no NaN", () => {
  const result = forecastSeries([1, NaN, 3], 3, false);
  assert.equal(result.length, 3);
  for (const point of result) {
    assert.equal(point.value, 0);
    assert.equal(point.low, 0);
    assert.equal(point.high, 0);
  }
});

test("toCsv escapes newlines in values to spaces", () => {
  const csv = toCsv([{ a: "line1\nline2", b: "x" }]);
  assert.ok(!csv.includes("\nline2"));
});

test("toCsv with heterogeneous rows includes all keys as headers", () => {
  const csv = toCsv([{ a: 1 }, { b: 2 }]);
  const headerLine = csv.split("\n")[0];
  assert.ok(headerLine.includes("a"));
  assert.ok(headerLine.includes("b"));
});

test("parseCsvWithHeaders strips BOM from first header", () => {
  const { headers } = parseCsvWithHeaders("\uFEFFname,age\nAlice,30");
  assert.equal(headers[0], "name");
  assert.ok(!headers[0].includes("\uFEFF"));
});

test("parseCsv with empty string returns []", () => {
  assert.deepEqual(parseCsv(""), []);
});
