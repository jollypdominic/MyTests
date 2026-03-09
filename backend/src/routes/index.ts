import { Router } from 'express';
import employeeRoutes from './employeeRoutes';
import projectRoutes from './projectRoutes';
import allocationRoutes from './allocationRoutes';
import authRoutes from './authRoutes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
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
