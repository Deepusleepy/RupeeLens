import { paymentEvents } from "../../../lib/data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 80);
  const status = url.searchParams.get("status") ?? "all";

  if (!new Set(["all", "allowed", "review", "held"]).has(status)) {
    return Response.json({ error: "Unsupported status filter" }, { status: 400 });
  }

  const events = paymentEvents.filter((event) => {
    const searchable = [event.id, event.maskedVpa, event.city, event.type, ...event.signals].join(" ").toLowerCase();
    return (!query || searchable.includes(query)) && (status === "all" || event.status === status);
  });

  return Response.json({
    events,
    meta: {
      count: events.length,
      generated: false,
      dataClass: "synthetic-demo",
      privacy: "masked-identifiers",
    },
  });
}
