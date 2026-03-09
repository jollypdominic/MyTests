import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
    employeeId?: string;
  };
}

/**
 * Middleware to authenticate requests using JWT tokens
 */
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        role: true,
        employeeId: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    res.status(500).json({ error: 'Authentication failed' });
  }
};

/**
 * Middleware to authorize requests based on user roles
 * @param roles - Array of allowed roles
 */
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        error: 'Insufficient permissions',
        required: roles,
        current: req.user.role
      });
      return;
    }

    next();
  };
};

/**
 * Middleware to check if user can access employee data
 * Admins and HR can access all, Managers can access their team, Employees can access their own
 */
export const canAccessEmployee = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // Admin and HR have full access
    if (user.role === 'ADMIN' || user.role === 'HR') {
      next();
      return;
    }

    // Employees can only access their own data
    if (user.role === 'EMPLOYEE') {
      if (id !== user.employeeId) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }
      next();
      return;
    }

    // Managers can access their subordinates
    if (user.role === 'MANAGER') {
      const employee = await prisma.employee.findUnique({
        where: { id },
        select: { managerId: true },
      });

      if (!employee || employee.managerId !== user.employeeId) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }
      next();
      return;
    }

    res.status(403).json({ error: 'Access denied' });
  } catch (error) {
    res.status(500).json({ error: 'Authorization check failed' });
  }
};

// Made with Bob
