import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Brain, Code, Zap, Users, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Services() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionId: string) => {
    // This function is not used on the services page but required by Navigation component
  };
  const services = [
    {
      iconSvg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      iconColor: "#00f0ff",
      title: "AI/ML Mobile Development",
      description: "Cutting-edge mobile applications powered by artificial intelligence and machine learning algorithms.",
      features: [
        "Custom AI model integration",
        "Computer vision applications",
        "Natural language processing",
        "Predictive analytics",
        "Real-time ML inference"
      ],
      price: "Starting at $5,000",
      gradient: "from-[#00f0ff] to-[#0080ff]"
    },
    {
      iconSvg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1v-1H7v1a1 1 0 001 1zM7 2h10a1 1 0 011 1v5H6V3a1 1 0 011-1zM6 10h12v6H6v-6z" />
        </svg>
      ),
      iconColor: "#ff00f0",
      title: "Cross-Platform Mobile Apps",
      description: "Native-quality mobile applications that work seamlessly across iOS and Android platforms.",
      features: [
        "React Native development",
        "Flutter applications",
        "Native iOS & Android",
        "Cross-platform optimization",
        "App store deployment"
      ],
      price: "Starting at $3,000",
      gradient: "from-[#ff00f0] to-[#ff0080]"
    },
    {
      iconSvg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      iconColor: "#00ff80",
      title: "Backend & API Development",
      description: "Robust backend systems and APIs that power modern mobile applications.",
      features: [
        "RESTful API design",
        "GraphQL implementation",
        "Database optimization",
        "Cloud infrastructure",
        "Real-time data sync"
      ],
      price: "Starting at $2,500",
      gradient: "from-[#00ff80] to-[#00ff40]"
    },
    {
      iconSvg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      iconColor: "#ffff00",
      title: "Performance Optimization",
      description: "Enhance your existing mobile applications with performance improvements and optimization.",
      features: [
        "Code optimization",
        "Memory management",
        "Battery efficiency",
        "Loading time reduction",
        "User experience enhancement"
      ],
      price: "Starting at $1,500",
      gradient: "from-[#ffff00] to-[#ffcc00]"
    },
    {
      iconSvg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      iconColor: "#ff8000",
      title: "Technical Consulting",
      description: "Expert guidance on mobile development strategies, architecture, and technology decisions.",
      features: [
        "Architecture review",
        "Technology stack consultation",
        "Code auditing",
        "Performance analysis",
        "Strategic planning"
      ],
      price: "Starting at $150/hour",
      gradient: "from-[#ff8000] to-[#ff4000]"
    },
    {
      iconSvg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      iconColor: "#8000ff",
      title: "MVP Development",
      description: "Rapid prototyping and minimum viable product development for startups and entrepreneurs.",
      features: [
        "Rapid prototyping",
        "Market validation",
        "Iterative development",
        "User feedback integration",
        "Scalable architecture"
      ],
      price: "Starting at $4,000",
      gradient: "from-[#8000ff] to-[#4000ff]"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your requirements, target audience, and business objectives to create a comprehensive development strategy."
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Creating detailed wireframes, user interface designs, and technical architecture that aligns with your vision and goals."
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Building your application with clean, maintainable code while conducting thorough testing to ensure quality and performance."
    },
    {
      step: "04",
      title: "Deployment & Support",
      description: "Launching your application to app stores and providing ongoing support, maintenance, and updates as needed."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        scrollToSection={scrollToSection} 
      />
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transforming ideas into powerful mobile applications with cutting-edge AI/ML technologies. 
            From concept to deployment, I deliver solutions that drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <Button size="lg" className="bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] hover:opacity-90 text-white">
                Get Started
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg">
                View My Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-muted/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-600 shadow-lg flex items-center justify-center">
                    <div className="text-center" style={{ color: service.iconColor }}>
                      {service.iconSvg}
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {service.price}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-[#00f0ff] transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven methodology that ensures successful project delivery from conception to launch.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] opacity-30"></div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something <span className="gradient-text">Amazing</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how we can bring your vision to life with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <Button size="lg" className="bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] hover:opacity-90 text-white">
                Start Your Project
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => window.open('https://wa.me/2349117292574?text=Hello! I\'m interested in your services.', '_blank')}>
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}