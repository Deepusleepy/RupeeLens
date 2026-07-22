export type PaymentEvent = {
  id: string;
  timestamp: string;
  maskedVpa: string;
  type: "P2P" | "P2M";
  amount: number;
  score: number;
  status: "allowed" | "review" | "held";
  city: string;
  signals: string[];
};

export const paymentEvents: PaymentEvent[] = [
  { id: "RL-91F2", timestamp: "2026-07-22T14:42:18+05:30", maskedVpa: "al•••@okaxis", type: "P2P", amount: 24999, score: 86, status: "held", city: "Bengaluru", signals: ["New device", "Velocity spike"] },
  { id: "RL-7C04", timestamp: "2026-07-22T14:40:53+05:30", maskedVpa: "me•••@ybl", type: "P2M", amount: 7850, score: 62, status: "review", city: "Mumbai", signals: ["Unusual hour"] },
  { id: "RL-31B9", timestamp: "2026-07-22T14:38:07+05:30", maskedVpa: "ra•••@ibl", type: "P2M", amount: 680, score: 18, status: "allowed", city: "Kochi", signals: ["Known pattern"] },
  { id: "RL-A117", timestamp: "2026-07-22T14:34:26+05:30", maskedVpa: "di•••@paytm", type: "P2P", amount: 12400, score: 74, status: "review", city: "Delhi", signals: ["New beneficiary", "Amount change"] },
  { id: "RL-911D", timestamp: "2026-07-22T14:31:44+05:30", maskedVpa: "sa•••@okhdfcbank", type: "P2M", amount: 349, score: 9, status: "allowed", city: "Pune", signals: ["Known pattern"] },
  { id: "RL-C092", timestamp: "2026-07-22T14:28:12+05:30", maskedVpa: "vi•••@oksbi", type: "P2P", amount: 46000, score: 91, status: "held", city: "Hyderabad", signals: ["Impossible travel", "VPA mismatch"] },
  { id: "RL-48EE", timestamp: "2026-07-22T14:24:30+05:30", maskedVpa: "ne•••@upi", type: "P2M", amount: 2100, score: 27, status: "allowed", city: "Chennai", signals: ["Known merchant"] },
  { id: "RL-D63A", timestamp: "2026-07-22T14:20:11+05:30", maskedVpa: "ka•••@okicici", type: "P2P", amount: 18800, score: 56, status: "review", city: "Jaipur", signals: ["Repeated attempts"] },
];

export const budgetSummary = [
  { label: "Total expenditure", value: 53.47315, unit: "₹ lakh crore", note: "BE 2026–27" },
  { label: "Capital expenditure", value: 12.21821, unit: "₹ lakh crore", note: "BE 2026–27" },
  { label: "Fiscal deficit", value: 4.3, unit: "% of GDP", note: "BE 2026–27" },
  { label: "Transfers to states", value: 25.43769, unit: "₹ lakh crore", note: "BE 2026–27" },
];

export const rupeeGoesTo = [
  { label: "States’ share of taxes", paise: 22, tone: "green" },
  { label: "Interest payments", paise: 20, tone: "gold" },
  { label: "Central sector schemes", paise: 17, tone: "blue" },
  { label: "Defence", paise: 11, tone: "rust" },
  { label: "Centrally sponsored schemes", paise: 8, tone: "violet" },
  { label: "Finance Commission & transfers", paise: 7, tone: "teal" },
  { label: "Other expenditure", paise: 7, tone: "gray" },
  { label: "Major subsidies", paise: 6, tone: "amber" },
  { label: "Civil pensions", paise: 2, tone: "slate" },
];

export const rupeeComesFrom = [
  { label: "Borrowings & liabilities", paise: 24 },
  { label: "Income tax", paise: 21 },
  { label: "Corporation tax", paise: 18 },
  { label: "GST & other taxes", paise: 15 },
  { label: "Non-tax revenue", paise: 10 },
  { label: "Union excise duties", paise: 6 },
  { label: "Customs", paise: 4 },
  { label: "Non-debt capital receipts", paise: 2 },
];

export const BUDGET_SOURCE_URL = "https://www.indiabudget.gov.in/doc/budget_at_glance/bag1.pdf";

