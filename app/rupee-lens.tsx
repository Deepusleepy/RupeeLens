"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Code2,
  Database,
  ExternalLink,
  Eye,
  FileSearch,
  Fingerprint,
  Gauge,
  Landmark,
  Menu,
  Radar,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
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

const views: { id: View; label: string; short: string; icon: typeof Eye }[] = [
  { id: "overview", label: "Overview", short: "01", icon: Eye },
  { id: "risk", label: "Risk studio", short: "02", icon: ShieldCheck },
  { id: "events", label: "Event trail", short: "03", icon: FileSearch },
  { id: "budget", label: "Public money", short: "04", icon: Landmark },
  { id: "method", label: "Method", short: "05", icon: BookOpen },
];

function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function Wordmark() {
  return <div className="wordmark"><span className="lens-mark"><i>₹</i></span><div><strong>RupeeLens</strong><small>FINANCIAL SIGNALS, IN FOCUS</small></div></div>;
}

function Shell({ active, setActive, children }: { active: View; setActive: (view: View) => void; children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-shell">
      <header className="masthead">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {views.map((view) => <button key={view.id} className={active === view.id ? "active" : ""} onClick={() => setActive(view.id)}><span>{view.short}</span>{view.label}</button>)}
        </nav>
        <div className="mast-actions"><span className="privacy-stamp"><ShieldCheck size={14} /> No real payment data</span><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={20} /></button></div>
      </header>
      {menuOpen && <div className="mobile-nav"><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={22} /></button><Wordmark /><nav>{views.map((view) => <button key={view.id} onClick={() => { setActive(view.id); setMenuOpen(false); }}><span>{view.short}</span>{view.label}</button>)}</nav></div>}
      <main>{children}</main>
      <footer className="site-footer"><Wordmark /><p>Built as an explainable portfolio lab. Synthetic payment events; official budget aggregates.</p><a href="https://github.com/Deepusleepy" target="_blank" rel="noreferrer"><Code2 size={15} /> Deepusleepy <ExternalLink size={12} /></a></footer>
    </div>
  );
}

function SectionHeader({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy: string }) {
  return <header className="section-header"><div className="section-index">{index}</div><div><p>{eyebrow}</p><h1>{title}</h1><span>{copy}</span></div></header>;
}

