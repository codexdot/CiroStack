import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import AISection from "@/components/AISection";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50">
      <Navigation />
      <Hero />
      <Projects />
      <AISection />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
