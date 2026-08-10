# AI Safety Said Simply Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a single-page Next.js landing site for AI Safety Said Simply: hero, why-this-exists, library grid, for-institutions, get-involved, footer.

**Architecture:** One route (`/`) assembled from per-section components under `components/`. All copy and library items live in one typed file `content.ts`. The newsletter form is the only client component; it calls a clearly marked stub `subscribe()` seam.

**Tech Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed later to Vercel.

## Global Constraints

- Repo: `~/aisafety-said-simply`, branch `main`, remote `github.com/kaustubhkislay/aisafety-said-simply`.
- Contact email everywhere: `kaustubh.kislay@gmail.com` (mailto links).
- Design direction: clean institutional — restrained palette, strong typography, serious but not academic. Whoever implements the UI tasks MUST load the `hallmark` design skill first and may refine the Tailwind classes given here, but MUST NOT change structure, copy, or content model.
- No real email-service integration; `subscribe()` is a stub returning success.
- No extra routes, no CMS, no porting of rewardhacking.org content.
- Verification per UI task: `npm run build` passes. Final task adds browser screenshots at mobile/desktop widths.
- There is no unit-test framework in this project. The test cycle for each task is `npm run build` (type-checks all files) plus rendering checks in the final task. Do not add vitest/jest.

---

### Task 1: Scaffold Next.js app

**Files:**
- Create: entire app via `create-next-app` (app/, package.json, tsconfig.json, etc.)
- Modify: `app/page.tsx`, `app/layout.tsx` (strip boilerplate)
- Delete: `app/favicon.ico` boilerplate references in README only if broken; keep favicon.

**Interfaces:**
- Consumes: nothing.
- Produces: a building Next.js app; `app/layout.tsx` exporting default `RootLayout`; `app/page.tsx` exporting default `Home`.

- [ ] **Step 1: Scaffold into the existing repo**

```bash
cd ~/aisafety-said-simply
npx create-next-app@latest . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```

If `create-next-app` refuses because the directory is non-empty (it contains `docs/` and `.git/`), scaffold into a temp dir and move files in:

```bash
npx create-next-app@latest /private/tmp/claude-501/-Users-kaustubhkislay/73957dac-8236-44fd-a0df-1a23f9f45810/scratchpad/aiss-scaffold --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
rsync -a --exclude .git /private/tmp/claude-501/-Users-kaustubhkislay/73957dac-8236-44fd-a0df-1a23f9f45810/scratchpad/aiss-scaffold/ ~/aisafety-said-simply/
cd ~/aisafety-said-simply && npm install
```

- [ ] **Step 2: Replace boilerplate page with a stub**

`app/page.tsx`:

```tsx
export default function Home() {
  return <main>AI Safety Said Simply</main>;
}
```

- [ ] **Step 3: Set metadata in `app/layout.tsx`**

Keep the generated file but set:

```tsx
export const metadata: Metadata = {
  title: "AI Safety Said Simply",
  description:
    "Complex AI safety topics, explained in short, engaging forms — explainers, demos, and videos for policymakers, journalists, educators, and the public.",
};
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: compiles with no errors, `/` route static.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js app with Tailwind"
```

---

### Task 2: Content model and copy (`content.ts`)

**Files:**
- Create: `content.ts` (repo root, imported as `@/content`)

**Interfaces:**
- Consumes: nothing.
- Produces (later tasks import these exact names from `@/content`):
  - `type Format = "Explainer" | "Demo" | "Video"`
  - `type LibraryItem = { title: string; hook: string; formats: Format[]; status: "live" | "in-production"; url?: string }`
  - `const site: { name: string; tagline: string; description: string; contactEmail: string }`
  - `const audiences: { audience: string; problem: string }[]` (3 items)
  - `const theoryOfChange: string`
  - `const library: LibraryItem[]` (1 live + 9 in-production)

- [ ] **Step 1: Write `content.ts` in full**

