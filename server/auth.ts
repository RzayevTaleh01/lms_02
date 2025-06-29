
import bcrypt from 'bcryptjs';
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

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
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
