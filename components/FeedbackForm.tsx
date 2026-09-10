"use client";

import { useState } from "react";

const feedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeqz8z5X5zwoQ-AzVxTqGN1i1H7lrL3nSUqApab6lpY6qRxSw/viewform";

export default function FeedbackForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const fieldClass = "mt-2 block w-full rounded-card border border-line bg-card px-3 py-3 text-ink";

  if (status === "done") {
    return <p role="status" className="leading-relaxed">Thank you. Your feedback has been received.</p>;
  }

  return (
    <form
      aria-label="Feedback"
      aria-busy={status === "sending"}
      className="space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        if (status === "sending") return;
        const data = new FormData(event.currentTarget);
        const message = String(data.get("message") ?? "").trim();
        if (!message) { setError("Please enter your feedback."); return; }
        setError("");
        setStatus("sending");
        try {
          const result = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: data.get("name"), email: data.get("email"), message }),
          });
          const response = await result.json();
          if (!result.ok || !response.ok) throw new Error(response.error || "We could not confirm receipt. Please use the Google Form link below.");
          setStatus("done");
        } catch (problem) {
          setError(problem instanceof Error ? problem.message : "Please try the Google Form link below.");
          setStatus("idle");
        }
      }}
    >
      <fieldset disabled={status === "sending"} className="space-y-5">
        <legend className="sr-only">Send feedback</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Name <span className="font-normal text-muted">(optional)</span>
            <input name="name" autoComplete="name" maxLength={100} className={fieldClass} />
          </label>
          <label className="block text-sm font-medium">
            Email <span className="font-normal text-muted">(optional)</span>
            <input name="email" type="email" autoComplete="email" maxLength={254} className={fieldClass} />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Your feedback
          <textarea name="message" required maxLength={2000} rows={6} className={`${fieldClass} min-h-40 resize-y`} />
        </label>
        <button type="submit" className="bg-ink px-5 py-3 font-medium text-cream transition-opacity hover:opacity-80 disabled:opacity-50">
          {status === "sending" ? "Sending…" : "Send feedback"}
        </button>
      </fieldset>
      {error && <p role="alert" className="text-sm leading-relaxed text-ink">{error}</p>}
      <p className="text-sm text-muted">
        Responses go to our Google Form.{" "}
        <a href={feedbackUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">Open it separately</a>.
      </p>
    </form>
  );
}
