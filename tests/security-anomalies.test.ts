import { test } from "node:test";
import assert from "node:assert/strict";
import { securityAnomalies, type SecurityLog } from "../lib/labs.ts";

function makeLog(partial: Partial<SecurityLog> & { family: SecurityLog["family"] }): SecurityLog {
  return {
    id: "LOG-00001",
    timestamp: "2026-07-22T14:00:00Z",
    source: "10.0.0.1",
    subject: "USR-••01",
    status: "normal",
    value: 1,
    detail: "test",
    severity: "info",
    ...partial,
  };
}

test("empty array returns count 0 for all 5 categories", () => {
  const result = securityAnomalies([]);
  assert.equal(result.length, 5);
  for (const item of result) {
    assert.equal(item.count, 0);
  }
});

test("single Login with status=failed value=6 → Brute force count 1", () => {
  const result = securityAnomalies([makeLog({ family: "Login", status: "failed", value: 6 })]);
  const brute = result.find((r) => r.category === "Brute force")!;
  assert.equal(brute.count, 1);
});

test("Login with value=5 → Brute force count 0 (threshold is > 5)", () => {
  const result = securityAnomalies([makeLog({ family: "Login", status: "failed", value: 5 })]);
  const brute = result.find((r) => r.category === "Brute force")!;
  assert.equal(brute.count, 0);
});

test("Session with value=2 → Abnormal session count 1", () => {
  const result = securityAnomalies([makeLog({ family: "Session", status: "abnormal", value: 2 })]);
  const abnormal = result.find((r) => r.category === "Abnormal session")!;
  assert.equal(abnormal.count, 1);
});

test("Session with value=181 → Abnormal session count 1", () => {
  const result = securityAnomalies([makeLog({ family: "Session", status: "abnormal", value: 181 })]);
  const abnormal = result.find((r) => r.category === "Abnormal session")!;
  assert.equal(abnormal.count, 1);
});

test("Session with value=60 → Abnormal session count 0", () => {
  const result = securityAnomalies([makeLog({ family: "Session", status: "normal", value: 60 })]);
  const abnormal = result.find((r) => r.category === "Abnormal session")!;
  assert.equal(abnormal.count, 0);
});

test("Authentication with value=11 → Credential stuffing count 1", () => {
  const result = securityAnomalies([makeLog({ family: "Authentication", status: "rejected", value: 11 })]);
  const cred = result.find((r) => r.category === "Credential stuffing")!;
  assert.equal(cred.count, 1);
});

test("Authentication with value=10 → Credential stuffing count 0", () => {
  const result = securityAnomalies([makeLog({ family: "Authentication", status: "rejected", value: 10 })]);
  const cred = result.find((r) => r.category === "Credential stuffing")!;
  assert.equal(cred.count, 0);
});

test("Request with status=dos_attack → DOS request count 1", () => {
  const result = securityAnomalies([makeLog({ family: "Request", status: "dos_attack", value: 50000 })]);
  const dos = result.find((r) => r.category === "DOS request")!;
  assert.equal(dos.count, 1);
});

test("Service with status=suspended → Suspended service count 1", () => {
  const result = securityAnomalies([makeLog({ family: "Service", status: "suspended", value: 1 })]);
  const suspended = result.find((r) => r.category === "Suspended service")!;
  assert.equal(suspended.count, 1);
});

test("mixed logs → each category counted independently", () => {
  const logs: SecurityLog[] = [
    makeLog({ family: "Login", status: "failed", value: 7 }),
    makeLog({ family: "Login", status: "success", value: 1 }),
    makeLog({ family: "Session", status: "abnormal", value: 200 }),
    makeLog({ family: "Authentication", status: "rejected", value: 15 }),
    makeLog({ family: "Request", status: "dos_attack", value: 20000 }),
    makeLog({ family: "Service", status: "suspended", value: 1 }),
    makeLog({ family: "Service", status: "active", value: 1 }),
  ];
  const result = securityAnomalies(logs);
  const byCat = Object.fromEntries(result.map((r) => [r.category, r.count]));
  assert.equal(byCat["Brute force"], 1);
  assert.equal(byCat["Abnormal session"], 1);
  assert.equal(byCat["Credential stuffing"], 1);
  assert.equal(byCat["DOS request"], 1);
  assert.equal(byCat["Suspended service"], 1);
});
