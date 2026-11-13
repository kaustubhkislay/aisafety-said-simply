import Link from "next/link";
import { library } from "@/content";
import LibraryBrowser from "@/components/LibraryBrowser";

export default function Library() {
  return (
    <section id="library" className="">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
            The Library
          </h2>
          <Link
            href="/library"
            className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2 hover:underline"
          >
            Full library
          </Link>
        </div>
        <LibraryBrowser items={library} />
      </div>
    </section>
  );
}
