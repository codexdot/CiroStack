import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import { storage } from "./storage";

const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET || "default-dev-secret";
const JWT_EXPIRES_IN = "7d";

export interface AuthUser {
  id: string | number;
  username: string;
  email: string | null;
  isAdmin: boolean;
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email,
      isAdmin: user.isAdmin 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export const authenticateToken: RequestHandler = async (req: any, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // For Supabase users (string ID), we don't need to check local storage
  // For local users (number ID), check storage
  if (typeof user.id === 'number') {
    const fullUser = await storage.getUser(user.id);
    if (!fullUser) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = fullUser;
  } else {
    // For Supabase users, use the token data directly
    req.user = user;
  }
  next();
};

export const requireAdmin: RequestHandler = (req: any, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};