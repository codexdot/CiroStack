interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const navLinks = [
    { label: "Home", section: "home" },
    { label: "Projects", section: "projects" },
    { label: "AI/ML", section: "ai" },
    { label: "Skills", section: "skills" },
    { label: "Contact", section: "contact" }
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <a href="#" className="text-2xl font-bold gradient-text">
            CIRO<span className="text-white">STACK</span>
          </a>
          <p className="text-slate-400 text-sm mt-2">Building intelligent mobile experiences.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end">
          <div className="flex space-x-6 mb-4">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.section)}
                className="text-slate-400 hover:text-[#00f0ff] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <p className="text-slate-500 text-sm">© 2025 CiroStack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
