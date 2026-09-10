"use client";

import { useState } from "react";

export default function FormsEmbed() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const fieldClass = "mt-2 block w-full rounded-card border border-line bg-card px-3 py-3 font-normal text-ink";

  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-medium tracking-tight">Join our team</h2>
      <p className="mt-3 mb-8 max-w-2xl leading-relaxed text-muted">
        Tell us a little about yourself and how you would like to contribute.
      </p>
      {status === "done" ? (
        <p role="status">Thank you. We have received your expression of interest.</p>
      ) : (
        <form
          aria-label="Team expression of interest"
          aria-busy={status === "sending"}
          className="space-y-6"
          onSubmit={async (event) => {
            event.preventDefault();
            if (status === "sending") return;
            const data = new FormData(event.currentTarget);
            setError("");
            setStatus("sending");
            try {
              const result = await fetch("/api/team-interest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(data)),
              });
              const response = await result.json();
              if (!result.ok || !response.ok) throw new Error(response.error || "We could not confirm receipt. Please try again later.");
              setStatus("done");
            } catch (problem) {
              setError(problem instanceof Error ? problem.message : "We could not confirm receipt. Please try again later.");
              setStatus("idle");
            }
          }}
        >
          <fieldset disabled={status === "sending"} className="space-y-6">
            <legend className="sr-only">Your expression of interest</legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Name
                <input name="name" required maxLength={100} autoComplete="name" className={fieldClass} />
              </label>
              <label className="block text-sm font-medium">
                Email
                <input name="email" required type="email" maxLength={254} autoComplete="email" className={fieldClass} />
              </label>
            </div>
            <label className="block text-sm font-medium">
              Tell us about yourself and how you would like to contribute
              <textarea name="interest" required maxLength={4000} rows={5} className={`${fieldClass} resize-y`} />
            </label>
            <label className="block text-sm font-medium">
              Relevant links <span className="font-normal text-muted">(optional)</span>
              <input name="links" maxLength={1000} placeholder="Portfolio, LinkedIn, or examples of your work" className={fieldClass} />
            </label>
            <label className="block text-sm font-medium">
              Availability <span className="font-normal text-muted">(optional)</span>
              <input name="availability" maxLength={500} placeholder="How much time could you contribute, and when could you start?" className={fieldClass} />
            </label>
            <button type="submit" className="bg-ink px-6 py-3 font-medium text-cream transition-opacity hover:opacity-80 disabled:opacity-50">
              {status === "sending" ? "Sending…" : "Submit interest"}
            </button>
          </fieldset>
          {error && <p role="alert" className="text-sm leading-relaxed">{error}</p>}
        </form>
      )}
    </div>
  );
}
