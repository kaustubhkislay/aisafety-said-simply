import Link from "next/link";
import { site } from "@/content";

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="font-serif text-lg font-medium text-cream">
              {site.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream opacity-70">
              {site.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="/team"
              className="text-cream opacity-90 hover:underline"
            >
              Team
            </Link>
            <Link
              href="/#library"
              className="text-cream opacity-90 hover:underline"
            >
              Library
            </Link>
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-cream opacity-90 hover:underline"
            >
              {site.contactEmail}
            </a>
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream opacity-70 hover:underline"
            >
              Content is free to share — CC BY 4.0
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
