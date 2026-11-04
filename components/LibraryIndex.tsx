"use client";

import Link from "next/link";
import { useState } from "react";
import { topics, type LibraryItem, type Topic } from "@/content";

// Styled by the `.library-index` rules in app/globals.css.

function href(item: LibraryItem) {
  if (item.slug) return `/library/${item.slug}`;
  if (item.status === "live") return item.url;
}

function Title({ item }: { item: LibraryItem }) {
  const to = href(item);
  if (!to) return <>{item.title}</>;
  if (item.slug) return <Link href={to}>{item.title}</Link>;
  return (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {item.title}
    </a>
  );
}

function Tags({ item }: { item: LibraryItem }) {
  return (
    <p className="tags">
      {item.formats.map((f) => (
        <span key={f} className="tag format">
          {f}
        </span>
      ))}
      {topics
        .filter((t) => item.topics.includes(t))
        .map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
    </p>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function Entry({ item }: { item: LibraryItem }) {
  const meta = [
    item.updated && formatDate(item.updated),
    item.author,
    !item.slug && item.url && new URL(item.url).hostname,
    item.readingMinutes && `${item.readingMinutes} min read`,
  ].filter(Boolean);
  const to = href(item);

  return (
    <li className={item.image ? "entry has-image" : "entry"}>
      <div>
        <Tags item={item} />
        <h2>
          <Title item={item} />
        </h2>
        {meta.length > 0 && <p className="meta">{meta.join(" · ")}</p>}
        <p className="hook">{item.hook}</p>
      </div>
      {item.image && to && (
        <a
          href={to}
          className="thumb"
          tabIndex={-1}
          aria-hidden
          {...(item.slug ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" />
        </a>
      )}
    </li>
  );
}

/** Every published library piece, filterable by topic. Topics with nothing
 *  published yet are left out of the rail. */
export default function LibraryIndex({ items }: { items: LibraryItem[] }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const published = items.filter((i) => href(i));
  const used = topics.filter((t) => published.some((i) => i.topics.includes(t)));
  const shown = topic ? published.filter((i) => i.topics.includes(topic)) : published;

  return (
    <div className="library-layout">
      <nav className="rail" aria-label="Filter by topic">
        <ul>
          {[null, ...used].map((t) => (
            <li key={t ?? "all"}>
              <button
                type="button"
                aria-pressed={topic === t}
                onClick={() => setTopic(t)}
              >
                {t ?? "All"}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="entries">
        {shown.map((item) => (
          <Entry key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
}