```ts
export type Format = "Explainer" | "Demo" | "Video";

export type LibraryItem = {
  title: string;
  hook: string;
  formats: Format[];
  status: "live" | "in-production";
  url?: string;
};

export const site = {
  name: "AI Safety Said Simply",
  tagline: "Complex AI safety topics, explained in forms people actually finish.",
  description:
    "Short explainers, interactive demos, and videos on the ideas that matter in AI safety — built for policymakers, journalists, educators, and anyone without hours to spare.",
  contactEmail: "kaustubh.kislay@gmail.com",
};

export const audiences = [
  {
    audience: "Policymakers",
    problem:
      "Memos and demos are how policy offices learn and brief others. Most AI safety material is too long and too technical to use that way.",
  },
  {
    audience: "Educators",
    problem:
      "Digestible teaching material on AI safety is scattered across platforms — and for many topics, it simply doesn't exist.",
  },
  {
    audience: "The public",
    problem:
      "Nobody comes home from work and reads a dense 5,000-word technical post. The good material caters to people who already understand it.",
  },
];

export const theoryOfChange =
  "Lower the barrier to entry, and the ideas travel: more people who matter understand AI safety, and the conversation shifts in its favor.";

export const library: LibraryItem[] = [
  {
    title: "Reward hacking, in the wild",
    hook: "Real, documented cases of AI systems gaming their objectives — searchable and severity-rated.",
    formats: ["Explainer", "Demo"],
    status: "live",
    url: "https://rewardhacking.org",
  },
  {
    title: "Sleeper agents & secret loyalties",
    hook: "How a model can behave perfectly in testing while carrying hidden goals for later.",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "AI control",
    hook: "Getting useful work out of AI systems we don't fully trust — and catching them if they defect.",
    formats: ["Explainer", "Demo"],
    status: "in-production",
  },
  {
    title: "Eval awareness & eval gaming",
    hook: "What happens when a model can tell it's being tested — and acts accordingly.",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "Chain-of-thought unfaithfulness",
    hook: "A model's written reasoning doesn't always reflect why it actually did what it did.",
    formats: ["Explainer", "Video"],
    status: "in-production",
  },
  {
    title: "Bio & cyber uplift",
    hook: "How much easier do frontier models make it to cause serious harm — and how we measure that.",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "Compute verification",
    hook: "How treaties on AI could actually be enforced: verifying what chips are doing, and where.",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "Safeguards & classifiers",
    hook: "The filters wrapped around AI models — what they catch, what they miss, and why it's hard.",
    formats: ["Explainer", "Demo"],
    status: "in-production",
  },
  {
    title: "Self-fulfilling misalignment",
    hook: "Could writing about treacherous AI teach future models to be treacherous?",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "Value reflection",
    hook: "If an AI could revise its own values, where would they settle — and would we like the result?",
    formats: ["Explainer"],
    status: "in-production",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run build`
Expected: PASS (file compiles; unused-export warnings are fine).

- [ ] **Step 3: Commit**

```bash
git add content.ts && git commit -m "feat: add typed site content"
```

---

### Task 3: Design foundation (load hallmark skill first)

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: CSS custom properties/Tailwind theme tokens and fonts that all section components use; `RootLayout` applies body font and background.

- [ ] **Step 1: Load the `hallmark` design skill** and design a clean-institutional system: restrained palette (near-black ink, warm paper background, one accent — e.g. a deep blue), a serif display font paired with a sans body via `next/font` (e.g. Source Serif 4 + Inter, or what hallmark guidance yields), spacing scale, max-width container. Record tokens in `app/globals.css` under Tailwind v4 `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-ink: #1a1a1a;
  --color-paper: #faf9f6;
  --color-accent: #1e3a8a;
  --color-muted: #6b6b6b;
  --color-line: #e5e2da;
}
```

(Exact values may be refined per hallmark; names `ink/paper/accent/muted/line` are fixed — later tasks use classes like `text-ink`, `bg-paper`, `text-accent`, `border-line`.)

- [ ] **Step 2: Wire fonts in `app/layout.tsx`** using `next/font/google`, exposing CSS variables `--font-display` and `--font-body`, applied on `<body className="bg-paper text-ink font-body antialiased">`. Map them in `@theme`: `--font-display: var(--font-source-serif)`, `--font-body: var(--font-inter)` so `font-display`/`font-body` utility classes exist.

- [ ] **Step 3: Verify build**

Run: `npm run build` — Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx && git commit -m "feat: design tokens and typography foundation"
```

---

### Task 4: Hero and Why sections

**Files:**
- Create: `components/Hero.tsx`, `components/Why.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `site`, `audiences`, `theoryOfChange` from `@/content`; tokens from Task 3.
- Produces: `Hero` and `Why` server components (no props), rendered by `app/page.tsx`. Anchor ids: `#library`, `#updates` targeted by hero buttons.

