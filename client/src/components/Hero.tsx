interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="home" className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="hero-content flex flex-col md:flex-row items-center">
        <div className="hero-text md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">AI-Powered</span><br/>
            Mobile Solutions
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-lg">
            I build intelligent mobile applications that leverage cutting-edge AI and machine learning to solve real-world problems.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="gradient-bg text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-[#00f0ff] text-[#00f0ff] px-6 py-3 rounded-full font-medium hover:bg-[#00f0ff]/10 transition-all"
            >
              Contact Me
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#00f0ff] mr-2"></div>
              <span className="text-sm text-slate-400">Available for freelance</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#ff00f0] mr-2"></div>
              <span className="text-sm text-slate-400">Open to collaborations</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image md:w-1/2 mt-16 md:mt-8">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff] to-[#ff00f0] rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src="/logotrans.png" 
                alt="Professional developer portrait" 
                className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-0 border-border shadow-xl animate-float select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
