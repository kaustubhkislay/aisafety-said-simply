import Hero from "@/components/Hero";
import Why from "@/components/Why";
import Library from "@/components/Library";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col">
      <Hero />
      <Why />
      <Library />
      <Faq />
      <Footer />
    </main>
  );
}
