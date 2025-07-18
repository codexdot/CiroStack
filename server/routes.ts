import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateToken, requireAdmin, generateToken, hashPassword, comparePassword } from "./auth";
import { insertProjectSchema, insertBlogPostSchema, loginSchema, registerSchema } from "@shared/schema";
import { supabase } from "./supabase";

export async function registerRoutes(app: Express): Promise<Server> {
  // Supabase Auth routes with fallback to local auth
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { email, password, username, firstName, lastName } = req.body;
      
      if (!email || !password || !username) {
        return res.status(400).json({ message: "Email, password, and username are required" });
      }

      // Try Supabase first, fallback to local auth if Supabase fails
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              first_name: firstName,
              last_name: lastName,
            }
          }
        });

        if (authError) {
          console.log('Supabase signup failed, falling back to local auth:', authError.message);
          throw new Error('Supabase failed, using local fallback');
        }

        if (authData.user) {
          // Supabase signup successful
          const userData = {
            id: authData.user.id,
            username: username,
            email: email,
            firstName: firstName || null,
            lastName: lastName || null,
            isAdmin: false,
            supabaseId: authData.user.id,
          };

          const token = generateToken(userData);

          return res.status(201).json({
            user: userData,
            token,
            supabaseSession: authData.session
          });
        }
      } catch (supabaseError) {
        console.log('Supabase signup failed, using local authentication fallback');
      }

      // Fallback to local authentication
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      if (email) {
        const existingEmail = await storage.getUserByEmail(email);
        if (existingEmail) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }

      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        isAdmin: false,
      });

      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
      });

      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.post('/api/auth/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Try Supabase first, fallback to local auth
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!authError && authData.user) {
          // Supabase signin successful
          const userMetadata = authData.user.user_metadata || {};
          const userData = {
            id: authData.user.id,
            username: userMetadata.username || email.split('@')[0],
            email: authData.user.email,
            firstName: userMetadata.first_name || null,
            lastName: userMetadata.last_name || null,
            isAdmin: false,
            supabaseId: authData.user.id,
          };

          const token = generateToken(userData);

          return res.json({
            user: userData,
            token,
            supabaseSession: authData.session
          });
        }
      } catch (supabaseError) {
        console.log('Supabase signin failed, trying local authentication');
      }

      // Fallback to local authentication
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
      });

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error: any) {
      console.error("Signin error:", error);
      res.status(400).json({ message: error.message || "Sign in failed" });
    }
  });

  app.post('/api/auth/signout', async (req, res) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      res.json({ message: "Signed out successfully" });
    } catch (error: any) {
      console.error("Signout error:", error);
      res.status(400).json({ message: error.message || "Sign out failed" });
    }
  });

  // Legacy auth routes (keep for backward compatibility)
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
      });

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Check if email already exists
      if (userData.email) {
        const existingEmail = await storage.getUserByEmail(userData.email);
        if (existingEmail) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }

      const hashedPassword = await hashPassword(userData.password);
      const { confirmPassword, ...userDataWithoutConfirm } = userData;
      
      const user = await storage.createUser({
        ...userDataWithoutConfirm,
        password: hashedPassword,
      });

      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
      });

      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.get('/api/auth/user', authenticateToken, async (req: any, res) => {
    try {
      const { password: _, ...userWithoutPassword } = req.user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      res.json({ message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ message: "Invalid project data", error: error.message });
    }
  });

  app.put("/api/projects/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(400).json({ message: "Failed to update project", error: error.message });
    }
  });

  app.delete("/api/projects/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Blog post routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const blogPost = await storage.getBlogPost(id);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(validatedData);
      res.status(201).json(blogPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(400).json({ message: "Invalid blog post data", error: error.message });
    }
  });

  app.put("/api/blog-posts/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const blogPost = await storage.updateBlogPost(id, validatedData);
      res.json(blogPost);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(400).json({ message: "Failed to update blog post", error: error.message });
    }
  });

  app.delete("/api/blog-posts/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Database initialization endpoint (for when Supabase connection is fixed)
  app.post('/api/admin/init-database', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { db } = await import('./db.js');
      
      if (!db) {
        return res.status(400).json({ message: "Database not connected. Please check DATABASE_URL." });
      }
      
      const { sql } = await import('drizzle-orm');
      const bcrypt = await import('bcryptjs');
      
      console.log('🚀 Initializing database schema...');
      
      // Create users table
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255) NOT NULL,
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          profile_image_url VARCHAR(500),
          is_admin BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
      
      // Create projects table
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          category TEXT NOT NULL,
          technologies TEXT[] NOT NULL,
          github_url TEXT,
          live_url TEXT,
          image TEXT NOT NULL,
          featured BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
      
      // Create blog_posts table
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          category TEXT NOT NULL,
          tags TEXT[] NOT NULL,
          image TEXT NOT NULL,
          read_time TEXT NOT NULL,
          published BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
      
      // Check if admin user exists
      const adminCheck = await db.execute(sql`SELECT id FROM users WHERE username = 'admin' LIMIT 1`);
      
      if (adminCheck.length === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await db.execute(sql`
          INSERT INTO users (username, email, password, first_name, last_name, is_admin)
          VALUES ('admin', 'admin@portfolio.dev', ${hashedPassword}, 'Admin', 'User', true)
        `);
      }
      
      console.log('✅ Database initialization completed');
      res.json({ message: "Database initialized successfully" });
      
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      res.status(500).json({ message: "Database initialization failed", error: error.message });
    }
  });

  // Supabase config endpoint for frontend
  app.get('/api/config/supabase', (req, res) => {
    res.json({
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
