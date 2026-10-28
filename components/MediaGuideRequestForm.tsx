"use client";

import { useState } from "react";

const fieldClass =
  "mt-2 block w-full rounded-card border border-line bg-card px-3 py-3 font-normal text-ink";
const failureMessage =
  "We could not confirm receipt. Please try again or email contact@aisafetysaidsimply.com.";

export default function MediaGuideRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  if (status === "done") {
    return (
      <p role="status" className="leading-relaxed">
        Thank you. We received your request. We will contact you by email within
        1–2 business days for further correspondence.
      </p>
    );
  }

  return (
    <form
      aria-label="Media guide request"
      aria-describedby="request-privacy"
      aria-busy={status === "sending"}
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        if (status === "sending") return;
        const data = new FormData(event.currentTarget);
        if (["name", "email", "affiliation", "reason"].some((field) => !String(data.get(field) ?? "").trim())) {
          setError("Please complete all four fields.");
          return;
        }
        setError("");
        setStatus("sending");
        try {
          const result = await fetch("/api/media-guide", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(data)),
          });
          const response = await result.json();
          if (!result.ok || !response.ok) {
            throw new Error(response.error || failureMessage);
          }
          setStatus("done");
        } catch (problem) {
          setError(problem instanceof Error ? problem.message : failureMessage);
          setStatus("idle");
        }
      }}
    >
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <fieldset disabled={status === "sending"} className="space-y-6">
        <legend className="sr-only">Your media guide request</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Name
            <input name="name" required maxLength={100} autoComplete="name" className={fieldClass} />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Affiliation
          <input name="affiliation" required maxLength={200} autoComplete="organization" aria-describedby="affiliation-help" className={fieldClass} />
          <span id="affiliation-help" className="mt-2 block font-normal text-muted">
            Your university, organization, or independent role.
          </span>
        </label>
        <label className="block text-sm font-medium">
          Why are you requesting the guide?
          <textarea name="reason" required maxLength={4000} rows={5} className={`${fieldClass} resize-y`} />
        </label>
        <button type="submit" className="bg-ink px-6 py-3 font-medium text-cream transition-opacity hover:opacity-80 disabled:opacity-50">
          {status === "sending" ? "Sending…" : "Request the guide"}
        </button>
      </fieldset>
      {error && <p role="alert" className="text-sm leading-relaxed">{error}</p>}
    </form>
  );
}
