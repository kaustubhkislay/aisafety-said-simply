import { audiences, theoryOfChange } from "@/content";

export default function Why() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
          Why this exists
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-8">
          {audiences.map(({ audience, problem }) => (
            <div key={audience} className="border-t border-line-2 pt-4">
              <h3 className="font-semibold text-accent">{audience}</h3>
              <p className="mt-2 leading-relaxed text-muted">{problem}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 max-w-3xl font-serif text-2xl italic leading-snug text-ink-2">
          {theoryOfChange}
        </p>
      </div>
    </section>
  );
}
