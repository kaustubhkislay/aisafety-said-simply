const responseUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfI143yyq1QOhyMCH-bKztpuIgBT7RITbxr9H5QyI7bargH1Q/formResponse";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  try {
    if (origin && new URL(origin).host !== (request.headers.get("host") ?? new URL(request.url).host)) {
      return Response.json({ error: "Request not allowed." }, { status: 403 });
    }
  } catch {
    return Response.json({ error: "Request not allowed." }, { status: 403 });
  }

  let data;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return Response.json({ error: "Your response is too long." }, { status: 413 });
    data = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }
  if (!data || typeof data !== "object" ||
      ["name", "email", "interest"].some((field) => typeof data[field] !== "string") ||
      ["links", "availability"].some((field) => data[field] != null && typeof data[field] !== "string")) {
    return Response.json({ error: "Please check the form fields." }, { status: 400 });
  }
  const name = data.name.trim();
  const email = data.email.trim();
  const interest = data.interest.trim();
  const links = (data.links ?? "").trim();
  const availability = (data.availability ?? "").trim();
  if (!name || !interest || interest.length > 4000 || name.length > 100 || email.length > 254 ||
      links.length > 1000 || availability.length > 500 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Enter your name, a valid email address, and how you would like to contribute." }, { status: 400 });
  }

  try {
    const result = await fetch(responseUrl, {
      method: "POST",
      body: new URLSearchParams({
        "entry.87804800": name,
        "entry.2147357251": email,
        "entry.1253491831": interest,
        "entry.840219898": links,
        "entry.1809725442": availability,
      }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    const html = await result.text();
    const visibleText = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
    if (!result.ok || !visibleText.includes("Thank you. We have received your expression of interest.")) {
      return Response.json({ error: "We could not confirm receipt. Your text is still here. Please email contact@aisafetysaidsimply.com for help." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We could not confirm receipt. Your text is still here. Please email contact@aisafetysaidsimply.com for help." }, { status: 502 });
  }
}
