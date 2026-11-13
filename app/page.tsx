import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Why from "@/components/Why";
import Library from "@/components/Library";
import Resources from "@/components/Resources";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main className="flex min-h-full flex-col">
      <Hero />
      <Why />
      <Library />
      <Resources />
      <Faq />
      <Footer />
    </main>
  );
}
