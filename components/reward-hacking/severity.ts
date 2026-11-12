// The severity scale, defined once. Mirrors SEVERITIES in rhw/severity.py —
// ordinal, least harmful first.

export const SEVERITIES = ["negligible", "minor", "significant", "severe"] as const;

export type Severity = (typeof SEVERITIES)[number];

export const SEVERITY_BLURB: Record<Severity, string> = {
  negligible: "no real damage",
  minor: "recoverable loss",
  significant: "real cost to recover",
  severe: "irreversible or critical harm",
};

/** Facet value for cases the rater skipped or whose rating failed to parse. */
export const UNRATED = "unrated";

export function isSeverity(s: string | null | undefined): s is Severity {
  return !!s && (SEVERITIES as readonly string[]).includes(s);
}

// Severity is ordinal, so charts use a sequential ramp of the site's rust
// accent, light (least harm) to dark (most), with a neutral gray for unrated.
// Validated with the dataviz palette checker: monotonic lightness
// 0.925 → 0.354, worst adjacent pair ΔE 19.7 normal / 18.2 protan.
export const SEVERITY_FILL: Record<Severity | typeof UNRATED, string> = {
  negligible: "#f9e2cb",
  minor: "#e59a4e",
  significant: "#b05516",
  severe: "#5e2b0c",
  unrated: "#c4c0b9",
};
