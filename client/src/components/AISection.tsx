export default function AISection() {
  const researchProjects = [
    {
      id: 1,
      title: "Vision Transformer for Mobile",
      description: "Optimized ViT model for real-time image classification on mobile devices",
      icon: "fas fa-brain",
      iconColor: "text-[#00f0ff]",
      bgColor: "bg-[#00f0ff]/10",
      technologies: ["PyTorch", "ONNX"],
      codeSnippet: `class MobileViT(nn.Module):
    def __init__(self, image_size=256, patch_size=16, ...):
        super().__init__()
        self.patch_embed = PatchEmbed(image_size, patch_size)
        self.transformer = TransformerEncoder(dim, depth, heads, ...)
        # Mobile-optimized layers
        self.conv_proj = ConvProjection(dim)
        
    def forward(self, x):
        x = self.patch_embed(x)
        x = self.transformer(x)
        # Efficient projection
        return self.conv_proj(x)`
    },
    {
      id: 2,
      title: "TinyBERT for On-Device NLP",
      description: "Distilled BERT model for efficient text processing on mobile",
      icon: "fas fa-language",
      iconColor: "text-[#ff00f0]",
      bgColor: "bg-[#ff00f0]/10",
      technologies: ["TensorFlow", "TFLite"],
      codeSnippet: `def distill_bert(teacher, student, dataloader):
    # Knowledge distillation loop
    for batch in dataloader:
        with torch.no_grad():
            t_logits = teacher(batch)
            
        s_logits = student(batch)
        loss = kl_div(t_logits, s_logits)
        loss.backward()
        optimizer.step()
        
    return student`
    }
  ];

  const contributions = [
    {
      id: 1,
      title: "MobileML Toolkit",
      stats: "GitHub · 1.2k stars",
      description: "Contributed optimized model conversion pipelines and quantization techniques for TensorFlow Lite models.",
      technologies: ["Python", "C++"],
      linkText: "View PR"
    },
    {
      id: 2,
      title: "PyTorch Mobile",
      stats: "GitHub · 3.4k stars",
      description: "Implemented performance improvements for model serialization and memory management on iOS.",
      technologies: ["C++", "Objective-C"],
      linkText: "View Commit"
    },
    {
      id: 3,
      title: "OpenCV Android",
      stats: "GitHub · 2.1k stars",
      description: "Added GPU acceleration support for real-time image segmentation models.",
      technologies: ["Java", "NDK"],
      linkText: "View Issue"
    }
  ];

  return (
    <section id="ai" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-800/30 rounded-3xl my-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          AI & <span className="gradient-text">Machine Learning</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          My research and implementations in artificial intelligence, from computer vision to natural language processing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">Research & Models</h3>
          
          <div className="space-y-8">
            {researchProjects.map((project) => (
              <div key={project.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-800">
                <div className="flex items-start mb-4">
                  <div className={`${project.bgColor} p-3 rounded-lg mr-4`}>
                    <i className={`${project.icon} ${project.iconColor} text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{project.title}</h4>
                    <p className="text-slate-400 text-sm">{project.description}</p>
                  </div>
                </div>
                <div className="code-snippet p-4 rounded-lg mb-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                    {project.codeSnippet.split('\n').map((line, index) => (
                      <div key={index}>
                        {line.includes('class') || line.includes('def') ? (
                          <span>
                            <span className="text-[#00f0ff]">{line.match(/^(\s*)(class|def)/)?.[2]}</span>
                            <span className="text-[#ff00f0]">{line.replace(/^(\s*)(class|def)/, '').split('(')[0]}</span>
                            <span>{line.includes('(') ? '(' + line.split('(').slice(1).join('(') : ''}</span>
                          </span>
                        ) : line.includes('#') ? (
                          <span className="text-slate-500">{line}</span>
                        ) : line.includes('return') ? (
                          <span>
                            <span className="text-[#00f0ff]">return</span>
                            <span>{line.replace('return', '')}</span>
                          </span>
                        ) : line.includes('for') || line.includes('with') ? (
                          <span>
                            <span className="text-[#00f0ff]">{line.match(/^(\s*)(for|with)/)?.[2]}</span>
                            <span>{line.replace(/^(\s*)(for|with)/, '')}</span>
                          </span>
                        ) : (
                          <span>{line}</span>
                        )}
                      </div>
                    ))}
                  </pre>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-slate-700 text-[#00f0ff] px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="text-xs text-[#00f0ff] font-medium">
                    View Paper
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-6">Open Source Contributions</h3>
          
          <div className="space-y-6">
            {contributions.map((contribution) => (
              <div key={contribution.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-800">
                <div className="flex items-center mb-4">
                  <i className="fab fa-github text-white text-2xl mr-4"></i>
                  <div>
                    <h4 className="font-bold">{contribution.title}</h4>
                    <p className="text-slate-400 text-sm">{contribution.stats}</p>
                  </div>
                </div>
                <p className="text-slate-400 mb-4">{contribution.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {contribution.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-slate-700 text-[#00f0ff] px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="text-[#00f0ff] text-sm font-medium">
                    {contribution.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
