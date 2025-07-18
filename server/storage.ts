import { 
  users, 
  projects, 
  blogPosts,
  type User, 
  type UpsertUser,
  type Project,
  type InsertProject,
  type BlogPost,
  type InsertBlogPost
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
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

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Blog post operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    return post;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
}

export class MemStorage implements IStorage {
  // User operations - placeholder methods for compatibility
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    throw new Error("MemStorage does not support Replit Auth operations");
  }

  private projects: Map<number, Project>;
  private blogPosts: Map<number, BlogPost>;
  private currentProjectId: number;
  private currentBlogPostId: number;

  constructor() {
    this.projects = new Map();
    this.blogPosts = new Map();
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

export const storage = new DatabaseStorage();
