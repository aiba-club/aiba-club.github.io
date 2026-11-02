"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StaggeredMenu from "./StaggeredMenu";
import ThemeToggle from "./ThemeToggle";
import LogoMark from "./LogoMark";
import { CLUB, NAV } from "@/data/club";

const W = 1100, H = 60;
const MAP = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="x" x1="0" x2="1"><stop offset="0" stop-color="#f00"/><stop offset=".5" stop-color="#000"/><stop offset="1" stop-color="#0f0" stop-opacity="0"/></linearGradient><linearGradient id="y" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00f"/><stop offset=".5" stop-color="#000"/><stop offset="1" stop-color="#0ff" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="rgb(128,128,128)"/><rect x="26" y="9" width="${W - 52}" height="${H - 18}" rx="22" fill="rgb(128,128,128)" style="filter:blur(10px)"/></svg>`;
const MAP_URI = "data:image/svg+xml," + encodeURIComponent(MAP);

export default function Nav() {
  const path = usePathname();
  const items = [{ label: "Home", ariaLabel: "Go to home", link: "/" }, ...NAV.map((n) => ({ label: n.label, ariaLabel: `Go to ${n.label}`, link: n.href }))];
  return (
    <>
      <div className="md:hidden"><ThemeToggle className="fixed top-3 right-[118px] z-[60] bg-white/10" /><div className="fixed top-0 inset-x-0 h-[68px] z-[5] bg-[#050b1a]/85 backdrop-blur-md border-b border-white/10" /><StaggeredMenu logoUrl="/aiba-logo.png" isFixed position="right" items={items} socialItems={[{ label: "Discord", link: CLUB.links.discord }, { label: "Instagram", link: CLUB.links.instagram }]} displaySocials displayItemNumbering colors={["#0a2a6b", "#2f6fcf"]} accentColor="#8cc8ff" menuButtonColor="#ffffff" openMenuButtonColor="#ffffff" changeMenuColorOnOpen={false} /></div>
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <filter id="aiba-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage href={MAP_URI} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <header className="hidden md:flex fixed top-4 inset-x-0 z-50 justify-center px-3">
        {/* Native-style glass: real backdrop blur + saturation, a hairline edge, one soft top highlight */}
        <nav aria-label="Main" className="relative flex h-[60px] w-[min(100%,1100px)] items-center justify-between rounded-full border border-white/[0.14] bg-[rgba(14,26,54,0.45)] px-3 text-white glass-nav shadow-[0_8px_30px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.18)]">
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0)_45%)]" />
          <Link href="/" className="relative flex items-center gap-3">
            <LogoMark size={44} />
            <span className="text-base lg:text-[17px] font-semibold tracking-tight">AI Business Applications</span>
          </Link>
          <ul className="relative flex items-center gap-1 lg:gap-3 text-[14px] lg:text-[15px]">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className={"rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-white " + (path.startsWith(n.href) ? "bg-white/12 text-white" : "text-white/70")}>{n.label}</Link></li>)}
          </ul>
          <span className="relative flex items-center gap-2"><ThemeToggle /><Link href="/contact" className="rounded-full bg-white px-5 py-2.5 text-[15px] font-semibold text-[#0b1730] transition-colors hover:bg-[#cfe6ff]">Join the club</Link></span>
        </nav>
      </header>
    </>
  );
}
