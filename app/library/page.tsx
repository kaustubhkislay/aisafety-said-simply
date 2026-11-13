import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LibraryIndex from "@/components/LibraryIndex";
import { site, library } from "@/content";

export const metadata: Metadata = {
  alternates: { canonical: "/library" },
  title: `Library — ${site.name}`,
  description:
    "Every AI Said Simply explainer, demo and video, filterable by topic.",
};

// Newest first; undated pieces keep their catalog order after dated ones.
const ordered = [...library].sort((a, b) =>
  (b.updated ?? "").localeCompare(a.updated ?? ""),
);

export default function LibraryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="library-index mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
            Library
          </h1>
        </header>
        <LibraryIndex items={ordered} />
      </div>
      <Footer />
    </main>
  );
}
