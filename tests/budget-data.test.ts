import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { budgetRows } from "../lib/labs.ts";

test("Finance series has no >100x jumps between consecutive years", async () => {
  const source = await readFile(new URL("../lib/data.ts", import.meta.url), "utf8");
  const match = source.match(/Finance:\s*\[([^\]]+)\]/);
  assert.ok(match, "Finance series not found in lib/data.ts");
  const values = match[1].split(",").map((v) => Number(v.trim()));
  for (let i = 1; i < values.length; i++) {
    const ratio = Math.max(values[i], values[i - 1]) / Math.min(values[i], values[i - 1]);
    assert.ok(ratio <= 100, `Finance jump at index ${i}: ${values[i - 1]} -> ${values[i]} (ratio ${ratio.toFixed(2)})`);
  }
});

test("Defence series first three values are not all identical", async () => {
  const source = await readFile(new URL("../lib/data.ts", import.meta.url), "utf8");
  const match = source.match(/Defence:\s*\[([^\]]+)\]/);
  assert.ok(match, "Defence series not found in lib/data.ts");
  const values = match[1].split(",").map((v) => Number(v.trim()));
  assert.ok(values[0] !== values[1] || values[1] !== values[2], "Defence first three values are all identical");
});

test("Agriculture capital share is 0.07", async () => {
  const source = await readFile(new URL("../lib/labs.ts", import.meta.url), "utf8");
  assert.ok(/row\.ministry === "Agriculture"\s*\?\s*\.07/.test(source), "Agriculture capital share case not found");
});

test("All budget rows have valid revenue + capital = total", () => {
  for (const row of budgetRows) {
    assert.ok(Math.abs(row.revenue + row.capital - row.total) < 0.01, `${row.ministry} ${row.year}: revenue + capital != total`);
  }
});

test("All capital shares are between 0.5% and 35%", () => {
  for (const row of budgetRows) {
    const share = row.capital / row.total;
    assert.ok(share >= 0.005 && share <= 0.35, `${row.ministry} ${row.year}: capital share ${share.toFixed(4)} out of [0.005, 0.35]`);
  }
});
