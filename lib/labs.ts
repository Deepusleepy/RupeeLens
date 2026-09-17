import { budgetHistory } from "./data";

export type Transaction = {
  id: string; amount: number; hour: number; location: string; type: string;
  senderBank: string; receiverBank: string; newDevice: boolean; failedAttempts: number;
  fraud: boolean; logisticScore: number; forestScore: number; score: number; risk: "LOW" | "MEDIUM" | "HIGH";
};

export type SecurityLog = {
  id: string; family: "Login" | "Session" | "Authentication" | "Request" | "Service";
  timestamp: string; source: string; subject: string; status: string; value: number; detail: string;
  browser?: string; service?: string; plan?: string;
  severity: "info" | "warning" | "critical";
};

export type BudgetRow = {
  ministry: string; year: number; total: number; revenue: number; capital: number;
  plan: number | null; nonPlan: number | null;
};

const locations = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"];
const types = ["P2P", "P2M", "Bill payment", "Recharge", "Online shopping"];
const banks = ["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "BOB"];

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => ((value = Math.imul(1664525, value) + 1013904223 >>> 0) / 4294967296);
}

export function scoreTransaction(input: Omit<Transaction, "id" | "fraud" | "logisticScore" | "forestScore" | "score" | "risk">) {
  const amount = Math.max(0, Number.isFinite(input.amount) ? input.amount : 0);
  const hour = Math.max(0, Math.min(23, Number.isFinite(input.hour) ? input.hour : 12));
  const failedAttempts = Math.max(0, Math.floor(Number.isFinite(input.failedAttempts) ? input.failedAttempts : 0));
  const night = hour < 6 || hour >= 22;
  const unknown = input.location === "Unknown" || input.location === "Foreign";
  const logistic = 4 + (amount > 25000 ? 20 : amount > 10000 ? 9 : 0) + (night ? 17 : 0) + (unknown ? 22 : 0) + (input.newDevice ? 25 : 0) + Math.min(18, failedAttempts * 6) + (input.senderBank !== input.receiverBank ? 4 : 0);
  const forest = 3 + (amount > 50000 ? 28 : amount > 15000 ? 13 : 0) + (night ? 20 : 0) + (unknown ? 26 : 0) + (input.newDevice ? 21 : 0) + Math.min(20, failedAttempts * 7) + (input.type === "P2P" ? 4 : 0);
  const logisticScore = Math.min(99, logistic); const forestScore = Math.min(99, forest); const score = Math.round((logisticScore + forestScore) / 2);
  return { logisticScore, forestScore, score, risk: (score >= 60 ? "HIGH" : score >= 30 ? "MEDIUM" : "LOW") as Transaction["risk"] };
}

export function generateTransactions(count = 1000, fraudPercent = 10, seed = 42): Transaction[] {
  const random = seeded(seed);
  const fp = Math.max(0, Math.min(100, Number.isFinite(fraudPercent) ? fraudPercent : 10));
  return Array.from({ length: Math.min(50000, Math.max(100, count)) }, (_, index) => {
    const fraud = random() < fp / 100;
    const normalFraud = fraud && random() < 0.18;
    const suspiciousLegit = !fraud && random() < 0.08;
    const amount = Math.round((normalFraud ? 10 + Math.pow(random(), 2.4) * 49990 : suspiciousLegit ? 5000 + random() * 45000 : fraud ? 500 + Math.pow(random(), .35) * 199500 : 10 + Math.pow(random(), 2.4) * 49990) * 100) / 100;
    const hour = normalFraud ? 6 + Math.floor(random() * 17) : suspiciousLegit ? (random() < 0.5 ? [0, 1, 2, 3, 4, 22, 23][Math.floor(random() * 7)]! : 6 + Math.floor(random() * 17)) : fraud ? [0, 1, 2, 3, 4, 22, 23][Math.floor(random() * 7)]! : 6 + Math.floor(random() * 16);
    const location = normalFraud ? locations[Math.floor(random() * locations.length)]! : suspiciousLegit ? (random() < 0.4 ? (random() < 0.5 ? "Unknown" : "Foreign") : locations[Math.floor(random() * locations.length)]!) : fraud && random() < .7 ? (random() < .55 ? "Unknown" : "Foreign") : locations[Math.floor(random() * locations.length)]!;
    const input = { amount, hour, location, type: types[Math.floor(random() * types.length)]!, senderBank: banks[Math.floor(random() * banks.length)]!, receiverBank: banks[Math.floor(random() * banks.length)]!, newDevice: normalFraud ? false : suspiciousLegit ? random() < 0.5 : random() < (fraud ? .7 : .05), failedAttempts: normalFraud ? 0 : suspiciousLegit ? Math.floor(random() * 3) : fraud ? Math.floor(random() * 4) : (random() < .9 ? 0 : 1) };
    return { id: `TXN${String(index + 1).padStart(7, "0")}`, ...input, fraud, logisticScore: 0, forestScore: 0, score: 0, risk: "LOW" as Transaction["risk"] };
  });
}

