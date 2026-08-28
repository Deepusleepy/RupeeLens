import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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

test("overview surface advertises the three workspaces", async () => {
  const source = await readFile(new URL("../app/rupee-lens.tsx", import.meta.url), "utf8");
  for (const phrase of [
    "Investigate money from transaction to treasury",
    "Synthetic payment data",
    "Budget analytics",
    "Security logs",
    "Dual-model comparison",
  ]) {
    assert.match(source, new RegExp(phrase, "i"), `missing overview copy: ${phrase}`);
  }
});

test("pages build emits the RupeeLens shell", async () => {
  const html = await readFile(new URL("../pages-dist/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>RupeeLens \| Payment risk and public finance<\/title>/i);
  assert.match(html, /Explore synthetic UPI risk, security logs, and Indian Union Budget data./);
  assert.match(html, /<div id="root">/);
  assert.match(html, /\/RupeeLens\/assets\//);
});
