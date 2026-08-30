# Library Search + Per-Topic Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage library searchable and filterable, and add an MDX-backed `/library/[slug]` topic-page template with trust metadata (dates, license, PDF slot).

**Architecture:** All catalog metadata stays in `content.ts` (single source of truth); topic bodies are MDX files in `content/library/`. A client component (`LibraryBrowser`) owns search/filter state over the grid; the topic route statically generates one page per slugged item.

**Tech Stack:** Next.js 16.3 (App Router, Turbopack), Tailwind CSS 4 tokens already defined in `app/globals.css`, `@next/mdx` for MDX.

**Spec:** `docs/superpowers/specs/2026-08-29-library-search-topic-pages-design.md`

## Global Constraints

- This repo has NO test infrastructure by deliberate convention (see the FAQ spec: "No tests — repo has none; components are declarative markup over static content"). Verification is `npm run build` + rendered-output checks with `curl` against the dev server, per task.
- Design tokens only — use the Tailwind classes backed by `app/globals.css` (`bg-paper`, `bg-card`, `border-line`, `text-ink`, `text-muted`, `text-accent`, `bg-accent`, `text-cream`, `rounded-card`, `font-display`). Never hex values in components.
- Buttons/CTAs: violet `bg-accent text-cream rounded-card hover:opacity-90`. External links: `target="_blank" rel="noopener noreferrer"`.
- Server components by default; `"use client"` only where there is state.
- Deploys are manual by the user (`vercel deploy --prod`); never run it from the agent (permission classifier blocks it).
- The dev server may be running on port 3001 (3000 is occupied by an unrelated process). For curl checks, start a fresh one or use the port the running server reports.
- Commit messages end with the Co-Authored-By + Claude-Session trailer used by recent commits (`git log -3`).

---

### Task 1: Content model + catalog data + footer license line

**Files:**
- Modify: `content.ts` (LibraryItem type ~line 3; library array at the bottom of the file)
- Modify: `components/Footer.tsx`

**Interfaces:**
- Produces: `export type Audience = "Policymakers" | "Educators" | "Public"`; `LibraryItem` gains optional `audiences: Audience[]` (required), `slug?: string`, `aliases?: string[]`, `readingMinutes?: number`, `updated?: string`, `pdf?: string`. Task 2 consumes `audiences`, `aliases`, `readingMinutes`, `slug`, `formats`. Task 4 consumes `slug`, `updated`, `pdf`, `hook`, `title`.

- [ ] **Step 1: Extend the types in `content.ts`**

Replace the current top-of-file block:

```ts
export type Format = "Explainer" | "Demo" | "Video";

export type Audience = "Policymakers" | "Educators" | "Public";

export type LibraryItem = {
  title: string;
  hook: string;
  formats: Format[];
  audiences: Audience[];
  status: "live" | "in-production";
  /** Set when the piece is hosted on this domain (renders at /library/[slug]). */
  slug?: string;
  /** External pieces (e.g. rewardhacking.org). An item never has both slug and url. */
  url?: string;
  /** Question-phrased search aliases, e.g. "can AI pretend to be safe?" */
  aliases?: string[];
  readingMinutes?: number;
  /** ISO date of last substantive update, e.g. "2026-08-29". */
  updated?: string;
  /** Path under /public to a downloadable one-pager, e.g. "/onepagers/ai-control.pdf". */
  pdf?: string;
};
```

- [ ] **Step 2: Add `audiences` (and aliases where natural) to all ten items**

Update every entry in the `library` array. Exact values:

| Item | audiences | aliases |
|---|---|---|
| Reward hacking, in the wild | Policymakers, Educators, Public | "what is reward hacking?", "examples of AI gaming its objectives" |
| Sleeper agents & secret loyalties | Policymakers, Public | "can AI pretend to be safe?", "what is a sleeper agent?" |
| AI control | Policymakers, Educators | "how do we use AI we don't trust?" |
| Eval awareness & eval gaming | Educators, Policymakers | "can AI tell when it's being tested?" |
| Chain-of-thought unfaithfulness | Educators, Public | "does AI reasoning reflect what it actually does?" |
| Bio & cyber uplift | Policymakers | "how much does AI help attackers?" |
| Compute verification | Policymakers | "how would an AI treaty be enforced?" |
| Safeguards & classifiers | Educators, Public | "how do AI content filters work?" |
| Self-fulfilling misalignment | Public, Educators | "can writing about bad AI cause bad AI?" |
| Value reflection | Public | "what would AI values become?" |

Example of one updated entry (repeat the pattern for all):

```ts
  {
    title: "Sleeper agents & secret loyalties",
    hook: "How a model can behave perfectly in testing while carrying hidden goals for later.",
    formats: ["Explainer"],
    audiences: ["Policymakers", "Public"],
    aliases: ["can AI pretend to be safe?", "what is a sleeper agent?"],
    status: "in-production",
  },
```

- [ ] **Step 3: Add the license line to the footer**

In `components/Footer.tsx`, inside the link column `<div className="flex flex-col gap-2 text-sm">`, after the mailto link, add:

