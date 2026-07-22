# RupeeLens

Payment risk and public finance, examined clearly.

RupeeLens is a full-stack analytical workspace for:

- explainable UPI transaction-risk scenarios;
- privacy-safe payment-event investigation; and
- sourced India Union Budget context.

It keeps payment data synthetic, shows how every risk score is calculated, and links budget figures to the official source.

## Product boundaries

- Payment events are synthetic and use masked identifiers.
- Risk scoring is deterministic decision support, not a fraud verdict.
- Scenario requests are evaluated without application-level persistence.
- Budget figures are Budget Estimates, not actual expenditure or forecasts.
- Public-finance aggregates are sourced from the Government of India, Ministry of Finance, *Budget at a Glance 2026–27*.

Official source: <https://www.indiabudget.gov.in/doc/budget_at_glance/bag1.pdf>

## Features

- interactive server-side risk evaluator with contribution traces;
- searchable and filterable event API;
- masked synthetic payment-event trail;
- one-rupee receipt and expenditure maps;
- 2026–27 fiscal aggregates with primary-source links;
- responsive editorial interface with reduced-motion support;
- integration tests covering rendering and both APIs.

## Run locally

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Validate

```bash
npm run lint
npm test
```

## Risk API

`POST /api/risk`

```json
{
  "amount": 12500,
  "hour": 2,
  "deviceAgeDays": 1,
  "failedAttempts": 2,
  "newBeneficiary": true,
  "vpaMismatch": false,
  "locationVelocityKmH": 680
}
```

The response returns a score, recommended action, signal density, contribution trace, and explicit caveat.

## Event API

`GET /api/events?q=travel&status=held`

Supported status filters: `all`, `allowed`, `review`, and `held`.

## Before production use

Real payment processing would additionally require authentication and authorisation, encryption and retention controls, rate limiting, audit trails, monitoring, representative model or rule validation, false-positive analysis, human escalation, and legal/domain review.

## License

MIT © 2026 Deepu
