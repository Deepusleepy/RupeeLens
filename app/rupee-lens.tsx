"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Code2,
  Database,
  ExternalLink,
  FileSearch,
  Fingerprint,
  Gauge,
  Landmark,
  Menu,
  Radar,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { BUDGET_SOURCE_URL, budgetSummary, rupeeComesFrom, rupeeGoesTo, type PaymentEvent } from "../lib/data";

type View = "overview" | "risk" | "events" | "budget" | "method";
type RiskResult = {
  score: number;
  decision: "allow" | "review" | "hold";
  confidence: string;
  contributions: { signal: string; points: number; detail: string }[];
  caveat: string;
};

const views: { id: View; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "risk", label: "Risk analysis" },
  { id: "events", label: "Payment events" },
  { id: "budget", label: "Union Budget" },
  { id: "method", label: "Methodology" },
];

function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
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
          <p>Test a UPI transaction against a documented rule set, search a masked payment log, and examine the 2026–27 Union Budget from its primary source.</p>
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
        <div><span>Payment events</span><b>Synthetic, masked</b></div>
        <div><span>Budget figures</span><b>BE 2026–27</b></div>
        <div><span>Risk model</span><b>Seven documented rules</b></div>
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
        <ul><li><Check size={15} /><span>Test a transaction against seven documented scoring rules.</span></li><li><Check size={15} /><span>Filter eight masked sample events by decision or signal.</span></li><li><Check size={15} /><span>Compare official Budget Estimates as paise per rupee.</span></li></ul>
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
  const [newBeneficiary, setNewBeneficiary] = useState(true);
  const [mismatch, setMismatch] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function score(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/risk", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ amount: Number(amount), hour: Number(hour), deviceAgeDays: Number(deviceAge), failedAttempts: Number(attempts), locationVelocityKmH: Number(velocity), newBeneficiary, vpaMismatch: mismatch }) });
      const payload = await response.json() as RiskResult & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Evaluation failed");
      setResult(payload);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Evaluation failed"); }
    finally { setLoading(false); }
  }

  return <section className="view-page">
    <SectionHeader title="Risk analysis" copy="Enter a transaction scenario. RupeeLens applies the documented rules and returns the score, suggested action, and full breakdown." />
    <div className="studio-grid">
      <form className="scenario-panel" onSubmit={score}>
        <div className="panel-title"><div><p>Input</p><h2>Transaction details</h2></div><SlidersHorizontal size={21} /></div>
        <div className="input-grid">
          <label><span>Amount</span><div className="input-prefix">₹<input type="number" min="1" max="1000000" value={amount} onChange={(e) => setAmount(e.target.value)} /></div></label>
          <label><span>Hour of day</span><input type="number" min="0" max="23" value={hour} onChange={(e) => setHour(e.target.value)} /></label>
          <label><span>Device age</span><div className="input-suffix"><input type="number" min="0" max="3650" value={deviceAge} onChange={(e) => setDeviceAge(e.target.value)} /><i>days</i></div></label>
          <label><span>Failed attempts</span><input type="number" min="0" max="20" value={attempts} onChange={(e) => setAttempts(e.target.value)} /></label>
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

  return <section className="view-page">
    <SectionHeader title="Payment events" copy="Search the masked sample data by event ID, VPA, city, or signal, then filter it by decision." />
    <div className="event-toolbar"><label className="event-search"><Search size={17} /><input aria-label="Search payment events" placeholder="Search event ID, masked VPA, city, or signal" value={query} onChange={(e) => setQuery(e.target.value)} /></label><label className="status-filter"><select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All decisions</option><option value="held">Held</option><option value="review">Review</option><option value="allowed">Allowed</option></select><ChevronDown size={15} /></label><span className="event-count">{loading ? "…" : events.length} EVENTS</span></div>
    <div className="event-layout">
      <div className="event-table-wrap"><table className="event-table"><thead><tr><th>Event</th><th>Time</th><th>Masked VPA</th><th>Amount</th><th>Signals</th><th>Risk</th><th>Decision</th></tr></thead><tbody>{events.map((event) => <tr key={event.id}><td><b className="event-id">{event.id}</b><small>{event.city} · {event.type}</small></td><td className="mono">{new Date(event.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</td><td>{event.maskedVpa}</td><td>{formatInr(event.amount)}</td><td><div className="signal-tags">{event.signals.map((signal) => <span key={signal}>{signal}</span>)}</div></td><td><strong className={`risk-number risk-${event.score >= 75 ? "high" : event.score >= 45 ? "medium" : "low"}`}>{event.score}</strong></td><td><span className={`decision-pill ${event.status}`}>{event.status}</span></td></tr>)}</tbody></table>{!loading && !events.length && <div className="empty-events"><FileSearch size={32} /><p>No synthetic events match those filters.</p></div>}</div>
      <aside className="event-brief"><p>About this dataset</p><h2>Synthetic sample</h2><dl><div><dt>Records</dt><dd>8</dd></div><div><dt>Identity</dt><dd>Masked VPAs</dd></div><div><dt>Storage</dt><dd>Read-only</dd></div><div><dt>Freshness</dt><dd>Fixed snapshot</dd></div></dl><div className="brief-note"><span>These records are fabricated for demonstration. They do not represent live payments or real customers.</span></div></aside>
    </div>
  </section>;
}

function PublicMoney() {
  const [flow, setFlow] = useState<"to" | "from">("to");
  const data = flow === "to" ? rupeeGoesTo : rupeeComesFrom;
  const max = Math.max(...data.map((item) => item.paise));
  return <section className="view-page budget-page">
    <SectionHeader title="Union Budget 2026–27" copy="Explore selected Budget Estimates and the Government of India’s breakdown of where each rupee comes from and goes." />
    <div className="source-banner"><div><Landmark size={19} /><p><b>Source</b><span>Government of India · Ministry of Finance · Budget at a Glance 2026–27</span></p></div><a href={BUDGET_SOURCE_URL} target="_blank" rel="noreferrer">Open PDF <ExternalLink size={14} /></a></div>
    <div className="budget-metrics">{budgetSummary.map((metric) => <article key={metric.label}><p>{metric.label}</p><strong>{metric.unit.startsWith("₹") ? "₹" : ""}{metric.value.toFixed(metric.value < 10 ? 1 : 2)}</strong><span>{metric.unit.replace("₹ ", "")} · {metric.note}</span></article>)}</div>
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
    <div className="rulebook"><div className="panel-title"><div><p>Scoring rules</p><h2>Point contributions</h2></div><Radar size={21} /></div>{[["New device under 3 days", "+24", "Less behavioural history is available."],["Location above 500 km/h", "+28", "The observed change exceeds plausible travel."],["Identity mismatch", "+22", "VPA and account identity fields disagree."],["Amount above ₹25,000", "+18", "Payment value increases review priority."],["Two or more failures", "+16", "Repeated attempts preceded the payment."],["New beneficiary", "+13", "No prior payment relationship is present."]].map(([rule, points, detail]) => <div className="rule-row" key={rule}><b>{rule}</b><strong>{points}</strong><p>{detail}</p></div>)}</div>
    <div className="release-boundary"><h2>Before real-world use</h2><div><span>Authenticate users and authorise actions</span><span>Encrypt and minimise retained data</span><span>Validate rules on representative data</span><span>Measure false-positive impact</span><span>Add audit trails and human escalation</span><span>Complete legal and domain review</span></div></div>
  </section>;
}

export function RupeeLens() {
  const [active, setActive] = useState<View>("overview");
  const content = useMemo(() => {
    if (active === "risk") return <RiskStudio />;
    if (active === "events") return <EventTrail />;
    if (active === "budget") return <PublicMoney />;
    if (active === "method") return <Method />;
    return <Overview navigate={setActive} />;
  }, [active]);
  return <Shell active={active} setActive={setActive}>{content}</Shell>;
}
