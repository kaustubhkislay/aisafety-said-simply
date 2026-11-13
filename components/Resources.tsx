import Link from "next/link";
import { resources } from "@/content";
import ResourceCard from "@/components/ResourceCard";

export default function Resources() {
  return (
    <section id="resources">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-ink">
            Resources
          </h2>
          <Link
            href="/resources"
            className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2 hover:underline"
          >
            All resources
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <li key={resource.title}>
              <ResourceCard resource={resource} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
