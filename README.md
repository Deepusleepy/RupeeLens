# RupeeLens

RupeeLens is a TypeScript dashboard for studying UPI transaction risk, security logs, and Indian Union Budget data in one place.

[Open the live app](https://deepusleepy.github.io/RupeeLens/)

## What it does

### Transaction analysis

- Generates synthetic UPI transactions with adjustable fraud rates
- Scores individual transactions with two transparent rule-based model styles
- Filters and exports transaction data
- Handles batch CSV scoring
- Shows model metrics, feature importance, a confusion matrix, and an ROC view

### Security log analysis

- Works with login, session, authentication, request, and service logs
- Accepts a separate CSV for each log family
- Detects brute-force attempts, credential retries, request floods, long sessions, and suspended services
- Includes anomaly queues, hourly trends, a day-by-hour heatmap, and downloadable reports

### Budget analysis

- Covers five ministries from FY2014-15 to FY2024-25
- Includes selected figures from the Union Budget 2026-27
- Compares allocations, shares, year-on-year changes, and ministry trends
- Provides linear and polynomial projections with approximate confidence bands
- Supports custom CSV files, simple text queries, and spreadsheet exports

## Data and limitations

The transaction and security records included with the project are synthetic. Uploaded files are processed in the browser and are not stored by the app.

The risk scores are deterministic examples for exploration. They are not trained banking models and should not be used to approve or block real payments.

Budget figures are estimates, not actual expenditure. The 2026-27 figures link back to the Government of India, Ministry of Finance source document: [Budget at a Glance](https://www.indiabudget.gov.in/doc/budget_at_glance/bag1.pdf).

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Plain CSS and Canvas charts

## Run locally

Node.js 22.13 or newer is required.

```bash
git clone https://github.com/Deepusleepy/RupeeLens.git
cd RupeeLens
npm install
npm run dev
```

The local app runs at <http://localhost:5173/RupeeLens/>.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm test
```

`npm test` builds the pages bundle and runs the HTML tests.

## Project status

This is a student project and an analytical prototype. Using it with real payment data would require authentication, access controls, encrypted storage, rate limiting, audit logs, monitoring, model validation, and a proper security review.

## License

MIT License. See [LICENSE](LICENSE).
