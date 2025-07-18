import { useState } from "react";
import { useLocation } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
  image: string;
  tags: string[];
}

export default function BlogPage() {
  const [, setLocation] = useLocation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      setLocation('/');
    } else {
      setLocation(`/#${sectionId}`);
    }
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Optimizing Vision Transformers for Mobile Deployment",
      excerpt: "Learn how to compress and optimize Vision Transformer models for real-time inference on mobile devices.",
      date: "2024-12-15",
      readTime: "8 min read",
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["PyTorch", "Mobile ML", "Vision Transformers", "Optimization"],
      content: `# Optimizing Vision Transformers for Mobile Deployment

Vision Transformers (ViTs) have revolutionized computer vision, but their computational demands make mobile deployment challenging. This article explores practical techniques for optimizing ViTs for mobile inference.

## The Challenge

Traditional ViTs require significant computational resources:
- Large model size (>100MB)
- High memory consumption
- Slow inference on mobile CPUs

## Optimization Strategies

### 1. Knowledge Distillation

\`\`\`python
class StudentViT(nn.Module):
    def __init__(self, teacher_model, compression_ratio=0.5):
        super().__init__()
        self.backbone = self._create_compressed_backbone(teacher_model, compression_ratio)
        self.head = nn.Linear(self.backbone.embed_dim, teacher_model.num_classes)
        
    def forward(self, x):
        features = self.backbone(x)
        return self.head(features)
\`\`\`

### 2. Quantization

Post-training quantization can reduce model size by 75%:

\`\`\`python
import torch.quantization as quantization

# Quantize the model
model_quantized = quantization.quantize_dynamic(
    model, {nn.Linear}, dtype=torch.qint8
)
\`\`\`

### 3. Pruning

Remove redundant attention heads and layers:

\`\`\`python
def prune_attention_heads(model, pruning_ratio=0.3):
    for layer in model.transformer.layers:
        # Calculate head importance scores
        head_importance = calculate_head_importance(layer)
        
        # Prune least important heads
        heads_to_prune = select_heads_to_prune(head_importance, pruning_ratio)
        layer.attention.prune_heads(heads_to_prune)
\`\`\`

## Results

Our optimized MobileViT achieves:
- **90% smaller model size** (10MB vs 100MB)
- **5x faster inference** on mobile devices
- **<2% accuracy drop** on ImageNet

## Conclusion

With proper optimization techniques, Vision Transformers can be deployed efficiently on mobile devices while maintaining competitive accuracy.`
    },
    {
      id: 2,
      title: "Building Real-time AR Applications with CoreML",
      excerpt: "A comprehensive guide to creating augmented reality experiences using CoreML and ARKit on iOS.",
      date: "2024-12-10",
      readTime: "12 min read",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["iOS", "ARKit", "CoreML", "Swift"],
      content: `# Building Real-time AR Applications with CoreML

Augmented Reality (AR) combined with machine learning opens up endless possibilities for immersive mobile experiences. This guide walks through building a real-time AR application using CoreML and ARKit.

## Project Overview

We'll build an AR app that:
- Detects objects in real-time using computer vision
- Overlays 3D models on detected objects
- Provides interactive AR experiences

## Setting Up the Project

### 1. Project Configuration

\`\`\`swift
import ARKit
import CoreML
import Vision

class ARViewController: UIViewController, ARSCNViewDelegate {
    @IBOutlet var sceneView: ARSCNView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Set up AR scene
        sceneView.delegate = self
        sceneView.showsStatistics = true
        
        // Create a new scene
        let scene = SCNScene()
        sceneView.scene = scene
    }
}
\`\`\`

### 2. CoreML Model Integration

\`\`\`swift
class ObjectDetector {
    private var model: VNCoreMLModel?
    
    init() {
        loadModel()
    }
    
    private func loadModel() {
        guard let modelURL = Bundle.main.url(forResource: "YOLOv5", withExtension: "mlmodelc") else {
            print("Model not found")
            return
        }
        
        do {
            let coreMLModel = try MLModel(contentsOf: modelURL)
            model = try VNCoreMLModel(for: coreMLModel)
        } catch {
            print("Failed to load model: \\(error)")
        }
    }
}
\`\`\`

### 3. Real-time Object Detection

\`\`\`swift
func performObjectDetection(on pixelBuffer: CVPixelBuffer) {
    guard let model = model else { return }
    
    let request = VNCoreMLRequest(model: model) { [weak self] request, error in
        self?.processDetectionResults(request.results)
    }
    
    let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:])
    
    do {
        try handler.perform([request])
    } catch {
        print("Detection failed: \\(error)")
    }
}
\`\`\`

## Performance Optimization

### CPU vs GPU Processing

\`\`\`swift
// Configure for optimal performance
let configuration = MLModelConfiguration()
configuration.computeUnits = .all // Use both CPU and GPU
\`\`\`

### Frame Rate Management

\`\`\`swift
private var lastProcessingTime: CFTimeInterval = 0
private let processingInterval: CFTimeInterval = 1.0 / 30.0 // 30 FPS

func renderer(_ renderer: SCNSceneRenderer, updateAtTime time: TimeInterval) {
    if time - lastProcessingTime >= processingInterval {
        processCurrentFrame()
        lastProcessingTime = time
    }
}
\`\`\`

## Best Practices

1. **Optimize Model Size**: Use quantized models for mobile deployment
2. **Manage Memory**: Release unused resources promptly
3. **Batch Processing**: Process multiple frames together when possible
4. **Thermal Management**: Monitor device temperature and adjust processing accordingly

## Conclusion

CoreML and ARKit provide powerful tools for creating sophisticated AR applications. With proper optimization, you can achieve real-time performance while maintaining high accuracy.`
    },
    {
      id: 3,
      title: "The Future of On-Device AI: Trends and Predictions",
      excerpt: "Exploring emerging trends in on-device artificial intelligence and what they mean for mobile app development.",
      date: "2024-12-05",
      readTime: "6 min read",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["On-Device AI", "Mobile ML", "Future Tech", "Industry Trends"],
      content: `# The Future of On-Device AI: Trends and Predictions

On-device AI is transforming how we interact with mobile applications. As hardware capabilities advance and privacy concerns grow, the shift towards edge computing becomes increasingly important.

## Current State of On-Device AI

### Hardware Advancements

Modern mobile processors include dedicated AI accelerators:
- **Apple A17 Pro**: 35 TOPS neural engine
- **Snapdragon 8 Gen 3**: Hexagon NPU with 45 TOPS
- **Google Tensor G3**: Custom TPU for ML workloads

### Software Ecosystem

\`\`\`python
# Example: TensorFlow Lite deployment
interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Run inference
interpreter.set_tensor(input_details[0]['index'], input_data)
interpreter.invoke()
output_data = interpreter.get_tensor(output_details[0]['index'])
\`\`\`

## Emerging Trends

### 1. Federated Learning

Collaborative model training without data sharing:

\`\`\`python
class FederatedLearningClient:
    def __init__(self, model, local_data):
        self.model = model
        self.local_data = local_data
        
    def train_locally(self, epochs=5):
        # Train on local data
        self.model.fit(self.local_data, epochs=epochs)
        
    def get_model_weights(self):
        return self.model.get_weights()
        
    def update_model(self, global_weights):
        self.model.set_weights(global_weights)
\`\`\`

### 2. Neural Architecture Search (NAS)

Automated discovery of optimal mobile architectures:

\`\`\`python
def search_mobile_architecture(constraints):
    search_space = {
        'depth': [8, 12, 16],
        'width': [0.5, 0.75, 1.0],
        'resolution': [224, 256, 288]
    }
    
    best_arch = None
    best_score = 0
    
    for arch in generate_architectures(search_space):
        if meets_constraints(arch, constraints):
            score = evaluate_architecture(arch)
            if score > best_score:
                best_arch = arch
                best_score = score
                
    return best_arch
\`\`\`

### 3. Multimodal AI

Combining vision, audio, and text understanding:

\`\`\`swift
class MultimodalProcessor {
    private let visionModel: VNCoreMLModel
    private let audioModel: SNClassifier
    private let textModel: NLModel
    
    func process(image: UIImage, audio: AVAudioBuffer, text: String) -> MultimodalResult {
        let visionResult = processVision(image)
        let audioResult = processAudio(audio)
        let textResult = processText(text)
        
        return fuse(visionResult, audioResult, textResult)
    }
}
\`\`\`

## Future Predictions

### Next 2-3 Years

1. **Edge-Cloud Hybrid Models**: Seamless switching between on-device and cloud processing
2. **Improved Privacy**: Advanced techniques like differential privacy and homomorphic encryption
3. **Real-time Personalization**: Models that adapt to user behavior in real-time

### 5-10 Years

1. **Neuromorphic Computing**: Brain-inspired processors for ultra-low power AI
2. **Quantum-Enhanced ML**: Quantum algorithms for optimization and training
3. **Autonomous Mobile Ecosystems**: Self-improving apps that evolve independently

## Challenges and Opportunities

### Technical Challenges

- **Model Compression**: Balancing size, speed, and accuracy
- **Battery Life**: Optimizing power consumption for AI workloads
- **Thermal Management**: Preventing overheating during intensive processing

### Business Opportunities

- **Personalized Experiences**: Tailored content and recommendations
- **Privacy-First Applications**: Apps that don't rely on cloud data
- **Offline-First Design**: Functionality that works without internet

## Conclusion

The future of on-device AI is bright, with exciting developments in hardware, software, and algorithms. As developers, staying informed about these trends will help us build the next generation of intelligent mobile applications.

The key is to balance innovation with practicality, ensuring our applications are both powerful and efficient.`
    },
    {
      id: 4,
      title: "Advanced Flutter State Management: Riverpod vs BLoC",
      excerpt: "A detailed comparison of state management approaches in Flutter, exploring when to use Riverpod versus BLoC pattern.",
      date: "2024-11-28",
      readTime: "10 min read",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Flutter", "Riverpod", "BLoC", "State Management"],
      content: `# Advanced Flutter State Management: Riverpod vs BLoC

State management is crucial for building maintainable Flutter applications. This article compares two popular approaches: Riverpod and BLoC.

## Understanding the Landscape

### Riverpod Architecture

\`\`\`dart
final counterProvider = StateNotifierProvider<Counter, int>((ref) {
  return Counter();
});

class Counter extends StateNotifier<int> {
  Counter() : super(0);
  
  void increment() => state++;
  void decrement() => state--;
}
\`\`\`

### BLoC Pattern

\`\`\`dart
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
    on<Decrement>((event, emit) => emit(state - 1));
  }
}
\`\`\`

## Performance Comparison

### Memory Usage
- **Riverpod**: Automatic disposal and lazy initialization
- **BLoC**: Manual lifecycle management required

### Rebuild Optimization
- **Riverpod**: Granular rebuilds with providers
- **BLoC**: BlocBuilder and BlocSelector for optimization

## When to Choose Each

### Use Riverpod When:
- Building new applications
- Need automatic dependency injection
- Want compile-time safety
- Prefer functional programming style

### Use BLoC When:
- Working with existing BLoC applications
- Need strict separation of business logic
- Team is familiar with reactive programming
- Building large enterprise applications

## Conclusion

Both approaches have their merits. Choose based on your team's expertise and project requirements.`
    },
    {
      id: 5,
      title: "Implementing Secure Authentication in React Native",
      excerpt: "Best practices for implementing secure authentication flows in React Native applications with biometric support.",
      date: "2024-11-20",
      readTime: "15 min read",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["React Native", "Authentication", "Security", "Biometrics"],
      content: `# Implementing Secure Authentication in React Native

Security is paramount in mobile applications. This guide covers implementing robust authentication with biometric support in React Native.

## Security Fundamentals

### Token Storage
\`\`\`javascript
import * as Keychain from 'react-native-keychain';

const storeToken = async (token) => {
  await Keychain.setInternetCredentials(
    'myapp',
    'user',
    token
  );
};
\`\`\`

### Biometric Authentication
\`\`\`javascript
import TouchID from 'react-native-touch-id';

const authenticateWithBiometrics = async () => {
  const biometryType = await TouchID.isSupported();
  
  if (biometryType) {
    return TouchID.authenticate('Authenticate to access your account');
  }
};
\`\`\`

## Implementation Strategy

1. **Secure Token Storage**: Use Keychain (iOS) and Keystore (Android)
2. **Certificate Pinning**: Prevent man-in-the-middle attacks
3. **Biometric Integration**: Support Face ID, Touch ID, and fingerprint
4. **Session Management**: Implement proper token refresh

## Best Practices

- Always validate tokens server-side
- Implement proper error handling
- Use HTTPS everywhere
- Regular security audits

## Conclusion

Secure authentication requires multiple layers of protection. Follow these patterns for robust mobile security.`
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return 'bg-[#00f0ff]/10 text-[#00f0ff]';
      case 'Mobile Development':
        return 'bg-[#ff00f0]/10 text-[#ff00f0]';
      case 'Industry Insights':
        return 'bg-green-500/10 text-green-400';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Navigation 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          scrollToSection={scrollToSection}
        />
        
        <main className="pt-20">
          <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors mb-8"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Blog
            </button>
          </section>
          
          <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedPost.category)} mb-4`}>
                  {selectedPost.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedPost.title}</h1>
                <div className="flex items-center text-slate-400 text-sm">
                  <span>{formatDate(selectedPost.date)}</span>
                  <span className="mx-3">·</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
              
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
              />
              
              <div className="prose prose-slate prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    code: ({ className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <code className={`${className} block p-4 rounded-lg bg-slate-800/50 border border-slate-700 overflow-x-auto`} {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className="px-2 py-1 bg-slate-800/50 rounded text-[#00f0ff]" {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer scrollToSection={scrollToSection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        scrollToSection={scrollToSection}
      />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CiroStack <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Insights, tutorials, and thoughts on AI, mobile development, and the future of technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-800 card-hover cursor-pointer transition-all duration-300 hover:bg-slate-800/70 hover:border-slate-700 hover:scale-105"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-slate-400 text-sm mb-3">
                    <span>{formatDate(post.date)}</span>
                    <span className="mx-3">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                  <p className="text-slate-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-[#00f0ff] font-medium inline-flex items-center group-hover:text-[#00f0ff]/80 transition-colors">
                    Read More <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}