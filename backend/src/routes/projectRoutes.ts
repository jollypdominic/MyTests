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
router.use(authenticate);

// Get all projects
router.get('/', getProjects);

// Get project by ID
router.get('/:id', getProjectById);

// Get project team members
router.get('/:id/team', getProjectTeam);

// Create project (HR and Admin only)
router.post('/', authorize('ADMIN', 'HR'), auditLog('project'), createProject);

// Update project (HR, Admin, and project owners)
router.put('/:id', authorize('ADMIN', 'HR', 'MANAGER'), auditLog('project'), updateProject);

// Delete project (HR and Admin only)
router.delete('/:id', authorize('ADMIN', 'HR'), auditLog('project'), deleteProject);

export default router;

// Made with Bob
