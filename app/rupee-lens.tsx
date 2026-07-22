"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileSearch,
  Fingerprint,
  Gauge,
  Landmark,
  LockKeyhole,
  Menu,
  Radar,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { BUDGET_SOURCE_URL, budgetHistory, budgetSummary, rupeeComesFrom, rupeeGoesTo, securityEvents, type PaymentEvent } from "../lib/data";

type View = "overview" | "risk" | "events" | "security" | "budget" | "method";
type RiskResult = {
  score: number;
  decision: "allow" | "review" | "hold";
  confidence: string;
  contributions: { signal: string; points: number; detail: string }[];
  caveat: string;
  evaluatedAt?: string;
};
type RiskHistory = { id: number; amount: number; score: number; decision: RiskResult["decision"]; time: string };
type BatchRiskRow = { row: number; amount: number; score?: number; decision?: RiskResult["decision"]; error?: string };

const views: { id: View; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "risk", label: "Risk analysis" },
  { id: "events", label: "Payment events" },
  { id: "security", label: "Security logs" },
  { id: "budget", label: "Union Budget" },
  { id: "method", label: "Methodology" },
];

function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function downloadText(filename: string, content: string, type = "text/csv") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function Wordmark() {
  return <div className="wordmark"><span className="lens-mark"><i>₹</i></span><div><strong>RupeeLens</strong><small>Payment risk and public finance</small></div></div>;
}

function Shell({ active, setActive, children }: { active: View; setActive: (view: View) => void; children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-shell">
      <header className="masthead">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {views.map((view) => <button key={view.id} className={active === view.id ? "active" : ""} onClick={() => setActive(view.id)}>{view.label}</button>)}
        </nav>
        <div className="mast-actions"><span className="privacy-stamp"><ShieldCheck size={14} /> Synthetic payment data</span><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={20} /></button></div>
      </header>
      {menuOpen && <div className="mobile-nav"><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={22} /></button><Wordmark /><nav>{views.map((view) => <button key={view.id} onClick={() => { setActive(view.id); setMenuOpen(false); }}>{view.label}</button>)}</nav></div>}
      <main>{children}</main>
      <footer className="site-footer"><Wordmark /><p>Synthetic payment events · Union Budget Estimates 2026–27</p><a href="https://github.com/Deepusleepy" target="_blank" rel="noreferrer"><Code2 size={15} /> Deepusleepy <ExternalLink size={12} /></a></footer>
    </div>
  );
}

function SectionHeader({ title, copy }: { title: string; copy: string }) {
  return <header className="section-header"><h1>{title}</h1><p>{copy}</p></header>;
}

