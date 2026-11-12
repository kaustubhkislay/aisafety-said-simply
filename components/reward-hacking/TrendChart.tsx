"use client";

import { useState } from "react";
import data from "@/content/library/reward-hacking-data.json";

const FROM = "2024-01";
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

export default function TrendChart() {
  // final entry is the partial current month — drop it
  const months = data.monthly.filter((m) => m.month >= FROM).slice(0, -1);
  const [hover, setHover] = useState<number | null>(null);

  const yMax = Math.ceil(Math.max(...months.map((m) => m.n)) / 200) * 200;
  const x = (i: number) =>
    PAD.l + (i / (months.length - 1)) * (W - PAD.l - PAD.r);
  const y = (n: number) => H - PAD.b - (n / yMax) * (H - PAD.t - PAD.b);
  const pts = months.map((m, i) => `${x(i)},${y(m.n)}`).join(" ");
  const last = months[months.length - 1];

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (months.length - 1));
    setHover(i >= 0 && i < months.length ? i : null);
  };

  return (
    <figure className="figure">
      <figcaption>
        User-reported incidents per month, from this corpus (through{" "}
        {monthLabel(last.month)}; the partial current month is excluded).
      </figcaption>
      <div className="chartwrap">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Line chart of reports per month, ${monthLabel(months[0].month)} to ${monthLabel(last.month)}, rising from ${months[0].n} to ${last.n}`}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
        >
          {[0, yMax / 2, yMax].map((v) => (
            <g key={v}>
              <line
                x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)}
                className={v === 0 ? "axisline" : "gridline"}
              />
              <text x={PAD.l - 8} y={y(v) + 4} className="ticklabel" textAnchor="end">
                {v}
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
          <polyline points={pts} className="trendline" />
          <text
            x={x(months.length - 1) - 8}
            y={y(last.n) - 8}
            className="pointlabel"
            textAnchor="end"
          >
            {last.n.toLocaleString()}
          </text>
          {hover !== null && (
            <g>
              <line
                x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={H - PAD.b}
                className="crosshair"
              />
              <circle cx={x(hover)} cy={y(months[hover].n)} r={4} className="hoverdot" />
            </g>
          )}
        </svg>
        {hover !== null && (
          <div
            className="tooltip"
            style={{
              left: `${(x(hover) / W) * 100}%`,
              top: `${(y(months[hover].n) / H) * 100}%`,
            }}
          >
            {monthLabel(months[hover].month)}: <b>{months[hover].n.toLocaleString()}</b>
          </div>
        )}
      </div>
    </figure>
  );
}
