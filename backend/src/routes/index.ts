import { Router } from 'express';
import employeeRoutes from './employeeRoutes.js';
import projectRoutes from './projectRoutes.js';
import allocationRoutes from './allocationRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Headcount Management API'
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/projects', projectRoutes);
router.use('/allocations', allocationRoutes);

export default router;

// Made with Bob
