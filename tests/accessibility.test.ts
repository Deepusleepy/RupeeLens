import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const read = (file: string) => readFileSync(join(here, "..", file), "utf8");

test("skip link exists in rupee-lens.tsx", () => {
  const source = read("app/rupee-lens.tsx");
  assert.match(source, /className="skip-link"/);
  assert.match(source, /href="#main"/);
});

test("role=tablist exists in workspaces.tsx", () => {
  const source = read("app/workspaces.tsx");
  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tab"/);
  assert.match(source, /aria-selected=/);
});

test("role=dialog exists in rupee-lens.tsx", () => {
  const source = read("app/rupee-lens.tsx");
  assert.match(source, /role="dialog"/);
});

test("aria-modal exists in rupee-lens.tsx", () => {
  const source = read("app/rupee-lens.tsx");
  assert.match(source, /aria-modal="true"/);
});

test("scope=col exists in workspaces.tsx", () => {
  const source = read("app/workspaces.tsx");
  assert.match(source, /scope="col"/);
});

test("visually-hidden class exists in globals.css", () => {
  const source = read("app/globals.css");
  assert.match(source, /\.visually-hidden/);
});

test("aria-current exists in rupee-lens.tsx", () => {
  const source = read("app/rupee-lens.tsx");
  assert.match(source, /aria-current=/);
  assert.match(source, /"page"/);
});

test("aria-hidden on canvas in charts.tsx", () => {
  const source = read("app/charts.tsx");
  assert.match(source, /<canvas[^>]*aria-hidden="true"/);
});

test("no font-size 8px or 9px in workspaces.css", () => {
  const source = read("app/workspaces.css");
  const lines = source.split("\n");
  for (const line of lines) {
    const fontMatch = line.match(/font-size:\s*(\d+)px/) || line.match(/font:\s*[^;]*\s(\d+)px\//);
    if (fontMatch) {
      const size = Number(fontMatch[1]);
      assert.ok(size >= 11, `Found font-size ${size}px in workspaces.css: ${line.trim()}`);
    }
  }
});
