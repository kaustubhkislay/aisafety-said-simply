# AI Safety Said Simply — Landing Page Design

Date: 2026-08-09
Status: Approved pending user review

## Purpose

A one-page website for the new organization **AI Safety Said Simply**. The site has two jobs at launch:

1. **Credibility** — show grant makers, collaborators, and distribution partners that the org is real and its plan is clear.
2. **Content hub** — show what the org produces, with one live flagship (rewardhacking.org) and a library of topics in production.

The org produces short, digestible AI safety explainers, demos, and videos for the general public, policymakers, journalists, and educators. A core distribution mechanism is institutional redistribution (university AI safety groups, educators, policy offices).

## Page structure (single route, top to bottom)

1. **Hero** — org name, one-sentence promise ("Complex AI safety topics, explained in forms people actually finish"), two buttons: "Explore the library" (anchor to Library) and "Get updates" (anchor to signup form).
2. **Why this exists** — three short problem statements matched to audiences:
   - Policymakers use memos and demos to inform themselves and brief others.
   - Educators cannot find digestible material — it is scattered or does not exist.
   - The public and busy professionals will not read 5,000-word technical posts.
   Ends with the theory of change in one line: lower the barrier to entry, raise the salience of AI safety, shift the Overton window.
3. **Library** — a card grid.
   - One **live** card: rewardhacking.org (flagship, links out, format tag "Explainer + Demo").
   - Eight to ten **"In production"** topic cards, each with a one-line hook and a format tag (Explainer / Demo / Video). Topics: sleeper agents & secret loyalties, AI control, eval awareness & eval gaming, chain-of-thought unfaithfulness, bio/cyber uplift, compute verification, safeguards & classifiers, self-fulfilling misalignment, value reflection.
4. **For institutions** — the redistribution pitch aimed at university AI safety groups, educators, and policy offices. "These materials are free to share." Contact CTA.
5. **Get involved** — two side-by-side asks:
   - **Contribute**: call for writers, demo builders, video makers (mailto link).
   - **Stay updated**: email signup form.
6. **Footer** — contact email, minimal links.

## Calls to action

- **Newsletter signup**: v1 form does not post to a real service. On submit it shows a "you're on the list" confirmation state. Leave a clearly marked seam (one function) to wire in Buttondown/Mailchimp later.
- **Contribute / Contact**: `mailto:kaustubh.kislay@gmail.com` links.
- **Distribute**: its own page section (For institutions), contact CTA.

## Design direction

**Clean institutional.** Restrained palette, strong typography, serious but not academic. Credible to policymakers and journalists. The Hallmark design skill is used at build time. The site must be responsive at all breakpoints.

## Technical shape

- **Stack**: Next.js (App Router) + TypeScript + Tailwind CSS.
- **Repo**: `~/aisafety-said-simply`, hosted on GitHub.
- **Routes**: one (`/`). Components split per page section under `components/`.
- **Content model**: all library topics and copy blocks live in one typed file `content.ts`. Adding a library item is adding one object. Fields per item: title, hook, format tag(s), status (`live` | `in-production`), optional external URL.
- **Hosting**: Vercel, at a `.vercel.app` URL for now. Custom domain later (none bought yet).

## Out of scope (deliberate)

- Multi-page routes (library, about, contribute pages) — the single page grows instead.
- Porting rewardhacking.org content into this repo — link out to the live site.
- Real email-service integration — seam only.
- CMS of any kind.

## Verification

- `next build` passes with no errors.
- Page renders correctly at mobile, tablet, and desktop breakpoints.
- Screenshot the running page in the browser before calling the work done.