```tsx
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream opacity-70 hover:underline"
            >
              Content is free to share — CC BY 4.0
            </a>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: passes; TypeScript will fail here if any library item is missing `audiences` — that failure list is the checklist of entries still to update.

- [ ] **Step 5: Commit**

```bash
git add content.ts components/Footer.tsx
git commit -m "feat: audience/search fields on library items + CC BY footer line"
```

---

### Task 2: LibraryBrowser — search + filter chips over the grid

**Files:**
- Create: `components/LibraryBrowser.tsx`
- Modify: `components/Library.tsx`

**Interfaces:**
- Consumes: `LibraryItem`, `Format`, `Audience` from `@/content` (Task 1 shapes).
- Produces: `<LibraryBrowser items={library} />` (default export, props `{ items: LibraryItem[] }`). Card behavior: items with `slug` link to `/library/${slug}`; items with `url` link out.

- [ ] **Step 1: Create `components/LibraryBrowser.tsx`**

```tsx
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
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search topics — try “sleeper agent” or a question"
        aria-label="Search the library"
        className="w-full max-w-md rounded-card border border-line bg-card px-3 py-2 text-ink placeholder:text-muted"
      />
      <div className="mt-4 flex flex-wrap items-center gap-2">
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
```

- [ ] **Step 2: Replace the grid in `components/Library.tsx`**

The whole file becomes:

```tsx
import { library } from "@/content";
import LibraryBrowser from "@/components/LibraryBrowser";

export default function Library() {
  return (
    <section id="library" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
          The library
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          One piece is live. The rest are in production — each one short,
          accurate, and made to be shared.
        </p>
        <LibraryBrowser items={library} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build and rendered output**

Run: `npm run build`
Expected: PASS.

Start dev server if not running (`npm run dev`, note the port it reports), then:

Run: `curl -s http://localhost:<port>/ | grep -c "of 10 topics"`
Expected: `1` (the count line renders server-side as "10 of 10 topics").

Interactivity (search narrowing, chip AND/OR, empty state + reset) is client-side and cannot be curl-verified — check in the browser: searching `sleeper` leaves 1 card; chips within a row OR, across rows AND; clearing works.

- [ ] **Step 4: Commit**

```bash
git add components/LibraryBrowser.tsx components/Library.tsx
git commit -m "feat: searchable, filterable library grid"
```

---

### Task 3: MDX wiring

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `next.config.ts`
- Create: `mdx-components.tsx` (repo root)

**Interfaces:**
- Produces: `.mdx` files importable from anywhere (Task 4 does `await import(\`@/content/library/${slug}.mdx\`)`); `mdx-components.tsx` styles MDX output with the site tokens.

- [ ] **Step 1: Install MDX packages**

Run: `npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx`

- [ ] **Step 2: Wire `@next/mdx` in `next.config.ts`**

Replace the file with:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

- [ ] **Step 3: Create `mdx-components.tsx` at the repo root**

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-10 font-display text-2xl font-medium tracking-[-0.01em] text-ink"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-8 font-display text-xl font-medium text-ink" {...props} />
    ),
    p: (props) => <p className="mt-4 leading-relaxed text-ink-2" {...props} />,
    ul: (props) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-2" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink-2" {...props} />
    ),
    a: (props) => (
      <a
        className="font-medium text-accent underline underline-offset-4 hover:text-ink"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-4 border-l-2 border-line-2 pl-4 font-serif italic text-muted"
        {...props}
      />
    ),
    ...components,
  };
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS (no MDX files exist yet; this proves the config alone doesn't break the build).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json next.config.ts mdx-components.tsx
git commit -m "chore: wire @next/mdx for library topic bodies"
```

---

### Task 4: `/library/[slug]` topic page template + placeholder body

**Files:**
- Create: `app/library/[slug]/page.tsx`
- Create: `content/library/_template.mdx`

**Interfaces:**
- Consumes: `library`, `LibraryItem` from `@/content` (Task 1); MDX imports (Task 3).
- Produces: statically generated topic pages for every item with `slug`. The `_template.mdx` file is draft-only: no catalog item references it, but the route renders it at `/library/_template` for template verification.

- [ ] **Step 1: Create `content/library/_template.mdx`**

```mdx
This is the topic-page template. Replace this file's content when writing a
real explainer; the page header (title, tags, dates, license) comes from the
item's entry in `content.ts`, not from this file.

## A section heading

Body text renders in the site's body font with a readable measure. Links
[look like this](https://www.aisafetysaidsimply.com). Lists work:

- one point
- another point

## Sources

- Author, "Title", Publication, Year.
```

- [ ] **Step 2: Create `app/library/[slug]/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify build and rendered output**

Run: `npm run build`
Expected: PASS, with `/library/_template` in the route list (`● /library/[slug]`).

Run (dev server port as reported):
`curl -s http://localhost:<port>/library/_template | grep -c "CC BY 4.0"`
Expected: `1` or more.

`curl -s -o /dev/null -w "%{http_code}\n" http://localhost:<port>/library/nonexistent`
Expected: `404`.

- [ ] **Step 4: Commit**

```bash
git add content/library/_template.mdx app/library
git commit -m "feat: /library/[slug] topic page template (MDX + trust header)"
```

---

### Task 5: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Clean build + route inventory**

Run: `npm run build`
Expected: routes `/`, `/team`, `/library/[slug]` all static, zero TypeScript or lint errors.

- [ ] **Step 2: Browser check (manual, with the user)**

On the dev server: search narrows the grid (query "sleeper" → 1 card; alias query "pretend to be safe" → sleeper agents card); format+audience chips AND across rows, OR within; empty state offers a working reset; the rewardhacking.org card still links out with ↗; `/library/_template` renders the styled template; mobile width (~375px) shows no horizontal scroll.

- [ ] **Step 3: Hand off for deploy**

Do not deploy. Tell the user the feature is ready and that `vercel deploy --prod` publishes it; note `/library/_template` will be publicly reachable (harmless, unlisted) and can be removed from `DRAFT_SLUGS` before the first real topic ships.
