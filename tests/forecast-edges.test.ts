import { test } from "node:test";
import assert from "node:assert/strict";
import { forecastSeries } from "../lib/labs.ts";

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

test("constant series [500,500,500,500,500] horizon=3 linear → all 500, finite bands", () => {
  const result = forecastSeries([500, 500, 500, 500, 500], 3, false);
  assert.equal(result.length, 3);
  for (const point of result) {
    assert.equal(point.value, 500);
    assert.ok(isFiniteNumber(point.low));
    assert.ok(isFiniteNumber(point.high));
  }
});

test("decreasing series [500,400,300,200,100] horizon=3 → decreasing, all >= 0", () => {
  const result = forecastSeries([500, 400, 300, 200, 100], 3, false);
  assert.equal(result.length, 3);
  for (let i = 1; i < result.length; i++) {
    assert.ok(result[i]!.value <= result[i - 1]!.value, `value should decrease at step ${i}`);
  }
  for (const point of result) {
    assert.ok(point.value >= 0, `value ${point.value} should be >= 0`);
  }
});

test("acceleration with exactly 3 values → no crash, finite", () => {
  const result = forecastSeries([100, 200, 300], 3, true);
  assert.equal(result.length, 3);
  for (const point of result) {
    assert.ok(isFiniteNumber(point.value));
    assert.ok(isFiniteNumber(point.low));
    assert.ok(isFiniteNumber(point.high));
  }
});

test("horizon=0 → empty array", () => {
  const result = forecastSeries([100, 200, 300], 0, false);
  assert.equal(result.length, 0);
});

test("acceleration band widening", () => {
  const result = forecastSeries([100, 200, 350, 550, 800], 4, true);
  assert.equal(result.length, 4);
  for (let i = 1; i < result.length; i++) {
    const bandI = result[i]!.high - result[i]!.value;
    const bandPrev = result[i - 1]!.high - result[i - 1]!.value;
    assert.ok(bandI >= bandPrev, `band should widen: step ${i} band=${bandI}, prev=${bandPrev}`);
  }
});
