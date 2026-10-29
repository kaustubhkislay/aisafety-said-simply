import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FormsEmbed from "@/components/FormsEmbed";

const description =
  "Help people understand AI safety. Explore the Explainer Writer volunteer role at AI Safety Said Simply and apply.";

export const metadata: Metadata = {
  title: "Careers — AI Safety Said Simply",
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — AI Safety Said Simply",
    description,
    url: "/careers",
  },
};

export default function Careers() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
            Careers
          </h1>
        </header>

        <section aria-labelledby="writer-heading" className="mt-12 max-w-2xl sm:mt-16">
          <span className="section-index text-muted">Open role</span>
          <h2 id="writer-heading" className="text-3xl font-medium tracking-tight">
            Explainer Writer
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            Research and write concise explainers on AI safety topics, with
            editorial support from our team. You will receive authorship credit
            for the explainers you write. Each piece takes up to three weeks,
            from research to final edits.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="https://forms.fillout.com/t/iiTZxSnf9tus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-card bg-accent px-5 py-3 text-sm font-medium text-cream transition-opacity duration-150 ease-out hover:opacity-90"
            >
              Apply for this role
            </a>
            <a
              href="https://docs.google.com/document/d/1qVayZeIUpKDIa7NQgneNNaFxvQI3dYxt6IwctKqUecM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ink underline underline-offset-4 hover:opacity-75"
            >
              Read the job description
            </a>
          </div>
        </section>

        <section
          id="join-team"
          aria-label="Expression of interest"
          className="mt-16 max-w-2xl sm:mt-20"
        >
          <span className="section-index text-muted">Expression of interest</span>
          <FormsEmbed />
        </section>
      </div>
      <Footer />
    </main>
  );
}
