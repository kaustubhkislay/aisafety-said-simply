import { site } from "@/content";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-4 px-6 py-8 text-sm text-muted">
        <span className="font-mono text-xs uppercase tracking-[0.12em]">
          {site.name}
        </span>
        <a
          href={`mailto:${site.contactEmail}`}
          className="underline underline-offset-4 hover:text-ink"
        >
          {site.contactEmail}
        </a>
      </div>
    </footer>
  );
}
