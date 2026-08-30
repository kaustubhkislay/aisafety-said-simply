import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
      </body>
    </html>
  );
}