export type SecurityEvent = {
  id: string;
  timestamp: string;
  category: "Login" | "Session" | "Authentication" | "Request" | "Service";
  severity: "info" | "warning" | "critical";
  source: string;
  subject: string;
  detail: string;
};

export const securityEvents: SecurityEvent[] = [
  { id: "SEC-1042", timestamp: "2026-07-22T14:41:02+05:30", category: "Login", severity: "critical", source: "103.•••.18.42", subject: "USR-••17", detail: "9 failed login attempts in 4 minutes" },
  { id: "SEC-1041", timestamp: "2026-07-22T14:38:21+05:30", category: "Request", severity: "critical", source: "45.•••.92.11", subject: "/upi/collect", detail: "Rate threshold exceeded: 184 requests/min" },
  { id: "SEC-1040", timestamp: "2026-07-22T14:35:44+05:30", category: "Authentication", severity: "warning", source: "117.•••.4.90", subject: "USR-••83", detail: "11 rejected OTP attempts" },
  { id: "SEC-1039", timestamp: "2026-07-22T14:31:18+05:30", category: "Session", severity: "warning", source: "49.•••.71.16", subject: "SES-••51", detail: "Session duration 243 minutes" },
  { id: "SEC-1038", timestamp: "2026-07-22T14:26:03+05:30", category: "Service", severity: "warning", source: "internal", subject: "USR-••09", detail: "Suspended merchant service accessed" },
  { id: "SEC-1037", timestamp: "2026-07-22T14:20:37+05:30", category: "Login", severity: "info", source: "106.•••.31.77", subject: "USR-••72", detail: "Successful login from known browser" },
  { id: "SEC-1036", timestamp: "2026-07-22T14:16:29+05:30", category: "Request", severity: "warning", source: "14.•••.88.32", subject: "/upi/pay", detail: "Blank payload rejected" },
  { id: "SEC-1035", timestamp: "2026-07-22T14:12:05+05:30", category: "Session", severity: "warning", source: "122.•••.60.51", subject: "SES-••04", detail: "Session ended after 74 seconds" },
  { id: "SEC-1034", timestamp: "2026-07-22T14:08:46+05:30", category: "Authentication", severity: "info", source: "152.•••.44.27", subject: "USR-••31", detail: "Token refreshed successfully" },
  { id: "SEC-1033", timestamp: "2026-07-22T14:03:19+05:30", category: "Request", severity: "critical", source: "185.•••.12.99", subject: "/upi/status", detail: "Distributed request burst detected" },
  { id: "SEC-1032", timestamp: "2026-07-22T13:58:52+05:30", category: "Service", severity: "info", source: "internal", subject: "USR-••58", detail: "Bill-payment service activated" },
  { id: "SEC-1031", timestamp: "2026-07-22T13:52:11+05:30", category: "Login", severity: "warning", source: "27.•••.102.63", subject: "USR-••14", detail: "New browser fingerprint observed" },
];

export type BudgetHistoryPoint = { ministry: string; year: number; total: number };

const ministrySeries: Record<string, number[]> = {
  Agriculture: [29962.94, 24909.78, 44485.2, 51026, 57600, 138563.97, 142762.35, 131531.19, 132513.62, 125035.79, 132469.86],
  Defence: [311042, 311042, 311042, 346716.77, 385352.88, 413544, 436787, 459474.71, 500053, 595320, 621940.85],
  Finance: [165971.23, 166211.79, 166942, 2127.9, 2135, 2246.83, 2311.5, 2353.26, 2382, 2272, 1858158.52],
  "Home Affairs": [69694.99, 70073.87, 73993, 80480, 94000, 105300, 114520.26, 121637.38, 123926, 142350, 219643.31],
  Health: [26357.67, 27289.91, 31618, 47500, 53406, 62510, 65036.06, 71250, 86620, 92355, 90958.63],
};

export const budgetHistory: BudgetHistoryPoint[] = Object.entries(ministrySeries).flatMap(([ministry, totals]) =>
  totals.map((total, index) => ({ ministry, year: 2014 + index, total })),
);
