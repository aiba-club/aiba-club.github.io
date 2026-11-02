import Link from "next/link";
import { CLUB, NAV } from "@/data/club";
import Safe from "./Safe";
import MetallicPaint from "./MetallicPaint";
import BrandIcon from "./BrandIcon";
import ThemeToggle from "./ThemeToggle";
import LogoMark from "./LogoMark";

export default function Footer() {
  const links = [...NAV, { href: "/contact", label: "Contact" }];
  const social = [["discord", "Discord", CLUB.links.discord], ["instagram", CLUB.links.instagramHandle, CLUB.links.instagram], ["gmail", "Email us", `mailto:${CLUB.links.email}`]];
  return (
    <footer className="keep-dark border-t border-line bg-[#040813]">
      <div className="wrap pt-14">
        {/* Row 1: brand + action */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4"><LogoMark size={64} /><div><p className="text-2xl font-semibold">{CLUB.name} <span className="text-lb text-base font-normal">· {CLUB.fullName}</span></p><p className="mt-1 text-white/60 text-sm">A student club that learns AI tools and builds projects worth putting on an application.</p></div></div>
          <Link href="/contact" className="btn btn-solid">Join the club</Link>
        </div>
        {/* Row 2: page links, one line */}
        <nav aria-label="Footer" className="mt-10 border-y border-line py-5"><ul className="flex flex-wrap gap-x-6 gap-y-0 text-white/75">{links.map((n) => <li key={n.href}><Link href={n.href} className="inline-block py-2.5 hover:text-lb">{n.label}</Link></li>)}</ul></nav>
        {/* Row 3: meeting info + socials, one line */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 text-sm">
          <p className="text-white/70">{CLUB.meeting.day}, {CLUB.meeting.time} · {CLUB.meeting.place}, {CLUB.school}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/75">{social.map(([slug, label, href]) => <li key={slug}><a href={href} className="flex items-center gap-2 py-2.5 hover:text-lb"><BrandIcon slug={slug} label={label} size={18} />{label}</a></li>)}</ul>
        </div>
      </div>
      {/* Wordmark */}
      <div className="relative mt-12 h-[200px] sm:h-[300px] lg:h-[440px] w-full overflow-hidden" aria-hidden>
        <Safe className="absolute inset-0"><MetallicPaint text="AIBA" fontWeight={900} scale={1} rotation={0} color="#8cc8ff" backgroundColor="#040813" /></Safe>
      </div>
      <div className="wrap py-6 border-t border-line flex flex-wrap gap-3 justify-between text-sm text-mute">
        <span>© 2026 {CLUB.fullName}. Student-run.</span>
        <span className="flex items-center gap-4"><ThemeToggle /><a href="#top" className="inline-block py-2.5 hover:text-white">Back to top ↑</a></span>
      </div>
    </footer>
  );
}
