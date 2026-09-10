import { faq } from "@/content";

export default function Faq() {
  return (
    <section id="faq" className="">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
          FAQ
        </h2>
        <div className="mt-10 max-w-3xl">
          {faq.map(({ q, a }) => (
            <details key={q} className="group ">
              <summary className="flex cursor-pointer items-baseline justify-between gap-4 py-4 font-semibold text-ink transition-colors duration-150 ease-out hover:text-accent [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden
                  className="text-sm text-muted group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden
                  className="hidden text-sm text-muted group-open:inline"
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
