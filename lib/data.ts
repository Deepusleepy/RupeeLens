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
