import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const globalsSource = readFileSync(join(__dirname, "..", "app", "globals.css"), "utf8");
const workspacesCssSource = readFileSync(join(__dirname, "..", "app", "workspaces.css"), "utf8");
const chartsSource = readFileSync(join(__dirname, "..", "app", "charts.tsx"), "utf8");
const workspacesSource = readFileSync(join(__dirname, "..", "app", "workspaces.tsx"), "utf8");
const rupeeLensSource = readFileSync(join(__dirname, "..", "app", "rupee-lens.tsx"), "utf8");

test("workspaces.css has no hardcoded background: white", () => {
  assert.doesNotMatch(workspacesCssSource, /background: white/);
});

test("workspaces.css has no hardcoded #aaa99f border", () => {
  assert.doesNotMatch(workspacesCssSource, /#aaa99f/);
});

test("workspaces.css uses var(--surface) for form inputs", () => {
  assert.match(workspacesCssSource, /background: var\(--surface\)/);
});

test("globals.css masthead uses color-mix for paper background", () => {
  assert.match(globalsSource, /color-mix\(in srgb, var\(--paper\) 94%, transparent\)/);
  assert.doesNotMatch(globalsSource, /rgb\(244 241 232/);
});

test("globals.css footer uses var(--muted) for text colors", () => {
  assert.doesNotMatch(globalsSource, /#9ba79f/);
  assert.doesNotMatch(globalsSource, /#a2aaa5/);
});

test("globals.css source-banner span uses var(--green)", () => {
  assert.doesNotMatch(globalsSource, /#557061/);
});

test("workspaces.css .text-action removed from lab-card-head selector", () => {
  assert.doesNotMatch(workspacesCssSource, /\.lab-card-head button, \.text-action, \.upload-zone button/);
  assert.match(workspacesCssSource, /\.lab-card-head button, \.upload-zone button/);
});

test("globals.css hero-preview shadow uses var(--line)", () => {
  assert.doesNotMatch(globalsSource, /#dcd8cc/);
});

test("globals.css preview-score track uses var(--surface-muted)", () => {
  assert.doesNotMatch(globalsSource, /#ddd9ce/);
});

test("globals.css mobile-nav border uses var(--line)", () => {
  assert.doesNotMatch(globalsSource, /#425048/);
});

test("globals.css privacy-stamp border uses var(--line)", () => {
  assert.doesNotMatch(globalsSource, /#aebdb2/);
});

test("workspaces.css .lab-card-head h2 removed from lab-card > h2 rule", () => {
  assert.match(workspacesCssSource, /\.lab-card > h2 \{ margin: 0 0 22px/);
  assert.doesNotMatch(workspacesCssSource, /\.lab-card > h2, \.lab-card-head h2/);
});

test("globals.css :root --muted improved to #5f6a63", () => {
  assert.match(globalsSource, /--muted: #5f6a63/);
});

test("globals.css dark theme --muted improved to #a0a0a0", () => {
  assert.match(globalsSource, /--muted: #a0a0a0/);
});

test("workspaces.css .roc-chart uses overflow: visible", () => {
  assert.match(workspacesCssSource, /\.roc-chart \{[^}]*overflow: visible/);
});

test("globals.css has transition rules for interactive elements", () => {
  assert.match(globalsSource, /transition: background-color \.15s ease, color \.15s ease, border-color \.15s ease/);
  assert.match(globalsSource, /body \{[^}]*transition: background-color \.2s ease, color \.2s ease/);
});

test("workspaces.css .dual-links removed", () => {
  assert.doesNotMatch(workspacesCssSource, /dual-links/);
});

test("globals.css .security-summary removed", () => {
  assert.doesNotMatch(globalsSource, /security-summary/);
});

test("globals.css .evaluate removed from selector list", () => {
  assert.doesNotMatch(globalsSource, /\.evaluate/);
});

test("workspaces.css .generator has flex-wrap: wrap", () => {
  assert.match(workspacesCssSource, /\.generator \{ flex-wrap: wrap/);
});

test("globals.css mini-score span uses var(--green)", () => {
  assert.doesNotMatch(globalsSource, /#a8c7b5/);
});

test("globals.css budget-spotlight i uses var(--green)", () => {
  assert.doesNotMatch(globalsSource, /#b9d2c3/);
});

test("globals.css defines --chart-5 through --chart-8 in :root", () => {
  assert.match(globalsSource, /--chart-5: #7f8f6a/);
  assert.match(globalsSource, /--chart-6: #674c78/);
  assert.match(globalsSource, /--chart-7: #8b7252/);
  assert.match(globalsSource, /--chart-8: #477b78/);
});

test("globals.css defines --chart-5 through --chart-8 in dark theme", () => {
  const darkMatches = globalsSource.match(/--chart-5: #7f8f6a/g);
  assert.ok(darkMatches && darkMatches.length >= 2, "chart vars should appear in both :root and dark");
});

test("charts.tsx palette uses CSS variables for all 8 colors", () => {
  assert.match(chartsSource, /var\(--chart-5\)/);
  assert.match(chartsSource, /var\(--chart-6\)/);
  assert.match(chartsSource, /var\(--chart-7\)/);
  assert.match(chartsSource, /var\(--chart-8\)/);
  assert.doesNotMatch(chartsSource, /#7f8f6a/);
});

test("workspaces.tsx PaymentWorkspace uses useMemo for fraudCount", () => {
  assert.match(workspacesSource, /const fraudCount = useMemo/);
});

test("workspaces.tsx PaymentWorkspace uses useMemo for detected", () => {
  assert.match(workspacesSource, /const detected = useMemo/);
});

test("workspaces.tsx PaymentWorkspace uses useMemo for falsePositive", () => {
  assert.match(workspacesSource, /const falsePositive = useMemo/);
});

test("workspaces.tsx PaymentWorkspace uses useMemo for dashboardBars", () => {
  assert.match(workspacesSource, /const dashboardBars = useMemo/);
});

test("workspaces.tsx SecurityWorkspace uses useMemo for anomalies", () => {
  assert.match(workspacesSource, /const anomalies = useMemo/);
});

test("workspaces.tsx SecurityWorkspace uses useMemo for familyLogs", () => {
  assert.match(workspacesSource, /const familyLogs = useMemo/);
});

test("workspaces.tsx BudgetWorkspace uses useMemo for ministries", () => {
  assert.match(workspacesSource, /const ministries = useMemo/);
});

test("workspaces.tsx BudgetWorkspace uses useMemo for forecasts", () => {
  assert.match(workspacesSource, /const forecasts = useMemo/);
});

test("workspaces.tsx BudgetWorkspace uses useMemo for otherForecasts", () => {
  assert.match(workspacesSource, /const otherForecasts = useMemo/);
});

test("rupee-lens.tsx defines ErrorBoundary class component", () => {
  assert.match(rupeeLensSource, /class ErrorBoundary extends Component/);
  assert.match(rupeeLensSource, /getDerivedStateFromError/);
});

test("rupee-lens.tsx wraps workspaces in ErrorBoundary", () => {
  assert.match(rupeeLensSource, /<ErrorBoundary><PaymentWorkspace/);
  assert.match(rupeeLensSource, /<ErrorBoundary><SecurityWorkspace/);
  assert.match(rupeeLensSource, /<ErrorBoundary><BudgetWorkspace/);
});

test("workspaces.tsx heatmap derives epoch from logs, not hardcoded date", () => {
  assert.match(workspacesSource, /const heatmapEpoch = useMemo/);
  assert.doesNotMatch(workspacesSource, /Date\.UTC\(2026, 6, 16, 8, 30\)/);
});

test("workspaces.tsx BudgetWorkspace latest guards against empty array", () => {
  assert.match(workspacesSource, /dashboardRows\.length \? Math\.max\(\.\.\.dashboardRows\.map/);
});

test("workspaces.tsx PaymentWorkspace clamps count input", () => {
  assert.match(workspacesSource, /setCount\(Math\.min\(50000, Math\.max\(100/);
});

test("workspaces.tsx SecurityWorkspace clamps scale input", () => {
  assert.match(workspacesSource, /setScale\(Math\.min\(5000, Math\.max\(100/);
});

test("workspaces.tsx Predictor clamps amount to >= 0", () => {
  assert.match(workspacesSource, /setAmount\(Math\.max\(0, Number\(e\.target\.value\) \|\| 0\)\)/);
});

test("workspaces.tsx Predictor clamps hour to 0-23", () => {
  assert.match(workspacesSource, /setHour\(Math\.min\(23, Math\.max\(0/);
});

test("workspaces.tsx Predictor clamps failedAttempts to 0-10", () => {
  assert.match(workspacesSource, /setFailedAttempts\(Math\.min\(10, Math\.max\(0/);
});

test("charts.tsx DonutChart handles all-zero values", () => {
  assert.match(chartsSource, /const isEmpty = data\.every/);
  assert.match(chartsSource, /isEmpty \? "0" : formatter\(total\)/);
});

test("charts.tsx TrendChart uses globalAlpha for fill instead of hex append", () => {
  assert.match(chartsSource, /context\.globalAlpha = 0\.1/);
  assert.doesNotMatch(chartsSource, /\$\{green\}1a/);
});

test("workspaces.tsx Smart Query presets call runPresetQuery", () => {
  assert.match(workspacesSource, /function runPresetQuery/);
  assert.match(workspacesSource, /onClick=\{\(\) => runPresetQuery\(item\)\}/);
});

test("workspaces.tsx computeQuery extracted as reusable function", () => {
  assert.match(workspacesSource, /function computeQuery\(q: string, sourceRows: BudgetRow\[\]\)/);
});

test("workspaces.tsx Comparison tab has empty state", () => {
  assert.match(workspacesSource, /Select at least one ministry to compare/);
});

test("workspaces.tsx rupeeFlow buttons have active state and aria-pressed", () => {
  assert.match(workspacesSource, /rupeeFlow === "to" \? "active" : ""/);
  assert.match(workspacesSource, /rupeeFlow === "from" \? "active" : ""/);
  assert.match(workspacesSource, /aria-pressed=\{rupeeFlow === "to"\}/);
});

test("workspaces.tsx uploadBudget sets startYear and endYear after upload", () => {
  assert.match(workspacesSource, /setStartYear\(years\[0\]/);
  assert.match(workspacesSource, /setEndYear\(years\[years\.length - 1\]/);
});

test("workspaces.tsx YoY growth guards against division by zero", () => {
  assert.match(workspacesSource, /index && series\[index - 1\]\?\.total \? \(row\.total \/ series\[index - 1\]!\.total - 1\) \* 100 : 0/);
});

test("workspaces.tsx runQuery caps top at 50", () => {
  assert.match(workspacesSource, /Math\.min\(50, Math\.max\(1, Number\(topMatch\?\.\[1\]\) \|\| 5\)\)/);
});

test("workspaces.tsx Predictor heading handles Both model", () => {
  assert.match(workspacesSource, /predictModel === "Both" \? "Combined result" : `\$\{predictModel\} result`/);
});

test("charts.tsx Histogram uses palette.length for modulo", () => {
  assert.match(chartsSource, /palette\[index % palette\.length\]/);
  assert.doesNotMatch(chartsSource, /palette\[index % 4\]/);
});

test("charts.tsx empty-data aria-labels for DonutChart, Histogram, DotPlot", () => {
  const donutMatches = chartsSource.match(/Chart has no data/g);
  assert.ok(donutMatches && donutMatches.length >= 3, "should have 3 empty-data aria-labels");
});

test("workspaces.tsx model-switch buttons have aria-pressed", () => {
  assert.match(workspacesSource, /aria-pressed=\{model === "(logistic|rf)"\}/);
});

test("workspaces.tsx family switch buttons have aria-pressed", () => {
  assert.match(workspacesSource, /aria-pressed=\{family === item\}/);
});

test("workspaces.tsx comparison mode buttons have aria-pressed", () => {
  assert.match(workspacesSource, /aria-pressed=\{comparisonMode === item\}/);
});

test("rupee-lens.tsx theme toggle has aria-pressed", () => {
  assert.match(rupeeLensSource, /aria-pressed=\{theme === "dark"\}/);
});
