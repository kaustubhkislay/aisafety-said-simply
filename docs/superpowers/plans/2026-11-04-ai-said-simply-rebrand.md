# AI Said Simply Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task, or superpowers:subagent-driven-development if the user chooses delegation. Steps use checkbox syntax for tracking.

**Goal:** Rename AI Safety Said Simply to AI Said Simply and move its public website and email to aisaidsimply.com, while preserving its content and mission.

**Architecture:** Keep the existing Next.js application, Vercel project, article routes, Google Forms, and Resend contact segment. Prepare the website and assets in a preview. Establish the new email addresses before the public switch, then redirect the old website and update external references.

**Tech Stack:** Next.js 16.3.0, React 19.2.8, TypeScript, Tailwind CSS, MDX, Vercel, Resend, Google Forms, and Fillout.

**Spec:** The confirmed brief and proposed defaults below record the requirements from this chat. They form the specification for this plan.

## Confirmed brief

The user owns aisaidsimply.com. The new public name is **AI Said Simply**. The purpose is to reduce the political association of the name. The content, topic priorities, audiences, and editorial mission remain the same.

This request authorizes a plan. It does not initiate the production migration or send an announcement.

### Proposed defaults for this plan

These are implementation recommendations, not additional user requirements.

| Item | Proposed value |
| --- | --- |
| Primary website | `https://aisaidsimply.com` |
| Alternate website | `https://www.aisaidsimply.com`, redirected to the primary website |
| Visible wordmark | `AI Said Simply`, using the full name |
| Hero headline | `Complex AI topics, said simply.` |
| Introductory description | `Short explainers, interactive demos, and videos about AI risks and how to address them — for policymakers, journalists, educators, and the public.` |
| Visual design | Retain the yarn symbol, Helvetica, Redaction hero font, colors, and layout. Adjust the wordmark width and navigation as needed. |
| Contact address | `contact@aisaidsimply.com` |
| Team addresses | `kaustubh@aisaidsimply.com` and `christine@aisaidsimply.com` |
| Newsletter sender | `AI Said Simply <hello@updates.aisaidsimply.com>` |
| Transition note | `AI Safety Said Simply is now AI Said Simply. Our team and editorial focus remain the same.` |
| Transition duration | Show the note for 90 days after launch. Retain old website redirects for at least one year, preferably longer. |

## Global constraints

- Preserve the articles, library entries, topic filters, research claims, author biographies, citations, and editorial standards.
- Retain accurate uses of “AI safety” as a subject or field. Replace brand references deliberately; never replace every occurrence of “safety”.
- Preserve all article paths and fragment identifiers, including `/library/evaluation-awareness`.
- Preserve the existing Resend segment ID, contact IDs, unsubscribe preferences, and newsletter signing secret.
- Preserve Google Form IDs, field IDs, response destinations, permissions, and the confirmation text that the application checks.
- Keep the media guide private. A rebrand must not publish its document link or change who can access it.
- Do not create a second website, repository, mailing list, or set of social accounts merely for the rename.
- Leave technical repository and Vercel project names unchanged during the launch. Their names do not control the public brand.
- Keep historical plans, source citations, license notices, and third-party organization names intact.
- Make no framework upgrades, new content program, or unrelated redesign part of this work.

## Review focus

1. Old article links must reach the corresponding new page with their query parameters and section fragments. Verify this during Task 6.
2. A valid confirmation link issued before launch must still confirm after the redirect. Verify this during Tasks 4 and 6.
3. New-domain forms must pass the existing origin checks, preserve text on failure, and use the correct destinations. Verify this during Tasks 4 and 6.
4. Search metadata must point to each actual new page. Drafts, confirmation pages, and external resources must not enter the sitemap. Verify this during Tasks 2 and 6.
5. The longer wordmark must remain readable in mobile navigation, the footer, and exported documents. Verify this during Tasks 2 and 3.

## Current inventory and access

The local working tree was clean before this plan. The website stores its main content in `content.ts`, but other files also contain the old identity.

