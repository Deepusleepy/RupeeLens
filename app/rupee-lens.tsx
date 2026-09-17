"use client";

import { ArrowRight, Check, Code2, ExternalLink, Gauge, Menu, Moon, ShieldCheck, Sun, X } from "lucide-react";
import { Component, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { BudgetWorkspace, PaymentWorkspace, SecurityWorkspace } from "./workspaces";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? <p className="lab-empty">Something went wrong rendering this workspace.</p> : this.props.children; }
}

type View = "overview" | "payments" | "security" | "budget" | "method";
const views: { id: View; label: string }[] = [
  { id: "overview", label: "Overview" }, { id: "payments", label: "Transactions" },
  { id: "security", label: "Security logs" }, { id: "budget", label: "Budget analytics" },
  { id: "method", label: "Methodology" },
];

function Wordmark() { return <div className="wordmark"><span className="lens-mark"><i>₹</i></span><div><strong>RupeeLens</strong><small>Payments, security, and public finance</small></div></div>; }

function Shell({ active, setActive, children }: { active: View; setActive: (view: View) => void; children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("rupeelens-theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rupeelens-theme", theme);
  }, [theme]);
  useEffect(() => {
    if (!menuOpen) { if (wasOpen.current) triggerRef.current?.focus(); return; }
    wasOpen.current = true;
    const firstFocusable = overlayRef.current?.querySelector("button");
    firstFocusable?.focus();
  }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  return <div className="site-shell"><a href="#main" className="skip-link">Skip to content</a><header className="masthead"><Wordmark /><nav className="desktop-nav" aria-label="Primary navigation">{views.map((view) => <button key={view.id} className={active === view.id ? "active" : ""} aria-current={active === view.id ? "page" : undefined} onClick={() => setActive(view.id)}>{view.label}</button>)}</nav><div className="mast-actions"><span className="privacy-stamp"><ShieldCheck size={14} /> Synthetic payment data</span><button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" aria-pressed={theme === "dark"}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button><button ref={triggerRef} className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen}><Menu size={20} /></button></div></header>{menuOpen && <div ref={overlayRef} className="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation" onClick={(e) => { if (e.target === overlayRef.current) setMenuOpen(false); }}><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={22} /></button><Wordmark /><nav>{views.map((view) => <button key={view.id} aria-current={active === view.id ? "page" : undefined} onClick={() => { setActive(view.id); setMenuOpen(false); }}>{view.label}</button>)}</nav></div>}<main id="main">{children}</main><footer className="site-footer"><Wordmark /><p>Synthetic transaction and security data · Official budget source linked</p><a href="https://github.com/Deepusleepy/RupeeLens" target="_blank" rel="noreferrer"><Code2 size={15} /> View source <ExternalLink size={12} /></a></footer></div>;
}

