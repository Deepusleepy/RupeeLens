# RupeeLens

Transactions, security operations, and public finance in one analytical workspace.

RupeeLens is a full-stack analytical workspace for:

- synthetic UPI transaction generation, prediction, exploration, and model diagnostics;
- five-family security-log generation, upload, anomaly detection, and reporting; and
- historical and current India Union Budget analysis, comparison, forecasting, querying, and export.

It keeps payment data synthetic, shows how every risk score is calculated, and links budget figures to the official source.

## Product boundaries

- Payment events are synthetic and use masked identifiers.
- Risk scoring is deterministic decision support, not a fraud verdict.
- Scenario requests are evaluated without application-level persistence.
- Budget figures are Budget Estimates, not actual expenditure or forecasts.
- Public-finance aggregates are sourced from the Government of India, Ministry of Finance, *Budget at a Glance 2026–27*.

Official source: <https://www.indiabudget.gov.in/doc/budget_at_glance/bag1.pdf>

## Features

- configurable transaction generator supporting up to 50,000 rows;
- dual-model-style prediction, explanations, presets, history, and batch CSV scoring;
- multi-filter transaction explorer with visual breakdowns and export;
- accuracy, precision, recall, F1, ROC/AUC, confusion matrix, and feature-importance views;
- five security-log families with independent uploads, drill-downs, anomaly thresholds, heatmap, and reports;
- historical ministry allocation dashboard covering FY2014–15 to FY2024–25;
- ministry drill-down, outlier control, event notes, YoY heatmap, and budget-share views;
- linear and polynomial forecasts with model comparison and approximate confidence bands;
- multi-ministry absolute, indexed, YoY, and budget-share comparisons;
- Smart Query plus raw, summary, pivot, spreadsheet, and cleaned-data exports;
- 2026–27 fiscal source links;
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
