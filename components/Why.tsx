import { audiences, theoryOfChange } from "@/content";

export default function Why() {
  return (
    <section aria-labelledby="why-heading" className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
        <h2 id="why-heading" className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
          Why this exists
        </h2>
        <div className="min-w-0">
          <p className="text-2xl leading-snug tracking-tight text-ink-2 sm:text-3xl">
            {theoryOfChange}
          </p>
          <div className="mt-8 space-y-6 sm:mt-10">
            {audiences.map(({ audience, problem }) => (
              <div key={audience} className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
                <h3 className="font-semibold text-ink">{audience}</h3>
                <p className="leading-relaxed text-muted">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
