import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import { site, team, mentees } from "@/content";

export const metadata: Metadata = {
  title: "Team — AI Safety Said Simply",
  description: `The people behind ${site.name}.`,
};

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export default function Team() {
  return (
    <main className="flex min-h-full flex-col">
      <section className="mx-auto w-full max-w-5xl px-6 pt-14 pb-16 sm:pb-20">
        <h1 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink sm:text-4xl">
          Team
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-8">
          {team.map(({ name, role, bio, photo, url, calendly, email }) => (
            <div key={name} className="flex flex-col gap-5">
              {photo && (
                <Image
                  src={photo}
                  alt={name}
                  width={480}
                  height={480}
                  className="aspect-square w-40 rounded-card object-cover sm:w-44"
                />
              )}
              <div className="min-w-0">
                <h2 className="font-display text-xl font-medium text-ink">
                  {name}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                    {role}
                  </p>
                  <span className="flex items-center gap-2">
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        aria-label={`Email ${name}`}
                        title={email}
                        className="text-muted transition-colors duration-150 ease-out hover:text-accent"
                      >
                        <MailIcon />
                      </a>
                    )}
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} on LinkedIn`}
                        title="LinkedIn"
                        className="text-muted transition-colors duration-150 ease-out hover:text-accent"
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                    {calendly && (
                      <a
                        href={calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Book a call with ${name}`}
                        title="Book a call"
                        className="text-muted transition-colors duration-150 ease-out hover:text-accent"
                      >
                        <CalendarIcon />
                      </a>
                    )}
                  </span>
                </div>
                <p className="mt-3 max-w-prose leading-relaxed text-muted">
                  {bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl font-medium tracking-[-0.01em] text-ink">
          SPAR mentees
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {mentees.map(({ name, bio }) => (
            <div key={name} className="pt-4">
              <h3 className="font-semibold text-ink">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
