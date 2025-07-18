export default function AIMLSection() {
  const contributions = [
    {
      title: "MobileML Toolkit",
      stats: "GitHub · 1.2k stars",
      description: "Contributed optimized model conversion pipelines and quantization techniques for TensorFlow Lite models.",
      technologies: ["Python", "C++"],
      linkText: "View PR"
    },
    {
      title: "PyTorch Mobile",
      stats: "GitHub · 3.4k stars",
      description: "Implemented performance improvements for model serialization and memory management on iOS.",
      technologies: ["C++", "Objective-C"],
      linkText: "View Commit"
    },
    {
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
            {/* Model 1 */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-800">
              <div className="flex items-start mb-4">
                <div className="bg-[#00f0ff]/10 p-3 rounded-lg mr-4">
                  <i className="fas fa-brain text-[#00f0ff] text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Vision Transformer for Mobile</h4>
                  <p className="text-slate-400 text-sm">Optimized ViT model for real-time image classification on mobile devices</p>
                </div>
              </div>
              <div className="code-snippet p-4 rounded-lg mb-4 overflow-x-auto">
                <pre className="text-sm text-slate-300">
<span className="text-[#00f0ff]">class</span> <span className="text-[#ff00f0]">MobileViT</span>(nn.Module):
    <span className="text-[#00f0ff]">def</span> <span className="text-[#ff00f0]">__init__</span>(self, image_size=256, patch_size=16, ...):
        super().__init__()
        self.patch_embed = PatchEmbed(image_size, patch_size)
        self.transformer = TransformerEncoder(dim, depth, heads, ...)
        <span className="text-slate-500"># Mobile-optimized layers</span>
        self.conv_proj = ConvProjection(dim)
        
    <span className="text-[#00f0ff]">def</span> <span className="text-[#ff00f0]">forward</span>(self, x):
        x = self.patch_embed(x)
        x = self.transformer(x)
        <span className="text-slate-500"># Efficient projection</span>
        <span className="text-[#00f0ff]">return</span> self.conv_proj(x)</pre>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <span className="text-xs bg-slate-700 text-[#00f0ff] px-2 py-1 rounded">PyTorch</span>
                  <span className="text-xs bg-slate-700 text-[#00f0ff] px-2 py-1 rounded">ONNX</span>
                </div>
                <button className="text-xs text-[#00f0ff] font-medium hover:text-[#00f0ff]/80 transition-colors">
                  View Paper
                </button>
              </div>
            </div>
            
            {/* Model 2 */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-800">
              <div className="flex items-start mb-4">
                <div className="bg-[#ff00f0]/10 p-3 rounded-lg mr-4">
                  <i className="fas fa-language text-[#ff00f0] text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold">TinyBERT for On-Device NLP</h4>
                  <p className="text-slate-400 text-sm">Distilled BERT model for efficient text processing on mobile</p>
                </div>
              </div>
              <div className="code-snippet p-4 rounded-lg mb-4 overflow-x-auto">
                <pre className="text-sm text-slate-300">
<span className="text-[#00f0ff]">def</span> <span className="text-[#ff00f0]">distill_bert</span>(teacher, student, dataloader):
    <span className="text-slate-500"># Knowledge distillation loop</span>
    <span className="text-[#00f0ff]">for</span> batch <span className="text-[#00f0ff]">in</span> dataloader:
        <span className="text-[#00f0ff]">with</span> torch.no_grad():
            t_logits = teacher(batch)
            
        s_logits = student(batch)
        loss = kl_div(t_logits, s_logits)
        loss.backward()
        optimizer.step()
        
    <span className="text-[#00f0ff]">return</span> student</pre>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <span className="text-xs bg-slate-700 text-[#00f0ff] px-2 py-1 rounded">TensorFlow</span>
                  <span className="text-xs bg-slate-700 text-[#00f0ff] px-2 py-1 rounded">TFLite</span>
                </div>
                <button className="text-xs text-[#00f0ff] font-medium hover:text-[#00f0ff]/80 transition-colors">
                  View Repo
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-6">Open Source Contributions</h3>
          
          <div className="space-y-6">
            {contributions.map((contribution, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-800">
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
                    {contribution.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-slate-700 text-[#00f0ff] px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="text-[#00f0ff] text-sm font-medium hover:text-[#00f0ff]/80 transition-colors">
                    {contribution.linkText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
