import localFont from "next/font/local";
import { site } from "@/content";

const redaction = localFont({
  src: "../public/fonts/redaction/Redaction35-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
});

export default function Hero() {
  return (
    <header className="hero-shell relative mx-auto flex w-full max-w-5xl flex-col justify-center px-6">
      <div className="w-full py-16 sm:py-20">
        <p className="section-index">AI Safety Said Simply</p>
        <h1 className="max-w-[1200px] font-display text-[clamp(3.25rem,8.2vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.06em] text-ink">
          <span className={`${redaction.className} font-normal tracking-[-0.035em]`}>{site.tagline.split("said simply")[0]}</span>
          <span className="text-hero-orange">said simply</span>
          {site.tagline.split("said simply")[1]}
        </h1>
        <div className="mt-12 flex flex-wrap items-start gap-3">
          <a
            href="#library"
            className="rounded-card bg-accent px-6 py-3 font-medium whitespace-nowrap text-cream transition-opacity duration-150 ease-out hover:opacity-90"
          >
            Explore the library
          </a>
          <a
            href="/team"
            className="rounded-card bg-paper-2 px-6 py-3 font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-paper-2"
          >
            Chat with us
          </a>
        </div>
      </div>
    </header>
  );
}
