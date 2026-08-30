import { site } from "@/content";
import SignupForm from "@/components/SignupForm";
import FormsEmbed from "@/components/FormsEmbed";

export default function GetInvolved() {
  return (
    <section id="updates" className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
        Get involved
      </h2>
      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <div className="pt-4">
          <h3 className="font-semibold text-ink">Contribute</h3>
          <p className="mt-2 leading-relaxed text-muted">
            We&rsquo;re looking for writers, demo builders, and video makers
            who can make hard ideas simple.
          </p>
          <p className="mt-4 text-sm text-muted">
            Neither form below fits?{" "}
            <a
              href={`mailto:${site.contactEmail}?subject=Contributing to AI Safety Said Simply`}
              className="font-medium text-accent underline underline-offset-4"
            >
              Email us
            </a>
            .
          </p>
        </div>
        <div className="pt-4">
          <h3 className="font-semibold text-ink">Stay updated</h3>
          <p className="mt-2 leading-relaxed text-muted">
            Get new explainers, demos, and videos as they&rsquo;re published.
          </p>
          <div className="mt-4">
            <SignupForm />
          </div>
        </div>
      </div>
      <FormsEmbed />
    </section>
  );
}
