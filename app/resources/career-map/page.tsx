import type { Metadata } from "next";
import { site } from "@/content";

// The map is its own site, published from github.com/eliaskrasny/cta-video
// (career-flowchart/) by Cloudflare Pages on every push to main, so this page
// follows that repo automatically. It is shown full screen with the map's own
// header; the site nav is hidden on this route (see components/NavGate.tsx),
// and the map's logo links back to aisaidsimply.com.
const MAP_URL = "https://aisss-careermap.pages.dev/";

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

export default function CareerMap() {
  return (
    <main>
      <h1 className="sr-only">AI Safety Career Map</h1>
      {/* Inline height so the frame is full size before the stylesheet loads;
          the map measures its window once, on load. */}
      <iframe
        src={MAP_URL}
        title="AI Safety Career Map"
        style={{ display: "block", width: "100%", height: "100dvh", border: 0 }}
      />
    </main>
  );
}
