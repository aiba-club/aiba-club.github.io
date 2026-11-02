import Link from "next/link";
import GlareHover from "@/components/GlareHover";
import ReflectiveCard from "@/components/ReflectiveCard";
import Safe from "@/components/Safe";
import SpreadTheWord from "@/components/SpreadTheWord";
import PageHeader from "@/components/PageHeader";
import JoinForm from "@/components/JoinForm";
import CopyButton from "@/components/CopyButton";
import BrandIcon from "@/components/BrandIcon";
import { CLUB } from "@/data/club";
export const metadata = { title: "Contact — AIBA" };
export default function Contact() {
  const links = [
    { name: "Discord", slug: "discord", href: CLUB.links.discord, handle: "Join the server", note: "Announcements, lesson recordings and team chats. Fastest reply." },
    { name: "Email", slug: "gmail", href: `mailto:${CLUB.links.email}`, handle: CLUB.links.email, note: "For parents, sponsors and teachers.", copy: true },
    { name: "Instagram", slug: "instagram", href: CLUB.links.instagram, handle: CLUB.links.instagramHandle, note: "Photos from meetings and project launches." },
  ];
  const card = { background: "#050b1a", borderColor: "rgba(255,255,255,0.12)", borderRadius: "16px", glareColor: "#8cc8ff", glareOpacity: 0.2 };
  return (
    <>
      <PageHeader eyebrow="Contact" title="Come say hello." lede="The easiest way to find us is in person. The second easiest is Discord." />
      <div className="wrap py-14 grid lg:grid-cols-[1.2fr_1fr] gap-12">
        <div className="space-y-10">
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.name} className="card-glass !rounded-2xl p-5 flex items-center gap-5 hover:border-lb/50 transition-colors">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10"><BrandIcon slug={l.slug} label={l.name} size={26} /></span>
                <a href={l.href} target="_blank" rel="noreferrer" className="min-w-0 flex-1"><span className="block text-lg font-semibold">{l.name}</span><span className="block text-white/60 text-sm truncate">{l.handle}</span><span className="block text-white/45 text-sm mt-0.5">{l.note}</span></a>
                {l.copy ? <CopyButton text={CLUB.links.email} /> : <a href={l.href} target="_blank" rel="noreferrer" aria-label={`Open ${l.name}`} className="text-white/50 hover:text-lb text-xl">↗</a>}
              </li>
            ))}
          </ul>
          <div className="grid sm:grid-cols-2 gap-4">
            <GlareHover width="100%" height="auto" {...card}><div className="p-6"><p className="eyebrow mb-2">When</p><p className="text-xl font-semibold">{CLUB.meeting.day}</p><p className="text-white/65">{CLUB.meeting.time}</p></div></GlareHover>
            <GlareHover width="100%" height="auto" {...card}><div className="p-6"><p className="eyebrow mb-2">Where</p><p className="text-xl font-semibold">{CLUB.meeting.place}</p><p className="text-white/65">{CLUB.school} · [street address]</p></div></GlareHover>
          </div>
          <SpreadTheWord />
          <p className="text-white/65">Questions first? Read the <Link href="/faq" className="text-lb underline underline-offset-4">FAQ</Link> or ask the assistant in the corner.</p>
        </div>
        <div className="space-y-6 lg:sticky lg:top-28 self-start">
          <JoinForm />
          <div className="h-[300px] hidden lg:block"><Safe className="relative w-full h-full"><ReflectiveCard name="Your name here" role="AIBA member" badge="AIBA" status="Active" idLabel="Member" idValue="0001" theme="dark" tint="#2f6fcf" /></Safe></div>
        </div>
      </div>
    </>
  );
}
