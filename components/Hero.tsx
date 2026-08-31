import { site } from "@/content";
import { team } from "@/content";

export default function Hero() {
  const calendly = team[0]?.calendly;

  return (
    <header className="mx-auto w-full max-w-5xl px-6">
      <div className="flex flex-col gap-10 pt-16 pb-16 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:pt-24 sm:pb-20">
        <h1 className="max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-ink sm:text-6xl">
          {site.tagline}
        </h1>
        <div className="flex shrink-0 flex-col items-start gap-3">
          <a
            href="#library"
            className="rounded-card bg-accent px-6 py-3 font-medium whitespace-nowrap text-cream transition-opacity duration-150 ease-out hover:opacity-90"
          >
            Explore the library
          </a>
          <a
            href={calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-card border border-line-2 px-6 py-3 font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-paper-2"
          >
            Chat with us
          </a>
        </div>
      </div>
    </header>
  );
}
