import { useLocation } from "wouter";

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [location, setLocation] = useLocation();
  
  const navLinks = [
    { label: "Home", section: "home" },
    { label: "Projects", section: "projects" },
    { label: "AI/ML", section: "ai" },
    { label: "Skills", section: "skills" },
    { label: "Blog", section: "blog" },
    { label: "Contact", section: "contact" }
  ];

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'blog') {
      setLocation('/blog');
    } else if (sectionId === 'projects') {
      setLocation('/projects');
    } else if (sectionId === 'home') {
      setLocation('/');
    } else {
      // For homepage sections (ai, skills, contact), check if we're already on homepage
      if (location === '/') {
        // Already on homepage, just scroll to section
        scrollToSection(sectionId);
      } else {
        // Navigate to homepage with hash for section
        setLocation(`/#${sectionId}`);
      }
    }
  };

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex-1">
            <button 
              onClick={() => handleNavClick('home')} 
              className="text-2xl font-bold gradient-text inline-block hover:opacity-80 transition-opacity"
            >
              CIRO<span className="text-foreground">STACK</span>
            </button>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">Building intelligent mobile experiences with cutting-edge AI/ML technology.</p>
          </div>
          
          <div className="flex-1 flex flex-col items-start md:items-end">
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(link.section)}
                  className="text-muted-foreground hover:text-[#00f0ff] transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            <p className="text-muted-foreground text-sm">© 2025 CiroStack. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
