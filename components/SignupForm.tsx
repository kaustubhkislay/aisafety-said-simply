"use client";

import { useState } from "react";
import { subscribe } from "@/lib/subscribe";

export default function SignupForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="text-accent" role="status">
        You&rsquo;re on the list. We&rsquo;ll be in touch.
      </p>
    );
  }

  return (
    <form
      className="flex max-w-md gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        if (typeof email === "string" && email) {
          await subscribe(email);
          setDone(true);
        }
      }}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
        className="w-full min-w-0 rounded-card border border-line bg-card px-3 py-2 text-ink placeholder:text-muted"
      />
      <button
        type="submit"
        className="rounded-card bg-accent px-4 py-2 font-medium whitespace-nowrap text-cream transition-opacity duration-150 ease-out hover:opacity-90"
      >
        Sign up
      </button>
    </form>
  );
}
