"use client";

import { useState } from "react";
import { subscribe } from "@/lib/subscribe";

export default function SignupForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  return (
    <div className="max-w-md">
      {status === "done" ? <p role="status">Check your inbox for a confirmation link. You will join the list after you confirm.</p> : (
        <form aria-label="Mailing list signup" aria-busy={status === "sending"} onSubmit={async event => {
          event.preventDefault();
          if (status === "sending") return;
          const data = new FormData(event.currentTarget);
          setStatus("sending"); setError("");
          try { await subscribe(String(data.get("email")), String(data.get("website") ?? "")); setStatus("done"); }
          catch (problem) { setError(problem instanceof Error ? problem.message : "Please try again later."); setStatus("idle"); }
        }}>
          <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <fieldset disabled={status === "sending"} className="flex gap-2">
            <legend className="sr-only">Mailing list signup</legend>
            <input type="email" name="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" aria-label="Email address" className="w-full min-w-0 rounded-card border border-line bg-paper-2 px-3 py-2 text-ink" />
            <button type="submit" className="shrink-0 rounded-card bg-ink px-4 py-2 font-medium whitespace-nowrap text-cream disabled:opacity-50">{status === "sending" ? "Sending…" : "Sign up"}</button>
          </fieldset>
          {error && <p role="alert" className="mt-3 text-sm">{error}</p>}
        </form>
      )}
      <p className="mt-3 text-sm leading-relaxed text-muted">Get new AI safety resources by email. Confirm your address to join. Unsubscribe at any time.</p>
    </div>
  );
}
