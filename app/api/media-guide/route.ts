import { createHash } from "node:crypto";
import { site } from "@/content";
import { resendRequest, validEmail } from "@/lib/newsletter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).host !== (request.headers.get("host") ?? new URL(request.url).host)) {
      return Response.json({ error: "Request not allowed." }, { status: 403 });
    }
  } catch {
    return Response.json({ error: "Request not allowed." }, { status: 403 });
  }

  let data;
  try {
    const raw = await request.text();
    if (raw.length > 20000) {
      return Response.json({ error: "Your request is too long." }, { status: 413 });
    }
    data = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }
  if (!data || typeof data !== "object" || Array.isArray(data) ||
      ["name", "email", "affiliation", "reason"].some((field) => typeof data[field] !== "string")) {
    return Response.json({ error: "Please complete all four fields." }, { status: 400 });
  }
  if (data.website) return Response.json({ ok: true });

  const name = data.name.trim();
  const email = data.email.trim();
  const affiliation = data.affiliation.trim();
  const reason = data.reason.trim();
  if (!name || name.length > 100 || !validEmail(email) ||
      !affiliation || affiliation.length > 200 || !reason || reason.length > 4000) {
    return Response.json({ error: "Complete all four fields and enter a valid email address." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) {
    return Response.json({ error: `Requests are temporarily unavailable. Please email ${site.contactEmail}.` }, { status: 503 });
  }

  try {
    // Deduplicate identical requests and retries within a UTC day. Never log form data.
    const idempotency = createHash("sha256")
      .update(JSON.stringify([name, email, affiliation, reason, Math.floor(Date.now() / 86400000)]))
      .digest("hex");
    const result = await resendRequest("/emails", key, "POST", {
      from,
      to: [site.contactEmail],
      reply_to: email,
      subject: "Media guide request — AISSS",
      text: [
        "Confidential media guide request",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Affiliation: ${affiliation}`,
        "",
        "Reason for requesting the guide:",
        reason,
        "",
        "Please reply within 1–2 business days. All information shared must remain confidential.",
      ].join("\n"),
    }, `media-guide-${idempotency}`);
    if (!result.ok) throw new Error("Email request failed");
    const receipt = await result.json();
    if (typeof receipt.id !== "string" || !receipt.id) throw new Error("Missing email receipt");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: `We could not confirm receipt. Your text is still here. Please try again or email ${site.contactEmail}.` }, { status: 502 });
  }
}
