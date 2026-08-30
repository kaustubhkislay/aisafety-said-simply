import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

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
      className={`${hanken.variable} ${newsreader.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
      </body>
    </html>
  );
}
