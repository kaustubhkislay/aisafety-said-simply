import { faq } from "@/content";

export default function Faq() {
  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
          Questions, answered
        </h2>
        <div className="mt-10 max-w-3xl">
          {faq.map(({ q, a }) => (
            <details key={q} className="group border-t border-line-2 last:border-b">
              <summary className="flex cursor-pointer items-baseline justify-between gap-4 py-4 font-semibold text-ink transition-colors duration-150 ease-out hover:text-accent [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden
                  className="font-mono text-xs text-muted group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden
                  className="hidden font-mono text-xs text-muted group-open:inline"
                >
                  &minus;
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
