import Link from "next/link";
import type { Resource } from "@/content";

/** A resource tile: orange and linked when live, grey while coming soon.
 *  `compact` shows the title only, matching the homepage library tiles. */
export default function ResourceCard({
  resource,
  compact = false,
}: {
  resource: Resource;
  compact?: boolean;
}) {
  const { title, description, href } = resource;
  const Heading = compact ? "h3" : "h2";
  const inner = (
    <div className={`flex h-full justify-between gap-4 ${compact ? "items-center" : "items-start"}`}>
      <div>
        <Heading className="font-display text-2xl font-medium leading-snug text-ink">
          {title}
          {compact && !href && <span className="sr-only"> — Coming soon</span>}
        </Heading>
        {!compact && <p className="mt-3 leading-relaxed text-ink-2">{description}</p>}
        {!compact && !href && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.06em] text-muted">
            Coming soon
          </p>
        )}
      </div>
      {href && (
        <span aria-hidden="true" className="shrink-0 text-4xl font-normal leading-none">
          &gt;
        </span>
      )}
    </div>
  );
  const base = "block h-full rounded-card p-6 transition-colors duration-150 ease-out";
  return href ? (
    <Link href={href} className={`${base} bg-library-live hover:bg-library-live-hover`}>
      {inner}
    </Link>
  ) : (
    <div className={`${base} bg-paper-3`}>{inner}</div>
  );
}
