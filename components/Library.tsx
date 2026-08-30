import { library } from "@/content";

export default function Library() {
  return (
    <section id="library" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
          The library
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          One piece is live. The rest are in production — each one short,
          accurate, and made to be shared.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {library.map((item) => {
            const inner = (
              <>
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.08em] ${
                      item.status === "live" ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item.status === "live" ? "Live" : "In production"}
                  </span>
                  {item.status === "live" && (
                    <span aria-hidden className="text-accent">
                      ↗
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.hook}
                </p>
              </>
            );
            return item.status === "live" && item.url ? (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener"
                className="block rounded-card border border-accent bg-card p-6 transition-colors duration-150 ease-out hover:bg-paper-2"
              >
                {inner}
              </a>
            ) : (
              <div key={item.title} className="rounded-card border border-line bg-card p-6">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
