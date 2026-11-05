# AI Said Simply launch record

## Scope and authorization

The user authorized autonomous execution of the rebrand on 4 November 2026. The name and domain change; the content and mission stay the same. The user completed the ImprovMX upgrade and approved the existing forwarding destinations for all three new addresses. The user also approved three labeled delivery tests. Broadcasts and partner messages remain drafts.

## Recovery baseline

- Repository: `aisafety-said-simply`; implementation branch: `rebrand/ai-said-simply`.
- Production source before the rebrand: `9192ec3962fcd73da7d10d3c8b801b24bd95c0b4`.
- Previous deployment: `dpl_DgAdtvFK3aFQ2TZyvKF5hr6jV8in`.
- Vercel project: `prj_pp4AGLvroMMuxh0YZSUV4nOYA2bg`; team: `team_NvrChHp6AaThMqI5fvfdLvl7`.
- Previous primary host: `www.aisafetysaidsimply.com`. Old apex redirected there with status 308.
- New primary host: `aisaidsimply.com`. Both domains use Vercel DNS. Keep registration and HTTPS active for both.
- Existing Resend segment: `4bb4a19f-eabf-4287-b555-e8950882b189`. It contains one contact before migration. No contact data or preferences changed.
- Preserve `NEWSLETTER_SIGNING_SECRET`, `RESEND_SEGMENT_ID`, and `RESEND_API_KEY`. Their values belong only in the existing local/Vercel secret stores.
- Old sending domain remains verified and available for recovery.

## Preparation status

- [x] Rebased onto current production source to preserve newer article changes.
- [x] Website name, contact details, metadata, sitemap, robots, and transition note updated locally.
- [x] Article bodies, topic priorities, citations, and author biographies unchanged.
- [x] AISS logos, two-page Word templates, social banners, and video cards prepared.
- [x] Revised logos and Word templates replaced in Drive with the same file IDs and access.
- [x] Shared project and brand folder names updated.
- [x] New apex and www attached to the same Vercel project.
- [x] New inbound aliases created in ImprovMX; old aliases retained.
- [x] ImprovMX confirms the new apex MX and SPF records.
- [x] Resend verifies `updates.aisaidsimply.com` and all four sending records.
- [x] Existing segment renamed to AI Said Simply; ID unchanged.
- [x] New sender delivered to Resend's automated test recipient.
- [x] All three authorized inbound tests show FORWARDED in ImprovMX to the approved Gmail destinations. The first kaustubh attempt hit a transient sender-IP block; one retry succeeded.
- [x] Local tests pass: 24 tests. Lint and webpack production build pass.
- [x] Staged production deployment reviewed before promotion.
- [x] New-domain production environment and deployment active.
- [x] Old-host and new-www permanent redirects verified with paths, queries, and fragments.
- [x] Old newsletter token tested after redirect; confirmation succeeded and the temporary contact was removed.
- [x] Production feedback and team-interest forms accepted labeled tests; all four APIs reject invalid origins. Newsletter confirmation succeeded. Media-guide validation and automated route tests pass; no extra live delivery test was sent.
- [x] Search Console verifies both domain properties. The new sitemap shows Success. Google validated the redirects and accepted the address change on 5 November 2026 UTC.

## External surfaces

