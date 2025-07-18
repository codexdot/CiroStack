import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const scrollToSection = (sectionId: string) => {
    // Not used on this page, but needed for Navigation component
  };

  const projects = [
    {
      id: 1,
      title: "HealthAI Companion",
      description: "An intelligent health assistant that uses machine learning to analyze symptoms, track health metrics, and provide personalized recommendations. Features include symptom checker, medication reminders, and health trend analysis.",
      longDescription: "HealthAI Companion revolutionizes personal healthcare by combining advanced AI algorithms with intuitive mobile design. The app analyzes user symptoms using natural language processing and correlates them with medical databases to provide accurate preliminary assessments. It integrates with HealthKit to track vital signs and provides personalized health insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["Swift", "CoreML", "HealthKit", "NLP", "iOS"],
      category: "AI",
      status: "Live",
      githubUrl: "#",
      liveUrl: "#",
      features: ["AI Symptom Analysis", "Health Tracking", "Medication Reminders", "Trend Analysis"]
    },
    {
      id: 2,
      title: "FinSmart Predictor",
      description: "Financial forecasting application that uses predictive analytics and machine learning to help users make informed investment decisions. Includes market analysis, portfolio optimization, and risk assessment.",
      longDescription: "FinSmart Predictor leverages advanced machine learning algorithms to analyze market trends, predict stock movements, and optimize investment portfolios. The app uses historical data, real-time market feeds, and sentiment analysis to provide comprehensive financial insights.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["Kotlin", "TensorFlow Lite", "Firebase", "Android", "ML"],
      category: "ML",
      status: "In Development",
      githubUrl: "#",
      liveUrl: null,
      features: ["Market Prediction", "Portfolio Analysis", "Risk Assessment", "Real-time Data"]
    },
    {
      id: 3,
      title: "VisionAR Navigator",
      description: "Augmented reality navigation system with advanced object recognition designed specifically for visually impaired users. Features voice commands, haptic feedback, and real-time obstacle detection.",
      longDescription: "VisionAR Navigator uses cutting-edge AR technology and computer vision to create an accessible navigation experience. The app employs LiDAR sensors and machine learning models to detect obstacles, identify objects, and provide audio-based navigation assistance.",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["SwiftUI", "ARKit", "Vision", "Accessibility", "iOS"],
      category: "AR",
      status: "Live",
      githubUrl: "#",
      liveUrl: "#",
      features: ["AR Navigation", "Object Recognition", "Voice Commands", "Haptic Feedback"]
    },
    {
      id: 4,
      title: "SmartChat Assistant",
      description: "Conversational AI assistant powered by advanced natural language processing. Provides intelligent responses, task automation, and personalized user experiences across multiple domains.",
      longDescription: "SmartChat Assistant represents the next generation of conversational AI, featuring context-aware responses, multi-turn conversations, and domain-specific knowledge. Built with transformer models and fine-tuned for optimal user experience.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["React Native", "NLP", "OpenAI", "Node.js", "Cross-platform"],
      category: "AI",
      status: "Live",
      githubUrl: "#",
      liveUrl: "#",
      features: ["Natural Conversations", "Task Automation", "Multi-platform", "Context Awareness"]
    },
    {
      id: 5,
      title: "EcoTrack Carbon Monitor",
      description: "Environmental impact tracking application that uses machine learning to analyze user behavior and provide personalized recommendations for reducing carbon footprint.",
      longDescription: "EcoTrack combines IoT sensors, GPS tracking, and ML algorithms to provide real-time carbon footprint analysis. The app learns from user behavior patterns and suggests actionable steps to reduce environmental impact.",
      image: "https://images.unsplash.com/photo-1569163139394-de44cb4f4946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["Flutter", "IoT", "ML", "Sustainability", "Cross-platform"],
      category: "IoT",
      status: "In Development",
      githubUrl: "#",
      liveUrl: null,
      features: ["Carbon Tracking", "Behavioral Analysis", "IoT Integration", "Sustainability Tips"]
    },
    {
      id: 6,
      title: "CodeMentor AI",
      description: "Intelligent code review and mentoring platform that uses AI to analyze code quality, suggest improvements, and provide learning resources tailored to individual skill levels.",
      longDescription: "CodeMentor AI revolutionizes code learning by providing personalized feedback, detecting code smells, and suggesting best practices. The platform uses static analysis and machine learning to understand coding patterns.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["TypeScript", "AI", "Code Analysis", "Education", "Web"],
      category: "AI",
      status: "Live",
      githubUrl: "#",
      liveUrl: "#",
      features: ["Code Review", "Learning Path", "Best Practices", "Skill Assessment"]
    }
  ];

  const categories = ["All", "AI", "ML", "AR", "IoT"];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      "AI": "bg-[#00f0ff]",
      "ML": "bg-[#ff00f0]", 
      "AR": "bg-[#00ff00]",
      "IoT": "bg-[#ffff00]"
    };
    return colors[category as keyof typeof colors] || "bg-slate-600";
  };

  const getStatusColor = (status: string) => {
    return status === "Live" ? "text-green-400" : "text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleTheme} 
        scrollToSection={scrollToSection} 
      />
      
      <main className="pt-24 pb-12">
        {/* Header */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl">
              A comprehensive collection of AI-powered mobile applications and intelligent solutions that combine innovative design with cutting-edge technology to solve real-world problems.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#00f0ff] text-black"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group project-card bg-muted/30 rounded-xl p-6 border border-border hover:border-[#00f0ff]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00f0ff]/10">
                <div className="mb-4 relative overflow-hidden rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`${getCategoryColor(project.category)} text-black text-xs px-2 py-1 rounded-full font-medium`}>
                      {project.category}
                    </span>
                    <span className={`${getStatusColor(project.status)} bg-black/70 text-xs px-2 py-1 rounded-full font-medium`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-[#00f0ff] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-foreground">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="text-xs bg-slate-700/50 text-[#00f0ff] px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">
                        +{project.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2 text-foreground">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-[#00f0ff] text-[#00f0ff] rounded-lg hover:bg-[#00f0ff]/10 transition-colors text-sm font-medium"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-[#00f0ff] text-black rounded-lg hover:bg-[#00f0ff]/90 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
              <div className="text-3xl font-bold text-[#00f0ff] mb-2">{projects.length}</div>
              <div className="text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
              <div className="text-3xl font-bold text-[#00f0ff] mb-2">{projects.filter(p => p.status === "Live").length}</div>
              <div className="text-muted-foreground">Live Applications</div>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
              <div className="text-3xl font-bold text-[#00f0ff] mb-2">{categories.length - 1}</div>
              <div className="text-muted-foreground">Technology Areas</div>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
              <div className="text-3xl font-bold text-[#00f0ff] mb-2">2+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}