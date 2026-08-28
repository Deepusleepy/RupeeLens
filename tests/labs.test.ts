import { test } from "node:test";
import assert from "node:assert/strict";
import { forecastSeries, scoreTransaction } from "../lib/labs.ts";

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

test("forecastSeries returns flat forecast for empty array (all values 0, no NaN)", () => {
  const result = forecastSeries([], 3, false);
  assert.equal(result.length, 3);
  for (const point of result) {
    assert.equal(point.value, 0);
    assert.equal(point.low, 0);
    assert.equal(point.high, 0);
    assert.ok(isFiniteNumber(point.value));
    assert.ok(isFiniteNumber(point.low));
    assert.ok(isFiniteNumber(point.high));
  }
});

test("forecastSeries polynomial with 2 values returns flat forecast (no NaN)", () => {
  const result = forecastSeries([100, 200], 2, true);
  assert.equal(result.length, 2);
  for (const point of result) {
    assert.equal(point.value, 200);
    assert.equal(point.low, 200);
    assert.equal(point.high, 200);
    assert.ok(isFiniteNumber(point.value));
    assert.ok(isFiniteNumber(point.low));
    assert.ok(isFiniteNumber(point.high));
  }
});

test("forecastSeries linear with 1 value returns flat forecast (no NaN)", () => {
  const result = forecastSeries([500], 4, false);
  assert.equal(result.length, 4);
  for (const point of result) {
    assert.equal(point.value, 500);
    assert.equal(point.low, 500);
    assert.equal(point.high, 500);
    assert.ok(isFiniteNumber(point.value));
    assert.ok(isFiniteNumber(point.low));
    assert.ok(isFiniteNumber(point.high));
  }
});

test("forecastSeries with enough data produces non-flat forecast", () => {
  const values = [100, 200, 300, 400, 500];
  const result = forecastSeries(values, 3, false);
  assert.equal(result.length, 3);
  const distinct = new Set(result.map((p) => p.value));
  assert.ok(distinct.size > 1, "linear forecast should vary across horizon");
  for (const point of result) {
    assert.ok(isFiniteNumber(point.value));
    assert.ok(isFiniteNumber(point.low));
    assert.ok(isFiniteNumber(point.high));
  }
});

test("scoreTransaction with negative failedAttempts clamps to 0 (score >= 3)", () => {
  const base = scoreTransaction({ amount: 850, hour: 13, location: "Mumbai", type: "P2P", senderBank: "SBI", receiverBank: "HDFC", newDevice: false, failedAttempts: 0 });
  const negative = scoreTransaction({ amount: 850, hour: 13, location: "Mumbai", type: "P2P", senderBank: "SBI", receiverBank: "HDFC", newDevice: false, failedAttempts: -5 });
  assert.ok(negative.score >= 3, "clamped score should be at least the base of 3");
  assert.equal(negative.score, base.score);
  assert.equal(negative.logisticScore, base.logisticScore);
  assert.equal(negative.forestScore, base.forestScore);
});

test("scoreTransaction with 0 and negative failedAttempts produce same score", () => {
  const zero = scoreTransaction({ amount: 68000, hour: 2, location: "Foreign", type: "P2P", senderBank: "SBI", receiverBank: "HDFC", newDevice: true, failedAttempts: 0 });
  const negative = scoreTransaction({ amount: 68000, hour: 2, location: "Foreign", type: "P2P", senderBank: "SBI", receiverBank: "HDFC", newDevice: true, failedAttempts: -10 });
  assert.equal(zero.score, negative.score);
  assert.equal(zero.logisticScore, negative.logisticScore);
  assert.equal(zero.forestScore, negative.forestScore);
});
