import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import { site, team, mentees } from "@/content";

export const metadata: Metadata = {
  title: "Team — AI Safety Said Simply",
  description: `The people behind ${site.name}.`,
};

export default function Team() {
  return (
    <main className="flex min-h-full flex-col">
      <section className="mx-auto w-full max-w-5xl px-6 pt-14 pb-16 sm:pb-20">
        <h1 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink sm:text-4xl">
          Team
        </h1>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-8">
          {team.map(({ name, role, bio, photo, url, calendly, email }) => (
            <div key={name} className="pt-4">
              {photo && (
                <Image
                  src={photo}
                  alt={name}
                  width={480}
                  height={480}
                  className="aspect-square w-40 rounded-card object-cover sm:w-48"
                />
              )}
              <h2 className="mt-4 font-display text-xl font-medium text-ink">
                {name}
              </h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                {role}
              </p>
              <p className="mt-3 leading-relaxed text-muted">{bio}</p>
              <span className="mt-3 flex flex-wrap gap-4">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="text-sm font-medium text-accent underline underline-offset-4 hover:text-ink"
                  >
                    {email}
                  </a>
                )}
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent underline underline-offset-4 hover:text-ink"
                  >
                    LinkedIn ↗
                  </a>
                )}
                {calendly && (
                  <a
                    href={calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent underline underline-offset-4 hover:text-ink"
                  >
                    Book a call ↗
                  </a>
                )}
              </span>
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
