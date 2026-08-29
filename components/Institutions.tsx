import { site } from "@/content";

export default function Institutions() {
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
          For institutions
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          University AI safety groups, educators, and policy offices are how
          these materials reach the people who need them. Everything we publish
          is free to share — send it to your members, use it in your courses,
          hand it to your colleagues.
        </p>
        <a
          href={`mailto:${site.contactEmail}?subject=Distributing AI Safety Said Simply materials`}
          className="mt-8 inline-block bg-accent px-6 py-3 font-medium whitespace-nowrap text-paper transition-colors duration-150 ease-out hover:bg-ink-2"
        >
          Talk to us about distribution
        </a>
      </div>
    </section>
  );
}
