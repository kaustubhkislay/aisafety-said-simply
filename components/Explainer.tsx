import type { ReactNode } from "react";

// Styled by the `.writeup` rules in app/globals.css.

/** Image with a source line beneath it, for charts and screenshots. */
export function Figure({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
}) {
  return (
    <figure className="figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
}

/** Something a model said, labelled with the speaker and linked to its source. */
export function Transcript({
  speaker,
  source,
  href,
  children,
}: {
  speaker: string;
  source: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <figure className="transcript">
      <div className="transcript-body">
        <p className="transcript-speaker">{speaker}</p>
        {children}
      </div>
      <figcaption>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {source}
        </a>
      </figcaption>
    </figure>
  );
}

/** A real-world case illustrating the point just made. */
export function Example({ children }: { children: ReactNode }) {
  return <div className="example">{children}</div>;
}

/** Collapsible aside for readers who want more depth. */
export function Details({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className="aside">
      <summary>{summary}</summary>
      {children}
    </details>
  );
}

/** A term with a numbered definition in the right margin; on narrow
 *  screens, tapping the term opens the definition inline. */
export function Sidenote({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <span className="sidenote">
      <label className="sidenote-term">
        <input type="checkbox" />
        {term}
      </label>
      <span className="sidenote-note">{children}</span>
    </span>
  );
}
