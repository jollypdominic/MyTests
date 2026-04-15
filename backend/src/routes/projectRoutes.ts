import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectTeam,
} from '../controllers/projectController';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/auditLog';

const router = Router();

// All routes require authentication
router.use(authenticate as any);

// Get all projects
router.get('/', getProjects as any);

// Get project by ID
router.get('/:id', getProjectById as any);

// Get project team members
router.get('/:id/team', getProjectTeam as any);

// Create project (HR and Admin only)
router.post('/', authorize('ADMIN', 'HR'), auditLog('project'), createProject as any);

// Update project (HR, Admin, and project owners)
router.put('/:id', authorize('ADMIN', 'HR', 'MANAGER'), auditLog('project'), updateProject as any);

// Delete project (HR and Admin only)
router.delete('/:id', authorize('ADMIN', 'HR'), auditLog('project'), deleteProject as any);

export default router;

// Made with Bob
