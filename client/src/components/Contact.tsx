import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { SiX } from "react-icons/si";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => 
      apiRequest('/api/contact', {
        method: 'POST',
        body: data,
      }),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I will get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const socialLinks = [
    { icon: "fab fa-github", href: "https://github.com/codexdot", component: null },
    { icon: "fab fa-linkedin-in", href: "#", component: null },
    { icon: "x-icon", href: "#", component: SiX },
    { icon: "fab fa-medium", href: "#", component: null }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
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
                    {link.component ? (
                      <link.component className="text-white w-4 h-4" />
                    ) : (
                      <i className={`${link.icon} text-white`}></i>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="portfolio-input w-full px-4 py-3 h-12 rounded-lg border border-slate-700 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all text-white bg-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="portfolio-input w-full px-4 py-3 h-12 rounded-lg border border-slate-700 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all text-white bg-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's this about?"
                          className="portfolio-input w-full px-4 py-3 h-12 rounded-lg border border-slate-700 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all text-white bg-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          rows={4}
                          className="portfolio-textarea w-full px-4 py-3 rounded-lg border border-slate-700 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all text-white bg-transparent resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="gradient-bg text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all w-full h-12"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
