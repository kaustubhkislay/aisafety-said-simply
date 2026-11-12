import Link from "next/link";
import type { LibraryPart } from "@/content";

/** A topic can pair an explainer with a separately hosted demo. */
export default function LibraryParts({
  title,
  parts,
  currentHref,
  compact = false,
}: {
  title: string;
  parts: LibraryPart[];
  currentHref?: string;
  compact?: boolean;
}) {
  return (
    <nav className={`library-parts${compact ? " library-parts-compact" : ""}`} aria-label={`${title}: ${parts.length} parts`}>
      <ol>
        {parts.map((part, index) => (
          <li key={part.href}>
            {part.href.startsWith("http") ? (
              <a href={part.href} target="_blank" rel="noopener noreferrer">
                Part {index + 1}: {part.format}
              </a>
            ) : (
              <Link
                href={part.href}
                aria-current={part.href === currentHref ? "page" : undefined}
              >
                Part {index + 1}: {part.format}
              </Link>
            )}
            {!compact && <p>{part.description}</p>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
