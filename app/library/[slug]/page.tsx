import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Toc from "@/components/Toc";
import { library, team } from "@/content";
import { fontVariables } from "@/lib/explainerFonts";
import { slugify } from "@/lib/slugify";

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
      images: item.shareImage ? [{ url: item.shareImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: item.shareImage ? "summary_large_image" : "summary",
      title: item.title,
      description: item.hook,
      images: item.shareImage ? [item.shareImage] : undefined,
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

/** "2026-11-02" → "November 2nd, 2026", as in the rewardhacking.org byline. */
function formatDay(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  const day = date.getUTCDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st"
    : day % 10 === 2 && day !== 12 ? "nd"
    : day % 10 === 3 && day !== 13 ? "rd"
    : "th";
  const month = date.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
  return `${month} ${day}${suffix}, ${date.getUTCFullYear()}`;
}

/** The article's ## and ### headings, for the contents lists. */
async function readSections(slug: string) {
  const source = await readFile(
    path.join(process.cwd(), "content/library", `${slug}.mdx`),
    "utf8",
  );
  return Array.from(source.matchAll(/^(##|###) (.+)$/gm), ([, hashes, label]) => ({
    id: slugify(label.trim()),
    label: label.trim(),
    sub: hashes === "###",
  }));
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
  const sections = await readSections(slug);

  const author = team.find((member) => member.name === item?.author);
  const meta = [
    item?.readingMinutes ? `${item.readingMinutes} min read` : null,
    item?.updated ? `Updated ${formatUpdated(item.updated)}` : null,
    item ? null : "Draft — not in the catalog",
  ].filter(Boolean);

  return (
    <main className={`flex min-h-full flex-col ${fontVariables}`}>
      <Toc sections={sections} />
      <article className="writeup w-full">
        <h1 id="top">{item?.title ?? "Template"}</h1>
        {item?.author && (
          <p className="byline">
            by{" "}
            {author?.website || author?.url ? (
              <a href={author.website ?? author.url} target="_blank" rel="noopener noreferrer">
                {item.author}
              </a>
            ) : (
              item.author
            )}
            {item.updated && `, ${formatDay(item.updated)}`}
          </p>
        )}
        {sections.length > 0 && (
          <nav className="toc-inline" aria-label="Contents">
            <p>Contents</p>
            <ol>
              {sections.map(({ id, label, sub }) => (
                <li key={id} className={sub ? "sub" : undefined}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Body />
        <p className="colophon">
          {meta.join(" · ")}
          {meta.length > 0 && " · "}
          Free to share under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY 4.0
          </a>
          {item?.pdf && (
            <>
              {" · "}
              <a href={item.pdf}>One-pager (PDF)</a>
            </>
          )}
        </p>
      </article>
      <Footer />
    </main>
  );
}
