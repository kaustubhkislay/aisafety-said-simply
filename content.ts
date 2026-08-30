export type Format = "Explainer" | "Demo" | "Video";

export type Audience = "Policymakers" | "Educators" | "Public";

export type LibraryItem = {
  title: string;
  hook: string;
  formats: Format[];
  audiences: Audience[];
  status: "live" | "in-production";
  /** Set when the piece is hosted on this domain (renders at /library/[slug]). */
  slug?: string;
  /** External pieces (e.g. rewardhacking.org). An item never has both slug and url. */
  url?: string;
  /** Question-phrased search aliases, e.g. "can AI pretend to be safe?" */
  aliases?: string[];
  readingMinutes?: number;
  /** ISO date of last substantive update, e.g. "2026-08-29". */
  updated?: string;
  /** Path under /public to a downloadable one-pager, e.g. "/onepagers/ai-control.pdf". */
  pdf?: string;
};

export const site = {
  name: "AI Safety Said Simply",
  tagline: "Complex AI safety topics, explained in forms people actually finish.",
  description:
    "Short explainers, interactive demos, and videos on the ideas that matter in AI safety — built for policymakers, journalists, educators, and anyone without hours to spare.",
  contactEmail: "contact@aisafetysaidsimply.com",
};

export const audiences = [
  {
    audience: "Policymakers",
    problem:
      "Memos and demos are how policy offices learn and brief others. Most AI safety material is too long and too technical to use that way.",
  },
  {
    audience: "Educators",
    problem:
      "Digestible teaching material on AI safety is scattered across platforms — and for many topics, it simply doesn't exist.",
  },
  {
    audience: "The public",
    problem:
      "Nobody comes home from work and reads a dense 5,000-word technical post. The good material caters to people who already understand it.",
  },
];

export const theoryOfChange =
  "Lower the barrier to entry, and the ideas travel: more people who matter understand AI safety, and the conversation shifts in its favor.";

export type FormField = {
  entryId: string;
  label: string;
  multiline: boolean;
};

export type InvolvementForm = {
  label: string;
  description: string;
  url: string;
  fields: FormField[];
};

export const involvementForms: InvolvementForm[] = [
  {
    label: "Communications form",
    description:
      "You work in comms, media, or content. Answer as many or as few questions as you like.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdxA6QVJSHDxvUzOoZpFVx2016d6uoefzZ5opwewv5B3OJfrA/viewform",
    fields: [
      {
        entryId: "236751924",
        label:
          "What topics have you seen would be very impactful to explain but have not been simplified properly?",
        multiline: true,
      },
      {
        entryId: "87647740",
        label:
          "What kind of mediums/modalities of content are people in journalists/educators most accepting of?",
        multiline: true,
      },
      {
        entryId: "871289163",
        label:
          "When you are on deadline, what resource do you wish existed — a glossary, a vetted expert list, pre-cleared visuals?",
        multiline: true,
      },
      {
        entryId: "1588071546",
        label:
          "Would you personally use or share materials like this? What would they need to look like for you to do that?",
        multiline: true,
      },
      {
        entryId: "226460446",
        label: "What is the best piece of simplified AI content that you’ve seen?",
        multiline: true,
      },
      { entryId: "78293578", label: "Anything else?", multiline: true },
    ],
  },
  {
    label: "Policy form",
    description:
      "You work in or around policy. Answer as many or as few questions as you like.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdzstpncIEBFWv7ygL4dlQJbw5jWraRAp-gRq1K9zsU4oCR7Q/viewform",
    fields: [
      {
        entryId: "373684124",
        label:
          "If you were to generalize the sentiment about AI in DC, what would it be like?",
        multiline: true,
      },
      {
        entryId: "1546559595",
        label: "What topics should we be trying to simplify for people in DC?",
        multiline: true,
      },
      {
        entryId: "225813384",
        label:
          "What is the baseline level of AI knowledge amongst groups that are not “in the know” about AI?",
        multiline: false,
      },
      {
        entryId: "798550157",
        label:
          "Who are the highest leverage groups we should be targeting in DC with our content?",
        multiline: false,
      },
      {
        entryId: "1955607250",
        label: "What is the best piece of simplified AI content that you’ve seen?",
        multiline: true,
      },
      {
        entryId: "135355408",
        label:
          "Would you personally use or share materials like this? What would they need to look like for you to do that?",
        multiline: true,
      },
      {
        entryId: "274666831",
        label:
          "Are there people we should be talking to if we want to distribute our materials more directly to policy people?",
        multiline: false,
      },
      { entryId: "1439965594", label: "Anything else?", multiline: false },
    ],
  },
];

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "Isn't “said simply” just another way of saying “dumbed down”?",
    a: "No. We cut jargon and length, not substance. Every piece aims to leave you with the real idea — the same one a researcher would recognise — minus the notation and the prerequisites.",
  },
  {
    q: "How do you choose which topics to cover?",
    a: "We look for topics where the stakes are high and no genuinely accessible material exists yet. If a great short explainer is already out there, we'd rather point to it than duplicate it.",
  },
  {
    q: "Can I request a topic?",
    a: `Yes, please do. Requests from people who need the material — a briefing next month, a course next term — move topics up the queue. Email ${site.contactEmail} with what you need and when.`,
  },
  {
    q: "Do you take positions on AI policy?",
    a: "We explain ideas; we don't lobby. Where experts disagree, we say so and present the disagreement rather than picking a side for you.",
  },
  {
    q: "When do the in-production topics ship?",
    a: "We don't promise dates. Each topic goes live when it's accurate and genuinely easy to finish. Sign up for updates below and we'll tell you the moment each one ships.",
  },
  {
    q: "I spotted an error. What should I do?",
    a: `Tell us — accuracy is the whole point. Email ${site.contactEmail} with the piece and the problem, and we'll fix it and note the correction.`,
  },
];

