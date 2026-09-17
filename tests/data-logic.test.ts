import { test } from "node:test";
import assert from "node:assert/strict";
import { generateSecurityLogs, securityAnomalies } from "../lib/labs.ts";
import { readFileSync } from "node:fs";

const workspaces = readFileSync(new URL("../app/workspaces.tsx", import.meta.url), "utf8");
const rupeeLens = readFileSync(new URL("../app/rupee-lens.tsx", import.meta.url), "utf8");

test("securityAnomalies description says events not sources", () => {
  const anomalies = securityAnomalies(generateSecurityLogs(500));
  const bruteForce = anomalies.find((a) => a.category === "Brute force");
  assert.ok(bruteForce, "Brute force anomaly not found");
  assert.match(bruteForce.description, /events/);
  assert.doesNotMatch(bruteForce.description, /sources/);
});

test("generator produces some sessions in 3-180 min range (noise)", () => {
  const logs = generateSecurityLogs(2000);
  const sessions = logs.filter((l) => l.family === "Session");
  const inRange = sessions.filter((s) => s.value >= 3 && s.value <= 180);
  const outOfRange = sessions.filter((s) => s.value < 3 || s.value > 180);
  assert.ok(inRange.length > 0, "No sessions in 3-180 min range — noise not working");
  assert.ok(outOfRange.length > 0, "No sessions outside range — suspicious sessions missing");
});

test("generator produces some false positives (suspicious but in range)", () => {
  const logs = generateSecurityLogs(2000);
  const suspiciousInSession = logs.filter((l) => l.family === "Session" && l.status === "abnormal");
  const inRange = suspiciousInSession.filter((s) => s.value >= 3 && s.value <= 180);
  assert.ok(inRange.length > 0, "No suspicious sessions in normal range — no false negatives possible");
});

test("SecurityWorkspace is imported in rupee-lens.tsx", () => {
  assert.match(rupeeLens, /SecurityWorkspace/);
});

test("BudgetWorkspace is imported in rupee-lens.tsx", () => {
  assert.match(rupeeLens, /BudgetWorkspace/);
});

test("PaymentWorkspace is imported in rupee-lens.tsx", () => {
  assert.match(rupeeLens, /PaymentWorkspace/);
});

test("workspaces.tsx exports all three workspace components", () => {
  assert.match(workspaces, /export function PaymentWorkspace/);
  assert.match(workspaces, /export function SecurityWorkspace/);
  assert.match(workspaces, /export function BudgetWorkspace/);
});
