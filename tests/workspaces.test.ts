import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, "..", "app", "workspaces.tsx"), "utf8");

test("regenerate uses incremented seed (not stale closure)", () => {
  assert.match(source, /const next = seed \+ 1; setSeed\(next\); setTransactions\(generateTransactions\(count, fraudPercent, next\)\)/);
  assert.match(source, /const next = seed \+ 1; setSeed\(next\); setLogs\(generateSecurityLogs\(scale, next\)\)/);
});

test("cumulative growth guards empty selectedRows", () => {
  assert.match(source, /selectedRows\.length \? \(\(selectedRows\.at\(-1\)!\.total \/ selectedRows\[0\]\.total - 1\) \* 100\)\.toFixed\(1\) : 0/);
});

test("heatmap labels start with Thursday", () => {
  assert.match(source, /\["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"\]/);
});

test("uploadFamily assigns critical for dos_attack/suspended", () => {
  assert.match(source, /status === "dos_attack" \|\| status === "suspended" \? "critical" : suspicious \? "warning" : "info"/);
});

test("uploadBudget validates year >= 1900", () => {
  assert.match(source, /row\.year >= 1900/);
  assert.match(source, /const num = \(raw: string \| undefined, fallback: number\) =>/);
});

test("year selects clamp endYear >= startYear", () => {
  assert.match(source, /setStartYear\(v\); setEndYear\(Math\.max\(v, endYear\)\)/);
  assert.match(source, /setEndYear\(v\); setStartYear\(Math\.min\(v, startYear\)\)/);
});

test("empty logs risk is 0 not NaN", () => {
  assert.match(source, /logs\.length \? Math\.min\(100, Math\.round\(\(critical \* 1\.4 \+ warnings \* \.45\) \/ logs\.length \* 100\)\) : 0/);
});

test("uploadFamily sorts merged logs", () => {
  assert.match(source, /\.sort\(\(a, b\) => b\.timestamp\.localeCompare\(a\.timestamp\)\)/);
});

test("batchUpload validates with Number.isFinite", () => {
  assert.match(source, /if \(!Number\.isFinite\(amount\) \|\| !Number\.isFinite\(hour\) \|\| hour < 0 \|\| hour > 23\)/);
  assert.match(source, /setBatchSkipped\(skipped\)/);
});

test("Bars applies negative class", () => {
  assert.match(source, /className=\{item\.value < 0 \? "negative" : ""\}/);
});

test("viewValue guards denominators", () => {
  assert.match(source, /series\[0\]\?\.total \? row\.total \/ series\[0\]\.total \* 100 : 0/);
  assert.match(source, /index && series\[index - 1\]\?\.total \?/);
  assert.match(source, /yearTotal \? row\.total \/ yearTotal \* 100 : 0/);
});
