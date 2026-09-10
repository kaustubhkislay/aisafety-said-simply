const responseUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeqz8z5X5zwoQ-AzVxTqGN1i1H7lrL3nSUqApab6lpY6qRxSw/formResponse";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== (request.headers.get("host") ?? new URL(request.url).host)) {
    return Response.json({ error: "Request not allowed." }, { status: 403 });
  }

  let data;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return Response.json({ error: "Feedback is too long." }, { status: 413 });
    data = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }
  if (!data || typeof data !== "object" || typeof data.message !== "string" ||
      (data.name != null && typeof data.name !== "string") ||
      (data.email != null && typeof data.email !== "string")) {
    return Response.json({ error: "Please check the form fields." }, { status: 400 });
  }
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = data.message.trim();
  if (!message || message.length > 2000 || name.length > 100 || email.length > 254 ||
      (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return Response.json({ error: "Enter your feedback and a valid email address, if provided." }, { status: 400 });
  }

  try {
    const result = await fetch(responseUrl, {
      method: "POST",
      body: new URLSearchParams({
        "entry.87804800": name,
        "entry.2147357251": email,
        "entry.1253491831": message,
      }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    const html = await result.text();
    const visibleText = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
    if (!result.ok || !visibleText.includes("Thank you. Your feedback has been received.")) {
      return Response.json({ error: "We could not confirm receipt. Your text is still here; please try the Google Form link below." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We could not confirm receipt. Your text is still here; please try the Google Form link below." }, { status: 502 });
  }
}
