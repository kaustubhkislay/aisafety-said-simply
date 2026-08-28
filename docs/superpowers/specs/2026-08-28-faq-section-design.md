# FAQ Section — Design

Date: 2026-08-28
Status: approved in conversation, pending spec review

## Goal

Add an FAQ section to the single-page landing site. It answers the six most likely
visitor questions and reuses the site's existing design tokens and section style.

## Content

Add a typed `faq` array to `content.ts`:

```ts
export type FaqItem = { q: string; a: string };
export const faq: FaqItem[] = [ /* six items */ ];
```

The six entries (final copy lives in `content.ts`; drafted from existing site copy):

1. **What is AI Safety Said Simply?** — Mission in two sentences: short, accurate
   explainers, demos, and videos on AI safety topics, built for people without hours
   to spare.
2. **Who is this for?** — Policymakers, educators, and the general public; echoes the
   Why section.
3. **Aren't there already good AI safety explainers?** — The gap is length and
   technicality: good material exists but caters to people who already understand it.
4. **What formats do you make?** — Explainers, interactive demos, and videos; one topic
   can ship in several formats.
5. **When do the in-production topics ship?** — No dates promised; subscribe in the
   updates section to hear when each one goes live.
6. **How can I help?** — Points to the Get involved section and the contact email.

Answers stay to one short paragraph each. No links inside answers except the contact
email in item 6.

## Component

New file `components/Faq.tsx`. Server component (no state needed): each item renders as
a native `<details>` element with a `<summary>` question row.

- Native `<details>`/`<summary>` provides expand/collapse, keyboard support, and screen-
  reader semantics with zero JavaScript state.
- Multiple items may be open at once; no single-open enforcement.
- Styling reuses existing tokens: `border-line` row dividers, `font-display` for
  questions, `text-muted` for answers, section header in the same style as Why and
  Library (`font-mono` uppercase kicker plus heading).
- Section wrapper: `id="faq"`, same `mx-auto max-w-5xl px-6` container as other
  sections.

## Placement

In `app/page.tsx`, insert `<Faq />` between `<GetInvolved />` and `<Footer />`.

## Out of scope

- No FAQ schema.org structured data.
- No animation on expand/collapse.
- No tests (repo has none; component is declarative markup over static content).
