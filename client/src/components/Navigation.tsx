import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, User } from "lucide-react";

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  scrollToSection: (sectionId: string) => void;
}

export default function Navigation({ isDarkMode, toggleDarkMode, scrollToSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    if (sectionId === 'blog') {
      setLocation('/blog');
      // Scroll to top when navigating to blog page
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (sectionId === 'projects') {
      setLocation('/projects');
      // Scroll to top when navigating to projects page
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (sectionId === 'admin') {
      setLocation('/admin');
      // Scroll to top when navigating to admin page
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (sectionId === 'auth') {
      setLocation('/auth');
      // Scroll to top when navigating to auth page
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (sectionId === 'signup') {
      setLocation('/signup');
      // Scroll to top when navigating to signup page
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (sectionId === 'home') {
      // Clear any saved scroll position for home page
      const scrollPositions = (window as any).scrollPositions;
      if (scrollPositions) {
        scrollPositions.delete('/');
      }
      
      setLocation('/');
      // Smooth scroll to top after navigation - longer delay to override useScrollPosition
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 120);
    } else {
      // For homepage sections (ai, skills, contact), always update URL with hash
      if (location === '/') {
        // Already on homepage, update URL and scroll to section
        setLocation(`/#${sectionId}`);
        scrollToSection(sectionId);
      } else {
        // Navigate to homepage with hash for section
        setLocation(`/#${sectionId}`);
      }
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
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
            {isAuthenticated && (
              <button 
                onClick={() => handleNavClick('admin')} 
                className="nav-link text-foreground hover:text-[#00f0ff] transition-colors"
              >
                Admin
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {user?.profileImageUrl ? (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <button
                  onClick={() => logout()}
                  className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('signup')}
                className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
            {/* Theme Toggle */}
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors focus:outline-none focus-visible:outline-none"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#00f0ff', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#ff00f0', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#sunGradient)" d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
                  </svg>
                )}
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
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
      </div>
      
      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-background border-t border-border`}>
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
          {isAuthenticated && (
            <button 
              onClick={() => handleNavClick('admin')} 
              className="block w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
            >
              Admin
            </button>
          )}
          {isAuthenticated ? (
            <button
              onClick={() => logout()}
              className="flex items-center space-x-2 w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('signup')}
              className="flex items-center space-x-2 w-full text-left px-3 py-2 text-foreground hover:bg-muted rounded-md"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
