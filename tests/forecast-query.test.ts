import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { forecastSeries } from "../lib/labs.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const labsSource = readFileSync(join(__dirname, "..", "lib", "labs.ts"), "utf8");
const workspacesSource = readFileSync(join(__dirname, "..", "app", "workspaces.tsx"), "utf8");

test("forecastSeries signature uses acceleration, not polynomial", () => {
  assert.match(labsSource, /forecastSeries\(values: number\[\], horizon: number, acceleration = false\)/);
  assert.doesNotMatch(labsSource, /polynomial/);
});

test("linear residual divides by (n - 2) for OLS degrees of freedom", () => {
  assert.match(labsSource, /\/ \(n - 2\)/);
});

test("confidence band uses prediction interval formula that widens with horizon", () => {
  assert.match(labsSource, /sqrt\(1 \+ 1 \/ n/);
});

test("workspaces.tsx uses Acceleration label, not Polynomial", () => {
  assert.match(workspacesSource, /Acceleration/);
  assert.doesNotMatch(workspacesSource, /Polynomial/);
});

test("smart query parses 'after YYYY' year qualifier", () => {
  assert.match(workspacesSource, /after\\s\+\(20/);
});

test("compare branch regex includes vs and versus", () => {
  assert.match(workspacesSource, /compare\|vs\\\.\?\|versus\|compared to/);
});

test("forecastSeries linear band widens with forecast horizon", () => {
  const result = forecastSeries([100, 135, 150, 175, 190], 3, false);
  assert.equal(result.length, 3);
  const band0 = result[0]!.high - result[0]!.value;
  const band2 = result[2]!.high - result[2]!.value;
  assert.ok(band2 > band0, `band should widen: band0=${band0}, band2=${band2}`);
});
