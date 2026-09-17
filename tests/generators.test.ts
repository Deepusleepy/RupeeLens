import { test } from "node:test";
import assert from "node:assert/strict";
import { generateTransactions, generateSecurityLogs } from "../lib/labs.ts";

test("generateTransactions determinism: same seed → identical output", () => {
  const a = generateTransactions(100, 10, 42);
  const b = generateTransactions(100, 10, 42);
  assert.deepEqual(a, b);
});

test("generateTransactions count clamping: count=50 → 100", () => {
  const result = generateTransactions(50, 10, 42);
  assert.equal(result.length, 100);
});

test("generateTransactions count clamping: count=99999 → 50000", () => {
  const result = generateTransactions(99999, 10, 42);
  assert.equal(result.length, 50000);
});

test("generateTransactions fraudPercent=0 → all fraud=false", () => {
  const result = generateTransactions(200, 0, 42);
  assert.ok(result.every((t) => t.fraud === false));
});

test("generateTransactions fraudPercent=100 → all fraud=true", () => {
  const result = generateTransactions(200, 100, 42);
  assert.ok(result.every((t) => t.fraud === true));
});

test("every transaction has valid score/rfScore/xgbScore in [0, 99]", () => {
  const result = generateTransactions(500, 10, 42);
  for (const t of result) {
    assert.ok(t.score >= 0 && t.score <= 99, `score ${t.score} out of range`);
    assert.ok(t.rfScore >= 0 && t.rfScore <= 99, `rfScore ${t.rfScore} out of range`);
    assert.ok(t.xgbScore >= 0 && t.xgbScore <= 99, `xgbScore ${t.xgbScore} out of range`);
  }
});

test("every transaction has risk as LOW/MEDIUM/HIGH", () => {
  const result = generateTransactions(500, 10, 42);
  for (const t of result) {
    assert.ok(t.risk === "LOW" || t.risk === "MEDIUM" || t.risk === "HIGH", `invalid risk ${t.risk}`);
  }
});

test("generateSecurityLogs determinism: same seed → identical output", () => {
  const a = generateSecurityLogs(500, 42);
  const b = generateSecurityLogs(500, 42);
  assert.deepEqual(a, b);
});

test("generateSecurityLogs scale clamping: scale=50 → 500", () => {
  const result = generateSecurityLogs(50, 42);
  assert.equal(result.length, 500);
});

test("generateSecurityLogs scale clamping: scale=99999 → 25000", () => {
  const result = generateSecurityLogs(99999, 42);
  assert.equal(result.length, 5000 * 5);
});

test("output sorted by timestamp descending", () => {
  const result = generateSecurityLogs(500, 42);
  for (let i = 1; i < result.length; i++) {
    assert.ok(result[i - 1]!.timestamp >= result[i]!.timestamp, `not sorted at index ${i}`);
  }
});

test("all 5 families present", () => {
  const result = generateSecurityLogs(100, 42);
  const families = new Set(result.map((l) => l.family));
  assert.equal(families.size, 5);
  assert.ok(families.has("Login"));
  assert.ok(families.has("Session"));
  assert.ok(families.has("Authentication"));
  assert.ok(families.has("Request"));
  assert.ok(families.has("Service"));
});

test("severity always info/warning/critical", () => {
  const result = generateSecurityLogs(100, 42);
  for (const log of result) {
    assert.ok(
      log.severity === "info" || log.severity === "warning" || log.severity === "critical",
      `invalid severity ${log.severity}`,
    );
  }
});
