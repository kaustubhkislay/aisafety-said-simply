import { site } from "@/content";

// Enable subscriptions once a mailing-list service replaces lib/subscribe.ts.
export default function SignupForm() {
  return (
    <div className="max-w-md">
      <form aria-label="Mailing list signup">
        <fieldset disabled className="flex gap-2">
          <legend className="sr-only">Mailing list signup — coming soon</legend>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            aria-label="Email address"
            className="w-full min-w-0 rounded-card border border-line bg-paper-2 px-3 py-2 text-muted"
          />
          <button
            type="submit"
            className="shrink-0 rounded-card bg-ink px-4 py-2 font-medium whitespace-nowrap text-cream disabled:opacity-50"
          >
            Sign up
          </button>
        </fieldset>
      </form>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Mailing list signups are coming soon. For now,{" "}
        <a href={`mailto:${site.contactEmail}`} className="text-ink underline underline-offset-4">email us</a>.
      </p>
    </div>
  );
}
