export async function subscribe(email: string, website = ""): Promise<void> {
  const result = await fetch("/api/subscribe", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "subscribe", email, website }),
  });
  const data = await result.json();
  if (!result.ok || !data.ok) throw new Error(data.error || "We could not complete your request. Please try again later.");
}
