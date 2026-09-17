import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const workspaces = readFileSync(new URL("../app/workspaces.tsx", import.meta.url), "utf8");
const globals = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const charts = readFileSync(new URL("../app/charts.tsx", import.meta.url), "utf8");
const pkg = readFileSync(new URL("../package.json", import.meta.url), "utf8");

test("group function is generic", () => {
  assert.match(workspaces, /function group<T extends object>/);
});

test("no as-unknown-as casts remain in workspaces", () => {
  assert.doesNotMatch(workspaces, /as unknown as/);
});

test("download uses setTimeout for revokeObjectURL", () => {
  assert.match(workspaces, /setTimeout.*revokeObjectURL/);
});

test("escapeHtml function exists", () => {
  assert.match(workspaces, /function escapeHtml/);
});

test("excelExport uses escapeHtml", () => {
  const line = workspaces.split("\n").find((l) => l.includes("function excelExport"));
  assert.ok(line, "excelExport function not found");
  assert.match(line, /escapeHtml/);
});

test("spacing tokens exist in globals.css", () => {
  assert.match(globals, /--space-xs/);
  assert.match(globals, /--space-sm/);
  assert.match(globals, /--space-md/);
  assert.match(globals, /--space-lg/);
  assert.match(globals, /--space-xl/);
});

test("test:integration script exists in package.json", () => {
  assert.match(pkg, /test:integration/);
});

test("TrendChart uses ref instead of data in effect deps", () => {
  assert.match(charts, /dataRef/);
});
