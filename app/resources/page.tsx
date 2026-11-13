import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { resources, site } from "@/content";
import ResourceCard from "@/components/ResourceCard";
import { pageFonts } from "@/lib/pageFonts";

const description =
  "Guides, maps and reading lists from AI Said Simply for people working on or around AI safety.";

export const metadata: Metadata = {
  title: `Resources — ${site.name}`,
  description,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: `Resources — ${site.name}`,
    description,
    url: "/resources",
    images: ["/opengraph-image.png"],
  },
};

export default function Resources() {
  return (
    <main className={`flex flex-1 flex-col ${pageFonts}`}>
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
            Resources
          </h1>
        </header>
        <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <li key={resource.title}>
              <ResourceCard resource={resource} />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
}
