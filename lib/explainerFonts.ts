import { IBM_Plex_Mono, Newsreader } from "next/font/google";

// Fonts for explainers, exposed as CSS variables: Newsreader sets body text,
// Plex Mono sets transcripts.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-plex-mono",
});

export const fontVariables = [newsreader, plexMono]
  .map((f) => f.variable)
  .join(" ");
