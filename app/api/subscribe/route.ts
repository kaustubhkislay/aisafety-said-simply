import { createHash } from "node:crypto";
import { makeToken, newsletterConfig, readToken, resendRequest, validEmail } from "@/lib/newsletter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).host !== (request.headers.get("host") ?? new URL(request.url).host)) {
      return Response.json({ error: "Request not allowed." }, { status: 403 });
    }
  } catch { return Response.json({ error: "Request not allowed." }, { status: 403 }); }
  let data;
  try {
    const text = await request.text();
    if (text.length > 3000) return Response.json({ error: "Request too large." }, { status: 413 });
    data = JSON.parse(text);
    if (!data || typeof data !== "object") throw new Error();
  } catch { return Response.json({ error: "Invalid form data." }, { status: 400 }); }

  let config;
  try { config = newsletterConfig(); }
  catch { return Response.json({ error: "Mailing list signup is temporarily unavailable. Please try again later." }, { status: 503 }); }

  try {
    if (data.action === "confirm") {
      const email = readToken(data.token, config.secret);
      if (!email) return Response.json({ error: "This link is invalid or has expired. Please sign up again." }, { status: 400 });
      const existing = await resendRequest(`/contacts/${encodeURIComponent(email)}`, config.key);
      if (existing.ok) {
        const contact = await existing.json();
        if (contact.unsubscribed) return Response.json({ error: "This address previously unsubscribed. Please contact us to rejoin." }, { status: 409 });
        const added = await resendRequest(`/contacts/${encodeURIComponent(email)}/segments/${config.segment}`, config.key, "POST");
        if (!added.ok) throw new Error();
      } else if (existing.status === 404) {
        const added = await resendRequest("/contacts", config.key, "POST", { email, unsubscribed: false, segments: [{ id: config.segment }] });
        if (!added.ok) throw new Error();
      } else { throw new Error(); }
      return Response.json({ ok: true });
    }

    if (data.action !== "subscribe") return Response.json({ error: "Invalid request." }, { status: 400 });
    if (data.website) return Response.json({ ok: true });
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    if (!validEmail(email)) return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    const token = makeToken(email, config.secret);
    const url = `${config.origin}/subscribe/confirm#${token}`;
    const sent = await resendRequest("/emails", config.key, "POST", {
      from: config.from, to: [email], reply_to: "contact@aisafetysaidsimply.com",
      subject: "Confirm your AI Safety Said Simply subscription",
      text: `Confirm your subscription to AI Safety Said Simply: ${url}\n\nYou will receive new explainers, demos, and videos. If you did not request this, ignore this email. This link expires within 48 hours.`,
      html: `<div style="font-family:Helvetica,Arial,sans-serif;color:#111;max-width:560px;margin:40px auto;padding:24px"><p style="font-size:28px;font-weight:bold">AISSS</p><h1 style="font-size:26px">Confirm your subscription</h1><p>New explainers, demos, and videos from AI Safety Said Simply.</p><p style="margin:32px 0"><a href="${url}" style="background:#111;color:#fff;padding:14px 20px;text-decoration:none">Confirm subscription</a></p><p>If you did not request this, ignore this email. This link expires within 48 hours.</p></div>`,
    }, `newsletter-${createHash("sha256").update(token).digest("hex")}`);
    if (!sent.ok) throw new Error();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We could not complete your request. Please try again later." }, { status: 502 });
  }
}
