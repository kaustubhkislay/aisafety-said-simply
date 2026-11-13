import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import NavGate from "@/components/NavGate";
import "./globals.css";
import { site } from "@/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description:
    site.description,
  openGraph: {
    title: site.name,
    description:
      site.description,
    url: "/",
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description:
      site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <NavGate>
          <Nav />
        </NavGate>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
