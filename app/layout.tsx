import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aisafetysaidsimply.com"),
  title: "AI Safety Said Simply",
  description:
    "Complex AI safety topics, explained in short, engaging forms — explainers, demos, and videos for policymakers, journalists, educators, and the public.",
  openGraph: {
    title: "AI Safety Said Simply",
    description:
      "Complex AI safety topics, explained in short, engaging forms — explainers, demos, and videos for policymakers, journalists, educators, and the public.",
    url: "/",
    siteName: "AI Safety Said Simply",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Safety Said Simply",
    description:
      "Complex AI safety topics, explained in short, engaging forms — explainers, demos, and videos.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
