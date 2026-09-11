# Mailing list

The contact page sends confirmation emails through Resend. The recipient must open the link and click Confirm subscription before the server adds them to the AI Safety Said Simply segment.

## Server configuration

Set these variables in `.env.local` and Vercel Production/Preview settings. Never use a `NEXT_PUBLIC_` prefix or commit secret values.

- `RESEND_API_KEY`: Resend key with email and contact access.
- `RESEND_FROM`: AI Safety Said Simply <hello@updates.aisafetysaidsimply.com>
- `RESEND_SEGMENT_ID`: 4bb4a19f-eabf-4287-b555-e8950882b189
- `NEWSLETTER_SITE_URL`: https://www.aisafetysaidsimply.com
- `NEWSLETTER_SIGNING_SECRET`: random secret of at least 32 characters. Rotation invalidates outstanding confirmation links.

The sending domain is updates.aisafetysaidsimply.com. DNS uses a dedicated DKIM record and send.updates SPF/MX records. Existing inbound email records stay separate.

## Send an update

Create a Broadcast in Resend. Select only the **AI Safety Said Simply** segment, use the verified sender, and include Resend's unsubscribe link. Review the preview and send a test before publishing. The website does not send broadcasts automatically.

## Behavior and checks

- Confirmation tokens expire within 48 hours and appear in URL fragments, not server request URLs.
- Confirmation requires a button click; loading the link alone does not subscribe.
- A hidden field filters simple bots. Stable daily tokens and Resend idempotency suppress duplicate confirmation emails. This is not a comprehensive rate limiter.
- Existing unsubscribed contacts remain unsubscribed. They must contact the team to rejoin.
- API failures display a retry message. Signup success means an email request succeeded, not that the recipient joined the list.
- Run `node --test tests/*.test.mjs`, `npm run lint`, and `npm run build -- --webpack`.
- Use Resend's delivered+label@resend.dev test address for integration tests. Remove the test contact after verification.
