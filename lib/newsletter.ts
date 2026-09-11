import { createHmac, timingSafeEqual } from "node:crypto";

export function newsletterConfig() {
  const key = process.env.RESEND_API_KEY;
  const secret = process.env.NEWSLETTER_SIGNING_SECRET;
  const from = process.env.RESEND_FROM;
  const origin = process.env.NEWSLETTER_SITE_URL;
  const segment = process.env.RESEND_SEGMENT_ID;
  if (!key || !secret || secret.length < 32 || !from || !origin || !segment) throw new Error("Newsletter is not configured");
  return { key, secret, from, origin: new URL(origin).origin, segment };
}

export function validEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

export function makeToken(email: string, secret: string, now = Date.now()) {
  // Stable daily payload lets Resend deduplicate confirmation requests for 24 hours.
  const day = Math.floor(now / 86400000);
  const payload = Buffer.from(JSON.stringify({ email, exp: (day + 2) * 86400000 })).toString("base64url");
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("base64url")}`;
}

export function readToken(token: unknown, secret: string, now = Date.now()): string | null {
  if (typeof token !== "string" || token.length > 1500) return null;
  try {
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return null;
    const expected = createHmac("sha256", secret).update(payload).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return validEmail(data.email) && typeof data.exp === "number" && data.exp > now ? data.email : null;
  } catch { return null; }
}

export async function resendRequest(path: string, key: string, method = "GET", body?: unknown, idempotency?: string) {
  return fetch(`https://api.resend.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(idempotency ? { "Idempotency-Key": idempotency } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: "no-store", signal: AbortSignal.timeout(15000),
  });
}
