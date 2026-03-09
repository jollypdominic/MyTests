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
router.use(authenticate);

// Get all allocations
router.get('/', getAllocations);

// Get allocation by ID
router.get('/:id', getAllocationById);

// Validate allocation (check if it would exceed 100%)
router.post('/validate', validateAllocationEndpoint);

// Check for allocation conflicts across all employees
router.get('/conflicts/check', authorize('ADMIN', 'HR', 'MANAGER'), checkAllocationConflicts);

// Create allocation (HR, Admin, and Managers)
router.post('/', authorize('ADMIN', 'HR', 'MANAGER'), auditLog('allocation'), createAllocation);

// Update allocation (HR, Admin, and Managers)
router.put('/:id', authorize('ADMIN', 'HR', 'MANAGER'), auditLog('allocation'), updateAllocation);

// Delete allocation (HR, Admin, and Managers)
router.delete('/:id', authorize('ADMIN', 'HR', 'MANAGER'), auditLog('allocation'), deleteAllocation);

export default router;

// Made with Bob
