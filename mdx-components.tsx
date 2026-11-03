import type { MDXComponents } from "mdx/types";
import { slugify } from "@/lib/slugify";

// Explainer typography lives in the `.writeup` rules in app/globals.css.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        id={typeof props.children === "string" ? slugify(props.children) : undefined}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        id={typeof props.children === "string" ? slugify(props.children) : undefined}
        {...props}
      />
    ),
    // Outside links open in a new tab so readers keep their place.
    a: ({ href, ...props }) =>
      href?.startsWith("http") ? (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
      ) : (
        <a href={href} {...props} />
      ),
    table: (props) => (
      <div className="tablewrap">
        <table {...props} />
      </div>
    ),
    ...components,
  };
}
