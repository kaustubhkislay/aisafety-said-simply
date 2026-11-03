"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string; sub?: boolean };

/** Fixed contents rail for an article; highlights the section in view. */
export default function Toc({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      const passed = sections.filter(({ id }) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        return top !== undefined && top < window.innerHeight * 0.35;
      });
      setActive(passed.at(-1)?.id ?? "top");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav className="toc" aria-label="Contents">
      <ul>
        {[{ id: "top", label: "Introduction" }, ...sections].map(
          ({ id, label, sub }) => (
            <li
              key={id}
              className={[sub && "sub", id === active && "active"]
                .filter(Boolean)
                .join(" ") || undefined}
            >
              <a href={`#${id}`}>{label}</a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
