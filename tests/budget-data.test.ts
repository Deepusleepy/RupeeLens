import { test } from "node:test";
import assert from "node:assert/strict";
import { budgetRows } from "../lib/labs.ts";
import { budgetHistory } from "../lib/data.ts";

const financeSeries = budgetHistory.filter((p) => p.ministry === "Finance").map((p) => p.total);
const defenceSeries = budgetHistory.filter((p) => p.ministry === "Defence").map((p) => p.total);

test("Finance series has no >100x jumps between consecutive years", () => {
  for (let i = 1; i < financeSeries.length; i++) {
    const ratio = Math.max(financeSeries[i], financeSeries[i - 1]) / Math.min(financeSeries[i], financeSeries[i - 1]);
    assert.ok(ratio <= 100, `Finance jump at year ${2014 + i}: ${financeSeries[i - 1]} -> ${financeSeries[i]} (ratio ${ratio.toFixed(2)})`);
  }
});

test("Defence series first three values are not all identical", () => {
  assert.ok(defenceSeries[0] !== defenceSeries[1] || defenceSeries[1] !== defenceSeries[2], "Defence first three values are all identical");
});

test("Agriculture capital share is 0.07", () => {
  const agriculture = budgetRows.filter((row) => row.ministry === "Agriculture");
  assert.ok(agriculture.length > 0, "No Agriculture rows found");
  for (const row of agriculture) {
    const share = row.capital / row.total;
    assert.ok(Math.abs(share - 0.07) < 0.01, `Agriculture ${row.year}: capital share ${share.toFixed(4)} != 0.07`);
  }
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
