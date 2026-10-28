import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MediaGuideRequestForm from "@/components/MediaGuideRequestForm";

const description =
  "A practical guide for students and university AI safety groups who receive media requests. Request a copy from AI Safety Said Simply.";

export const metadata: Metadata = {
  title: "Media guide — AI Safety Said Simply",
  description,
  alternates: { canonical: "/media-guide" },
  openGraph: {
    title: "Media guide — AI Safety Said Simply",
    description,
    url: "/media-guide",
  },
};

export default function MediaGuide() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
            Media guide
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink-2">
            A practical guide for students and university AI safety groups who
            receive media requests.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            The guide covers how to decide whether to take part, prepare for
            interviews or written responses, and follow up afterward. It includes
            exercises and scenarios to help you communicate clearly, explain the
            limits of your knowledge, and approach sensitive topics with care.
          </p>
        </header>

        <section aria-labelledby="request-heading" className="mt-12 max-w-2xl sm:mt-16">
          <h2 id="request-heading" className="text-2xl font-medium tracking-tight">
            Request the guide
          </h2>
          <p id="request-privacy" className="mt-3 mb-8 leading-relaxed text-muted">
            All information you share will remain confidential. We will contact
            you by email within 1–2 business days for further correspondence.
          </p>
          <MediaGuideRequestForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}
