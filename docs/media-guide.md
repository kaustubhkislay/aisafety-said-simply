# Media guide requests

The `/media-guide` page describes the student media guide without publishing the
guide, excerpts, exercises, source document URL, or download link. The navigation
and footer link to the page.

Name, email, affiliation, and request reason are required. The page promises
confidentiality and an email response within 1–2 business days. The team reviews
requests and shares the guide manually; submitting the form does not grant access
or subscribe the requester to the mailing list.

`POST /api/media-guide` uses the existing `RESEND_API_KEY` and `RESEND_FROM`
environment variables. It emails only `site.contactEmail`, with the requester as
Reply-To. Keep access to the contact mailbox and Resend restricted to the team.
The application does not log request contents or store them in the browser.

Validation runs on the server. A hidden field filters simple bots, and Resend's
idempotency key suppresses identical requests within a UTC day. These measures
are not a comprehensive rate limiter. The form retains entered text on failure.
Success requires Resend to accept the email and return a receipt; delivery can
still fail later, so monitor delivery in Resend.

Run `node --test tests/*.test.mjs`, `npm run lint`, and
`npm run build -- --webpack`. Automated route tests mock the email service and do
not send mail. Do not send a live test request without authorization.
