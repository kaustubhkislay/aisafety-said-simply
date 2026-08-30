# Library Search, Filters, and Per-Topic Pages — Design

Date: 2026-08-29
Status: approved in conversation, pending spec review

## Goal

Evolve the library from a static card grid into a searchable, filterable
catalog (the "aisafety.info × resource directory" direction), and give each
on-domain piece its own page with the trust features the audience needs:
dates, sources, license, and a one-pager slot.

Three deliverables:

1. Search and filters over the library grid on the homepage.
2. A per-topic page template at `/library/[slug]` for content hosted on this
   domain, rendered from MDX.
3. The content-model fields both of the above need.

## Content model (`content.ts`)

Extend `LibraryItem`:

```ts
export type Audience = "Policymakers" | "Educators" | "Public";

export type LibraryItem = {
  title: string;
  hook: string;
  formats: Format[];
  audiences: Audience[];          // new — powers the audience filter
  status: "live" | "in-production";
  slug?: string;                  // new — set when the piece lives on this domain
  url?: string;                   // external pieces (rewardhacking.org) keep this
  aliases?: string[];             // new — question-phrased search aliases, e.g.
                                  // "can AI pretend to be safe?" → sleeper agents
  readingMinutes?: number;        // new — shown on card and topic page
  updated?: string;               // new — ISO date, shown on topic page
};
```

Rules: an item has `slug` (on-domain) or `url` (external) or neither (in
production), never both. All ten current items get `audiences`; `aliases` are
added opportunistically. Existing items keep working with the new fields
optional.

## 1. Search + filters on the library grid

`components/Library.tsx` stays a server component wrapping a new client
component `components/LibraryBrowser.tsx` that receives the library array as
a prop and owns the interactive grid.

- **Search input** above the grid. Matching is plain case-insensitive token
  matching over `title + hook + aliases`, implemented in ~15 lines. No search
  dependency (Fuse/Pagefind) at 10 items — that is an upgrade path once
  full-text topic bodies exist, not a v1 need.
- **Filter chips** in two rows: format (Explainer / Demo / Video) and
  audience (Policymakers / Educators / Public). Chips toggle; active chips
  are violet (`bg-accent text-cream`), inactive are bordered. Multiple active
  chips within a row OR together; across rows they AND.
- **Result count + empty state**: "N of 10 topics" and a "no matches — clear
  filters" message with a reset control.
- Cards gain two small lines: format tags and, when present,
  `readingMinutes` ("~6 min").
- URL state (query params for filters) is out of scope for v1.

## 2. Per-topic page template — `/library/[slug]`

For pieces published on this domain. The flagship stays an external link;
the first real consumer is whichever in-production explainer ships first.

- **Route**: `app/library/[slug]/page.tsx` with `generateStaticParams` from
  items that have a `slug`. Unknown slugs 404.
- **Body**: MDX, one file per topic at `content/library/<slug>.mdx`, wired
  with `@next/mdx` (the repo's first MDX dependency). Frontmatter is NOT
  used — all metadata stays in `content.ts` so there is exactly one catalog.
- **Page header** (the trust block), top to bottom:
  - title (`font-display`), hook as a lede paragraph
  - a metadata row: format tags · audience tags · "~N min" ·
    "Updated <Month YYYY>" from `updated`
  - license line: "Free to share and adapt (CC BY 4.0)" — site-wide
    constant, rendered on every topic page
  - sources: each MDX body ends with an authored "Sources" section (no
    structured schema in v1)
  - a one-pager slot: `pdf?: string` on `LibraryItem`; when set, a
    "Download the one-pager (PDF)" button linking to a file in
    `public/onepagers/`. PDF *generation* is out of scope — files are
    produced manually and dropped in.
- **Typography**: MDX body gets a `max-w-prose` measure and the existing
  token styles via a small `mdx-components.tsx` mapping (headings serif,
  links violet).
- **Metadata**: `generateMetadata` emits per-topic title, description
  (hook), and Open Graph tags so shared links get real preview cards.
- **Card behavior change**: a card with `slug` links to `/library/<slug>`
  internally; a card with `url` keeps linking out with ↗.
- Ship the route with one placeholder MDX file marked draft-only
  (excluded from the catalog until real content exists) so the template is
  exercised by the build.

## 3. License

Add the CC BY 4.0 line to the footer as well ("Content is free to share —
CC BY 4.0"), linking to the license deed. This makes the site-wide claim
the Institutions section already implies explicit.

## Out of scope (deliberate)

- Dedicated `/library` index route — the homepage grid remains the index
  until the catalog passes ~15 items.
- Full-text search over MDX bodies (Pagefind upgrade path).
- PDF generation, glossary, RSS, feedback widgets, analytics.
- Filter state in the URL.
- Search-engine question routing beyond the `aliases` field.

## Verification

- `next build` passes; `/library/<placeholder-slug>` renders the template.
- Searching "sleeper" or an alias phrase narrows the grid; chip filters
  AND/OR as specified; empty state and reset work.
- External flagship card still links out; a slugged card routes internally.
- Page renders correctly at mobile and desktop breakpoints.
