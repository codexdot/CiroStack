import { useState } from "react";
import { useLocation } from "wouter";

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  scrollToSection: (sectionId: string) => void;
}

export default function Navigation({ isDarkMode, toggleDarkMode, scrollToSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (sectionId === 'blog') {
      setLocation('/blog');
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-background/90 backdrop-blur-md border-b border-border dark:bg-[#020617]/90 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('home')} 
              className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              CIRO<span className="text-foreground">STACK</span>
            </button>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavClick('home')} 
              className="nav-link text-foreground hover:text-[#00f0ff] transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('projects')} 
              className="nav-link text-foreground hover:text-[#00f0ff] transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavClick('ai')} 
              className="nav-link text-foreground hover:text-[#00f0ff] transition-colors"
            >
              AI/ML
            </button>
            <button 
              onClick={() => handleNavClick('skills')} 
              className="nav-link text-foreground hover:text-[#00f0ff] transition-colors"
            >
              Skills
            </button>
            <button 
              onClick={() => handleNavClick('blog')} 
              className="nav-link text-foreground hover:text-[#00f0ff] transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="nav-link text-foreground hover:text-[#00f0ff] transition-colors"
            >
              Contact
            </button>
            
            <div className="flex items-center ml-4">
              <span className="mr-2 text-sm text-muted-foreground">Dark</span>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="toggle" 
                  checked={!isDarkMode}
                  onChange={toggleDarkMode}
                  className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ease-in-out"
                  style={{
                    transform: isDarkMode ? 'translateX(0)' : 'translateX(100%)'
                  }}
                />
                <label 
                  htmlFor="toggle" 
                  className="block overflow-hidden h-6 rounded-full bg-muted cursor-pointer"
                />
              </div>
              <span className="text-sm text-muted-foreground">Light</span>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-foreground focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-background border-t border-border dark:bg-[#020617] dark:border-slate-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button 
            onClick={() => handleNavClick('home')} 
            className="block w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('projects')} 
            className="block w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
          >
            Projects
          </button>
          <button 
            onClick={() => handleNavClick('ai')} 
            className="block w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
          >
            AI/ML
          </button>
          <button 
            onClick={() => handleNavClick('skills')} 
            className="block w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
          >
            Skills
          </button>
          <button 
            onClick={() => handleNavClick('blog')} 
            className="block w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
          >
            Blog
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="block w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
