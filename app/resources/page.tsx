import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { resources, site, type Resource } from "@/content";

const description =
  "Guides, maps and reading lists from AI Said Simply for people working on or around AI safety.";

export const metadata: Metadata = {
  title: `Resources — ${site.name}`,
  description,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: `Resources — ${site.name}`,
    description,
    url: "/resources",
    images: ["/opengraph-image.png"],
  },
};

function Card({ resource }: { resource: Resource }) {
  const { title, description, href } = resource;
  const inner = (
    <div className="flex h-full items-start justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-medium leading-snug text-ink">{title}</h2>
        <p className="mt-3 leading-relaxed text-ink-2">{description}</p>
        {!href && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.06em] text-muted">
            Coming soon
          </p>
        )}
      </div>
      {href && (
        <span aria-hidden="true" className="shrink-0 text-4xl font-normal leading-none">
          &gt;
        </span>
      )}
    </div>
  );
  const base = "block h-full rounded-card p-6 transition-colors duration-150 ease-out";
  return href ? (
    <Link href={href} className={`${base} bg-library-live hover:bg-library-live-hover`}>
      {inner}
    </Link>
  ) : (
    <div className={`${base} bg-paper-3`}>{inner}</div>
  );
}

export default function Resources() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
            Resources
          </h1>
        </header>
        <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <li key={resource.title}>
              <Card resource={resource} />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
}
