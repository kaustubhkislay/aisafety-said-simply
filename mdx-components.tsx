import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-10 font-display text-2xl font-medium tracking-[-0.01em] text-ink"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-8 font-display text-xl font-medium text-ink" {...props} />
    ),
    p: (props) => <p className="mt-4 leading-relaxed text-ink-2" {...props} />,
    ul: (props) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-2" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink-2" {...props} />
    ),
    a: (props) => (
      <a
        className="font-medium text-accent underline underline-offset-4 hover:text-ink"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-4 border-l-2 border-line-2 pl-4 font-serif italic text-muted"
        {...props}
      />
    ),
    ...components,
  };
}
