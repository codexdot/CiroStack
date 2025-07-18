export default function Skills() {
  const skillCategories = [
    {
      title: "Mobile Development",
      icon: "fas fa-mobile-alt",
      iconColor: "text-[#00f0ff]",
      bgColor: "bg-[#00f0ff]/10",
      skills: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "Flutter", "React Native", "CoreML", "ML Kit"]
    },
    {
      title: "AI/ML Frameworks",
      icon: "fas fa-robot",
      iconColor: "text-[#ff00f0]",
      bgColor: "bg-[#ff00f0]/10",
      skills: ["TensorFlow", "PyTorch", "Keras", "TFLite", "ONNX", "OpenCV", "NLP", "Computer Vision"]
    },
    {
      title: "Backend & Cloud",
      icon: "fas fa-server",
      iconColor: "text-[#00f0ff]",
      bgColor: "bg-[#00f0ff]/10",
      skills: ["Python", "Node.js", "Firebase", "AWS", "GCP", "Docker", "GraphQL", "REST APIs"]
    }
  ];

  const experience = [
    {
      title: "Lead AI Mobile Developer",
      company: "TechInnovate Inc.",
      duration: "2021-Present",
      description: "Leading a team to develop AI-powered mobile applications, implementing on-device ML models, and optimizing performance across iOS and Android platforms.",
      badgeColor: "bg-[#00f0ff]/10 text-[#00f0ff]"
    },
    {
      title: "Senior Mobile Developer",
      company: "Digital Solutions Co.",
      duration: "2018-2021",
      description: "Developed cross-platform mobile applications with integrated ML features, implemented CI/CD pipelines, and mentored junior developers.",
      badgeColor: "bg-[#ff00f0]/10 text-[#ff00f0]"
    },
    {
      title: "Mobile Developer",
      company: "StartUp Ventures",
      duration: "2015-2018",
      description: "Built native iOS and Android applications, integrated third-party APIs, and implemented basic ML models for user behavior analysis.",
      badgeColor: "bg-[#00f0ff]/10 text-[#00f0ff]"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Skills & <span className="gradient-text">Technologies</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          My technical expertise spans across mobile development, AI/ML frameworks, and cloud technologies.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center mb-6">
              <div className={`${category.bgColor} p-3 rounded-lg mr-4`}>
                <i className={`${category.icon} ${category.iconColor} text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-pill text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Experience Timeline */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold mb-8 text-center">
          Professional <span className="gradient-text">Journey</span>
        </h3>
        
        <div className="relative max-w-2xl mx-auto">
          {experience.map((job, index) => (
            <div key={index} className={`timeline-item relative pl-8 ${index !== experience.length - 1 ? 'pb-8' : ''}`}>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">{job.title}</h4>
                  <span className={`text-sm px-2 py-1 rounded-full ${job.badgeColor}`}>
                    {job.duration}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{job.company}</p>
                <p className="text-slate-400 text-sm">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
