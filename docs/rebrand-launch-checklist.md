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
- [x] Full-name logos, two-page Word templates, social banners, and video cards prepared.
- [x] Revised logos and Word templates replaced in Drive with the same file IDs and access.
- [x] Shared project and brand folder names updated.
- [x] New apex and www attached to the same Vercel project.
- [x] New inbound aliases created in ImprovMX; old aliases retained.
- [x] ImprovMX confirms the new apex MX and SPF records.
- [x] Resend verifies `updates.aisaidsimply.com` and all four sending records.
- [x] Existing segment renamed to AI Said Simply; ID unchanged.
- [x] New sender delivered to Resend's automated test recipient.
- [ ] Three authorized inbound tests confirmed in ImprovMX logs.
- [x] Local tests pass: 24 tests. Lint and webpack production build pass.
- [ ] Staged production deployment reviewed.
- [ ] New-domain production environment and deployment active.
- [ ] Old-host and new-www permanent redirects verified with paths, queries, and fragments.
- [ ] Old newsletter token tested after redirect.
- [ ] All production forms verified.
- [ ] Search Console address change and sitemap submission complete.

## External surfaces

| Surface | Status | Owner / link |
| --- | --- | --- |
| Brand package | Existing files updated; banners/package upload pending | [Drive folder](https://drive.google.com/drive/folders/1KlH82QJ-Mg7Pj5Aanxw2pFUMOSc4OzfQ) |
| Explainer writer role | Name, domain, links, header and footer updated; role unchanged | [Role document](https://docs.google.com/document/d/1qVayZeIUpKDIa7NQgneNNaFxvQI3dYxt6IwctKqUecM/edit) |
| Google Forms | Feedback renamed; remaining forms in progress | Existing form IDs and success messages remain unchanged |
| Fillout application | Pending account inspection | [Application](https://forms.fillout.com/t/iiTZxSnf9tus) |
| LinkedIn | Pending; retain existing page and followers | [Page](https://www.linkedin.com/company/ai-safety-said-simply/) |
| X | Pending; retain existing account and followers | [Account](https://x.com/AISafetySimply) |
| Personal website | Pending controlled source edit | `website-1/src/app/page.tsx` |
| WAISI | Pending source inspection | [Research page](https://waisi.org/research) |
| SPAR | Draft request only; listing owner must edit | [Project](https://www.sparai.org/projects/f26/recK4NKaFBvAEznFB/) |

Do not activate the YouTube, Instagram, or Substack placeholders without a verified account.

## Draft communications — not sent

Announcement: “AI Safety Said Simply is now AI Said Simply. Our team and editorial focus remain the same. Find our explainers, demos, and videos at https://aisaidsimply.com.”

SPAR request: “Please change our project name from AI Safety Said Simply to AI Said Simply, and change the website link to https://aisaidsimply.com. Our team, research scope, and cohort commitments remain unchanged.”

Social transition biography: “Clear explainers, interactive demos, and videos about AI risks and how to address them. Formerly AI Safety Said Simply.”

## Follow-up and recovery

Record the actual launch date and deployment here after verification. Review errors, email delivery, and forms the next day. Review indexing and external references after one week and one month. Review the transition note 90 days after launch. Keep the old domain redirects for at least one year and keep old email aliases active.

If a release fails, serve the previous working application on the new domain first. Visitors can cache permanent redirects. Do not redirect the new host back to the old host while the old host redirects forward. Restore compatible environment values and retain both email domains. Use the previous deployment as the source of recovery; re-promote a corrected production deployment to restore automatic assignment if rollback disables it.

No recurring automations were created. Future checks require a later session.
