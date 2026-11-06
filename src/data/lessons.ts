// Add a lesson = add a line. status "done" lessons open to their own page; "upcoming" ones show blurred as not available yet.
// Each lesson page has four tabs. Fill these in on a lesson as they're ready; empty ones show "coming soon":
//   slides: Google Slides embed URL (…/embed?start=false&loop=false)
//   videos, tutorial, kit (tools + prompts) and links live in src/data/lesson-guides.ts, keyed by slug.
//   tools: names from src/data/tools.ts, e.g. ["ChatGPT", "YouWare"]. Shows the lesson under "Used in" on the Tools page.
import { GUIDES, type Guide } from "./lesson-guides";

export type Lesson = Guide & {
  slug: string; date: string; title: string; summary: string; goal?: string; status: "done" | "upcoming";
  slides?: string;
  tools?: string[];
};
const BASE: Lesson[] = [
  { slug: "intro-session", date: "Tue, Oct 6", title: "Intro session", summary: "What AIBA is, how we use AI for business, and our plans for the year, from projects and starting businesses to the end-of-year competition.", status: "done",
    slides: "https://docs.google.com/presentation/d/1V4XKkLo5uc1SPFOwIqpwd-rVMAlZi_KyQvn3oBzHEB0/embed?start=false&loop=false&delayms=3000" },
  { slug: "freelancing-with-ai", date: "Tue, Oct 13", title: "Build websites with AI", summary: "Use AI to build professional websites, then turn that skill into freelance income: finding clients, pricing your work and landing the first one.", status: "done",
    slides: "https://drive.google.com/file/d/1AKmw6pBrQMqxGs9qpNHJaF8fwm1fcyXZ/preview",
    tools: ["Claude", "YouWare", "Base44", "Fiverr", "Upwork"] },
  { slug: "app-dev-day-1", date: "Wed, Oct 28", title: "App dev day 1", summary: "Turn an app idea into a working prototype: pick a niche, find a gap competitors miss, choose how it makes money, and build it with AI.", goal: "Working prototype, 3 screenshots, a pricing comparison and a landing page", status: "done",
    slides: "https://docs.google.com/presentation/d/1UeEgzBaFCXaYi03vhbx1oQ0OIopOdHXHtiwvw35ALAY/embed?start=false&loop=false&delayms=3000",
    tools: ["Perplexity", "Claude", "ChatGPT", "YouWare"] },
  { slug: "app-dev-day-2", date: "Wed, Nov 4", title: "App dev day 2", summary: "Take your app live: build the landing page, publish with GitHub and Vercel, add email and Google sign-in with Supabase, and start taking payments.", goal: "Build and publish the first working version of your app", status: "done",
    slides: "https://docs.google.com/presentation/d/1Hyiq-vZSXGE2hTFSGQS0IZxaDwCC_b7O-iS233r89OA/embed?start=false&loop=false&delayms=3000",
    tools: ["Claude", "GitHub", "Vercel", "Supabase", "Google AI Studio"] },
  { slug: "ai-services-for-local-businesses", date: "Wed, Nov 11", title: "AI services for local businesses + cold calling", summary: "Offer AI services to local businesses and practice cold calling.", goal: "5 cold calls, free sample to 3 businesses, one paid job", status: "upcoming" },
  { slug: "digital-products-on-gumroad", date: "Wed, Nov 18", title: "AI digital products sold on Gumroad", summary: "Make an AI digital product and sell it on Gumroad.", goal: "Shared with 20 people, one sale", status: "upcoming" },
  { slug: "ai-chrome-extension", date: "Wed, Dec 2", title: "AI Chrome extension with a paid plan", summary: "Build a Chrome extension with AI and add a paid plan.", goal: "10 installs, ask each to upgrade", status: "upcoming" },
  { slug: "custom-ai-chatbots", date: "Wed, Dec 9", title: "Custom AI chatbots for creators, teachers and clubs", summary: "Build custom AI chatbots for creators, teachers and clubs.", status: "upcoming" },
];
export const LESSONS: Lesson[] = BASE.map((l) => ({ ...l, ...GUIDES[l.slug] }));
