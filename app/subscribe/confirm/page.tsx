import type { Metadata } from "next";
import ConfirmSubscription from "@/components/ConfirmSubscription";
export const metadata: Metadata = { title: "Confirm subscription — AI Safety Said Simply", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default function Page() {
  return <main className="mx-auto w-full max-w-3xl px-6 py-16"><h1 className="text-4xl font-medium tracking-tight">Confirm your subscription</h1><ConfirmSubscription /></main>;
}
