import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Brain, Code, Zap, Users, Star } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Brain className="w-8 h-8 text-[#00f0ff]" />,
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
      icon: <Smartphone className="w-8 h-8 text-[#ff00f0]" />,
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
      icon: <Code className="w-8 h-8 text-[#00ff80]" />,
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
      icon: <Zap className="w-8 h-8 text-[#ffff00]" />,
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
      icon: <Users className="w-8 h-8 text-[#ff8000]" />,
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
      icon: <Star className="w-8 h-8 text-[#8000ff]" />,
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
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${service.gradient} bg-opacity-10`}>
                    {service.icon}
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
    </div>
  );
}