import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/** Classes for the inner pages' <main>: loads Inter and makes it the page font
 *  (see `.page-fonts` in app/globals.css). The nav, footer, homepage and
 *  explainers keep their own fonts. */
export const pageFonts = `${inter.variable} page-fonts`;