export function generateSecurityLogs(scale = 500, seed = 42): SecurityLog[] {
  const random = seeded(seed); const base = Date.UTC(2026, 6, 16, 8, 30); const families: SecurityLog["family"][] = ["Login", "Session", "Authentication", "Request", "Service"]; const browsers = ["Chrome", "Firefox", "Safari", "Edge", "Mobile App"]; const services = ["UPI Transfer", "Bill Payment", "Recharge", "Money Request", "QR Payment", "Merchant Payment"]; const plans = ["Basic", "Premium", "Gold", "Enterprise"];
  return Array.from({ length: Math.min(5000, Math.max(100, scale)) * 5 }, (_, index) => {
    const family = families[index % 5]!; const suspicious = random() < .16; const critical = suspicious && random() < .42;
    let status = "normal", value = 1, detail = "Normal activity";
    if (family === "Login") { status = suspicious ? "failed" : "success"; value = suspicious ? 6 + Math.floor(random() * 8) : 1; detail = suspicious ? `${value} failed attempts from this source` : "Successful login"; }
    if (family === "Session") { const noisy = random() < .12; if (suspicious) value = noisy ? 20 + Math.floor(random() * 41) : (random() < .5 ? 1 : 181 + Math.floor(random() * 300)); else value = noisy ? 1 + Math.floor(random() * 2) : 5 + Math.floor(random() * 55); status = suspicious ? "abnormal" : "normal"; detail = `Session duration ${value} minutes`; }
    if (family === "Authentication") { value = suspicious ? 11 + Math.floor(random() * 5) : 1; status = suspicious ? "rejected" : "authenticated"; detail = suspicious ? `${value} rejected authentication attempts` : "Token accepted"; }
    if (family === "Request") { status = critical ? "dos_attack" : suspicious ? "blank" : "normal"; value = critical ? 10000 + Math.floor(random() * 40000) : suspicious ? Math.floor(random() * 50) : 100 + Math.floor(random() * 4900); detail = `${status.replace("_", " ")} request · ${value} bytes`; }
    if (family === "Service") { status = critical ? "suspended" : suspicious ? "pending" : "active"; value = 1; detail = `${status} UPI service subscription`; }
    const severity: SecurityLog["severity"] = critical ? "critical" : suspicious ? "warning" : "info";
    return { id: `LOG-${String(index + 1).padStart(5, "0")}`, family, timestamp: new Date(base + Math.floor(random() * 7 * 86400000)).toISOString(), source: `${1 + Math.floor(random() * 223)}.•••.${1 + Math.floor(random() * 254)}.${1 + Math.floor(random() * 254)}`, subject: family === "Session" ? `SES-••${String(index % 100).padStart(2, "0")}` : `USR-••${String(index % 100).padStart(2, "0")}`, status, value, detail, browser: family === "Login" ? browsers[Math.floor(random() * browsers.length)]! : undefined, service: family === "Service" ? services[Math.floor(random() * services.length)]! : undefined, plan: family === "Service" ? plans[Math.floor(random() * plans.length)]! : undefined, severity };
  }).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function securityAnomalies(logs: SecurityLog[]) {
  const count = (family: SecurityLog["family"], predicate: (log: SecurityLog) => boolean) => logs.filter((log) => log.family === family && predicate(log)).length;
  return [
    { category: "Brute force", severity: "critical", count: count("Login", (log) => log.status === "failed" && log.value > 5), description: "Login events with more than five failures" },
    { category: "Abnormal session", severity: "warning", count: count("Session", (log) => log.value < 3 || log.value > 180), description: "Sessions shorter than 3 or longer than 180 minutes" },
    { category: "Credential stuffing", severity: "critical", count: count("Authentication", (log) => log.value > 10), description: "Authentication events with more than ten retries" },
    { category: "DOS request", severity: "critical", count: count("Request", (log) => log.status === "dos_attack"), description: "Requests classified as denial-of-service traffic" },
    { category: "Suspended service", severity: "warning", count: count("Service", (log) => log.status === "suspended"), description: "Service records in suspended state" },
  ];
}

export const budgetRows: BudgetRow[] = budgetHistory.map((row) => {
  const capitalShare = row.ministry === "Defence" ? .29 : row.ministry === "Home Affairs" ? .06 : row.ministry === "Health" ? .025 : row.ministry === "Agriculture" ? .07 : .008;
  const capital = row.total * capitalShare; const revenue = row.total - capital; const pre = row.year < 2017;
  return { ...row, revenue, capital, plan: pre ? row.total * .58 : null, nonPlan: pre ? row.total * .42 : null };
});

export function forecastSeries(values: number[], horizon: number, acceleration = false) {
  if (!values.every(Number.isFinite)) return Array.from({ length: Math.max(0, horizon) }, () => ({ value: 0, low: 0, high: 0 }));
  const n = values.length; const minLen = acceleration ? 3 : 2; if (n < minLen) { const last = values.at(-1) ?? 0; return Array.from({ length: horizon }, () => ({ value: last, low: last, high: last })); }
  const xs = values.map((_, index) => index);
  if (!acceleration) {
    const xm = xs.reduce((a, b) => a + b, 0) / n; const ym = values.reduce((a, b) => a + b, 0) / n;
    const slope = xs.reduce((sum, x, i) => sum + (x - xm) * (values[i]! - ym), 0) / xs.reduce((sum, x) => sum + (x - xm) ** 2, 0);
    const intercept = ym - slope * xm; const fitted = xs.map((x) => intercept + slope * x);
    let residual = Math.sqrt(values.reduce((sum, y, i) => sum + (y - fitted[i]!) ** 2, 0) / (n - 2));
    if (!Number.isFinite(residual) || residual === 0) residual = Math.abs(slope) || 1;
    const sxx = xs.reduce((sum, x) => sum + (x - xm) ** 2, 0);
    return Array.from({ length: horizon }, (_, i) => { const xf = n + i; const pi = residual * Math.sqrt(1 + 1 / n + (xf - xm) ** 2 / sxx); const value = Math.max(0, intercept + slope * xf); return { value, low: Math.max(0, value - 1.96 * pi), high: value + 1.96 * pi }; });
  }
  const recent = values.slice(-4); const d1 = recent.at(-1)! - recent.at(-2)!; const d0 = recent.at(-2)! - recent.at(-3)!; const accel = (d1 - d0) * .35;
  const residual = Math.abs(accel) + Math.abs(d1) * .18;
  return Array.from({ length: horizon }, (_, i) => { const step = i + 1; const value = Math.max(0, values.at(-1)! + d1 * step + accel * step * step); return { value, low: Math.max(0, value - 1.96 * residual * Math.sqrt(step)), high: value + 1.96 * residual * Math.sqrt(step) }; });
}

export function toCsv<T extends object>(rows: T[]) {
  if (!rows.length) return ""; const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))]; const quote = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""').replaceAll(/\r?\n/g, " ")}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((header) => quote((row as Record<string, unknown>)[header])).join(","))].join("\n");
}
