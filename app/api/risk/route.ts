type Scenario = {
  amount: number;
  hour: number;
  deviceAgeDays: number;
  failedAttempts: number;
  newBeneficiary: boolean;
  vpaMismatch: boolean;
  locationVelocityKmH: number;
  location?: string;
  transactionType?: string;
  senderBank?: string;
  receiverBank?: string;
};

type Contribution = { signal: string; points: number; detail: string };

function inRange(value: unknown, minimum: number, maximum: number) {
  return typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum;
}

export async function POST(request: Request) {
  let input: Scenario;
  try {
    input = await request.json() as Scenario;
  } catch {
    return Response.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  if (
    !inRange(input.amount, 1, 1_000_000) || !inRange(input.hour, 0, 23) ||
    !inRange(input.deviceAgeDays, 0, 3650) || !inRange(input.failedAttempts, 0, 20) ||
    !inRange(input.locationVelocityKmH, 0, 2000) ||
    typeof input.newBeneficiary !== "boolean" || typeof input.vpaMismatch !== "boolean"
  ) {
    return Response.json({ error: "Scenario fields are missing or outside accepted ranges" }, { status: 400 });
  }

  const contributions: Contribution[] = [];
  if (input.amount > 25_000) contributions.push({ signal: "High value", points: 18, detail: "Amount is above ₹25,000" });
  else if (input.amount > 10_000) contributions.push({ signal: "Elevated value", points: 9, detail: "Amount is above ₹10,000" });
  if (input.hour < 5) contributions.push({ signal: "Low-activity hour", points: 14, detail: "Payment falls between midnight and 05:00" });
  if (input.location === "Unknown" || input.location === "Foreign") contributions.push({ signal: "Untrusted location", points: 20, detail: `${input.location} is treated as a high-review origin in this demonstration` });
  if (input.deviceAgeDays < 3) contributions.push({ signal: "New device", points: 24, detail: "Device was enrolled less than three days ago" });
  if (input.failedAttempts >= 2) contributions.push({ signal: "Repeated attempts", points: 16, detail: "Two or more failures preceded the payment" });
  if (input.newBeneficiary) contributions.push({ signal: "New beneficiary", points: 13, detail: "No prior payment relationship is present" });
  if (input.vpaMismatch) contributions.push({ signal: "Identity mismatch", points: 22, detail: "VPA and account identity fields disagree" });
  if (input.locationVelocityKmH > 500) contributions.push({ signal: "Impossible travel", points: 28, detail: "Location change exceeds plausible physical travel" });
  else if (input.locationVelocityKmH > 180) contributions.push({ signal: "Location velocity", points: 12, detail: "Location changed unusually quickly" });

  const score = Math.min(100, 6 + contributions.reduce((sum, item) => sum + item.points, 0));
  const decision = score >= 75 ? "hold" : score >= 45 ? "review" : "allow";
  const confidence = contributions.length >= 4 ? "strong signal density" : contributions.length >= 2 ? "moderate signal density" : "limited signal density";

  return Response.json({
    score,
    decision,
    confidence,
    contributions: contributions.length ? contributions : [{ signal: "Baseline", points: 6, detail: "No elevated demo rule was observed" }],
    evaluatedAt: new Date().toISOString(),
    model: "rupeelens-rules-v1",
    caveat: "Decision support only; not a fraud determination.",
  });
}
