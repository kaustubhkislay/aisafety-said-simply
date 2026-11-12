# Reward-hacking explainer

The explainer at `/library/reward-hacking` is a copy of the published essay at
<https://rewardhacking.org/writeup>. It retains the original title, author,
July 22, 2026 date, prose, links, opening quote, two SVG storyboards, two
interactive charts, further reading, and video.

Source repository: `kaustubhkislay/reward-hacking-in-the-wild`, commit
`b425033` (copied November 9, 2026).

- `content/library/reward-hacking.mdx` converts the source note's `word[url]`
  links to standard Markdown and omits the two unpublished draft placeholders.
  It includes the additional content from `site/src/app/writeup/page.tsx`.
- `Storyboard.tsx`, `TrendChart.tsx`, and `SeverityTrendChart.tsx` come from
  `site/src/components/`. Only the chart import paths differ.
- `severity.ts` comes from `site/src/lib/severity.ts`.
- `content/library/reward-hacking-data.json` preserves the `monthly` and
  `monthly_severity` arrays from `site/src/data/stats.json`. The figures show
  the original snapshot through June 2026 and exclude partial July 2026.
  These data do not update automatically.
- `writeup.module.css` scopes the original figure styles to this explainer.
- `public/library/reward-hacking/og.png` is the original social preview image.

The source export script is older than the published page and uses a different
opening quote. Use the page and Markdown sources for future transfers.

The AISS library groups both parts under "Reward Hacking": the Demo
links to the searchable corpus on rewardhacking.org, and the Explainer links to
the local writeup about reward hacking and reward-seeking behavior. The homepage
card uses the same title-and-arrow layout as the other live topics and links
directly to the explainer. The library page and explainer show links to both
parts. The explainer retains
its original article title through the catalog's `articleTitle` field.
This repository contains the chart aggregates, not the collected report bodies.

The copied components use the MIT license in `LICENSE`. Original annotations
use CC BY 4.0; quoted reports belong to their authors. The explainer retains
the source attribution and removal link.
