import Link from "next/link";
import { site } from "@/content";

const links = [
  { label: "Library", href: "/#library" },
  { label: "Team", href: "/team" },
  { label: "Get involved", href: "/#updates" },
  { label: "FAQ", href: "/#faq" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-6 py-4">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.14em] text-ink hover:text-accent"
        >
          {site.name}
        </Link>
        <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-ink"
            >
              {label}
            </Link>
          ))}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-ink"
          >
            Contact
          </a>
        </span>
      </div>
    </nav>
  );
}
