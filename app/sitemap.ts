import type { MetadataRoute } from "next";
import { library, site } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/library", "/team", "/contact", "/careers", "/media-guide"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...library
      .filter((item) => item.status === "live" && item.slug && !item.url)
      .map((item) => ({
        url: `${site.url}/library/${item.slug}`,
        ...(item.updated ? { lastModified: item.updated } : {}),
      })),
  ];
}