| Surface | Status | Owner / link |
| --- | --- | --- |
| Brand package | Existing files and ZIP updated; covers show only “AISS” | [Drive folder](https://drive.google.com/drive/folders/1KlH82QJ-Mg7Pj5Aanxw2pFUMOSc4OzfQ) |
| Explainer writer role | Name, domain, links, header and footer updated; role unchanged | [Role document](https://docs.google.com/document/d/1qVayZeIUpKDIa7NQgneNNaFxvQI3dYxt6IwctKqUecM/edit) |
| Google Forms | Feedback and team-interest titles renamed; live integration tests pass | Existing form IDs and success messages remain unchanged |
| Fillout application | Name, heading, confirmation, logo, theme and workspace renamed; questions and response destination preserved | [Application](https://forms.fillout.com/t/iiTZxSnf9tus) |
| LinkedIn | Name, slug, website, biography and text-only cover saved; nine followers retained | [Page](https://www.linkedin.com/company/ai-said-simply/) |
| X | New name present; biography, website and text-only cover saved. Eleven followers retained. Handle @AISaidSimply is now active; verified in the existing signed-in account. | [Account](https://x.com/AISaidSimply) |
| Personal website | Affiliation name and URL updated in source; existing hidden-affiliation setting preserved. Commit `fc5f09c`. | `website-1/src/app/page.tsx` |
| WAISI | Research entry renamed and verified live. Commit `8190cab`; safety description unchanged. | [Research page](https://waisi.org/research) |
| SPAR | Draft request only; listing owner must edit | [Project](https://www.sparai.org/projects/f26/recK4NKaFBvAEznFB/) |

Do not activate the YouTube, Instagram, or Substack placeholders without a verified account.

## Draft communications — not sent

Announcement: “AI Safety Said Simply is now AI Said Simply. Our team and editorial focus remain the same. Find our explainers, demos, and videos at https://aisaidsimply.com.”

SPAR request: “Please change our project name from AI Safety Said Simply to AI Said Simply, and change the website link to https://aisaidsimply.com. Our team, research scope, and cohort commitments remain unchanged.”

Social transition biography: “Clear explainers, interactive demos, and videos about AI risks and how to address them. Formerly AI Safety Said Simply.”

## Follow-up and recovery

The site launched on 4 November 2026 (America/Chicago). Source release: `219bb756366005a29519cfceced202e494a6aaee`. Staged deployment `dpl_6qYqKkLeZc8c4TNSkjWzAjWnW7CY` was promoted after checks; the matching Git deployment `dpl_GA7Fak8JgDqp7usj82GfvYKEL2yP` is READY. The old apex, old www, and new www use 308 redirects to the new apex. HTTP requests first receive Vercel’s automatic HTTPS redirect. Review errors, email delivery, and forms the next day. Review indexing and external references after one week and one month. Review the transition note on 2 February 2027. Keep old domain redirects until at least 4 November 2027 and keep old email aliases active.

If a release fails, serve the previous working application on the new domain first. Visitors can cache permanent redirects. Do not redirect the new host back to the old host while the old host redirects forward. Restore compatible environment values and retain both email domains. Use the previous deployment as the source of recovery; re-promote a corrected production deployment to restore automatic assignment if rollback disables it.

No recurring automations were created. Future checks require a later session.

## Verification and review

- The release passed 24 automated tests, lint, a local webpack production build, and the staged Vercel build.
- An independent reviewer found no critical or important defects. One pre-existing minor remains: Library, Team, and Contact inherit the homepage Open Graph preview title and URL. Their canonical URLs are correct.
- Mobile homepage, contact, and article layouts fit at 390px. Both Word-template pages render without clipping.
- Public main pages, sitemap, and robots return 200. Confirmation remains noindex. Browser checks preserved an old article query and fragment, and an old-format newsletter token confirmed successfully after redirect.
- Feedback and team-interest tests returned 200/ok. All four APIs reject incorrect origins with 403. The media-guide route rejects empty input with 400.
- The live homepage produced no browser warning or error logs during the final check.
- All brand files keep their existing Drive IDs and access where an earlier file existed. Social/video folders and the ZIP supply the new additions.
- Public Fillout inspection confirmed the new heading, full-name logo, and plain white background. All application questions and the AI safety description remain unchanged. Nine prior responses remain.
- Final proof screenshots and the downloadable package are in `~/Downloads/AI-Said-Simply-rebrand/`.

## Execution rulings

- Reused the existing checkout with an implementation branch; no new worktree was necessary.
- Rebased onto current production source before edits to preserve newer article changes.
- Used the authenticated Vercel CLI after the connector rejected team scope. Every mutation targeted the verified project/team.
- Kept the production launch on hold until the user completed the ImprovMX upgrade. The user explicitly approved recipient copies and three labeled tests.
- Tested the staged production deployment before promotion, then merged and pushed under the user’s autonomous launch authorization.
- Preserved article content, form IDs, response destinations, subscriber segment ID, signing secret, old aliases, and old domain registrations.
- Used visual checks for copy/assets and behavioral tests for domain/email risks.
- Retained technical repository/project identifiers to avoid unrelated integration changes.
- Left announcement and SPAR outreach as drafts because the user did not authorize those messages.
- Kept inactive channel placeholders and historical messaging prose unchanged.

Search verification DNS records: new domain `rec_7218d65d33d7aead6739cd04`; old domain `rec_699d743f051927f424a6954b`. Keep both records. Google reports “This site is currently moving” from the old domain to the new domain. Search indexing will update over time.

Final inbound check: ImprovMX shows FORWARDED for kaustubh, contact and Christine on the new domain. Old aliases remain active.

## Visual revision — 5 November 2026

The user requested the earlier abbreviated visual style. Website wordmarks, outlined logo exports, social covers, Word headers, and video cards now use AISS. The full organization name and all content remain AI Said Simply. Social covers retain plain white backgrounds with only AISS. The same yarn-only avatars remain. X and LinkedIn covers were saved; the X account now uses @AISaidSimply with eleven followers. The website contact link now targets the new handle. Shared Drive assets and ZIP were overwritten in place with the same access.
