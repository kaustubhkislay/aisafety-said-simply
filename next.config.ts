import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return [
      { source: "/media-guide", destination: "/resources/media-guide", permanent: true },
      // The career map is its own site, published from github.com/eliaskrasny/cta-video
      // on every push; its logo links back here.
      { source: "/resources/career-map", destination: "https://aisss-careermap.pages.dev/", permanent: false },
    ];
  },
};

const withMDX = createMDX({
  options: { remarkPlugins: ["remark-gfm"] },
});

export default withMDX(nextConfig);
