import { library } from "@/content";
import LibraryBrowser from "@/components/LibraryBrowser";

export default function Library() {
  return (
    <section id="library" className="">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
          The library
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          One piece is live. The rest are in production — each one short,
          accurate, and made to be shared.
        </p>
        <LibraryBrowser items={library} />
      </div>
    </section>
  );
}
