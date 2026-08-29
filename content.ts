export type Format = "Explainer" | "Demo" | "Video";

export type LibraryItem = {
  title: string;
  hook: string;
  formats: Format[];
  status: "live" | "in-production";
  url?: string;
};

export const site = {
  name: "AI Safety Said Simply",
  tagline: "Complex AI safety topics, explained in forms people actually finish.",
  description:
    "Short explainers, interactive demos, and videos on the ideas that matter in AI safety — built for policymakers, journalists, educators, and anyone without hours to spare.",
  contactEmail: "kaustubh.kislay@gmail.com",
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
    a: "Yes, please do. Requests from people who need the material — a briefing next month, a course next term — move topics up the queue. Email kaustubh.kislay@gmail.com with what you need and when.",
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
    a: "Tell us — accuracy is the whole point. Email kaustubh.kislay@gmail.com with the piece and the problem, and we'll fix it and note the correction.",
  },
];

export const library: LibraryItem[] = [
  {
    title: "Reward hacking, in the wild",
    hook: "Real, documented cases of AI systems gaming their objectives — searchable and severity-rated.",
    formats: ["Explainer", "Demo"],
    status: "live",
    url: "https://rewardhacking.org",
  },
  {
    title: "Sleeper agents & secret loyalties",
    hook: "How a model can behave perfectly in testing while carrying hidden goals for later.",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "AI control",
    hook: "Getting useful work out of AI systems we don't fully trust — and catching them if they defect.",
    formats: ["Explainer", "Demo"],
    status: "in-production",
  },
  {
    title: "Eval awareness & eval gaming",
    hook: "What happens when a model can tell it's being tested — and acts accordingly.",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "Chain-of-thought unfaithfulness",
    hook: "A model's written reasoning doesn't always reflect why it actually did what it did.",
    formats: ["Explainer", "Video"],
    status: "in-production",
  },
  {
    title: "Bio & cyber uplift",
    hook: "How much easier do frontier models make it to cause serious harm — and how we measure that.",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "Compute verification",
    hook: "How treaties on AI could actually be enforced: verifying what chips are doing, and where.",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "Safeguards & classifiers",
    hook: "The filters wrapped around AI models — what they catch, what they miss, and why it's hard.",
    formats: ["Explainer", "Demo"],
    status: "in-production",
  },
  {
    title: "Self-fulfilling misalignment",
    hook: "Could writing about treacherous AI teach future models to be treacherous?",
    formats: ["Explainer"],
    status: "in-production",
  },
  {
    title: "Value reflection",
    hook: "If an AI could revise its own values, where would they settle — and would we like the result?",
    formats: ["Explainer"],
    status: "in-production",
  },
];