function Overview({ navigate }: { navigate: (view: View) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>Look closer at how money moves.</h1>
          <p>Evaluate UPI transaction scenarios, investigate payment and security events, and compare a decade of Union Budget allocations.</p>
          <div className="hero-actions"><button className="primary" onClick={() => navigate("risk")}>Test a transaction <ArrowRight size={17} /></button><button className="secondary" onClick={() => navigate("budget")}>View the Union Budget</button></div>
          <div className="trust-row"><span><Check size={13} /> Rules shown</span><span><Check size={13} /> Identifiers masked</span><span><Check size={13} /> Figures source-linked</span></div>
        </div>
        <div className="hero-preview" aria-label="Example transaction analysis">
          <div className="preview-head"><div><span>Example transaction</span><b>RL-91F2</b></div><span className="decision-pill held">Hold</span></div>
          <div className="preview-amount"><strong>₹24,999</strong><span>P2P · Bengaluru · 14:42</span></div>
          <div className="preview-score"><div><span>Risk score</span><strong>86 / 100</strong></div><i><b /></i></div>
          <dl className="preview-details"><div><dt>New device</dt><dd>+24</dd></div><div><dt>Location velocity</dt><dd>+28</dd></div><div><dt>New beneficiary</dt><dd>+13</dd></div></dl>
          <p>Synthetic example · No customer data</p>
        </div>
      </section>

      <section className="data-status">
        <div><span>Payment operations</span><b>Risk, events, security logs</b></div>
        <div><span>Budget coverage</span><b>2014–25 + BE 2026–27</b></div>
        <div><span>Data handling</span><b>Synthetic and masked</b></div>
      </section>

      <section className="overview-columns">
        <article className="feature-story risk-story">
          <p className="feature-label">Payment risk</p>
          <h2>Review a transaction</h2>
          <p>Enter the transaction amount, time, device age, recent failures, beneficiary status, and location change. The result lists every rule that affected the score.</p>
          <div className="mini-score"><div><strong>74</strong><span>REVIEW</span></div><ul><li><i className="rust" /> New device <b>+24</b></li><li><i className="gold" /> Impossible travel <b>+28</b></li><li><i className="green" /> New beneficiary <b>+13</b></li></ul></div>
          <button className="story-link" onClick={() => navigate("risk")}>Open transaction form <ArrowRight size={15} /></button>
        </article>
        <article className="feature-story budget-story">
          <p className="feature-label">Public finance</p>
          <h2>Read the 2026–27 Union Budget</h2>
          <p>Compare Budget Estimates for receipts, expenditure, transfers, and the fiscal deficit. Every figure links back to the Ministry of Finance document.</p>
          <div className="budget-spotlight"><strong>₹53.47</strong><span>LAKH CRORE<br />TOTAL EXPENDITURE</span><i>BE 2026–27</i></div>
          <button className="story-link" onClick={() => navigate("budget")}>Open budget data <ArrowRight size={15} /></button>
        </article>
      </section>

      <section className="use-cases">
        <h2>What you can do</h2>
        <ul><li><Check size={15} /><span>Run transaction scenarios, load presets, and retain a downloadable review history.</span></li><li><Check size={15} /><span>Filter payment events and investigate login, session, authentication, request, and service anomalies.</span></li><li><Check size={15} /><span>Compare ministry allocations from 2014–25 and inspect official 2026–27 Budget Estimates.</span></li></ul>
      </section>
    </>
  );
}

