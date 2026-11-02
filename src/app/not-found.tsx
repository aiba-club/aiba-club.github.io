import Link from "next/link";
import Safe from "@/components/Safe";
import SplashCursor from "@/components/SplashCursor";
import ParticleText from "@/components/ParticleText";
export default function NotFound() {
  return (
    <div className="wrap pt-40 pb-20 text-center"><Safe className="fixed inset-0 pointer-events-none z-30"><SplashCursor colors={["#8cc8ff", "#2f6fcf", "#ffffff"]} /></Safe>
      <div className="relative h-[320px]"><Safe className="absolute inset-0"><ParticleText text="404" color="#8cc8ff" highlightColor="#ffffff" fontSize={220} /></Safe></div>
      <p className="mt-4 text-xl text-white/75">That page doesn&rsquo;t exist. Try the lessons or the projects.</p>
      <p className="mt-6 flex justify-center gap-3"><Link href="/lessons" className="btn btn-solid">Lessons</Link><Link href="/projects" className="btn btn-line">Projects</Link></p>
    </div>
  );
}
