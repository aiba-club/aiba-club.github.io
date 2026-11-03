import Link from "next/link";
import Topography from "@/components/Topography";
import PageHeader from "@/components/PageHeader";
import LessonCards from "@/components/LessonCards";
import { LESSONS } from "@/data/lessons";
import Arr from "@/components/Arr";

export const metadata = { title: "Lessons — AIBA" };

export default function Lessons() {
  const next = LESSONS.find((l) => l.status === "next") ?? LESSONS[0];
  return (
    <>
      <PageHeader eyebrow="Curriculum" title="Seven lessons, from idea to launch." lede="One tool at a time, 40 minutes each, no experience needed." bg={<Topography color="#8cc8ff" />}>
        <p className="mt-6 text-sm text-white/60">Each lesson has a video, slides, a tutorial and resources. <Link href={`/lessons/${next.slug}`} className="pill-link group/pl">This week: Lesson {next.n} <Arr /></Link></p>
      </PageHeader>
      <div className="wrap py-12 md:py-16"><LessonCards /></div>
    </>
  );
}
