import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { library } from "@/content";

// Draft-only slugs render for template verification but are not in the catalog.
const DRAFT_SLUGS = ["_template"];

function findItem(slug: string) {
  return library.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  const catalog = library
    .filter((item) => item.slug)
    .map((item) => ({ slug: item.slug! }));
  return [...catalog, ...DRAFT_SLUGS.map((slug) => ({ slug }))];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return { title: "Draft — AI Safety Said Simply" };
  return {
    title: `${item.title} — AI Safety Said Simply`,
    description: item.hook,
    openGraph: {
      title: item.title,
      description: item.hook,
      url: `/library/${slug}`,
      siteName: "AI Safety Said Simply",
      type: "article",
    },
  };
}

function formatUpdated(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item && !DRAFT_SLUGS.includes(slug)) notFound();

  const { default: Body } = await import(`@/content/library/${slug}.mdx`);

  const meta = item
    ? [
        item.formats.join(" · "),
        item.audiences.join(" · "),
        item.readingMinutes ? `~${item.readingMinutes} min` : null,
        item.updated ? `Updated ${formatUpdated(item.updated)}` : null,
      ].filter(Boolean)
    : ["Draft — not in the catalog"];

  return (
    <main className="flex min-h-full flex-col">
      <article className="mx-auto w-full max-w-5xl px-6 pt-14 pb-16 sm:pb-20">
        <header className="max-w-prose">
          <h1 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink sm:text-4xl">
            {item?.title ?? "Template"}
          </h1>
          {item && (
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {item.hook}
            </p>
          )}
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            {meta.join("  ·  ")}
          </p>
          <p className="mt-2 text-xs text-muted">
            Free to share and adapt (
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-ink"
            >
              CC BY 4.0
            </a>
            ).
          </p>
          {item?.pdf && (
            <a
              href={item.pdf}
              className="mt-6 inline-block rounded-card bg-accent px-5 py-2.5 text-sm font-medium whitespace-nowrap text-cream transition-opacity duration-150 ease-out hover:opacity-90"
            >
              Download the one-pager (PDF)
            </a>
          )}
        </header>
        <div className="mt-6 max-w-prose border-t border-line pt-2">
          <Body />
        </div>
      </article>
      <Footer />
    </main>
  );
}
