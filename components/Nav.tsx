import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { site } from "@/content";

const links = [
  { label: "Library", href: "/#library" },
  { label: "Team", href: "/team" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-10 bg-paper">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 py-5">
        <Link
          href="/"
          className="inline-flex text-ink transition-opacity hover:opacity-75"
          aria-label={site.name}
        >
          <BrandLogo />
        </Link>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2 hover:underline"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact#mailing-list"
            className="rounded-card bg-accent px-4 py-2 text-sm font-medium whitespace-nowrap text-cream transition-opacity duration-150 ease-out hover:opacity-90"
          >
            Get updates
          </Link>
        </span>
      </div>
    </nav>
  );
}
