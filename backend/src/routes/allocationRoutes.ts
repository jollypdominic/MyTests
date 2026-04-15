import { Router } from 'express';
import {
  getAllocations,
  getAllocationById,
  createAllocation,
  updateAllocation,
  deleteAllocation,
  validateAllocationEndpoint,
  checkAllocationConflicts,
} from '../controllers/allocationController';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/auditLog';

const router = Router();

// All routes require authentication
router.use(authenticate as any);

// Get all allocations
router.get('/', getAllocations as any);

// Get allocation by ID
router.get('/:id', getAllocationById as any);

// Validate allocation (check if it would exceed 100%)
router.post('/validate', validateAllocationEndpoint as any);

// Check for allocation conflicts across all employees
router.get('/conflicts/check', authorize('ADMIN', 'HR', 'MANAGER') as any, checkAllocationConflicts as any);

// Create allocation (HR, Admin, and Managers)
router.post('/', authorize('ADMIN', 'HR', 'MANAGER') as any, auditLog('allocation') as any, createAllocation as any);

// Update allocation (HR, Admin, and Managers)
router.put('/:id', authorize('ADMIN', 'HR', 'MANAGER') as any, auditLog('allocation') as any, updateAllocation as any);

// Delete allocation (HR, Admin, and Managers)
router.delete('/:id', authorize('ADMIN', 'HR', 'MANAGER') as any, auditLog('allocation') as any, deleteAllocation as any);

export default router;

// Made with Bob
