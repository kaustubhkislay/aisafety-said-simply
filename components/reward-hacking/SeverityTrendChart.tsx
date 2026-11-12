"use client";

import { useState } from "react";
import data from "@/content/library/reward-hacking-data.json";
import { SEVERITIES, SEVERITY_FILL } from "./severity";

// Months before this have fewer than 10 rated incidents — shares would be noise.
const FROM = "2025-01";
const W = 640;
const H = 220;
const PAD = { l: 44, r: 20, t: 14, b: 26 };

function monthLabel(m: string): string {
  const [y, mo] = m.split("-");
  return new Date(Number(y), Number(mo) - 1).toLocaleString("en", {
    month: "short",
    year: "numeric",
  });
}

type MonthRow = (typeof data.monthly_severity)[number];

const total = (m: MonthRow) => SEVERITIES.reduce((n, s) => n + m[s], 0);

export default function SeverityTrendChart({ showLegend = true }: { showLegend?: boolean }) {
  // final entry is the partial current month — drop it (same rule as TrendChart)
  const months = data.monthly_severity.filter((m) => m.month >= FROM).slice(0, -1);
  const [hover, setHover] = useState<number | null>(null);
  if (months.length < 2) return null;

  const x = (i: number) => PAD.l + (i / (months.length - 1)) * (W - PAD.l - PAD.r);
  const y = (share: number) => H - PAD.b - share * (H - PAD.t - PAD.b);

  // cumulative shares per month: [neg, neg+min, neg+min+sig, 1]
  const cums = months.map((m) => {
    const t = total(m);
    let acc = 0;
    return SEVERITIES.map((s) => (acc += m[s] / t));
  });

  // band k spans from cumulative k-1 (0 for the bottom band) up to cumulative k
  const bandPath = (k: number) => {
    const top = cums.map((c, i) => `${x(i)},${y(c[k])}`).join(" L");
    const bottom = months
      .map((_, i) => `${x(i)},${y(k === 0 ? 0 : cums[i][k - 1])}`)
      .reverse()
      .join(" L");
    return `M${top} L${bottom} Z`;
  };

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (months.length - 1));
    setHover(i >= 0 && i < months.length ? i : null);
  };

  const first = months[0];
  const last = months[months.length - 1];
  const serious = (m: MonthRow) =>
    Math.round(((m.significant + m.severe) / total(m)) * 100);

  return (
    <figure className="figure">
      <figcaption>
        Monthly severity mix: each month&rsquo;s reported incidents as shares
        of the four harm levels ({monthLabel(first.month)} through{" "}
        {monthLabel(last.month)}; earlier months are omitted for small samples,
        as is the partial current month).
      </figcaption>
      <div className="chartwrap">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Stacked area chart of the monthly severity mix. Incidents rated significant or severe rose from ${serious(first)}% in ${monthLabel(first.month)} to ${serious(last)}% in ${monthLabel(last.month)}.`}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
        >
          {SEVERITIES.map((s, k) => (
            <path key={s} d={bandPath(k)} fill={SEVERITY_FILL[s]} />
          ))}
          {/* Surface-coloured hairlines separate neighbouring bands — the
              spacer that keeps the light bands readable against the surface. */}
          {[0, 1, 2].map((k) => (
            <polyline
              key={k}
              points={cums.map((c, i) => `${x(i)},${y(c[k])}`).join(" ")}
              fill="none"
              stroke="var(--bg)"
              strokeWidth={2}
            />
          ))}
          {[0, 0.5, 1].map((v) => (
            <g key={v}>
              <line
                x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)}
                className={v === 0 ? "axisline" : "gridline"}
              />
              <text x={PAD.l - 8} y={y(v) + 4} className="ticklabel" textAnchor="end">
                {v * 100}%
              </text>
            </g>
          ))}
          {months.map((m, i) =>
            m.month.endsWith("-01") ? (
              <text key={m.month} x={x(i)} y={H - 6} className="ticklabel" textAnchor="middle">
                {m.month.slice(0, 4)}
              </text>
            ) : null
          )}
          {hover !== null && (
            <line
              x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={H - PAD.b}
              className="crosshair"
            />
          )}
        </svg>
        {hover !== null && (
          <div
            className="tooltip"
            style={{ left: `${(x(hover) / W) * 100}%`, top: "8%" }}
          >
            {monthLabel(months[hover].month)} · n={total(months[hover])}
            {[...SEVERITIES].reverse().map((s) => (
              <div key={s}>
                <span
                  className="swatch"
                  style={{ background: SEVERITY_FILL[s] }}
                  aria-hidden="true"
                />{" "}
                {s} {Math.round((months[hover][s] / total(months[hover])) * 100)}%
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Identity never rests on colour alone — the legend names every band.
          Hidden where a sibling severity legend (the pie's) already keys the
          same colors on the same page. */}
      {showLegend && (
        <ul className="pielegend">
          {[...SEVERITIES].reverse().map((s) => (
            <li key={s}>
              <span className="swatch" style={{ background: SEVERITY_FILL[s] }} aria-hidden="true" />
              <span className="legendkey">{s}</span>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}
