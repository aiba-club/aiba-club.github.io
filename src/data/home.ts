// Everything on the homepage that needs a real photo or name lives here. Swap each placeholder.
// Photos: drop files in /public/photos and change the `photo` paths below (jpg or png).
import { CLUB } from "./club";

export const HERO = {
  photo: "/photos/hero-group.svg",
  alt: "[Describe: who is in the photo and where]",
  caption: "[Caption: names of the people in the photo and which week it was taken.]",
  title: `${CLUB.meeting.place}. Every Wednesday at lunch.`,
  subtitle: "We build businesses with AI.",
};

export const ABOUT = `${CLUB.fullName} is a club at ${CLUB.school}. Each Wednesday we learn one AI tool, then use it to build something with a team: an app, a brand, a small business. There's no fee, no experience needed, and nothing to sign up for to try it.`;
export const TOOLS_LINE = "ChatGPT, Claude, Perplexity, YouWare, Figma, Notion, Vercel and dozens more, most with a free version.";

export const OFFICERS = [
  { name: "[NAME]", role: "President", grade: "[GRADE]", built: "[What they have built or run.]", photo: "/photos/officer-1.svg" },
  { name: "[NAME]", role: "Vice President", grade: "[GRADE]", built: "[What they have built or run.]", photo: "/photos/officer-2.svg" },
  { name: "[NAME]", role: "Head of Lessons", grade: "[GRADE]", built: "[What they have built or run.]", photo: "/photos/officer-3.svg" },
  { name: "[NAME]", role: "Head of Projects", grade: "[GRADE]", built: "[What they have built or run.]", photo: "/photos/officer-4.svg" },
];

export const WORK = [
  { name: "[PROJECT NAME]", href: "/projects", shot: "/projects/study-buddy.png", alt: "[Screenshot of the project]", by: "[NAME] ([GRADE]), [NAME] ([GRADE])", does: "[One sentence on what it does and who it's for.]", result: "[One honest result, e.g. NUMBER classmates used it.]" },
  { name: "[PROJECT NAME]", href: "/projects", shot: "/projects/campus-eats.png", alt: "[Screenshot]", by: "[NAME] ([GRADE])", does: "[What it does.]", result: "[Result.]" },
  { name: "[PROJECT NAME]", href: "/projects", shot: "/projects/logo-lab.png", alt: "[Screenshot]", by: "[NAME] ([GRADE])", does: "[What it does.]", result: "[Result.]" },
];

export const WEDNESDAY = [
  { time: "Part 1", title: "A short lesson", text: "One tool, explained in 20 minutes with a live example.", photo: "/photos/wed-1.svg", alt: "[Describe the photo]" },
  { time: "Part 2", title: "A live demo", text: "Someone builds with it in front of the room. Mistakes included.", photo: "/photos/wed-2.svg", alt: "[Describe the photo]" },
  { time: "Part 3", title: "Build time", text: "Try it yourself, or work with your team on your project.", photo: "/photos/wed-3.svg", alt: "[Describe the photo]" },
];

export const ENTRY = { who: "[NAME], [GRADE]", title: "Project Lead, AIBA", years: "[GRADES], [HOURS] hrs/week", lines: ["Led a team of 3 to build [PROJECT NAME], an AI app used by [NUMBER] classmates.", "Shipped the first version in 3 weeks and ran weekly check-ins.", "Placed [PLACE] in the revenue track of the AIBA Cup."] };