- [ ] **Step 1: Write `components/Hero.tsx`**

```tsx
import { site } from "@/content";

export default function Hero() {
  return (
    <header className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
      <p className="text-sm uppercase tracking-widest text-muted">{site.name}</p>
      <h1 className="mt-6 font-display text-4xl leading-tight sm:text-6xl">
        {site.tagline}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{site.description}</p>
      <div className="mt-10 flex justify-center gap-4">
        <a href="#library" className="rounded bg-accent px-6 py-3 text-paper">
          Explore the library
        </a>
        <a href="#updates" className="rounded border border-line px-6 py-3">
          Get updates
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Write `components/Why.tsx`**

```tsx
import { audiences, theoryOfChange } from "@/content";

export default function Why() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-display text-3xl">Why this exists</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {audiences.map(({ audience, problem }) => (
          <div key={audience}>
            <h3 className="font-semibold text-accent">{audience}</h3>
            <p className="mt-2 text-muted">{problem}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 border-l-2 border-accent pl-4 text-lg">{theoryOfChange}</p>
    </section>
  );
}
```

- [ ] **Step 3: Render both in `app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Why from "@/components/Why";

export default function Home() {
  return (
    <main>
      <Hero />
      <Why />
    </main>
  );
}
```

- [ ] **Step 4: Verify build** — `npm run build`, expected PASS.

- [ ] **Step 5: Commit**

```bash
git add components app/page.tsx && git commit -m "feat: hero and why sections"
```

---

### Task 5: Library grid

**Files:**
- Create: `components/Library.tsx`
- Modify: `app/page.tsx` (add `<Library />` after `<Why />`)

**Interfaces:**
- Consumes: `library`, `LibraryItem`, `Format` from `@/content`.
- Produces: `Library` server component (no props), section id `#library`.

- [ ] **Step 1: Write `components/Library.tsx`**

Requirements the code must satisfy:
- `<section id="library">` with heading "The library".
- Card grid (`grid gap-6 sm:grid-cols-2 lg:grid-cols-3`).
- The live item renders as an `<a href={item.url} target="_blank" rel="noopener">` card, visually distinguished (accent border), with a "Live" badge and an outward-arrow affordance.
- In-production items render as non-link cards with an "In production" badge.
- Every card shows format tags as small pills.

```tsx
import { library } from "@/content";

export default function Library() {
  return (
    <section id="library" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-display text-3xl">The library</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {library.map((item) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span
                  className={
                    item.status === "live"
                      ? "text-xs font-semibold uppercase tracking-wide text-accent"
                      : "text-xs font-semibold uppercase tracking-wide text-muted"
                  }
                >
                  {item.status === "live" ? "Live" : "In production"}
                </span>
                {item.status === "live" && <span aria-hidden>↗</span>}
              </div>
              <h3 className="mt-3 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.hook}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.formats.map((f) => (
                  <span key={f} className="rounded-full border border-line px-2 py-0.5 text-xs">
                    {f}
                  </span>
                ))}
              </div>
            </>
          );
          return item.status === "live" && item.url ? (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener"
              className="block rounded-lg border border-accent p-6 transition-shadow hover:shadow-md"
            >
              {inner}
            </a>
          ) : (
            <div key={item.title} className="rounded-lg border border-line p-6">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** after `<Why />`: `<Library />` (import from `@/components/Library`).

- [ ] **Step 3: Verify build** — `npm run build`, expected PASS.

- [ ] **Step 4: Commit**

```bash
git add components/Library.tsx app/page.tsx && git commit -m "feat: library grid"
```

---

### Task 6: Institutions, Get involved (signup form), Footer

**Files:**
- Create: `components/Institutions.tsx`, `components/GetInvolved.tsx`, `components/SignupForm.tsx`, `components/Footer.tsx`, `lib/subscribe.ts`
- Modify: `app/page.tsx` (append the three sections)

**Interfaces:**
- Consumes: `site` from `@/content`.
- Produces:
  - `subscribe(email: string): Promise<void>` in `lib/subscribe.ts` — the marked seam.
  - `Institutions`, `GetInvolved`, `Footer` server components (no props); `SignupForm` client component (no props). Section id `#updates` lives on the GetInvolved section.

