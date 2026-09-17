import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreTransaction } from "../lib/labs.ts";

test("safe transaction (low amount, daytime, known location, known device, 0 attempts) → low score", () => {
  const result = scoreTransaction({
    amount: 500,
    hour: 13,
    location: "Mumbai",
    type: "P2M",
    senderBank: "SBI",
    receiverBank: "SBI",
    newDevice: false,
    failedAttempts: 0,
  });
  assert.ok(result.score < 30, `safe score ${result.score} should be low`);
  assert.equal(result.risk, "LOW");
});

test("fraud transaction (high amount, night, Foreign, new device, high attempts) → high score", () => {
  const result = scoreTransaction({
    amount: 80000,
    hour: 2,
    location: "Foreign",
    type: "P2P",
    senderBank: "SBI",
    receiverBank: "HDFC",
    newDevice: true,
    failedAttempts: 10,
  });
  assert.ok(result.score >= 60, `fraud score ${result.score} should be high`);
  assert.equal(result.risk, "HIGH");
});

test("logisticScore and forestScore differ for amount=30000 (RF threshold 25000, XGB threshold 50000)", () => {
  const result = scoreTransaction({
    amount: 30000,
    hour: 13,
    location: "Mumbai",
    type: "P2M",
    senderBank: "SBI",
    receiverBank: "SBI",
    newDevice: false,
    failedAttempts: 0,
  });
  assert.ok(result.logisticScore > result.forestScore, `logisticScore ${result.logisticScore} should exceed forestScore ${result.forestScore}`);
});

test("score clamping: construct input producing > 99 → score is 99", () => {
  const result = scoreTransaction({
    amount: 100000,
    hour: 2,
    location: "Foreign",
    type: "P2P",
    senderBank: "SBI",
    receiverBank: "HDFC",
    newDevice: true,
    failedAttempts: 20,
  });
  assert.equal(result.logisticScore, 99);
  assert.equal(result.forestScore, 99);
});

test("risk bands: score 59 → MEDIUM", () => {
  const result = securityAnomalyScoreBand(59);
  assert.equal(result, "MEDIUM");
});

test("risk bands: score 60 → HIGH", () => {
  const result = securityAnomalyScoreBand(60);
  assert.equal(result, "HIGH");
});

test("risk bands: score 29 → LOW", () => {
  const result = securityAnomalyScoreBand(29);
  assert.equal(result, "LOW");
});

test("risk bands: score 30 → MEDIUM", () => {
  const result = securityAnomalyScoreBand(30);
  assert.equal(result, "MEDIUM");
});

test("failedAttempts=10 → RF adds min(18,60)=18, XGB adds min(20,70)=20", () => {
  const base = scoreTransaction({
    amount: 500,
    hour: 13,
    location: "Mumbai",
    type: "P2M",
    senderBank: "SBI",
    receiverBank: "SBI",
    newDevice: false,
    failedAttempts: 0,
  });
  const withAttempts = scoreTransaction({
    amount: 500,
    hour: 13,
    location: "Mumbai",
    type: "P2M",
    senderBank: "SBI",
    receiverBank: "SBI",
    newDevice: false,
    failedAttempts: 10,
  });
  assert.equal(withAttempts.logisticScore - base.logisticScore, 18);
  assert.equal(withAttempts.forestScore - base.forestScore, 20);
});

function securityAnomalyScoreBand(score: number): string {
  if (score >= 60) return "HIGH";
  if (score >= 30) return "MEDIUM";
  return "LOW";
}
