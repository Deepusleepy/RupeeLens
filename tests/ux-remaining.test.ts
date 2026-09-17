import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const workspaces = readFileSync(new URL("../app/workspaces.tsx", import.meta.url), "utf8");
const rupeeLens = readFileSync(new URL("../app/rupee-lens.tsx", import.meta.url), "utf8");
const globals = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const wsCss = readFileSync(new URL("../app/workspaces.css", import.meta.url), "utf8");

test("TransactionTable has pagination controls", () => {
  assert.match(workspaces, /table-pagination/);
  assert.match(workspaces, /Prev/);
  assert.match(workspaces, /Next/);
  assert.match(workspaces, /Page/);
});

test("CompactTable has row count indicator", () => {
  assert.match(workspaces, /table-row-count/);
  assert.match(workspaces, /showing/);
});

test("SecurityTable has row count indicator", () => {
  assert.match(workspaces, /showing 1-/);
});

test("workspaces use display:none for persistence", () => {
  assert.match(rupeeLens, /display.*none/);
});

test("form-error class exists in globals.css", () => {
  assert.match(globals, /\.form-error/);
});

test("form-note class exists in globals.css", () => {
  assert.match(globals, /\.form-note/);
});

test("batch upload has header validation", () => {
  assert.match(workspaces, /Missing required columns.*amount.*hour/);
});

test("uploadFamily has header validation", () => {
  assert.match(workspaces, /Missing required column.*timestamp/);
});

test("uploadBudget has header validation", () => {
  assert.match(workspaces, /Missing required columns.*ministry.*year.*total/);
});

test("heatmap cells have aria-label", () => {
  assert.match(workspaces, /aria-label=.*events/);
});

test("table-pagination CSS exists", () => {
  assert.match(wsCss, /\.table-pagination/);
});

test("scroll affordance CSS exists", () => {
  assert.match(wsCss, /\.compact-table-wrap::after/);
});
