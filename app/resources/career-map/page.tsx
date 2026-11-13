import type { Metadata } from "next";
import { site } from "@/content";

// The map lives in github.com/eliaskrasny/cta-video (career-flowchart/) and is
// published by Cloudflare Pages on every push to its main branch. Embedding the
// live site means this page updates whenever that repo does.
const MAP_URL = "https://aisss-careermap.pages.dev/?embed=full";

const description =
  "An interactive map of the paths into AI safety work, from research to policy to communications, and how to take the first step on each.";

export const metadata: Metadata = {
  title: `AI Safety Career Map — ${site.name}`,
  description,
  alternates: { canonical: "/resources/career-map" },
  openGraph: {
    title: `AI Safety Career Map — ${site.name}`,
    description,
    url: "/resources/career-map",
    images: ["/opengraph-image.png"],
  },
};

/** The map fills the screen below the menu; `embed=full` hides its own header
 *  and keeps scroll-to-zoom, so there is no footer to scroll to. */
export default function CareerMap() {
  return (
    <main className="flex flex-1 flex-col">
      <h1 className="sr-only">AI Safety Career Map</h1>
      <iframe
        src={MAP_URL}
        title="AI Safety Career Map"
        className="block min-h-[560px] w-full flex-1 border-0"
      />
    </main>
  );
}