export const library: LibraryItem[] = [
  {
    title: "Reward hacking, in the wild",
    hook: "Real, documented cases of AI systems gaming their objectives — searchable and severity-rated.",
    formats: ["Explainer", "Demo"],
    audiences: ["Policymakers", "Educators", "Public"],
    aliases: ["what is reward hacking?", "examples of AI gaming its objectives"],
    status: "live",
    url: "https://rewardhacking.org",
  },
  {
    title: "Sleeper agents & secret loyalties",
    hook: "How a model can behave perfectly in testing while carrying hidden goals for later.",
    formats: ["Explainer"],
    audiences: ["Policymakers", "Public"],
    aliases: ["can AI pretend to be safe?", "what is a sleeper agent?"],
    status: "in-production",
  },
  {
    title: "AI control",
    hook: "Getting useful work out of AI systems we don't fully trust — and catching them if they defect.",
    formats: ["Explainer", "Demo"],
    audiences: ["Policymakers", "Educators"],
    aliases: ["how do we use AI we don't trust?"],
    status: "in-production",
  },
  {
    title: "Eval awareness & eval gaming",
    hook: "What happens when a model can tell it's being tested — and acts accordingly.",
    formats: ["Explainer"],
    audiences: ["Educators", "Policymakers"],
    aliases: ["can AI tell when it's being tested?"],
    status: "in-production",
  },
  {
    title: "Chain-of-thought unfaithfulness",
    hook: "A model's written reasoning doesn't always reflect why it actually did what it did.",
    formats: ["Explainer", "Video"],
    audiences: ["Educators", "Public"],
    aliases: ["does AI reasoning reflect what it actually does?"],
    status: "in-production",
  },
  {
    title: "Bio & cyber uplift",
    hook: "How much easier do frontier models make it to cause serious harm — and how we measure that.",
    formats: ["Explainer"],
    audiences: ["Policymakers"],
    aliases: ["how much does AI help attackers?"],
    status: "in-production",
  },
  {
    title: "Compute verification",
    hook: "How treaties on AI could actually be enforced: verifying what chips are doing, and where.",
    formats: ["Explainer"],
    audiences: ["Policymakers"],
    aliases: ["how would an AI treaty be enforced?"],
    status: "in-production",
  },
  {
    title: "Safeguards & classifiers",
    hook: "The filters wrapped around AI models — what they catch, what they miss, and why it's hard.",
    formats: ["Explainer", "Demo"],
    audiences: ["Educators", "Public"],
    aliases: ["how do AI content filters work?"],
    status: "in-production",
  },
  {
    title: "Self-fulfilling misalignment",
    hook: "Could writing about treacherous AI teach future models to be treacherous?",
    formats: ["Explainer"],
    audiences: ["Public", "Educators"],
    aliases: ["can writing about bad AI cause bad AI?"],
    status: "in-production",
  },
  {
    title: "Value reflection",
    hook: "If an AI could revise its own values, where would they settle — and would we like the result?",
    formats: ["Explainer"],
    audiences: ["Public"],
    aliases: ["what would AI values become?"],
    status: "in-production",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  url?: string;
  calendly?: string;
  email?: string;
};

export const team: TeamMember[] = [
  {
    name: "Kaustubh Kislay",
    role: "Co-founder",
    bio: "Kaustubh is the director of the Wisconsin AI Safety Initiative. He is a generalist with a background in technical AI safety research focused on AI control and reward hacking.",
    photo: "/team/kaustubh.webp",
    url: "https://www.linkedin.com/in/kaustubh-kislay/",
    calendly: "https://calendly.com/kaustubh-kislay/15min",
    email: "kaustubh@aisafetysaidsimply.com",
  },
  {
    name: "Christine Corry",
    role: "Co-founder",
    photo: "/team/christine.webp",
    bio: "Christine is a researcher with experience at UChicago's XLab Second Look, NASA Ames, and the Rubin Observatory. Her most recent research focused on single forward pass evals and emergent misalignment.",
    url: "https://www.linkedin.com/in/christinecorry/",
    calendly: "https://calendly.com/christinecorry",
    email: "christine@aisafetysaidsimply.com",
  },
];

export const mentees: TeamMember[] = [
  {
    name: "Mentee One",
    role: "SPAR mentee",
    bio: "Bio coming soon.",
  },
  {
    name: "Mentee Two",
    role: "SPAR mentee",
    bio: "Bio coming soon.",
  },
  {
    name: "Mentee Three",
    role: "SPAR mentee",
    bio: "Bio coming soon.",
  },
];
