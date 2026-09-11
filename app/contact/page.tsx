import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";
import FeedbackForm from "@/components/FeedbackForm";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Contact — AI Safety Said Simply",
  description: "Contact the team, join the mailing list, and find our social channels.",
};

const socialChannels = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/ai-safety-said-simply/", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" },
  { name: "YouTube", path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" },
  { name: "X / Twitter", href: "https://x.com/AISafetySimply", path: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.8L18.9 2ZM17.9 20h1.7L6.3 4H4.5L17.9 20Z" },
  { name: "Substack", path: "M3 0h18v2H3zm0 5h18v2H3zm0 5h18v14l-9-5-9 5Z" },
  { name: "Instagram", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" },
];

export default function Contact() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
            Contact
          </h1>
        </header>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-w-0 flex-col gap-10">
          <section aria-label="Email and social media">
            <a href={`mailto:${site.contactEmail}`} className="block break-words text-[clamp(1rem,3.4vw,1.75rem)] font-medium tracking-tight underline-offset-4 hover:underline">
              {site.contactEmail}
            </a>
            <ul aria-label="Social media" className="mt-4 -ml-2.5 flex flex-wrap gap-2">
              {socialChannels.map(({ name, path, href }) => (
                <li key={name}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`} title={name} className="inline-flex h-11 w-11 items-center justify-center text-ink transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" fillRule="evenodd" aria-hidden="true">
                        <path d={path} />
                      </svg>
                    </a>
                  ) : <span
                    role="link"
                    aria-disabled="true"
                    aria-label={`${name} — coming soon`}
                    title={`${name} — coming soon`}
                    className="inline-flex h-11 w-11 items-center justify-center text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" fillRule="evenodd" aria-hidden="true">
                      <path d={path} />
                    </svg>
                  </span>}
                </li>
              ))}
            </ul>
          </section>

          <section id="mailing-list" aria-labelledby="mailing-heading">
            <h2 id="mailing-heading" className="text-2xl font-medium tracking-tight">Mailing list</h2>
            <p className="mt-3 mb-5 max-w-md leading-relaxed text-muted">
              New explainers, demos, and videos, sent to your inbox.
            </p>
            <SignupForm />
          </section>
          </div>
          <section aria-labelledby="feedback-heading" className="min-w-0">
            <h2 id="feedback-heading" className="mb-6 text-2xl font-medium tracking-tight">Feedback</h2>
            <FeedbackForm />
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
