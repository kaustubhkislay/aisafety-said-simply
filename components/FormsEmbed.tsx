"use client";

import { useState } from "react";
import { involvementForms, type InvolvementForm } from "@/content";

function toResponseUrl(viewUrl: string): string {
  return viewUrl.replace(/\/viewform$/, "/formResponse");
}

function NativeForm({ form }: { form: InvolvementForm }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  if (status === "done") {
    return (
      <p className="border-t border-line-2 pt-4 text-accent" role="status">
        Thank you — your answers were sent.
      </p>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const body = new FormData(e.currentTarget);
        if ([...body.values()].every((v) => v === "")) return;
        setStatus("sending");
        await fetch(toResponseUrl(form.url), {
          method: "POST",
          mode: "no-cors",
          body,
        });
        setStatus("done");
      }}
    >
      {form.fields.map((field) => (
        <label key={field.entryId} className="block">
          <span className="block leading-relaxed font-semibold text-ink">
            {field.label}
          </span>
          {field.multiline ? (
            <textarea
              name={`entry.${field.entryId}`}
              rows={3}
              className="mt-2 w-full rounded-card border border-line bg-card px-3 py-2 leading-relaxed text-ink placeholder:text-muted"
            />
          ) : (
            <input
              type="text"
              name={`entry.${field.entryId}`}
              className="mt-2 w-full rounded-card border border-line bg-card px-3 py-2 text-ink placeholder:text-muted"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-card bg-accent px-6 py-3 font-medium whitespace-nowrap text-cream transition-opacity duration-150 ease-out hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send answers"}
      </button>
    </form>
  );
}

export default function FormsEmbed() {
  const [active, setActive] = useState(involvementForms[0]);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Involvement forms">
        {involvementForms.map((form) => {
          const selected = form.label === active.label;
          return (
            <button
              key={form.label}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(form)}
              className={`px-4 py-2 font-medium transition-colors duration-150 ease-out ${
                selected
                  ? "bg-accent text-paper"
                  : "border border-line-2 text-ink hover:bg-paper-2"
              }`}
            >
              {form.label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {active.description} All questions are optional.
      </p>
      <div className="mt-6 max-w-3xl border-t border-line-2 pt-6">
        <NativeForm key={active.label} form={active} />
      </div>
    </div>
  );
}
