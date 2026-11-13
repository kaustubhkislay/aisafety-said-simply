import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/** Classes that load Inter and make it the font inside (see `.page-fonts` in
 *  app/globals.css). Used on the inner pages' <main> and on the homepage below
 *  the hero. The nav, footer, hero and explainers keep their own fonts. */
export const pageFonts = `${inter.variable} page-fonts`;
