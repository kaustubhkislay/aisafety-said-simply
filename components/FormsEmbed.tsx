"use client";

import { useState } from "react";
import { involvementForms } from "@/content";

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
      <p className="mt-3 text-sm leading-relaxed text-muted">{active.description}</p>
      <div className="mt-4 border border-line bg-paper-2">
        <iframe
          key={active.url}
          src={`${active.url}?embedded=true`}
          title={active.label}
          loading="lazy"
          className="h-[900px] w-full"
        >
          Loading…
        </iframe>
      </div>
      <p className="mt-2 text-sm text-muted">
        Form not loading?{" "}
        <a
          href={active.url}
          target="_blank"
          rel="noopener"
          className="font-medium text-accent underline underline-offset-4"
        >
          Open it in a new tab <span aria-hidden>↗</span>
        </a>
        .
      </p>
    </div>
  );
}
