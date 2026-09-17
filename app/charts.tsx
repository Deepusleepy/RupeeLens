"use client";

import { useEffect, useRef } from "react";

export type ChartDatum = { label: string; value: number };

const palette = ["var(--green)", "var(--gold)", "var(--blue)", "var(--rust)", "var(--chart-5)", "var(--chart-6)", "var(--chart-7)", "var(--chart-8)"];

export function TrendChart({ data, secondary, formatter = (value) => value.toLocaleString("en-IN") }: { data: ChartDatum[]; secondary?: ChartDatum[]; formatter?: (value: number) => string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<(() => void) | null>(null);
  const dataRef = useRef({ data, secondary });
  useEffect(() => {
    dataRef.current = { data, secondary };
    drawRef.current?.();
  }, [data, secondary]);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const draw = () => {
      const { data: d, secondary: s } = dataRef.current;
      const width = element.clientWidth; const height = 250; const ratio = window.devicePixelRatio || 1;
      element.width = width * ratio; element.height = height * ratio; const context = element.getContext("2d"); if (!context) return;
      context.scale(ratio, ratio); context.clearRect(0, 0, width, height);
      const css = getComputedStyle(document.documentElement);
      const lineColor = css.getPropertyValue("--line").trim() || "#cbc7ba";
      const green = css.getPropertyValue("--green").trim() || "#175d3d";
      const blue = css.getPropertyValue("--blue").trim() || "#356b82";
      const all = [...d, ...(s ?? [])].map((item) => item.value); const max = Math.max(...all, 1); const min = Math.min(...all, 0); const range = max - min || 1;
      const x = (index: number, length: number) => 16 + index * ((width - 32) / Math.max(1, length - 1)); const y = (value: number) => 14 + (max - value) / range * 205;
      context.strokeStyle = lineColor; context.lineWidth = 1;
      for (let i = 0; i < 4; i++) { const gy = 14 + i * 68; context.beginPath(); context.moveTo(0, gy); context.lineTo(width, gy); context.stroke(); }
      const plot = (series: ChartDatum[], color: string, dashed = false, fill = false) => {
        context.beginPath(); series.forEach((item, index) => index ? context.lineTo(x(index, series.length), y(item.value)) : context.moveTo(x(index, series.length), y(item.value)));
        if (fill && series.length) { context.lineTo(x(series.length - 1, series.length), 220); context.lineTo(x(0, series.length), 220); context.closePath(); context.globalAlpha = 0.1; context.fillStyle = green; context.fill(); context.globalAlpha = 1; context.beginPath(); series.forEach((item, index) => index ? context.lineTo(x(index, series.length), y(item.value)) : context.moveTo(x(index, series.length), y(item.value))); }
        context.setLineDash(dashed ? [7, 6] : []); context.strokeStyle = color; context.lineWidth = 2.5; context.stroke(); context.setLineDash([]);
        if (!dashed) series.forEach((item, index) => { context.beginPath(); context.arc(x(index, series.length), y(item.value), 3.2, 0, Math.PI * 2); context.fillStyle = color; context.fill(); });
      };
      plot(d, green, false, true); if (s) plot(s, blue, true);
    };
    drawRef.current = draw; draw(); const observer = new ResizeObserver(draw); observer.observe(element); const themeObserver = new MutationObserver(draw); themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] }); return () => { observer.disconnect(); themeObserver.disconnect(); drawRef.current = null; };
  }, []);
  const last = data.at(-1);
  const points = data.length && last ? `${data[0]!.label}: ${formatter(data[0]!.value)} to ${last.label}: ${formatter(last.value)}` : "No data";
  return <div className="trend-chart" role="img" aria-label={`Trend chart. ${points}`}><canvas ref={canvas} aria-hidden="true" /><div className="chart-axis"><span>{data[0]?.label}</span><span>{data[Math.floor(data.length / 2)]?.label}</span><span>{data.at(-1)?.label}</span></div>{secondary && <div className="chart-legend"><span><i className="solid" /> Primary</span><span><i className="dashed" /> Comparison</span></div>}</div>;
}

export function DonutChart({ data, formatter = (value) => value.toLocaleString("en-IN") }: { data: ChartDatum[]; formatter?: (value: number) => string }) {
  const isEmpty = data.every((d) => !d.value);
  const total = isEmpty ? 0 : data.reduce((sum, item) => sum + Math.max(0, item.value), 0) || 1;
  const gradient = data.reduce<{ cursor: number; stops: string[] }>((result, item, index) => {
    const next = result.cursor + Math.max(0, item.value) / total * 100;
    return { cursor: next, stops: [...result.stops, `${palette[index % palette.length]} ${result.cursor}% ${next}%`] };
  }, { cursor: 0, stops: [] }).stops.join(", ");
  return <div className="donut-layout"><div className="donut" style={{ background: `conic-gradient(${gradient})` }} role="img" aria-label={!data.length ? "Chart has no data" : data.map((item) => `${item.label} ${formatter(item.value)}`).join(", ")}><span><strong>{isEmpty ? "0" : formatter(total)}</strong><small>Total</small></span></div><div className="donut-legend">{data.map((item, index) => <div key={item.label}><i style={{ background: palette[index % palette.length] }} /><span>{item.label}</span><strong>{formatter(item.value)}</strong></div>)}</div></div>;
}

export function Histogram({ data, formatter = (value) => value.toLocaleString("en-IN") }: { data: ChartDatum[]; formatter?: (value: number) => string }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return <div className="histogram" role="img" aria-label={!data.length ? "Chart has no data" : data.map((item) => `${item.label} ${formatter(item.value)}`).join(", ")}>{data.map((item, index) => <div key={item.label}><strong>{formatter(item.value)}</strong><i style={{ height: `${Math.max(3, item.value / max * 100)}%`, background: palette[index % palette.length] }} /><span>{item.label}</span></div>)}</div>;
}

export function DotPlot({ data, formatter = (value) => value.toLocaleString("en-IN") }: { data: ChartDatum[]; formatter?: (value: number) => string }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return <div className="dot-plot" role="img" aria-label={!data.length ? "Chart has no data" : data.map((item) => `${item.label} ${formatter(item.value)}`).join(", ")}>{data.map((item, index) => <div key={item.label}><span>{item.label}</span><i><b style={{ left: `${item.value / max * 100}%`, background: palette[index % palette.length] }} /></i><strong>{formatter(item.value)}</strong></div>)}</div>;
}
