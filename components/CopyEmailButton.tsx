"use client";

import { useEffect, useRef, useState } from "react";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </svg>
  );
}

export default function CopyEmailButton({ email, name }: { email: string; name: string }) {
  const [message, setMessage] = useState("");
  const container = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!message) return;

    const dismissOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        if (timer.current) clearTimeout(timer.current);
        setMessage("");
      }
    };

    document.addEventListener("pointerdown", dismissOnOutsideClick);
    return () => document.removeEventListener("pointerdown", dismissOnOutsideClick);
  }, [message]);

  return (
    <span ref={container} className="relative inline-flex">
      <button
        type="button"
        aria-label={`Copy ${name}'s email address`}
        title={`Copy ${email}`}
        className="cursor-pointer text-muted transition-colors duration-150 ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
        onClick={async () => {
          if (timer.current) clearTimeout(timer.current);
          try {
            await navigator.clipboard.writeText(email);
            setMessage("Email copied");
          } catch {
            setMessage(`Could not copy. Email: ${email}`);
          }
          timer.current = setTimeout(() => setMessage(""), 1200);
        }}
      >
        <MailIcon />
      </button>
      <span role="status" className={message ? "absolute top-full left-0 z-10 mt-2 w-max max-w-64 bg-ink px-3 py-2 text-xs font-normal text-cream" : "sr-only"}>
        {message}
      </span>
    </span>
  );
}
