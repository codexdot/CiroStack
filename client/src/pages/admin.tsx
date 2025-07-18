import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit2, Plus, Save, X } from "lucide-react";
import type { Project, BlogPost, InsertProject, InsertBlogPost } from "@shared/schema";

interface AdminPageProps {}

export default function AdminPage({}: AdminPageProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState("projects");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = (sectionId: string) => {
    // For navigation from admin page
    window.location.href = `/#${sectionId}`;
  };

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/projects"],
  });

  // Fetch blog posts
  const { data: blogPosts = [], isLoading: blogPostsLoading } = useQuery({
    queryKey: ["/api/blog-posts"],
  });

  // Project mutations
  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      return apiRequest("/api/projects", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsDialogOpen(false);
      setEditingProject(null);
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create project: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProject> }) => {
      return apiRequest(`/api/projects/${id}`, {
        method: "PUT",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsDialogOpen(false);
      setEditingProject(null);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update project: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/projects/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete project: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Blog post mutations
  const createBlogPostMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      return apiRequest("/api/blog-posts", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setIsDialogOpen(false);
      setEditingBlogPost(null);
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create blog post: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateBlogPostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertBlogPost> }) => {
      return apiRequest(`/api/blog-posts/${id}`, {
        method: "PUT",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setIsDialogOpen(false);
      setEditingBlogPost(null);
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update blog post: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/blog-posts/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete blog post: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const technologies = (formData.get("technologies") as string)
      .split(",")
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);
    
    const projectData: InsertProject = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      technologies,
      githubUrl: formData.get("githubUrl") as string || null,
      liveUrl: formData.get("liveUrl") as string || null,
      image: formData.get("image") as string,
      featured: formData.get("featured") === "on",
    };

    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data: projectData });
    } else {
      createProjectMutation.mutate(projectData);
    }
  };

  const handleBlogPostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const tags = (formData.get("tags") as string)
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const blogPostData: InsertBlogPost = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      tags,
      image: formData.get("image") as string,
      readTime: formData.get("readTime") as string,
      published: formData.get("published") === "on",
    };

    if (editingBlogPost) {
      updateBlogPostMutation.mutate({ id: editingBlogPost.id, data: blogPostData });
    } else {
      createBlogPostMutation.mutate(blogPostData);
    }
  };

  const openProjectDialog = (project?: Project) => {
    setEditingProject(project || null);
    setEditingBlogPost(null);
    setActiveTab("projects");
    setIsDialogOpen(true);
  };

  const openBlogPostDialog = (blogPost?: BlogPost) => {
    setEditingBlogPost(blogPost || null);
    setEditingProject(null);
    setActiveTab("blog");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setEditingBlogPost(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground max-w-full overflow-x-hidden">
      <Navigation 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleTheme}
        scrollToSection={scrollToSection}
      />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full box-border">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Manage your projects and blog posts from this central dashboard.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-full overflow-x-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Projects</h2>
              <Button onClick={() => openProjectDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>

            {projectsLoading ? (
              <p>Loading projects...</p>
            ) : (
              <div className="grid gap-6 w-full max-w-full">
                {projects.map((project: Project) => (
                  <Card key={project.id} className="w-full max-w-full overflow-hidden">
                    <CardHeader className="w-full max-w-full overflow-hidden">
                      <div className="flex justify-between items-start w-full max-w-full overflow-hidden">
                        <div className="flex-1 min-w-0 pr-2">
                          <CardTitle className="flex items-center gap-2 flex-wrap break-words text-base sm:text-lg">
                            <span className="break-words min-w-0 flex-shrink">{project.title}</span>
                            {project.featured && (
                              <Badge variant="secondary" className="flex-shrink-0">Featured</Badge>
                            )}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">{project.category}</Badge>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openProjectDialog(project)}
                            className="flex-shrink-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteProjectMutation.mutate(project.id)}
                            className="flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="w-full max-w-full overflow-hidden">
                      <p className="text-slate-400 mb-4 break-words overflow-wrap-anywhere">{project.description}</p>
                      <div className="flex flex-wrap gap-2 w-full max-w-full">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="break-words max-w-full">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="blog" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Blog Posts</h2>
              <Button onClick={() => openBlogPostDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Blog Post
              </Button>
            </div>

            {blogPostsLoading ? (
              <p>Loading blog posts...</p>
            ) : (
              <div className="grid gap-6 w-full max-w-full">
                {blogPosts.map((post: BlogPost) => (
                  <Card key={post.id} className="w-full max-w-full overflow-hidden">
                    <CardHeader className="w-full max-w-full overflow-hidden">
                      <div className="flex justify-between items-start w-full max-w-full overflow-hidden">
                        <div className="flex-1 min-w-0 pr-2">
                          <CardTitle className="flex items-center gap-2 flex-wrap break-words text-base sm:text-lg">
                            <span className="break-words min-w-0 flex-shrink">{post.title}</span>
                            {post.published && (
                              <Badge variant="secondary" className="flex-shrink-0">Published</Badge>
                            )}
                            {!post.published && (
                              <Badge variant="outline" className="flex-shrink-0">Draft</Badge>
                            )}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">{post.category}</Badge>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openBlogPostDialog(post)}
                            className="flex-shrink-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteBlogPostMutation.mutate(post.id)}
                            className="flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="w-full max-w-full overflow-hidden">
                      <p className="text-slate-400 mb-4 break-words overflow-wrap-anywhere">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-2 w-full max-w-full">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="break-words max-w-full">{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-slate-500 break-words">{post.readTime}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Project/Blog Post Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <DialogHeader>
              <DialogTitle>
                {editingProject 
                  ? "Edit Project" 
                  : editingBlogPost 
                  ? "Edit Blog Post" 
                  : activeTab === "projects" 
                  ? "Add New Project" 
                  : "Add New Blog Post"}
              </DialogTitle>
              <DialogDescription>
                {activeTab === "projects" 
                  ? "Fill in the details for your project." 
                  : "Fill in the details for your blog post."}
              </DialogDescription>
            </DialogHeader>

            {activeTab === "projects" ? (
              <form onSubmit={handleProjectSubmit} className="space-y-4 w-full overflow-hidden">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingProject?.title || ""}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingProject?.description || ""}
                    className="w-full resize-none break-words whitespace-pre-wrap"
                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={editingProject?.category || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    name="technologies"
                    defaultValue={editingProject?.technologies.join(", ") || ""}
                    placeholder="React, TypeScript, Node.js"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    defaultValue={editingProject?.image || ""}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    type="url"
                    defaultValue={editingProject?.githubUrl || ""}
                  />
                </div>

                <div>
                  <Label htmlFor="liveUrl">Live URL (optional)</Label>
                  <Input
                    id="liveUrl"
                    name="liveUrl"
                    type="url"
                    defaultValue={editingProject?.liveUrl || ""}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    name="featured"
                    defaultChecked={editingProject?.featured || false}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {editingProject ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            ) : (
              <form onSubmit={handleBlogPostSubmit} className="space-y-4 w-full overflow-hidden">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingBlogPost?.title || ""}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    defaultValue={editingBlogPost?.excerpt || ""}
                    className="w-full resize-none break-words whitespace-pre-wrap"
                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    name="content"
                    defaultValue={editingBlogPost?.content || ""}
                    rows={10}
                    className="w-full resize-none break-words whitespace-pre-wrap"
                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={editingBlogPost?.category || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={editingBlogPost?.tags.join(", ") || ""}
                    placeholder="react, javascript, tutorial"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    defaultValue={editingBlogPost?.image || ""}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    name="readTime"
                    defaultValue={editingBlogPost?.readTime || ""}
                    placeholder="5 min read"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    name="published"
                    defaultChecked={editingBlogPost?.published || false}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {editingBlogPost ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}