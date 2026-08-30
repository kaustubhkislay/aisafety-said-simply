import Link from "next/link";
import { site } from "@/content";

const links = [
  { label: "Library", href: "/#library" },
  { label: "Team", href: "/team" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: null },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3">
        <Link
          href="/"
          className="font-serif text-lg font-semibold text-ink hover:underline"
        >
          {site.name}
        </Link>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map(({ label, href }) =>
            href ? (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-ink-2 hover:underline"
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={`mailto:${site.contactEmail}`}
                className="text-sm font-medium text-ink-2 hover:underline"
              >
                {label}
              </a>
            )
          )}
          <Link
            href="/#updates"
            className="rounded-card bg-accent px-4 py-2 text-sm font-medium whitespace-nowrap text-cream transition-opacity duration-150 ease-out hover:opacity-90"
          >
            Get updates
          </Link>
        </span>
      </div>
    </nav>
  );
}
