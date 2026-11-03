// Add a lesson = add a line. status "done" lessons open to their own page; "upcoming" ones show blurred as not available yet.
// Each lesson page has four tabs. Fill these in on a lesson as they're ready; empty ones show "coming soon":
//   slides: Google Slides embed URL (…/embed?start=false&loop=false)
//   video: YouTube embed URL (https://www.youtube.com/embed/<id>)
//   tutorial: { intro?, steps: [{ title, body }] }
//   resources: [{ label, href, kind }]
export type Lesson = {
  slug: string; date: string; title: string; summary: string; goal?: string; status: "done" | "upcoming";
  slides?: string; video?: string;
  tutorial?: { intro?: string; steps: { title: string; body: string }[] };
  resources?: { label: string; href: string; kind: string }[];
};
export const LESSONS: Lesson[] = [
  { slug: "intro-session", date: "Tue, Oct 6", title: "Intro session", summary: "What AIBA is, how the year works, and the proof log.", status: "done" },
  { slug: "freelancing-with-ai", date: "Tue, Oct 13", title: "Freelancing with AI", summary: "How to use AI tools to offer freelance services.", status: "done" },
  { slug: "app-dev-day-1", date: "Wed, Oct 28", title: "App dev day 1", summary: "Build the AI app.", goal: "Working app", status: "done" },
  { slug: "app-dev-day-2", date: "Wed, Nov 4", title: "App dev day 2", summary: "Host it, add the paid plan, and automate payment tracking.", goal: "10 users, ask every one to upgrade", status: "upcoming" },
  { slug: "ai-services-for-local-businesses", date: "Wed, Nov 11", title: "AI services for local businesses + cold calling", summary: "Offer AI services to local businesses and practice cold calling.", goal: "5 cold calls, free sample to 3 businesses, one paid job", status: "upcoming" },
  { slug: "digital-products-on-gumroad", date: "Wed, Nov 18", title: "AI digital products sold on Gumroad", summary: "Make an AI digital product and sell it on Gumroad.", goal: "Shared with 20 people, one sale", status: "upcoming" },
  { slug: "ai-chrome-extension", date: "Wed, Dec 2", title: "AI Chrome extension with a paid plan", summary: "Build a Chrome extension with AI and add a paid plan.", goal: "10 installs, ask each to upgrade", status: "upcoming" },
  { slug: "custom-ai-chatbots", date: "Wed, Dec 9", title: "Custom AI chatbots for creators, teachers and clubs", summary: "Build custom AI chatbots for creators, teachers and clubs.", status: "upcoming" },
];
