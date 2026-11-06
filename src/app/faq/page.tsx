import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FaqBrowser from "@/components/FaqBrowser";
import PageHeader from "@/components/PageHeader";
import { FAQ } from "@/data/faq";
export const metadata = { title: "FAQ — AIBA" };
export default function Faq() {
  return (
    <>
      <PageHeader eyebrow="Questions" title="Everything people ask." lede={`${FAQ.length} answers about joining, meetings, lessons and the Cup. Search, or pick a topic.`} />
      <div className="wrap py-16"><FaqBrowser /></div>
      <section className="border-t border-line"><div className="wrap py-16 flex flex-wrap items-center justify-between gap-6"><div><h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Still stuck?</h2><p className="mt-2 text-white/65">Ask the assistant in the corner, or message us directly.</p></div><Link href="/contact" className="btn btn-solid">Contact us<ArrowRight className="h-4 w-4" strokeWidth={1.75} /></Link></div></section>
    </>
  );
}
