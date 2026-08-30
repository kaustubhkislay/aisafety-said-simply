import { site } from "@/content";

export default function Hero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-6">
      <div className="mx-auto max-w-3xl pt-16 pb-16 text-center sm:pt-24 sm:pb-20">
        <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-ink sm:text-6xl">
          {site.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {site.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <a
            href="#library"
            className="rounded-card bg-accent px-6 py-3 font-medium whitespace-nowrap text-cream transition-opacity duration-150 ease-out hover:opacity-90"
          >
            Explore the library
          </a>
          <a
            href="#updates"
            className="font-medium whitespace-nowrap text-accent underline underline-offset-4 transition-colors duration-150 ease-out hover:text-ink"
          >
            Get updates
          </a>
        </div>
      </div>
    </header>
  );
}
