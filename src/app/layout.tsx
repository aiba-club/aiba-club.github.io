import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
export const metadata: Metadata = { title: "AIBA — AI Business Applications", description: "A student club that builds real products with AI." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("aiba-theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}` }} /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..800&family=Instrument+Sans:wght@400..700&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@600&display=swap" rel="stylesheet" /></head><body id="top"><Nav /><main>{children}</main><Footer /><Chatbot /></body></html>);
}