function Overview({ navigate }: { navigate: (view: View) => void }) {
  return <><section className="hero"><div className="hero-copy"><h1>Investigate money from transaction to treasury.</h1><p>Generate and score UPI transactions, examine five families of security logs, and explore more than a decade of Union Budget allocations.</p><div className="hero-actions"><button className="primary" onClick={() => navigate("payments")}>Open transaction workspace <ArrowRight size={17} /></button><button className="secondary" onClick={() => navigate("budget")}>Explore budget data</button></div><div className="trust-row"><span><Check size={13} /> Dual-model comparison</span><span><Check size={13} /> Identifiers masked</span><span><Check size={13} /> Data export included</span></div></div><div className="hero-preview"><div className="preview-head"><div><span>Transaction intelligence</span><b>TXN0001842</b></div><span className="decision-pill held">High risk</span></div><div className="preview-amount"><strong>₹68,000</strong><span>P2P · Foreign · 02:00</span></div><div className="preview-score"><div><span>Ensemble score</span><strong>91 / 100</strong></div><i><b style={{ width: "91%" }} /></i></div><dl className="preview-details"><div><dt>Logistic regression</dt><dd>89%</dd></div><div><dt>Decision forest</dt><dd>93%</dd></div><div><dt>New device</dt><dd>Flagged</dd></div></dl><p>Synthetic example · No customer data</p></div></section><section className="data-status"><div><span>Transactions</span><b>Generator, predictor, explorer, models</b></div><div><span>Security</span><b>Five log families and anomaly triage</b></div><div><span>Budget</span><b>Dashboard, forecast, query, export</b></div></section><section className="overview-columns"><article className="feature-story"><p className="feature-label">Transaction operations</p><h2>From synthetic data to scored decisions</h2><p>Generate up to 50,000 scenarios, compare two model styles, inspect performance, analyse CSV batches, and export filtered results.</p><div className="mini-score"><div><strong>2</strong><span>MODEL STYLES</span></div><ul><li><i className="green" /> Predictor and explanations <b>LIVE</b></li><li><i className="gold" /> Model diagnostics <b>5 METRICS</b></li><li><i className="rust" /> Batch CSV analysis <b>1,000 ROWS</b></li></ul></div><button className="story-link" onClick={() => navigate("payments")}>Open transactions <ArrowRight size={15} /></button></article><article className="feature-story"><p className="feature-label">Security and public finance</p><h2>Attack patterns and allocation history</h2><p>Investigate login, session, authentication, request, and service logs; then compare ministry budgets, forecasts, queries, and exports.</p><div className="budget-spotlight"><strong>3</strong><span>COMPLETE<br />ANALYTICAL WORKSPACES</span><i>RUPEELENS</i></div><div className="dual-links"><button className="story-link" onClick={() => navigate("security")}>Security logs <ArrowRight size={15} /></button><button className="story-link" onClick={() => navigate("budget")}>Budget analytics <ArrowRight size={15} /></button></div></article></section><section className="use-cases"><h2>Included workflows</h2><ul><li><Check size={15} /><span>Configurable generators, custom uploads, deep filters, drill-downs, and exports.</span></li><li><Check size={15} /><span>Model comparison, performance metrics, anomaly detection, and evidence reports.</span></li><li><Check size={15} /><span>Historical comparisons, forecasts, Smart Query, source notes, and spreadsheet output.</span></li></ul></section></>;
}

function Method() {
  return <section className="view-page"><header className="section-header"><h1>Methodology</h1><p>What RupeeLens calculates, what the data represents, and where its limits are.</p></header><div className="method-intro"><p>Transaction and security workspaces use deterministic synthetic data so every control can be exercised without customer records. The two transaction scores are real in-browser models trained from the generated dataset: a logistic regression trained with gradient descent and a decision forest of shallow trees using Gini impurity splits. Validation metrics are computed on a held-out test split and reflect the actual model performance on the synthetic data. Budget history preserves the source project’s five-ministry dataset and flags structural changes and outliers.</p></div><div className="method-cards"><article><Gauge size={25} /><h3>Transaction models</h3><p>Logistic regression and decision forest models respond differently to amount, hour, location, device, failures, type, and bank context.</p></article><article><ShieldCheck size={25} /><h3>Security thresholds</h3><p>Brute force, abnormal sessions, credential retries, denial-of-service requests, and suspended services use documented thresholds.</p></article><article><Code2 size={25} /><h3>Budget forecasts</h3><p>Linear and acceleration directional projections include approximate 95% residual bands and explicit limitations.</p></article><article><Check size={25} /><h3>Privacy</h3><p>Built-in operational data is synthetic and masked. User-uploaded files remain in the browser session and are not persisted by the app.</p></article></div><div className="release-boundary"><h2>Before production use</h2><div><span>Replace reference scoring with validated models</span><span>Authenticate users and authorise actions</span><span>Encrypt and minimise retained data</span><span>Measure false positives and model drift</span><span>Add audit trails and escalation workflows</span><span>Complete security, legal, and domain review</span></div></div></section>;
}

export function RupeeLens() {
  const [active, setActive] = useState<View>("overview");
  const content = useMemo(() => (
    <>
      {active === "overview" && <Overview navigate={setActive} />}
      <div style={{ display: active === "payments" ? "block" : "none" }}><ErrorBoundary><PaymentWorkspace /></ErrorBoundary></div>
      <div style={{ display: active === "security" ? "block" : "none" }}><ErrorBoundary><SecurityWorkspace /></ErrorBoundary></div>
      <div style={{ display: active === "budget" ? "block" : "none" }}><ErrorBoundary><BudgetWorkspace /></ErrorBoundary></div>
      {active === "method" && <Method />}
    </>
  ), [active]);
  return <Shell active={active} setActive={setActive}>{content}</Shell>;
}
