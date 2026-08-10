import Hero from "@/components/Hero";
import Why from "@/components/Why";
import Library from "@/components/Library";
import Institutions from "@/components/Institutions";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col">
      <Hero />
      <Why />
      <Library />
      <Institutions />
      <GetInvolved />
      <Footer />
    </main>
  );
}
