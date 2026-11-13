import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { site } from "@/content";
import { focus, newsletters, organizations, startHere, updated, xList } from "@/content/policy-resources";
import { pageFonts } from "@/lib/pageFonts";
import { slugify } from "@/lib/slugify";

const description =
  "Where to follow U.S. AI policy: organizations, think tanks, government offices, committees and newsletters.";

export const metadata: Metadata = {
  title: `Policy Resources — ${site.name}`,
  description,
  alternates: { canonical: "/resources/policy" },
  openGraph: {
    title: `Policy Resources — ${site.name}`,
    description,
    url: "/resources/policy",
    images: ["/opengraph-image.png"],
  },
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const linkClass =
  "underline decoration-line-2 underline-offset-4 transition-colors hover:text-hero-orange hover:decoration-hero-orange";

const sections = [
  { id: "newsletters", label: "Newsletters" },
  ...organizations.map((g) => ({ id: slugify(g.title), label: g.title })),
];

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function PolicyResources() {
  return (
    <main className={`flex flex-1 flex-col ${pageFonts}`}>
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <Link href="/resources" className="section-index text-muted hover:underline">
            Resources
          </Link>
          <h1 className="font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
            Policy Resources
          </h1>
          <p className="mt-6 leading-relaxed text-muted">
            {focus} Updated {formatDate(updated)}.
          </p>
        </header>

        <section aria-labelledby="start-heading" className="mt-10 border-l-4 border-hero-orange bg-[#fde3cf] p-6 sm:p-8">
          <h2 id="start-heading" className="text-2xl font-medium tracking-tight">
            Start here
          </h2>
          <dl className="mt-5 grid gap-4">
            {startHere.map(({ label, links }) => (
              <div key={label} className="sm:flex sm:gap-3">
                <dt className="font-semibold sm:shrink-0">{label}:</dt>
                <dd className="leading-relaxed">
                  {links.map((l, i) => (
                    <span key={l.name}>
                      <a href={l.href} {...external} className={linkClass}>
                        {l.name}
                      </a>
                      {i < links.length - 2 ? ", " : i === links.length - 2 ? ", and " : ""}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
            <div className="sm:flex sm:gap-3">
              <dt className="font-semibold sm:shrink-0">On X:</dt>
              <dd>
                <a href={xList.href} {...external} className={linkClass}>
                  {xList.name}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <nav aria-label="On this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-block border border-line px-3 py-1.5 text-sm text-ink-2 transition-colors hover:border-hero-orange hover:bg-hero-orange hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="newsletters" aria-labelledby="newsletters-heading" className="mt-14">
          <h2 id="newsletters-heading" className="text-3xl font-medium tracking-tight">
            <span aria-hidden="true" className="mr-3 inline-block h-3 w-3 bg-hero-orange align-middle" />
            Newsletters
          </h2>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {newsletters.map((n) => (
              <li key={n.name}>
                <a href={n.href} {...external} className={linkClass}>
                  {n.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <h2 className="mt-16 text-3xl font-medium tracking-tight">
          <span aria-hidden="true" className="mr-3 inline-block h-3 w-3 bg-hero-orange align-middle" />
          Organizations to keep track of
        </h2>
        {organizations.map((group) => {
          const id = slugify(group.title);
          return (
            <section key={id} id={id} aria-labelledby={`${id}-heading`} className="mt-10">
              <h3 id={`${id}-heading`} className="border-l-4 border-hero-orange pl-3 text-xl font-medium tracking-tight">
                {group.title}
              </h3>
              {group.intro && <p className="mt-2 max-w-2xl leading-relaxed text-muted">{group.intro}</p>}
              <ul className="mt-5 grid gap-x-10 gap-y-6 lg:grid-cols-2">
                {group.entries.map((e) => (
                  <li key={e.name}>
                    <a href={e.href} {...external} className={`font-medium ${linkClass}`}>
                      {e.name}
                    </a>
                    <p className="mt-1.5 leading-relaxed text-muted">
                      {e.note}
                      {e.also && (
                        <>
                          {" "}Also follow the{" "}
                          <a href={e.also.href} {...external} className={linkClass}>
                            {e.also.name}
                          </a>
                          .
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}
