import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LibraryIndex from "@/components/LibraryIndex";
import { site, library } from "@/content";
import { fontVariables } from "@/lib/explainerFonts";

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
    <main className={`flex min-h-full flex-col ${fontVariables}`}>
      <div className="library-index">
        <header>
          <h1>Library</h1>
          <p className="intro">
            Short explainers, interactive demos and videos on the ideas that
            matter in AI safety.
          </p>
        </header>
        <LibraryIndex items={ordered} />
      </div>
      <Footer />
    </main>
  );
}
