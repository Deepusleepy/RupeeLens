import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };

test("keeps all three workspace workflows wired into the product", async () => {
  const source = await readFile(new URL("../app/workspaces.tsx", import.meta.url), "utf8");
  for (const feature of [
    "Payment trail",
    "Batch CSV",
    "Model performance",
    "Deep dive",
    "Import & export",
    "2026–27 overview",
    "Ministry drill-down",
    "Forecasting",
    "Smart Query",
    "Excel workbook",
  ]) {
    assert.match(source, new RegExp(feature, "i"), `missing workspace feature: ${feature}`);
  }
});

test("renders the RupeeLens product surface", async () => {
  const response = await worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), env, context);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>RupeeLens \| Payment risk and public finance<\/title>/i);
  assert.match(html, /Investigate money from transaction to treasury/);
  assert.match(html, /Synthetic payment data/);
  assert.match(html, /Budget analytics/);
  assert.match(html, /Security logs/);
  assert.match(html, /Dual-model comparison/);
});

test("returns an explainable held decision", async () => {
  const response = await worker.fetch(new Request("http://localhost/api/risk", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ amount: 50000, hour: 2, deviceAgeDays: 1, failedAttempts: 3, newBeneficiary: true, vpaMismatch: true, locationVelocityKmH: 700 }),
  }), env, context);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.score, 100);
  assert.equal(result.decision, "hold");
  assert.ok(result.contributions.length >= 6);
  assert.match(result.caveat, /not a fraud determination/i);
});

test("rejects invalid risk inputs", async () => {
  const response = await worker.fetch(new Request("http://localhost/api/risk", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ amount: -1, hour: 45, deviceAgeDays: 0, failedAttempts: 0, newBeneficiary: false, vpaMismatch: false, locationVelocityKmH: 0 }),
  }), env, context);
  assert.equal(response.status, 400);
});

test("adds an untrusted-location contribution when location context is supplied", async () => {
  const response = await worker.fetch(new Request("http://localhost/api/risk", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ amount: 900, hour: 13, deviceAgeDays: 100, failedAttempts: 0, newBeneficiary: false, vpaMismatch: false, locationVelocityKmH: 0, location: "Foreign" }),
  }), env, context);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.ok(result.contributions.some((item) => item.signal === "Untrusted location"));
});

test("filters the synthetic event trail without exposing raw identifiers", async () => {
  const response = await worker.fetch(new Request("http://localhost/api/events?status=held&q=travel"), env, context);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.meta.dataClass, "synthetic-demo");
  assert.equal(result.events.length, 1);
  assert.match(result.events[0].maskedVpa, /•/);
  assert.equal(result.events[0].status, "held");
});