- [ ] **Step 1: Write `lib/subscribe.ts`**

```ts
// SEAM: newsletter integration. Replace the body with a real call
// (e.g. Buttondown/Mailchimp API route) when a service is chosen.
export async function subscribe(email: string): Promise<void> {
  void email;
  return Promise.resolve();
}
```

- [ ] **Step 2: Write `components/SignupForm.tsx`** (client component)

```tsx
"use client";

import { useState } from "react";
import { subscribe } from "@/lib/subscribe";

export default function SignupForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="text-accent">You're on the list. We'll be in touch.</p>;
  }

  return (
    <form
      className="flex gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        if (typeof email === "string" && email) {
          await subscribe(email);
          setDone(true);
        }
      }}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
        className="w-full rounded border border-line bg-white px-3 py-2"
      />
      <button type="submit" className="rounded bg-accent px-4 py-2 text-paper">
        Sign up
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Write `components/Institutions.tsx`**

```tsx
import { site } from "@/content";

export default function Institutions() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-3xl">For institutions</h2>
        <p className="mt-4 max-w-3xl text-muted">
          University AI safety groups, educators, and policy offices are how these
          materials reach the people who need them. Everything we publish is free to
          share — send it to your members, use it in your courses, hand it to your
          colleagues.
        </p>
        <a
          href={`mailto:${site.contactEmail}?subject=Distributing AI Safety Said Simply materials`}
          className="mt-6 inline-block rounded bg-accent px-6 py-3 text-paper"
        >
          Talk to us about distribution
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `components/GetInvolved.tsx`**

```tsx
import { site } from "@/content";
import SignupForm from "@/components/SignupForm";

export default function GetInvolved() {
  return (
    <section id="updates" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-display text-3xl">Get involved</h2>
      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="font-semibold">Contribute</h3>
          <p className="mt-2 text-muted">
            We're looking for writers, demo builders, and video makers who can make
            hard ideas simple.
          </p>
          <a
            href={`mailto:${site.contactEmail}?subject=Contributing to AI Safety Said Simply`}
            className="mt-4 inline-block text-accent underline"
          >
            Email us
          </a>
        </div>
        <div>
          <h3 className="font-semibold">Stay updated</h3>
          <p className="mt-2 text-muted">
            Get new explainers, demos, and videos as they're published.
          </p>
          <div className="mt-4">
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Write `components/Footer.tsx`**

```tsx
import { site } from "@/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted">
        <span>{site.name}</span>
        <a href={`mailto:${site.contactEmail}`} className="underline">
          {site.contactEmail}
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Assemble final `app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Why from "@/components/Why";
import Library from "@/components/Library";
import Institutions from "@/components/Institutions";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Why />
      <Library />
      <Institutions />
      <GetInvolved />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 7: Verify build** — `npm run build`, expected PASS.

- [ ] **Step 8: Commit**

```bash
git add components lib app/page.tsx && git commit -m "feat: institutions, get-involved, signup seam, footer"
```

---

### Task 7: Visual verification, polish pass, push

**Files:**
- Modify: any component/CSS files needing polish (structure and copy stay fixed).

**Interfaces:**
- Consumes: the full assembled page.
- Produces: verified, pushed site ready for Vercel import.

- [ ] **Step 1: Run the dev server** (`npm run dev`, background) and open `http://localhost:3000` in the browser (claude-in-chrome tools).

- [ ] **Step 2: Screenshot at desktop (~1280px) and mobile (~390px) widths.** Check: no horizontal overflow, hero buttons wrap on mobile, library grid collapses to one column, signup form usable, anchors `#library`/`#updates` scroll correctly, submitting the form shows the confirmation state.

- [ ] **Step 3: Polish pass with the hallmark skill loaded** — adjust spacing, type scale, and color values only where the screenshots show weakness. Re-screenshot after changes.

- [ ] **Step 4: Final build** — `npm run build`, expected PASS.

- [ ] **Step 5: Commit and push**

```bash
git add -A && git commit -m "polish: visual pass after screenshot review" && git push
```

- [ ] **Step 6: Report to the user** with screenshots, and note the manual step: import the repo at vercel.com/new to deploy (or grant permission to use the Vercel MCP tools to create the project).
