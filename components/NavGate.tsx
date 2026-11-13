"use client";

import { usePathname } from "next/navigation";

/** Pages that bring their own header and so hide the site nav. */
const FULL_SCREEN = ["/resources/career-map"];

export default function NavGate({ children }: { children: React.ReactNode }) {
  return FULL_SCREEN.includes(usePathname()) ? null : children;
}
