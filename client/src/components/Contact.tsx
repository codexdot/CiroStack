import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message! I will get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const socialLinks = [
    { icon: "fab fa-github", href: "#" },
    { icon: "fab fa-linkedin-in", href: "#" },
    { icon: "fab fa-twitter", href: "#" },
    { icon: "fab fa-medium", href: "#" }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-800/30 rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg">
              Have a project in mind or want to discuss potential collaborations? Feel free to reach out through the form or connect with me on social media.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#00f0ff]/10 p-3 rounded-lg mr-4">
                  <i className="fas fa-envelope text-[#00f0ff]"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <a href="mailto:contact@cirostack.com" className="text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors">
                    contact@cirostack.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#ff00f0]/10 p-3 rounded-lg mr-4">
                  <i className="fas fa-map-marker-alt text-[#ff00f0]"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Location</h4>
                  <p className="text-slate-400">Lagos, NG</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#00f0ff]/10 p-3 rounded-lg mr-4">
                  <i className="fas fa-calendar-alt text-[#00f0ff]"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Availability</h4>
                  <p className="text-slate-400">Monday - Friday, 9AM - 5PM GMT</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-bold mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    className="social-icon bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#00f0ff]/10 transition-colors"
                  >
                    <i className={`${link.icon} text-white`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="portfolio-input w-full px-4 py-3 rounded-lg border border-slate-700 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all text-white" 
                  placeholder="Your name" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="portfolio-input w-full px-4 py-3 rounded-lg border border-slate-700 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all text-white" 
                  placeholder="your@email.com" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="portfolio-input w-full px-4 py-3 rounded-lg border border-slate-700 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all text-white" 
                  placeholder="What's this about?" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4} 
                  className="portfolio-textarea w-full px-4 py-3 rounded-lg border border-slate-700 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all text-white" 
                  placeholder="Your message here..." 
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="gradient-bg text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
