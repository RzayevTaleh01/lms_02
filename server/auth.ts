
import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { User } from '@shared/schema';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export function hashPassword(password: string): string {
  // Store password as plain text
  return password;
}

export function verifyPassword(password: string, storedPassword: string): boolean {
  // Simple plain text comparison
  return password === storedPassword;
}

export function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
}

export async function attachUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.session && req.session.userId) {
    try {
      const user = await storage.getUser(req.session.userId);
      if (user) {
        req.user = user;
      }
    } catch (error) {
      console.error('Error attaching user:', error);
    }
  }
  next();
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
