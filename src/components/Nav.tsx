"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LogoMark from "./LogoMark";
import BrandIcon from "./BrandIcon";
import { CLUB, NAV } from "@/data/club";

const W = 1100, H = 60;
const MAP = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="x" x1="0" x2="1"><stop offset="0" stop-color="#f00"/><stop offset=".5" stop-color="#000"/><stop offset="1" stop-color="#0f0" stop-opacity="0"/></linearGradient><linearGradient id="y" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00f"/><stop offset=".5" stop-color="#000"/><stop offset="1" stop-color="#0ff" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="rgb(128,128,128)"/><rect x="26" y="9" width="${W - 52}" height="${H - 18}" rx="22" fill="rgb(128,128,128)" style="filter:blur(10px)"/></svg>`;
const MAP_URI = "data:image/svg+xml," + encodeURIComponent(MAP);

const LINKS = [{ href: "/", label: "Home" }, ...NAV];
const SOCIAL = [["discord", "Discord", CLUB.links.discord], ["instagram", "Instagram", CLUB.links.instagram], ["gmail", "Email", `mailto:${CLUB.links.email}`]] as const;

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  // Close when the page changes, on Escape, and when the window grows into the desktop layout.
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const mq = window.matchMedia("(min-width: 1024px)");
    const grow = () => { if (mq.matches) setOpen(false); };
    window.addEventListener("keydown", key); mq.addEventListener("change", grow);
    return () => { window.removeEventListener("keydown", key); mq.removeEventListener("change", grow); };
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <filter id="aiba-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage href={MAP_URI} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Phones, tablets and split windows: a compact bar and a full-screen menu */}
      <header className="lg:hidden fixed inset-x-0 top-0 z-[70] px-2.5 pt-2.5 min-[420px]:px-3 min-[420px]:pt-3">
        <div className="relative flex h-14 items-center justify-between rounded-full border border-white/15 bg-[#0a1226]/80 pl-2 pr-2 text-white shadow-[0_8px_30px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.14)] backdrop-blur-xl">
          <Link href="/" aria-label="AIBA home" className="flex min-w-0 items-center gap-2.5 rounded-full pr-2">
            <LogoMark size={40} className="shrink-0 ring-1 ring-white/25" />
            <span className="truncate text-[17px] font-semibold tracking-tight">AIBA</span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5">
            <ThemeToggle className="border border-white/15 bg-white/[0.06]" />
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] pl-3.5 pr-3.5 text-sm font-semibold transition-colors hover:bg-white/15 active:scale-[.97]">
              <span className="hidden min-[360px]:inline">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-[18px]">
                <span className={"absolute left-0 h-[2px] w-full rounded bg-current transition-all duration-300 " + (open ? "top-[5px] rotate-45" : "top-0")} />
                <span className={"absolute left-0 h-[2px] w-full rounded bg-current transition-all duration-300 " + (open ? "top-[5px] -rotate-45" : "top-[10px]")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" aria-hidden={!open} {...(open ? {} : { inert: true })}
        className={"lg:hidden fixed inset-0 z-[65] overflow-y-auto bg-[#050b1a]/95 backdrop-blur-2xl transition-opacity duration-300 " + (open ? "opacity-100" : "pointer-events-none opacity-0")}>
        <div className="mx-auto flex min-h-full max-w-xl flex-col px-6 pb-8 pt-28">
          <nav aria-label="Main">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {LINKS.map((n, i) => (
                <li key={n.href} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }} className={"transition-all duration-500 " + (open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
                  <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined} className={"flex items-center justify-between py-4 font-[family-name:var(--font-display)] text-[34px] leading-none tracking-tight transition-colors min-[420px]:text-[40px] " + (isActive(n.href) ? "text-lb" : "text-white hover:text-lb")}>
                    <span className="flex items-baseline gap-4"><span className="font-mono text-xs tracking-widest text-white/35">{String(i + 1).padStart(2, "0")}</span>{n.label}</span>
                    <svg aria-hidden viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={"mt-auto pt-10 transition-all duration-500 " + (open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")} style={{ transitionDelay: open ? "420ms" : "0ms" }}>
            <Link href="/contact" className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-base font-semibold text-[#0b1730] transition-colors hover:bg-[#cfe6ff]">Join the club</Link>
            <p className="mt-5 text-center text-sm text-white/55">{CLUB.meeting.day}, {CLUB.meeting.time} · {CLUB.meeting.place}</p>
            <ul className="mt-5 flex items-center justify-center gap-3">
              {SOCIAL.map(([slug, label, href]) => <li key={slug}><a href={href} aria-label={label} target={slug === "gmail" ? undefined : "_blank"} rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.05] transition-colors hover:bg-white/15"><BrandIcon slug={slug} label={label} size={20} /></a></li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop: floating glass pill */}
      <header className="hidden lg:flex fixed top-4 inset-x-0 z-50 justify-center px-3">
        <nav aria-label="Main" className="relative flex h-[60px] w-[min(100%,1100px)] items-center justify-between rounded-full border border-white/[0.14] bg-[rgba(14,26,54,0.45)] px-3 text-white glass-nav shadow-[0_8px_30px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.18)]">
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0)_45%)]" />
          <Link href="/" className="relative flex items-center gap-3">
            <LogoMark size={44} className="ring-1 ring-white/25" />
            <span className="text-[17px] font-semibold tracking-tight">AI Business Applications</span>
          </Link>
          <ul className="relative flex items-center gap-1 xl:gap-3 text-[15px]">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className={"rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-white " + (path.startsWith(n.href) ? "bg-white/12 text-white" : "text-white/70")}>{n.label}</Link></li>)}
          </ul>
          <span className="relative flex items-center gap-2"><ThemeToggle /><Link href="/contact" className="rounded-full bg-white px-5 py-2.5 text-[15px] font-semibold text-[#0b1730] transition-colors hover:bg-[#cfe6ff]">Join the club</Link></span>
        </nav>
      </header>
    </>
  );
}