function RiskStudio() {
  const [amount, setAmount] = useState("12500");
  const [hour, setHour] = useState("2");
  const [deviceAge, setDeviceAge] = useState("1");
  const [attempts, setAttempts] = useState("2");
  const [velocity, setVelocity] = useState("680");
  const [location, setLocation] = useState("Bengaluru");
  const [transactionType, setTransactionType] = useState("P2P");
  const [senderBank, setSenderBank] = useState("SBI");
  const [receiverBank, setReceiverBank] = useState("HDFC");
  const [newBeneficiary, setNewBeneficiary] = useState(true);
  const [mismatch, setMismatch] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<RiskHistory[]>([]);
  const [batchRows, setBatchRows] = useState<BatchRiskRow[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);

  function applyPreset(preset: "routine" | "review" | "hold") {
    const values = preset === "routine" ? ["850", "13", "420", "0", "8", false, false] : preset === "review" ? ["14500", "23", "8", "1", "240", true, false] : ["68000", "2", "0", "4", "820", true, true];
    setAmount(values[0] as string); setHour(values[1] as string); setDeviceAge(values[2] as string); setAttempts(values[3] as string); setVelocity(values[4] as string); setNewBeneficiary(values[5] as boolean); setMismatch(values[6] as boolean); setResult(null);
  }

  async function score(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/risk", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ amount: Number(amount), hour: Number(hour), deviceAgeDays: Number(deviceAge), failedAttempts: Number(attempts), locationVelocityKmH: Number(velocity), location, transactionType, senderBank, receiverBank, newBeneficiary, vpaMismatch: mismatch }) });
      const payload = await response.json() as RiskResult & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Evaluation failed");
      setResult(payload);
      setHistory((current) => [{ id: Date.now(), amount: Number(amount), score: payload.score, decision: payload.decision, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }, ...current].slice(0, 8));
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Evaluation failed"); }
    finally { setLoading(false); }
  }

  async function analyseCsv(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBatchLoading(true);
    try {
      const lines = (await file.text()).trim().split(/\r?\n/);
      const headers = lines.shift()?.split(",").map((item) => item.trim()) ?? [];
      const required = ["amount", "hour", "deviceAgeDays", "failedAttempts", "locationVelocityKmH", "newBeneficiary", "vpaMismatch"];
      if (required.some((field) => !headers.includes(field))) throw new Error(`CSV must include: ${required.join(", ")}`);
      const records = lines.slice(0, 100).filter(Boolean).map((line, index) => {
        const values = line.split(",").map((item) => item.trim());
        const value = (name: string) => values[headers.indexOf(name)];
        return { row: index + 2, scenario: { amount: Number(value("amount")), hour: Number(value("hour")), deviceAgeDays: Number(value("deviceAgeDays")), failedAttempts: Number(value("failedAttempts")), locationVelocityKmH: Number(value("locationVelocityKmH")), newBeneficiary: value("newBeneficiary").toLowerCase() === "true", vpaMismatch: value("vpaMismatch").toLowerCase() === "true" } };
      });
      const output = await Promise.all(records.map(async ({ row, scenario }) => {
        const response = await fetch("/api/risk", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(scenario) });
        const payload = await response.json() as RiskResult & { error?: string };
        return response.ok ? { row, amount: scenario.amount, score: payload.score, decision: payload.decision } : { row, amount: scenario.amount, error: payload.error ?? "Invalid row" };
      }));
      setBatchRows(output);
    } catch (caught) {
      setBatchRows([{ row: 0, amount: 0, error: caught instanceof Error ? caught.message : "Could not read CSV" }]);
    } finally { setBatchLoading(false); event.target.value = ""; }
  }

  return <section className="view-page">
    <SectionHeader title="Risk analysis" copy="Enter a transaction scenario. RupeeLens applies the documented rules and returns the score, suggested action, and full breakdown." />
    <div className="preset-bar"><span>Load example</span><button onClick={() => applyPreset("routine")}>Routine payment</button><button onClick={() => applyPreset("review")}>Needs review</button><button onClick={() => applyPreset("hold")}>High risk</button></div>
    <div className="studio-grid">
      <form className="scenario-panel" onSubmit={score}>
        <div className="panel-title"><div><p>Input</p><h2>Transaction details</h2></div><SlidersHorizontal size={21} /></div>
        <div className="input-grid">
          <label><span>Amount</span><div className="input-prefix">₹<input type="number" min="1" max="1000000" value={amount} onChange={(e) => setAmount(e.target.value)} /></div></label>
          <label><span>Hour of day</span><input type="number" min="0" max="23" value={hour} onChange={(e) => setHour(e.target.value)} /></label>
          <label><span>Device age</span><div className="input-suffix"><input type="number" min="0" max="3650" value={deviceAge} onChange={(e) => setDeviceAge(e.target.value)} /><i>days</i></div></label>
          <label><span>Failed attempts</span><input type="number" min="0" max="20" value={attempts} onChange={(e) => setAttempts(e.target.value)} /></label>
          <label><span>Location</span><select value={location} onChange={(e) => setLocation(e.target.value)}>{["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Kolkata", "Pune", "Unknown", "Foreign"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Payment type</span><select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>{["P2P", "P2M", "Bill payment", "Recharge", "Online shopping"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Sender bank</span><select value={senderBank} onChange={(e) => setSenderBank(e.target.value)}>{["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "BOB"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Receiver bank</span><select value={receiverBank} onChange={(e) => setReceiverBank(e.target.value)}>{["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "BOB"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="wide"><span>Travel velocity since previous event</span><div className="input-suffix"><input type="number" min="0" max="2000" value={velocity} onChange={(e) => setVelocity(e.target.value)} /><i>km/h</i></div></label>
        </div>
        <div className="switches"><label><div><b>New beneficiary</b><small>No established payment relationship</small></div><input type="checkbox" checked={newBeneficiary} onChange={(e) => setNewBeneficiary(e.target.checked)} /></label><label><div><b>VPA identity mismatch</b><small>Payment identifiers disagree</small></div><input type="checkbox" checked={mismatch} onChange={(e) => setMismatch(e.target.checked)} /></label></div>
        <button className="evaluate" disabled={loading}>{loading ? "Evaluating…" : "Evaluate transaction"}<ArrowRight size={17} /></button>
        {error && <p className="form-error"><CircleAlert size={14} /> {error}</p>}
      </form>

      <article className="result-panel">
        <div className="panel-title"><div><p>Result</p><h2>{result ? "Transaction score" : "No result yet"}</h2></div><Fingerprint size={21} /></div>
        {result ? <>
          <div className={`score-lens ${result.decision}`}><div className="score-ring"><strong>{result.score}</strong><span>/ 100</span></div><div className="decision-label"><small>RECOMMENDED ACTION</small><b>{result.decision}</b><span>{result.confidence}</span></div></div>
          <div className="contribution-list"><p>Score breakdown</p>{result.contributions.map((item) => <div key={item.signal}><span className="contribution-icon"><Radar size={15} /></span><div><b>{item.signal}</b><small>{item.detail}</small></div><strong>+{item.points}</strong></div>)}</div>
          <div className="decision-caveat"><CircleAlert size={16} /><span>{result.caveat}</span></div>
        </> : <div className="result-empty"><ShieldCheck size={38} /><h3>Enter a scenario to begin</h3><p>The result will include a score, a suggested action, and the rules that contributed to it.</p></div>}
      </article>
    </div>
    <div className="risk-footer"><div><ShieldCheck size={19} /><p><b>Scope</b><span>This score prioritises review. It is not a fraud determination.</span></p></div><div><Database size={19} /><p><b>Storage</b><span>The scenario is evaluated for this request and is not saved.</span></p></div></div>
    <section className="history-panel"><div className="panel-title"><div><p>This session</p><h2>Review history</h2></div>{history.length > 0 && <button className="text-action" onClick={() => downloadText("rupeelens-risk-history.csv", `amount,score,decision,time\n${history.map((row) => `${row.amount},${row.score},${row.decision},${row.time}`).join("\n")}`)}><Download size={14} /> Export CSV</button>}</div>{history.length ? <div className="history-rows">{history.map((row) => <div key={row.id}><span>{row.time}</span><b>{formatInr(row.amount)}</b><strong className={`risk-${row.score >= 75 ? "high" : row.score >= 45 ? "medium" : "low"}`}>{row.score}</strong><em>{row.decision}</em></div>)}</div> : <p className="quiet-empty">Evaluated scenarios will appear here until you leave or refresh the page.</p>}</section>
    <section className="batch-panel"><div className="panel-title"><div><p>Up to 100 rows</p><h2>Batch CSV analysis</h2></div><div className="batch-actions"><button className="text-action" onClick={() => downloadText("rupeelens-risk-template.csv", "amount,hour,deviceAgeDays,failedAttempts,locationVelocityKmH,newBeneficiary,vpaMismatch\n12500,2,1,2,680,true,false\n850,13,420,0,8,false,false")}><Download size={14} /> Template</button><label className="upload-button">{batchLoading ? "Analysing…" : "Choose CSV"}<input type="file" accept=".csv,text/csv" disabled={batchLoading} onChange={analyseCsv} /></label></div></div>{batchRows.length > 0 ? <div className="batch-table-wrap"><table className="event-table batch-table"><thead><tr><th>Row</th><th>Amount</th><th>Score</th><th>Decision</th><th>Issue</th></tr></thead><tbody>{batchRows.map((row) => <tr key={row.row}><td>{row.row || "—"}</td><td>{row.amount ? formatInr(row.amount) : "—"}</td><td>{row.score ?? "—"}</td><td>{row.decision ?? "—"}</td><td>{row.error ?? ""}</td></tr>)}</tbody></table></div> : <p className="quiet-empty">Use the template columns to analyse multiple transaction scenarios without uploading customer identifiers.</p>}</section>
  </section>;
}

function EventTrail() {
  const [events, setEvents] = useState<PaymentEvent[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/events?q=${encodeURIComponent(query)}&status=${encodeURIComponent(status)}`, { signal: controller.signal });
        const payload = await response.json() as { events: PaymentEvent[] };
        setEvents(payload.events ?? []);
      } finally { setLoading(false); }
    }, 160);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, status]);

  const totalValue = events.reduce((sum, event) => sum + event.amount, 0);
  const elevated = events.filter((event) => event.score >= 45).length;
  const averageScore = events.length ? Math.round(events.reduce((sum, event) => sum + event.score, 0) / events.length) : 0;
  const exportEvents = () => downloadText("rupeelens-payment-events.csv", `event_id,timestamp,masked_vpa,type,city,amount,score,decision,signals\n${events.map((event) => [event.id, event.timestamp, event.maskedVpa, event.type, event.city, event.amount, event.score, event.status, `"${event.signals.join("; ")}"`].join(",")).join("\n")}`);

  return <section className="view-page">
    <SectionHeader title="Payment events" copy="Search the masked sample data by event ID, VPA, city, or signal, then filter it by decision." />
    <div className="metric-strip"><div><span>Visible value</span><b>{formatInr(totalValue)}</b></div><div><span>Average score</span><b>{averageScore}</b></div><div><span>Review or hold</span><b>{elevated}</b></div><div><span>Matched records</span><b>{events.length}</b></div></div>
    <div className="event-toolbar"><label className="event-search"><Search size={17} /><input aria-label="Search payment events" placeholder="Search event ID, masked VPA, city, or signal" value={query} onChange={(e) => setQuery(e.target.value)} /></label><label className="status-filter"><select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All decisions</option><option value="held">Held</option><option value="review">Review</option><option value="allowed">Allowed</option></select><ChevronDown size={15} /></label><button className="export-button" disabled={!events.length} onClick={exportEvents}><Download size={14} /> Export</button></div>
    <div className="event-layout">
      <div className="event-table-wrap"><table className="event-table"><thead><tr><th>Event</th><th>Time</th><th>Masked VPA</th><th>Amount</th><th>Signals</th><th>Risk</th><th>Decision</th></tr></thead><tbody>{events.map((event) => <tr key={event.id}><td><b className="event-id">{event.id}</b><small>{event.city} · {event.type}</small></td><td className="mono">{new Date(event.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</td><td>{event.maskedVpa}</td><td>{formatInr(event.amount)}</td><td><div className="signal-tags">{event.signals.map((signal) => <span key={signal}>{signal}</span>)}</div></td><td><strong className={`risk-number risk-${event.score >= 75 ? "high" : event.score >= 45 ? "medium" : "low"}`}>{event.score}</strong></td><td><span className={`decision-pill ${event.status}`}>{event.status}</span></td></tr>)}</tbody></table>{!loading && !events.length && <div className="empty-events"><FileSearch size={32} /><p>No synthetic events match those filters.</p></div>}</div>
      <aside className="event-brief"><p>About this dataset</p><h2>Synthetic sample</h2><dl><div><dt>Records</dt><dd>8</dd></div><div><dt>Identity</dt><dd>Masked VPAs</dd></div><div><dt>Storage</dt><dd>Read-only</dd></div><div><dt>Freshness</dt><dd>Fixed snapshot</dd></div></dl><div className="brief-note"><span>These records are fabricated for demonstration. They do not represent live payments or real customers.</span></div></aside>
    </div>
  </section>;
}

function SecurityCenter() {
  const [category, setCategory] = useState("All");
  const [severity, setSeverity] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = securityEvents.filter((event) => {
    const matchesCategory = category === "All" || event.category === category;
    const matchesSeverity = severity === "all" || event.severity === severity;
    const searchable = `${event.id} ${event.source} ${event.subject} ${event.detail}`.toLowerCase();
    return matchesCategory && matchesSeverity && searchable.includes(query.toLowerCase());
  });
  const critical = securityEvents.filter((event) => event.severity === "critical").length;
  const warning = securityEvents.filter((event) => event.severity === "warning").length;
  const riskScore = Math.round((critical * 18 + warning * 7) / securityEvents.length * 4);
  const anomalies = [
    { title: "Brute-force pattern", detail: "One masked IP exceeded five failed logins.", severity: "critical" },
    { title: "Request flooding", detail: "Two endpoints crossed the burst threshold.", severity: "critical" },
    { title: "Abnormal sessions", detail: "One short and one long session need review.", severity: "warning" },
    { title: "Credential retries", detail: "One account exceeded ten rejected OTP attempts.", severity: "warning" },
  ];
  const exportLogs = () => downloadText("rupeelens-security-events.csv", `id,timestamp,category,severity,source,subject,detail\n${filtered.map((event) => [event.id, event.timestamp, event.category, event.severity, event.source, event.subject, `"${event.detail}"`].join(",")).join("\n")}`);

  return <section className="view-page">
    <SectionHeader title="Security logs" copy="Inspect synthetic login, session, authentication, request, and service activity through one anomaly queue." />
    <div className="security-summary"><article><span>Composite risk</span><strong>{riskScore}</strong><small>out of 100</small></article><article><span>Critical findings</span><strong>{critical}</strong><small>immediate review</small></article><article><span>Warnings</span><strong>{warning}</strong><small>investigate</small></article><article><span>Log families</span><strong>5</strong><small>normalised</small></article></div>
    <div className="anomaly-grid">{anomalies.map((item) => <article key={item.title} className={item.severity}><TriangleAlert size={18} /><div><b>{item.title}</b><p>{item.detail}</p></div></article>)}</div>
    <div className="security-workbench">
      <div className="security-tabs">{["All", "Login", "Session", "Authentication", "Request", "Service"].map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="event-toolbar"><label className="event-search"><Search size={17} /><input aria-label="Search security logs" placeholder="Search event, source, subject, or detail" value={query} onChange={(e) => setQuery(e.target.value)} /></label><label className="status-filter"><select aria-label="Filter by severity" value={severity} onChange={(e) => setSeverity(e.target.value)}><option value="all">All severities</option><option value="critical">Critical</option><option value="warning">Warning</option><option value="info">Informational</option></select><ChevronDown size={15} /></label><button className="export-button" disabled={!filtered.length} onClick={exportLogs}><Download size={14} /> Export</button></div>
      <div className="security-table-wrap"><table className="event-table security-table"><thead><tr><th>Event</th><th>Time</th><th>Category</th><th>Source</th><th>Subject</th><th>Finding</th><th>Severity</th></tr></thead><tbody>{filtered.map((event) => <tr key={event.id}><td><b className="event-id">{event.id}</b></td><td className="mono">{new Date(event.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</td><td>{event.category}</td><td className="mono">{event.source}</td><td className="mono">{event.subject}</td><td>{event.detail}</td><td><span className={`severity-pill ${event.severity}`}>{event.severity}</span></td></tr>)}</tbody></table>{!filtered.length && <div className="empty-events"><LockKeyhole size={30} /><p>No security events match those filters.</p></div>}</div>
    </div>
    <div className="method-note"><CircleAlert size={18} /><div><b>Dataset boundary</b><p>These logs are deterministic synthetic samples with masked identifiers. Thresholds demonstrate triage logic and are not production security controls.</p></div></div>
  </section>;
}

function PublicMoney() {
  const [flow, setFlow] = useState<"to" | "from">("to");
  const [ministry, setMinistry] = useState("Defence");
  const [historyMode, setHistoryMode] = useState<"amount" | "indexed" | "growth">("amount");
  const data = flow === "to" ? rupeeGoesTo : rupeeComesFrom;
  const max = Math.max(...data.map((item) => item.paise));
  const ministries = [...new Set(budgetHistory.map((item) => item.ministry))];
  const ministryHistory = budgetHistory.filter((item) => item.ministry === ministry);
  const baseValue = ministryHistory[0]?.total ?? 1;
  const historyValues = ministryHistory.map((item, index) => ({ ...item, display: historyMode === "indexed" ? item.total / baseValue * 100 : historyMode === "growth" ? (index ? (item.total / ministryHistory[index - 1].total - 1) * 100 : 0) : item.total }));
  const maxHistory = Math.max(...historyValues.map((item) => Math.abs(item.display)), 1);
  const first = ministryHistory[0]; const last = ministryHistory.at(-1);
  const cagr = first && last ? (Math.pow(last.total / first.total, 1 / (ministryHistory.length - 1)) - 1) * 100 : 0;
  const xs = ministryHistory.map((_, index) => index); const ys = ministryHistory.map((item) => item.total); const xMean = xs.reduce((a, b) => a + b, 0) / xs.length; const yMean = ys.reduce((a, b) => a + b, 0) / ys.length;
  const slope = xs.reduce((sum, x, i) => sum + (x - xMean) * (ys[i] - yMean), 0) / xs.reduce((sum, x) => sum + (x - xMean) ** 2, 0);
  const forecast = yMean + slope * (xs.length - xMean);
  const exportBudget = () => downloadText("rupeelens-ministry-history.csv", `ministry,year,total_crore\n${budgetHistory.map((item) => `${item.ministry},${item.year}-${String(item.year + 1).slice(-2)},${item.total}`).join("\n")}`);
  return <section className="view-page budget-page">
    <SectionHeader title="Union Budget" copy="Compare ministry allocations from 2014–25, inspect a directional forecast, and read the official 2026–27 Budget Estimates." />
    <div className="source-banner"><div><Landmark size={19} /><p><b>Source</b><span>Government of India · Ministry of Finance · Budget at a Glance 2026–27</span></p></div><a href={BUDGET_SOURCE_URL} target="_blank" rel="noreferrer">Open PDF <ExternalLink size={14} /></a></div>
    <div className="budget-metrics">{budgetSummary.map((metric) => <article key={metric.label}><p>{metric.label}</p><strong>{metric.unit.startsWith("₹") ? "₹" : ""}{metric.value.toFixed(metric.value < 10 ? 1 : 2)}</strong><span>{metric.unit.replace("₹ ", "")} · {metric.note}</span></article>)}</div>
    <section className="budget-history-lab">
      <div className="lab-head"><div><p>Historical explorer</p><h2>Ministry allocations</h2></div><button className="text-action" onClick={exportBudget}><Download size={14} /> Export dataset</button></div>
      <div className="history-controls"><label><span>Ministry</span><select value={ministry} onChange={(event) => setMinistry(event.target.value)}>{ministries.map((item) => <option key={item}>{item}</option>)}</select></label><div><span>View</span><div className="segment-toggle">{(["amount", "indexed", "growth"] as const).map((mode) => <button key={mode} className={historyMode === mode ? "active" : ""} onClick={() => setHistoryMode(mode)}>{mode === "amount" ? "₹ crore" : mode === "indexed" ? "Index" : "YoY %"}</button>)}</div></div></div>
      <div className="history-insights"><div><span>2014–15</span><b>₹{(first?.total ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })} Cr</b></div><div><span>2024–25</span><b>₹{(last?.total ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })} Cr</b></div><div><span>Annualised change</span><b>{cagr.toFixed(1)}%</b></div><div><span>Linear 2025–26 indicator</span><b>₹{Math.max(0, forecast).toLocaleString("en-IN", { maximumFractionDigits: 0 })} Cr</b></div></div>
      <div className="history-chart">{historyValues.map((item) => <div key={item.year}><span>{item.year}–{String(item.year + 1).slice(-2)}</span><i><b style={{ width: `${Math.max(2, Math.abs(item.display) / maxHistory * 100)}%` }} /></i><strong>{historyMode === "amount" ? `₹${item.display.toLocaleString("en-IN", { maximumFractionDigits: 0 })}` : `${item.display.toFixed(1)}${historyMode === "growth" ? "%" : ""}`}</strong></div>)}</div>
      <p className="chart-note">Historical data covers five ministries and preserves the source dataset’s structural outliers. The linear indicator is directional, not a budget forecast.</p>
    </section>
    <div className="money-grid">
      <article className="money-map"><div className="panel-title"><div><p>Per rupee</p><h2>Where it {flow === "to" ? "goes" : "comes from"}</h2></div><div className="segment-toggle"><button className={flow === "to" ? "active" : ""} onClick={() => setFlow("to")}>Goes to</button><button className={flow === "from" ? "active" : ""} onClick={() => setFlow("from")}>Comes from</button></div></div><div className="allocation-list">{data.map((item) => <div className="allocation-row" key={item.label}><p>{item.label}</p><div><i style={{ width: `${(item.paise / max) * 100}%` }} /></div><strong>{item.paise}p</strong></div>)}</div><p className="chart-note">Rounded paise per rupee. Individual items may not sum exactly because the source rounds figures and nets some receipts.</p></article>
      <aside className="fiscal-card"><p>Fiscal deficit · BE 2026–27</p><div className="deficit-lens"><strong>4.3</strong><span>% of GDP</span></div><div className="fiscal-scale"><i /><span>0%</span><span>6%</span></div><p>The fiscal deficit is total expenditure minus total receipts, excluding debt capital receipts. It represents the Government&apos;s borrowing requirement.</p><dl><div><dt>Estimated GDP</dt><dd>₹393.00L Cr</dd></div><div><dt>Fiscal deficit</dt><dd>₹16.96L Cr</dd></div><div><dt>Primary deficit</dt><dd>0.7% GDP</dd></div></dl></aside>
    </div>
    <div className="method-note"><CircleAlert size={18} /><div><b>Reading note</b><p>BE means Budget Estimates, not actual spending. RupeeLens does not convert a short historical series into a confident forecast. Comparisons should account for inflation, revised estimates, classification changes, and actuals.</p></div></div>
  </section>;
}

function Method() {
  return <section className="view-page">
    <SectionHeader title="Methodology" copy="How the sample data, scoring rules, and budget figures are handled." />
    <div className="method-intro"><p>The payment score is a deterministic demonstration. It adds fixed points for the conditions below and suggests allow, review, or hold based on the total. It is not trained on customer data and is not a production fraud model.</p></div>
    <div className="method-cards"><article><ShieldCheck size={25} /><h3>Scoring</h3><p>Each result lists the rules that contributed to the score.</p></article><article><Database size={25} /><h3>Sources</h3><p>Events are synthetic. Budget figures link to the Ministry of Finance PDF.</p></article><article><Fingerprint size={25} /><h3>Privacy</h3><p>Sample VPAs are masked and submitted scenarios are not stored.</p></article><article><Gauge size={25} /><h3>Scope</h3><p>The score suggests a review action; it does not determine fraud.</p></article></div>
    <div className="rulebook"><div className="panel-title"><div><p>Scoring rules</p><h2>Point contributions</h2></div><Radar size={21} /></div>{[["New device under 3 days", "+24", "Less behavioural history is available."],["Location above 500 km/h", "+28", "The observed change exceeds plausible travel."],["Unknown or foreign origin", "+20", "The demonstration treats an untrusted origin as a review signal."],["Identity mismatch", "+22", "VPA and account identity fields disagree."],["Amount above ₹25,000", "+18", "Payment value increases review priority."],["Two or more failures", "+16", "Repeated attempts preceded the payment."],["New beneficiary", "+13", "No prior payment relationship is present."]].map(([rule, points, detail]) => <div className="rule-row" key={rule}><b>{rule}</b><strong>{points}</strong><p>{detail}</p></div>)}</div>
    <div className="release-boundary"><h2>Before real-world use</h2><div><span>Authenticate users and authorise actions</span><span>Encrypt and minimise retained data</span><span>Validate rules on representative data</span><span>Measure false-positive impact</span><span>Add audit trails and human escalation</span><span>Complete legal and domain review</span></div></div>
  </section>;
}

export function RupeeLens() {
  const [active, setActive] = useState<View>("overview");
  const content = useMemo(() => {
    if (active === "risk") return <RiskStudio />;
    if (active === "events") return <EventTrail />;
    if (active === "security") return <SecurityCenter />;
    if (active === "budget") return <PublicMoney />;
    if (active === "method") return <Method />;
    return <Overview navigate={setActive} />;
  }, [active]);
  return <Shell active={active} setActive={setActive}>{content}</Shell>;
}