The local Vercel link identifies project `prj_pp4AGLvroMMuxh0YZSUV4nOYA2bg` in team `team_NvrChHp6AaThMqI5fvfdLvl7`. The connected Vercel tool returned a team-access error during the planning check. Live domain assignments and redirects remain unverified. Resolve that access before configuration work; do not infer the registrar or email host from the local files.

| Surface | Known location | Action |
| --- | --- | --- |
| Website | `/Users/kaustubhkislay/aisafety-said-simply` | Prepare changes locally and in a preview. |
| Domain and hosting | Existing Vercel project; registrar and authoritative DNS provider require inspection | Add the owned domain and preserve existing records. |
| Newsletter | Resend; `docs/mailing-list.md` | Verify the new sending domain and retain the current segment. |
| Team mail | Three old-domain addresses in `content.ts` | Identify the inbound email provider and add new aliases or mailboxes. |
| Shared Drive folder | [Project folder](https://drive.google.com/drive/u/0/folders/1IvHd0I2AbSX4daR6VutvwHYQtzhdflvJ) | Rename current brand materials without changing access. |
| Feedback form | [Google Form](https://docs.google.com/forms/d/1AH95p-s7_zN1IGlxcCPqw6LXXrsMUNEv2iLgHPthCsQ/edit) | Update the title and brand text. |
| Team-interest form | [Google Form](https://docs.google.com/forms/d/14-Xn_bJ7bkyjamfOmpTmSZMSFEEm7qEsMy5BB_IFblY/edit) | Update the title and brand text. |
| Careers application | [Fillout form](https://forms.fillout.com/t/iiTZxSnf9tus) | Update the brand, contact address, and confirmation text where applicable. |
| Role description | [Google document](https://docs.google.com/document/d/1qVayZeIUpKDIa7NQgneNNaFxvQI3dYxt6IwctKqUecM/edit) | Rename the organization; preserve the role and subject matter. |
| Social accounts | [LinkedIn](https://www.linkedin.com/company/ai-safety-said-simply/) and [X](https://x.com/AISafetySimply) | Retain accounts and followers; update names, graphics, biographies, and links. |
| Additional social channels | YouTube, Substack, and Instagram appear as inactive placeholders in the local contact page | Check whether actual accounts now exist before adding links. |
| External listings | [SPAR](https://www.sparai.org/projects/f26/recK4NKaFBvAEznFB/), [WAISI](https://waisi.org/research), and the personal website | Update controlled pages and prepare exact requests for other owners. |

## Task 1: Record the migration baseline

**Deliverable:** A verified inventory and a recovery record.

**Files:** Read `AGENTS.md`, `docs/brand-direction.md`, `docs/mailing-list.md`, `docs/media-guide.md`, and the current deployment configuration. Create `docs/rebrand-launch-checklist.md` during implementation.

**Interfaces:** This task supplies the deployment ID, domain records, service owners, and verified account links needed by Tasks 4–6. Record references to secrets, never their values.

- [ ] Record the current Git commit and production deployment ID before changes.
- [ ] Resolve the Vercel team access error through the connection's team-authorization flow.
- [ ] Inspect both domains, their authoritative DNS providers, current redirects, certificate status, and inbound email provider.
- [ ] Record the current Resend segment identity and subscriber totals without exporting contact details into the repository.
- [ ] Inventory current public documents, logo packages, social accounts, and brand references in the shared folder.
- [ ] Record whether production deploys automatically from the current branch. Use a working branch and preview for implementation.
- [ ] Run `node --test tests/*.test.mjs`, `npm run lint`, and `npm run build -- --webpack` to establish the baseline. Record any pre-existing failures separately.

**Acceptance:** Every service has an identified owner or an explicit access task. The previous deployment and domain configuration can be recovered.

## Task 2: Prepare website identity and search metadata

**Deliverable:** A preview with the new identity and unchanged articles.

**Files:**

- Modify `content.ts`, `components/BrandLogo.tsx`, `components/Hero.tsx`, `components/Institutions.tsx`, `components/Footer.tsx`, and `components/Nav.tsx` if the longer wordmark needs layout changes.
- Modify `app/layout.tsx`, `app/page.tsx`, `app/library/page.tsx`, `app/library/[slug]/page.tsx`, `app/team/page.tsx`, `app/contact/page.tsx`, `app/careers/page.tsx`, and `app/media-guide/page.tsx`.
- Create `app/sitemap.ts` and `app/robots.ts`.
- Update the active guidance in `docs/brand-direction.md`.

**Interfaces:** Extend the existing `site` object in `content.ts` with `url: "https://aisaidsimply.com"`. Reuse `site.name`, `site.tagline`, `site.description`, and `site.contactEmail` across the application. Tasks 3–4 use those same public values.

- [ ] Read the installed Next.js metadata documentation before edits, as `AGENTS.md` requires.
- [ ] Set the brand fields to the proposed defaults above. Replace the header and footer abbreviation with the full name.
- [ ] Replace organization-name references in page titles, recruitment text, accessibility labels, email subjects, and link descriptions. Preserve subject references to AI safety.
- [ ] Add the transition note beneath the footer description. Record its planned removal date in the launch checklist.
- [ ] Set `metadataBase` from `site.url`. Give each public page its own canonical address, which tells search engines that page's preferred URL. Do not make every page inherit the homepage as its canonical address.
- [ ] Update article metadata without changing article bodies, authors, dates, paths, or section identifiers.
- [ ] Implement `sitemap(): MetadataRoute.Sitemap` in `app/sitemap.ts`. Include the six public pages and live local library items with a `slug`. Exclude external items, drafts, and subscription confirmation pages.
- [ ] Implement `robots(): MetadataRoute.Robots` in `app/robots.ts` with the new sitemap address. Allow public pages, exclude API paths, retain confirmation-page `noindex`, and apply `noindex` to the draft template.
- [ ] Review the homepage, contact page, library, and article at mobile and desktop widths. Check navigation, logo contrast, and complete visible text.
- [ ] Inspect the rendered metadata and sitemap. Every public canonical must point to its own new-domain page; no draft or external URL may appear in the sitemap.
- [ ] Review the content diff. The library entries, article bodies, research descriptions, and team biographies must remain substantively unchanged.

**Acceptance:** The preview consistently uses AI Said Simply. It still describes the same work, and the existing articles remain intact.

## Task 3: Rebuild the reusable brand assets

**Deliverable:** Matching website, social, and document assets.

**Files:** Modify `brand-package/README.md` and `brand-package/documents/Read-me.md`. Replace the current `AISSS-logo-*` exports with `AI-Said-Simply-logo-black.svg`, `AI-Said-Simply-logo-white.svg`, and matching PNG files. Replace the current document templates with `AI-Said-Simply-Template.docx` and `.dotx`.

**Interfaces:** Use the full wordmark and retained visual design from Task 2. Keep the existing standalone yarn icon and license files.

- [ ] Produce black and white full-name logos with transparent backgrounds and outlined text.
- [ ] Export matching PNG files. Inspect both versions on light and dark surfaces.
- [ ] Update Word template headers, footers, document properties, example text, contact details, and branded style names. Use the document skill when editing these files.
- [ ] Render the templates and inspect every page for clipping and page-break changes.
- [ ] Prepare profile banners and video title/end-card templates for channels identified in Task 1. Preserve published articles and recordings; update editable descriptions and current templates.
- [ ] Inspect existing share images, downloads, and packaged archives for visible old branding. Regenerate only affected assets, and preserve any public download path through an alias or redirect.
- [ ] Update the brand instructions to describe the new wordmark proportions. Package the revised assets with the existing font and icon licenses.

**Acceptance:** The downloadable package and preview show the same identity. No current template introduces the old brand as the active organization.

## Task 4: Prepare domain, email, and form compatibility

**Deliverable:** Verified new-domain services that can support the launch.

**Files:** Modify the email addresses in `content.ts`, plus `app/api/subscribe/route.ts`, `components/ConfirmSubscription.tsx`, `app/subscribe/confirm/page.tsx`, `app/api/media-guide/route.ts`, `components/MediaGuideRequestForm.tsx`, and `app/api/team-interest/route.ts`. Update `docs/mailing-list.md`, `tests/newsletter.test.mjs`, and `tests/media-guide-route.test.mjs`. Inspect the existing feedback and team-interest tests.

**Interfaces:** Preserve the `/api/subscribe` request and response format, token format, origin checks, segment ID, and signing secret. Set `RESEND_FROM` and `NEWSLETTER_SITE_URL` to the proposed new values only after the services are ready.

- [ ] Attach the new apex and `www` domains to the existing Vercel project without changing the old-domain redirects yet.
- [ ] Configure the exact DNS records that Vercel returns. Preserve mail records and verification records. Confirm ownership and HTTPS before traffic changes. [Vercel domain instructions](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [ ] Create the three new inbound addresses with the current email provider. Keep all old addresses active and mapped to the same recipients.
- [ ] Set the prepared website's contact address and both founders' email addresses to their verified new values. Preserve all other team details.
- [ ] Verify `updates.aisaidsimply.com` in Resend using its provider-supplied records. Keep inbound mail routing separate from the newsletter sender. [Resend domain guidance](https://resend.com/docs/dashboard/domains/introduction)
- [ ] Rename the existing Resend segment's display label where supported. Keep its ID and all subscription preferences.
- [ ] Configure the verified sender for the preview tests. Keep production settings unchanged until Task 6, and keep previews out of search results.
- [ ] Update confirmation email branding, reply-to, confirmation-page copy, media-guide request subject, and fallback contact messages. Ensure the contact address comes from the shared site configuration.
- [ ] Extend the newsletter tests to assert the new confirmation URL and reply address. If the route imports `@/content`, extend the test's TypeScript import replacement as the media-guide test already does.
- [ ] Update the media-guide test to expect `contact@aisaidsimply.com` and `Media guide request — AI Said Simply`.
- [ ] Test valid new-domain requests, invalid origins, unsubscribed contacts, and a pre-migration token with the unchanged signing secret. Keep existing failure and privacy tests.
- [ ] Verify that the new inbound addresses receive mail and the new sender delivers. Use Resend's test recipient for automated delivery checks. Send human-addressed test messages only with explicit authorization.
- [ ] Verify that the native Google Forms integrations retain the same IDs and visible success strings. Do not make form renames change their integration contract.

**Acceptance:** New email addresses and the sender work. Existing subscribers retain their preferences, and old valid tokens remain valid.

## Task 5: Prepare external account and material changes

**Deliverable:** Ready-to-apply profile changes, updated private source materials, and exact requests for third-party owners.

**Files:** Track each item and its status in `docs/rebrand-launch-checklist.md`. Related repositories: `/Users/kaustubhkislay/website-1` and `/Users/kaustubhkislay/waisi.org-1`; read their own instructions before changes.

**Interfaces:** Use the identity, links, addresses, and graphics from Tasks 2–4. Keep existing external resource IDs and account ownership.

- [ ] Update the shared folder and current document/template titles. Preserve access permissions and response data.
- [ ] Prepare the Google Forms, Fillout form, and role-description edits. Keep the role's AI safety focus and all existing application questions.
- [ ] Check availability of `@AISaidSimply` and an equivalent LinkedIn page address. Prefer the existing accounts even when an exact new handle is unavailable. Record the verified final URLs before changing website links.
- [ ] Prepare the LinkedIn and X display names, biographies, banners, and website links. Add “Formerly AI Safety Said Simply” for the transition period.
- [ ] Update other established channels discovered in Task 1. Keep inactive website placeholders inactive when no account exists.
- [ ] Prepare the personal website change in `website-1/src/app/page.tsx`. Locate the current WAISI entry and its content source before preparing that change.
- [ ] Prepare a SPAR listing request with the new project title and URL. Preserve the cohort's original scope and commitments.
- [ ] Prepare the announcement using the exact transition note from this plan. Do not send emails, messages, or partner requests without explicit authorization.

**Acceptance:** Every known external reference has a prepared edit or an identified owner. No step requires replacement accounts or a new mailing list.

## Task 6: Verify and launch in order

**Deliverable:** The new domain serves the rebranded site, with working old links and services.

**Files and systems:** The prepared application and assets, Vercel domain settings, production environment variables, search-console properties, and the launch checklist.

**Interfaces:** Requires Tasks 2–4 to pass. Task 5 supplies coordinated public edits and draft communications.

- [ ] Run `node --test tests/*.test.mjs`, `npm run lint`, and `npm run build -- --webpack`. Record the results for the release commit.
- [ ] Scan active source and assets for `AI Safety Said Simply`, `AISSS`, `aisafetysaidsimply.com`, and `AISafetySimply`. Classify remaining matches as intentional history, transition text, redirects, or pending external handles. Do not use “zero matches” as the criterion.
- [ ] Review the preview and the final domain/email changes together. Obtain any launch authorization still required at execution time after the result is concrete and reviewable.
- [ ] Set the verified production sender and `NEWSLETTER_SITE_URL=https://aisaidsimply.com`. Deploy the release with these settings.
- [ ] Verify the new-domain homepage, library, article, team, contact, careers, and media-guide pages before redirecting the old site.
- [ ] Configure permanent redirects from both old-domain variants and new-domain `www` to `https://aisaidsimply.com`, retaining the path and query string. Avoid a chain through the old `www` host.
- [ ] Test an old article link with a real section fragment in a browser. Test both HTTP and HTTPS entry points. Confirm that the final page and section are correct.
- [ ] Test an unexpired old confirmation URL in a browser. Confirm that the redirect preserves its fragment token and subscription still requires a button click. Keep the confirmation page's no-referrer policy.
- [ ] Test all forms from the new domain. Check an old tab opened before the switch: a failed submission must retain the visitor's text. Do not weaken origin checks to make cross-domain requests pass.
- [ ] Apply the prepared public profile changes and controlled website references. Update website social links only to verified working URLs.
- [ ] Verify both domains in Google Search Console, submit the address change where applicable, and submit the new sitemap. Keep redirects for at least one year. [Google site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [ ] Publish or send the prepared announcement and partner requests only if the user explicitly authorizes those communications.

**Acceptance:** The new name, domain, email, forms, and profiles work together. Existing content remains reachable, and no announcement points to an incomplete site.

## Task 7: Check the transition and recover if needed

**Deliverable:** A recorded post-launch check and a practical recovery path.

- [ ] Check errors, email delivery, form receipt, and broken links immediately after launch and the following day.
- [ ] Check search indexing, old-domain traffic, and unresolved external references after one week and one month.
- [ ] Review the transition note after 90 days. Remove it from current branding when readers no longer need it; retain historical announcements.
- [ ] Keep the old domain registered, HTTPS operational, and old email aliases active. A redirect cannot help after the old domain or its certificate stops working.
- [ ] If a release fails, restore the previous working application on the new primary domain first. Keep the new domain serving visitors who cached the permanent redirect. Restore compatible environment values and retain both email domains; avoid a reverse redirect loop.
- [ ] Preserve the deployment ID, configuration record, launch date, and remaining partner tasks in the checklist. Do not create recurring automations unless requested.

**Completion criteria:** All controlled surfaces use the new identity, all launch checks pass, and remaining third-party updates have clear owners and status. Record unsent communications separately from technical completion.

## Execution order

Complete Task 1 first. Prepare Tasks 2–5 before launch. Complete Task 6 only after the new website and services pass their checks. Perform Task 7 against the launched site.

Recommended execution method: implement the plan in this chat, with focused review of the domain, email, and confirmation-link transition. The tasks share one small application and one coordinated release.
