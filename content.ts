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
    q: "What is AI Safety Said Simply?",
    a: "We make short, accurate explainers, interactive demos, and videos on the ideas that matter in AI safety. Everything is built to be finished in one sitting by someone without a technical background.",
  },
  {
    q: "Who is this for?",
    a: "Policymakers who brief others, educators who need teaching material, and anyone curious about AI safety who doesn't have hours to spare. If you can read a memo, you can use our material.",
  },
  {
    q: "Aren't there already good AI safety explainers?",
    a: "There is excellent material out there — but most of it is long, technical, and written for people who already understand the field. The gap isn't quality. It's accessibility.",
  },
  {
    q: "What formats do you make?",
    a: "Written explainers, interactive demos you can play with in the browser, and short videos. One topic can ship in several formats, so you can pick the one that fits how you learn or teach.",
  },
  {
    q: "When do the in-production topics ship?",
    a: "We don't promise dates. Each topic goes live when it's accurate and genuinely easy to finish. Sign up for updates below and we'll tell you the moment each one ships.",
  },
  {
    q: "How can I help?",
    a: "Tell us which topic you need, share the library with someone who'd use it, or pitch in on writing and demos. See the Get involved section, or email kaustubh.kislay@gmail.com.",
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
