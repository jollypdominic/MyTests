import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth';
import prisma from '../config/database';

const router = Router();

/**
 * Login endpoint
 * In production, this would integrate with LDAP/SSO
 * For now, this is a simplified version for development
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }

    // TODO: Implement LDAP/SSO authentication
    // For now, find user by username
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        employee: user.employee,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * Logout endpoint
 */
router.post('/logout', authenticate, async (req, res) => {
  try {
    // In a production system, you might want to blacklist the token
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

/**
 * Get current user info
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.id },
      include: {
        employee: {
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
            email: true,
            department: true,
            location: true,
            jobTitle: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      employee: user.employee,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
});

/**
 * Refresh token endpoint
 */
router.post('/refresh', authenticate, async (req, res) => {
  try {
    const user = (req as any).user;

    // Generate new token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

export default router;

// Made with Bob