function Overview({ navigate }: { navigate: (view: View) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="overline"><span /> ONE LENS. EVERY MONEY TRAIL.</p>
          <h1>Follow the money.<br /><em>See the reason.</em></h1>
          <p>RupeeLens joins explainable UPI risk signals, searchable payment events, and sourced Union Budget context in one rigorous analytical workspace.</p>
          <div className="hero-actions"><button className="primary" onClick={() => navigate("risk")}>Open risk studio <ArrowRight size={17} /></button><button className="secondary" onClick={() => navigate("budget")}>Explore public money</button></div>
          <div className="trust-row"><span><Check size={13} /> Explainable scoring</span><span><Check size={13} /> Masked identifiers</span><span><Check size={13} /> Official budget source</span></div>
        </div>
        <div className="hero-lens" aria-label="RupeeLens analytical lens illustration">
          <div className="lens-grid" />
          <div className="lens-orbit orbit-a"><i /></div><div className="lens-orbit orbit-b"><i /></div>
          <div className="lens-core"><span>₹</span><small>IN FOCUS</small></div>
          <div className="lens-callout callout-a"><b>86</b><span>RISK SIGNAL</span></div>
          <div className="lens-callout callout-b"><b>₹53.47L CR</b><span>2026–27 OUTLAY</span></div>
          <div className="lens-callout callout-c"><b>100%</b><span>REASONS VISIBLE</span></div>
        </div>
      </section>

      <section className="brief-strip">
        <div><span>LIVE WORKSPACE</span><strong>Three old experiments, rebuilt as one coherent product.</strong></div>
        <p>Payment risk · Event investigation · Public finance</p>
      </section>

      <section className="overview-columns">
        <article className="feature-story risk-story">
          <div className="story-number">A</div>
          <p className="kicker">PAYMENT INTELLIGENCE</p>
          <h2>A score that shows its work.</h2>
          <p>Compose a payment scenario, send it through a validated server-side rules engine, and inspect every contribution behind the recommendation.</p>
          <div className="mini-score"><div><strong>74</strong><span>REVIEW</span></div><ul><li><i className="rust" /> New device <b>+24</b></li><li><i className="gold" /> Impossible travel <b>+28</b></li><li><i className="green" /> New beneficiary <b>+13</b></li></ul></div>
          <button className="story-link" onClick={() => navigate("risk")}>Test a scenario <ArrowRight size={15} /></button>
        </article>
        <article className="feature-story budget-story">
          <div className="story-number">B</div>
          <p className="kicker">PUBLIC MONEY</p>
          <h2>The Union Budget, without prediction theatre.</h2>
          <p>Read the 2026–27 Budget Estimates as reported—units, definitions, and primary source intact. No polynomial forecast pretending to know the future.</p>
          <div className="budget-spotlight"><strong>₹53.47</strong><span>LAKH CRORE<br />TOTAL EXPENDITURE</span><i>BE 2026–27</i></div>
          <button className="story-link" onClick={() => navigate("budget")}>Trace every rupee <ArrowRight size={15} /></button>
        </article>
      </section>

      <section className="principles">
        <div><p className="kicker">THE RULE OF THE LENS</p><h2>Clarity before confidence.</h2></div>
        <div className="principle-grid"><article><span>01</span><h3>Visible inputs</h3><p>Every scenario field, event filter, and budget unit stays inspectable.</p></article><article><span>02</span><h3>Visible reasons</h3><p>A recommendation is accompanied by the exact signals that produced it.</p></article><article><span>03</span><h3>Visible limits</h3><p>Synthetic data, source dates, and non-production caveats are never buried.</p></article></div>
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
    <SectionHeader index="02" eyebrow="EXPLAINABLE PAYMENT RISK" title="Risk studio" copy="Change the facts. Inspect the recommendation. Challenge every contribution." />
    <div className="studio-grid">
      <form className="scenario-panel" onSubmit={score}>
        <div className="panel-title"><div><p>SCENARIO COMPOSER</p><h2>Transaction facts</h2></div><SlidersHorizontal size={21} /></div>
        <div className="input-grid">
          <label><span>Amount</span><div className="input-prefix">₹<input type="number" min="1" max="1000000" value={amount} onChange={(e) => setAmount(e.target.value)} /></div></label>
          <label><span>Hour of day</span><input type="number" min="0" max="23" value={hour} onChange={(e) => setHour(e.target.value)} /></label>
          <label><span>Device age</span><div className="input-suffix"><input type="number" min="0" max="3650" value={deviceAge} onChange={(e) => setDeviceAge(e.target.value)} /><i>days</i></div></label>
          <label><span>Failed attempts</span><input type="number" min="0" max="20" value={attempts} onChange={(e) => setAttempts(e.target.value)} /></label>
          <label className="wide"><span>Travel velocity since previous event</span><div className="input-suffix"><input type="number" min="0" max="2000" value={velocity} onChange={(e) => setVelocity(e.target.value)} /><i>km/h</i></div></label>
        </div>
        <div className="switches"><label><div><b>New beneficiary</b><small>No established payment relationship</small></div><input type="checkbox" checked={newBeneficiary} onChange={(e) => setNewBeneficiary(e.target.checked)} /></label><label><div><b>VPA identity mismatch</b><small>Payment identifiers disagree</small></div><input type="checkbox" checked={mismatch} onChange={(e) => setMismatch(e.target.checked)} /></label></div>
        <button className="evaluate" disabled={loading}>{loading ? "Tracing signals…" : "Trace this payment"}<Sparkles size={17} /></button>
        {error && <p className="form-error"><CircleAlert size={14} /> {error}</p>}
      </form>

      <article className="result-panel">
        <div className="panel-title"><div><p>DECISION TRACE</p><h2>{result ? "Evaluation complete" : "Awaiting scenario"}</h2></div><Fingerprint size={21} /></div>
        {result ? <>
          <div className={`score-lens ${result.decision}`}><div className="score-ring"><strong>{result.score}</strong><span>/ 100</span></div><div className="decision-label"><small>RECOMMENDED ACTION</small><b>{result.decision}</b><span>{result.confidence}</span></div></div>
          <div className="contribution-list"><p>CONTRIBUTION TRACE</p>{result.contributions.map((item) => <div key={item.signal}><span className="contribution-icon"><Radar size={15} /></span><div><b>{item.signal}</b><small>{item.detail}</small></div><strong>+{item.points}</strong></div>)}</div>
          <div className="decision-caveat"><CircleAlert size={16} /><span>{result.caveat}</span></div>
        </> : <div className="result-empty"><div className="empty-lens"><Radar size={42} /></div><h3>No opaque verdicts.</h3><p>Your result will show a score, recommended action, and every rule contribution—not just a red or green light.</p></div>}
      </article>
    </div>
    <div className="risk-footer"><div><ShieldCheck size={19} /><p><b>Safety boundary</b><span>This demonstration routes attention; it does not determine whether a person committed fraud.</span></p></div><div><Database size={19} /><p><b>Data boundary</b><span>The scenario stays in this request and is not stored by the application.</span></p></div></div>
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
    <SectionHeader index="03" eyebrow="SYNTHETIC EVENT INVESTIGATION" title="Event trail" copy="Search a privacy-safe event stream and follow the signals behind each review decision." />
    <div className="event-toolbar"><label className="event-search"><Search size={17} /><input aria-label="Search payment events" placeholder="Search event ID, masked VPA, city, or signal" value={query} onChange={(e) => setQuery(e.target.value)} /></label><label className="status-filter"><select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All decisions</option><option value="held">Held</option><option value="review">Review</option><option value="allowed">Allowed</option></select><ChevronDown size={15} /></label><span className="event-count">{loading ? "…" : events.length} EVENTS</span></div>
    <div className="event-layout">
      <div className="event-table-wrap"><table className="event-table"><thead><tr><th>Event</th><th>Time</th><th>Masked VPA</th><th>Amount</th><th>Signals</th><th>Risk</th><th>Decision</th></tr></thead><tbody>{events.map((event) => <tr key={event.id}><td><b className="event-id">{event.id}</b><small>{event.city} · {event.type}</small></td><td className="mono">{new Date(event.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</td><td>{event.maskedVpa}</td><td>{formatInr(event.amount)}</td><td><div className="signal-tags">{event.signals.map((signal) => <span key={signal}>{signal}</span>)}</div></td><td><strong className={`risk-number risk-${event.score >= 75 ? "high" : event.score >= 45 ? "medium" : "low"}`}>{event.score}</strong></td><td><span className={`decision-pill ${event.status}`}>{event.status}</span></td></tr>)}</tbody></table>{!loading && !events.length && <div className="empty-events"><FileSearch size={32} /><p>No synthetic events match those filters.</p></div>}</div>
      <aside className="event-brief"><p>DATA CARD / DEMO</p><h2>What you are looking at</h2><dl><div><dt>Records</dt><dd>8 synthetic</dd></div><div><dt>Identity</dt><dd>Masked VPAs</dd></div><div><dt>Storage</dt><dd>Read-only seed</dd></div><div><dt>Freshness</dt><dd>Fixed snapshot</dd></div></dl><div className="brief-note"><CircleCheck size={17} /><span>No claim of “live monitoring.” The earlier project simulated real time; this one states exactly what the data is.</span></div></aside>
    </div>
  </section>;
}

function PublicMoney() {
  const [flow, setFlow] = useState<"to" | "from">("to");
  const data = flow === "to" ? rupeeGoesTo : rupeeComesFrom;
  const max = Math.max(...data.map((item) => item.paise));
  return <section className="view-page budget-page">
    <SectionHeader index="04" eyebrow="UNION BUDGET 2026–27" title="Public money" copy="The rupee, traced from official Budget Estimates—with its units, definitions, and primary document attached." />
    <div className="source-banner"><div><Landmark size={19} /><p><b>Primary source verified</b><span>Government of India · Ministry of Finance · Budget at a Glance 2026–27</span></p></div><a href={BUDGET_SOURCE_URL} target="_blank" rel="noreferrer">Open official PDF <ExternalLink size={14} /></a></div>
    <div className="budget-metrics">{budgetSummary.map((metric) => <article key={metric.label}><p>{metric.label}</p><strong>{metric.unit.startsWith("₹") ? "₹" : ""}{metric.value.toFixed(metric.value < 10 ? 1 : 2)}</strong><span>{metric.unit.replace("₹ ", "")} · {metric.note}</span></article>)}</div>
    <div className="money-grid">
      <article className="money-map"><div className="panel-title"><div><p>THE ONE-RUPEE MAP</p><h2>Where each rupee {flow === "to" ? "goes" : "comes from"}</h2></div><div className="segment-toggle"><button className={flow === "to" ? "active" : ""} onClick={() => setFlow("to")}>Goes to</button><button className={flow === "from" ? "active" : ""} onClick={() => setFlow("from")}>Comes from</button></div></div><div className="allocation-list">{data.map((item, index) => <div className="allocation-row" key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><p>{item.label}</p><div><i style={{ width: `${(item.paise / max) * 100}%` }} /></div><strong>{item.paise}p</strong></div>)}</div><p className="chart-note">Rounded paise per rupee of Union Budget receipts/expenditure. Individual items may not sum exactly due to rounding and the source’s netting conventions.</p></article>
      <aside className="fiscal-card"><p>FISCAL DEFICIT / BE 2026–27</p><div className="deficit-lens"><strong>4.3</strong><span>% OF GDP</span></div><div className="fiscal-scale"><i /><span>0%</span><span>6%</span></div><p>The fiscal deficit is the difference between total expenditure and total receipts excluding debt capital receipts. It reflects the Government&apos;s borrowing requirement.</p><dl><div><dt>Estimated GDP</dt><dd>₹393.00L Cr</dd></div><div><dt>Fiscal deficit</dt><dd>₹16.96L Cr</dd></div><div><dt>Primary deficit</dt><dd>0.7% GDP</dd></div></dl></aside>
    </div>
    <div className="method-note"><CircleAlert size={18} /><div><b>Reading note</b><p>BE means Budget Estimates, not actual spending. RupeeLens does not convert a short historical series into a confident forecast. Comparisons should account for inflation, revised estimates, classification changes, and actuals.</p></div></div>
  </section>;
}

function Method() {
  return <section className="view-page">
    <SectionHeader index="05" eyebrow="METHOD & LIMITS" title="How the lens works" copy="A credible analytical tool should make it easy to inspect not only its results, but its boundaries." />
    <div className="method-hero"><div><p className="kicker">THE PRODUCT PROMISE</p><h2>Nothing important hides behind a score.</h2></div><p>RupeeLens is designed as a portfolio-quality demonstration of responsible analytical UX. It shows how a better system can disclose data class, source, assumptions, rule contributions, and decision limits at the point of use.</p></div>
    <div className="method-cards"><article><span>01</span><ShieldCheck size={25} /><h3>Explainability</h3><p>Risk recommendations enumerate each deterministic contribution. No probability is presented without validation evidence.</p></article><article><span>02</span><Database size={25} /><h3>Provenance</h3><p>Payment events are marked synthetic. Budget aggregates link directly to the Ministry of Finance document.</p></article><article><span>03</span><Fingerprint size={25} /><h3>Privacy</h3><p>Identifiers are masked, scenario requests are not persisted, and the demo uses no genuine customer data.</p></article><article><span>04</span><Gauge size={25} /><h3>Decision scope</h3><p>The score prioritises review. It does not accuse a person, block money in production, or replace institutional checks.</p></article></div>
    <div className="rulebook"><div className="panel-title"><div><p>RULEBOOK / V1</p><h2>Current scoring contributions</h2></div><Radar size={21} /></div>{[["New device under 3 days", "+24", "Less behavioural history is available."],["Location above 500 km/h", "+28", "The observed change exceeds plausible travel."],["Identity mismatch", "+22", "VPA and account identity fields disagree."],["Amount above ₹25,000", "+18", "Payment value increases review priority."],["Two or more failures", "+16", "Repeated attempts preceded the payment."],["New beneficiary", "+13", "No prior payment relationship is present."]].map(([rule, points, detail]) => <div className="rule-row" key={rule}><b>{rule}</b><strong>{points}</strong><p>{detail}</p></div>)}</div>
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
