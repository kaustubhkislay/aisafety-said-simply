import Link from "next/link";
import type { LibraryItem } from "@/content";

function Card({ item }: { item: LibraryItem }) {
  const live = item.status === "live";
  const cardClass = `block h-full rounded-card p-6 transition-colors duration-150 ease-out ${
    live ? "bg-library-live hover:bg-library-live-hover" : "bg-paper-3"
  }`;
  const inner = (
    <div className="flex h-full items-center justify-between gap-4">
      <h3 className="font-display text-2xl font-medium leading-snug text-ink">
        {item.title}
        <span className="sr-only">{live ? " — Available" : " — In production"}</span>
      </h3>
      {live && (item.url || item.slug) && <span aria-hidden="true" className="shrink-0 text-4xl font-normal leading-none">&gt;</span>}
    </div>
  );
  if (item.slug) {
    return (
      <Link
        href={`/library/${item.slug}`}
        className={cardClass}
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
        className={cardClass}
      >
        {inner}
      </a>
    );
  }
  return <div className={cardClass}>{inner}</div>;
}

export default function LibraryBrowser({ items }: { items: LibraryItem[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} item={item} />
      ))}
    </div>
  );
}
