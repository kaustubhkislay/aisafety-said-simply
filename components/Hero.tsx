import { site } from "@/content";

export default function Hero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {site.name}
      </p>
      <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.08] font-semibold tracking-[-0.02em] text-ink sm:text-6xl">
        {site.tagline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {site.description}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="#library"
          className="bg-accent px-6 py-3 font-medium whitespace-nowrap text-paper transition-colors duration-150 ease-out hover:bg-ink-2"
        >
          Explore the library
        </a>
        <a
          href="#updates"
          className="border border-line-2 px-6 py-3 font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-paper-2"
        >
          Get updates
        </a>
      </div>
    </header>
  );
}
