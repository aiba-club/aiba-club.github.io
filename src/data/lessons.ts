// Add a lesson = add a line. status "done" lessons open to their own page; "upcoming" ones show blurred as not available yet.
// Each lesson page has four tabs. Fill these in on a lesson as they're ready; empty ones show "coming soon":
//   slides: Google Slides embed URL (…/embed?start=false&loop=false)
//   video: YouTube embed URL (https://www.youtube.com/embed/<id>)
//   tutorial: { intro?, steps: [{ title, body }] }
//   resources: [{ label, href, kind }]
//   tools: names from src/data/tools.ts, e.g. ["ChatGPT", "YouWare"]. Shows the lesson under "Used in" on the Tools page.
export type Lesson = {
  slug: string; date: string; title: string; summary: string; goal?: string; status: "done" | "upcoming";
  slides?: string; video?: string;
  tutorial?: { intro?: string; steps: { title: string; body: string }[] };
  resources?: { label: string; href: string; kind: string }[];
  tools?: string[];
};
export const LESSONS: Lesson[] = [
  { slug: "intro-session", date: "Tue, Oct 6", title: "Intro session", summary: "What AIBA is, how we use AI for business, and our plans for the year, from projects and starting businesses to the end-of-year competition.", status: "done",
    slides: "https://docs.google.com/presentation/d/1V4XKkLo5uc1SPFOwIqpwd-rVMAlZi_KyQvn3oBzHEB0/embed?start=false&loop=false&delayms=3000",
    resources: [{ label: "Meeting 1 slides (personal email)", href: "https://docs.google.com/presentation/d/1V4XKkLo5uc1SPFOwIqpwd-rVMAlZi_KyQvn3oBzHEB0/edit?usp=sharing", kind: "Slides" }, { label: "Meeting 1 slides (school email)", href: "https://docs.google.com/presentation/d/1XaPeAmTWsA9yI0EK8bfCufeXiZL3zgp4CpIegWvzawM/edit?usp=sharing", kind: "Slides" }] },
  { slug: "freelancing-with-ai", date: "Tue, Oct 13", title: "Build websites with AI", summary: "Use AI to build professional websites, then turn that skill into freelance income: finding clients, pricing your work and landing the first one.", status: "done",
    slides: "https://drive.google.com/file/d/1AKmw6pBrQMqxGs9qpNHJaF8fwm1fcyXZ/preview",
    video: "https://www.youtube.com/embed/snXgR4NOkVI",
    tools: ["Claude", "YouWare", "Base44", "Fiverr", "Upwork"],
    resources: [{ label: "Meeting 2 slides (personal email)", href: "https://docs.google.com/presentation/d/1AKmw6pBrQMqxGs9qpNHJaF8fwm1fcyXZ/edit?usp=sharing&rtpof=true&sd=true", kind: "Slides" }, { label: "Meeting 2 slides (school email)", href: "https://docs.google.com/presentation/d/1ObwB6dZz_UkB1eU26Wm6ZZsd5BXy8TDL/edit?usp=sharing&rtpof=true&sd=true", kind: "Slides" }, { label: "How I sell websites with Claude as a complete beginner (Mikey Vibe Coding)", href: "https://www.youtube.com/watch?v=1grrknI9Dyo", kind: "Video" }] },
  { slug: "app-dev-day-1", date: "Wed, Oct 28", title: "App dev day 1", summary: "Turn an app idea into a working prototype: pick a niche, find a gap competitors miss, choose how it makes money, and build it with AI.", goal: "Working prototype, 3 screenshots, a pricing comparison and a landing page", status: "done",
    slides: "https://docs.google.com/presentation/d/1UeEgzBaFCXaYi03vhbx1oQ0OIopOdHXHtiwvw35ALAY/embed?start=false&loop=false&delayms=3000",
    video: "https://www.youtube.com/embed/vhMMKwYYYsc",
    tools: ["Perplexity", "Claude", "ChatGPT", "YouWare"],
    resources: [{ label: "Meeting 3 slides (personal email)", href: "https://docs.google.com/presentation/d/1UeEgzBaFCXaYi03vhbx1oQ0OIopOdHXHtiwvw35ALAY/edit?usp=sharing", kind: "Slides" }, { label: "Meeting 3 slides (school email)", href: "https://docs.google.com/presentation/d/1XvNVRcvNF6GctobT6K6-5ojGtlxo6-sEloIFbaiAyDc/edit?usp=sharing", kind: "Slides" }, { label: "From idea to app with Claude, start to finish (Peter Yang)", href: "https://www.youtube.com/watch?v=G9o8eoHzpxc", kind: "Video" }] },
  { slug: "app-dev-day-2", date: "Wed, Nov 4", title: "App dev day 2", summary: "Take your app live: build the landing page, publish with GitHub and Vercel, add email and Google sign-in with Supabase, and start taking payments.", goal: "Build and publish the first working version of your app", status: "done",
    slides: "https://docs.google.com/presentation/d/1Hyiq-vZSXGE2hTFSGQS0IZxaDwCC_b7O-iS233r89OA/embed?start=false&loop=false&delayms=3000",
    video: "https://www.youtube.com/embed/BUCCjJavLf4",
    tools: ["GitHub", "Vercel", "Supabase", "Google AI Studio"],
    resources: [{ label: "Meeting 4 slides (personal email)", href: "https://docs.google.com/presentation/d/1Hyiq-vZSXGE2hTFSGQS0IZxaDwCC_b7O-iS233r89OA/edit?usp=sharing", kind: "Slides" }, { label: "Meeting 4 slides (school email)", href: "https://docs.google.com/presentation/d/1JdwqgFsaW4HiXvWVrcx6Zda9niONB19erTxW3o3nAjU/edit?usp=sharing", kind: "Slides" }, { label: "Deploy a GitHub project on Vercel in 3 minutes (KnowledgeBase)", href: "https://www.youtube.com/watch?v=E8xaV6fiTaA", kind: "Video" }, { label: "Add Supabase logins and a database to your app (Profit Studio)", href: "https://www.youtube.com/watch?v=1NgO4Tzv27I", kind: "Video" }] },
  { slug: "ai-services-for-local-businesses", date: "Wed, Nov 11", title: "AI services for local businesses + cold calling", summary: "Offer AI services to local businesses and practice cold calling.", goal: "5 cold calls, free sample to 3 businesses, one paid job", status: "upcoming" },
  { slug: "digital-products-on-gumroad", date: "Wed, Nov 18", title: "AI digital products sold on Gumroad", summary: "Make an AI digital product and sell it on Gumroad.", goal: "Shared with 20 people, one sale", status: "upcoming" },
  { slug: "ai-chrome-extension", date: "Wed, Dec 2", title: "AI Chrome extension with a paid plan", summary: "Build a Chrome extension with AI and add a paid plan.", goal: "10 installs, ask each to upgrade", status: "upcoming" },
  { slug: "custom-ai-chatbots", date: "Wed, Dec 9", title: "Custom AI chatbots for creators, teachers and clubs", summary: "Build custom AI chatbots for creators, teachers and clubs.", status: "upcoming" },
];
