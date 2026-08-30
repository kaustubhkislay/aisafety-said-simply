"use client";

import { useState } from "react";
import Link from "next/link";
import type { Audience, Format, LibraryItem } from "@/content";

const FORMATS: Format[] = ["Explainer", "Demo", "Video"];
const AUDIENCES: Audience[] = ["Policymakers", "Educators", "Public"];

function matchesQuery(item: LibraryItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [item.title, item.hook, ...(item.aliases ?? [])]
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).every((token) => haystack.includes(token));
}

function chipClass(active: boolean): string {
  return `rounded-card border px-3 py-1 text-sm font-medium transition-colors duration-150 ease-out ${
    active
      ? "border-accent bg-accent text-cream"
      : "border-line bg-card text-ink-2 hover:border-line-2"
  }`;
}

function Card({ item }: { item: LibraryItem }) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={`text-xs font-semibold uppercase tracking-[0.08em] ${
            item.status === "live" ? "text-accent" : "text-muted"
          }`}
        >
          {item.status === "live" ? "Live" : "In production"}
        </span>
        {item.status === "live" && item.url && (
          <span aria-hidden className="text-accent">
            ↗
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl font-medium leading-snug text-ink">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.hook}</p>
      <p className="mt-4 text-xs text-muted">
        {item.formats.join(" · ")}
        {item.readingMinutes ? ` · ~${item.readingMinutes} min` : ""}
      </p>
    </>
  );
  if (item.slug) {
    return (
      <Link
        href={`/library/${item.slug}`}
        className="block rounded-card border border-accent bg-card p-6 transition-colors duration-150 ease-out hover:bg-paper-2"
      >
        {inner}
      </Link>
    );
  }
  if (item.status === "live" && item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-card border border-accent bg-card p-6 transition-colors duration-150 ease-out hover:bg-paper-2"
      >
        {inner}
      </a>
    );
  }
  return <div className="rounded-card border border-line bg-card p-6">{inner}</div>;
}

export default function LibraryBrowser({ items }: { items: LibraryItem[] }) {
  const [query, setQuery] = useState("");
  const [formats, setFormats] = useState<Format[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);

  const toggle = <T,>(list: T[], setList: (v: T[]) => void, value: T) =>
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );

  const visible = items.filter(
    (item) =>
      matchesQuery(item, query) &&
      (formats.length === 0 || item.formats.some((f) => formats.includes(f))) &&
      (audiences.length === 0 ||
        item.audiences.some((a) => audiences.includes(a)))
  );

  const reset = () => {
    setQuery("");
    setFormats([]);
    setAudiences([]);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-2">
        {FORMATS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => toggle(formats, setFormats, f)}
            aria-pressed={formats.includes(f)}
            className={chipClass(formats.includes(f))}
          >
            {f}
          </button>
        ))}
        <span aria-hidden className="mx-1 text-line-2">
          |
        </span>
        {AUDIENCES.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => toggle(audiences, setAudiences, a)}
            aria-pressed={audiences.includes(a)}
            className={chipClass(audiences.includes(a))}
          >
            {a}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted" role="status">
        {visible.length} of {items.length} topics
      </p>
      {visible.length === 0 ? (
        <p className="mt-6 text-muted">
          No matches.{" "}
          <button
            type="button"
            onClick={reset}
            className="font-medium text-accent underline underline-offset-4"
          >
            Clear search and filters
          </button>
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
