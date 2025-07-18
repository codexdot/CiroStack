import { 
  users, 
  projects, 
  blogPosts,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type BlogPost,
  type InsertBlogPost
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(insertProject: InsertProject): Promise<Project>;
  updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  
  // Blog post operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private blogPosts: Map<number, BlogPost>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.blogPosts = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentBlogPostId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample projects
    const sampleProjects: Project[] = [
      {
        id: 1,
        title: "AI-Powered Recipe App",
        description: "A smart recipe recommendation app using machine learning to suggest personalized meals based on dietary preferences and available ingredients.",
        category: "AI/ML",
        technologies: ["Swift", "CoreML", "Python", "TensorFlow"],
        githubUrl: "https://github.com/username/recipe-app",
        liveUrl: "https://recipe-app.com",
        image: "/api/placeholder/400/300",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Real-time Chat Platform",
        description: "A scalable real-time messaging platform with end-to-end encryption and multimedia support.",
        category: "Web Development",
        technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
        githubUrl: "https://github.com/username/chat-platform",
        liveUrl: "https://chat-platform.com",
        image: "/api/placeholder/400/300",
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: 1,
        title: "The Future of AI in Mobile Development",
        excerpt: "Exploring how artificial intelligence is reshaping the mobile app development landscape...",
        content: "# The Future of AI in Mobile Development\n\nArtificial intelligence is revolutionizing mobile development...",
        category: "AI/ML",
        tags: ["AI", "Mobile", "Machine Learning"],
        image: "/api/placeholder/400/300",
        readTime: "5 min read",
        published: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    sampleProjects.forEach(project => this.projects.set(project.id, project));
    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));
    
    this.currentProjectId = Math.max(...sampleProjects.map(p => p.id)) + 1;
    this.currentBlogPostId = Math.max(...sampleBlogPosts.map(p => p.id)) + 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const now = new Date();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: now, 
      updatedAt: now,
      githubUrl: insertProject.githubUrl ?? null,
      liveUrl: insertProject.liveUrl ?? null,
      featured: insertProject.featured ?? false
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      throw new Error(`Project with id ${id} not found`);
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...updateData,
      updatedAt: new Date()
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  // Blog post operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id, 
      createdAt: now, 
      updatedAt: now,
      published: insertBlogPost.published ?? false
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      throw new Error(`Blog post with id ${id} not found`);
    }
    
    const updatedPost: BlogPost = {
      ...existingPost,
      ...updateData,
      updatedAt: new Date()
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
