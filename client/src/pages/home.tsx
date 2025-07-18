import { useEffect } from "react";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useTheme } from "@/hooks/use-theme";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import AIMLSection from "@/components/AIMLSection";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Initialize scroll position management
  useScrollPosition();

  useEffect(() => {
    // Add scroll animation
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.project-card, .timeline-item, .skill-pill');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate-fadeIn');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('load', animateOnScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleTheme}
        scrollToSection={scrollToSection}
      />
      <Hero scrollToSection={scrollToSection} />
      <Projects />
      <AIMLSection />
      <Skills />
      <Contact />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
