"use client";
import { useState } from "react";

export default function ConfirmSubscription() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  return <div className="mt-6">
    {status === "done" ? <p role="status">You’re subscribed. We’ll email you when new resources are ready.</p> : <>
      <p>Confirm that you want updates from AI Safety Said Simply.</p>
      <button className="mt-6 bg-ink px-6 py-3 text-cream disabled:opacity-50" disabled={status === "sending"} onClick={async () => {
        setStatus("sending"); setError("");
        try {
          const token = window.location.hash.slice(1);
          const response = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "confirm", token }) });
          const data = await response.json();
          if (!response.ok || !data.ok) throw new Error(data.error || "Please try again later.");
          window.history.replaceState(null, "", window.location.pathname);
          setStatus("done");
        } catch (problem) { setError(problem instanceof Error ? problem.message : "Please try again later."); setStatus("idle"); }
      }}>{status === "sending" ? "Confirming…" : "Confirm subscription"}</button>
      {error && <p role="alert" className="mt-4">{error}</p>}
    </>}
    <p className="mt-8"><a className="underline underline-offset-4" href="/contact#mailing-list">Back to the mailing list</a></p>
  </div>;
}
