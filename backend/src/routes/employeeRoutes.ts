import { Router } from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeAllocations,
  getEmployeeHistory,
} from '../controllers/employeeController';
import { authenticate, authorize, canAccessEmployee } from '../middleware/auth';
import { auditLog } from '../middleware/auditLog';

const router = Router();

// All routes require authentication
router.use(authenticate as any);

// Get all employees (with role-based filtering)
router.get('/', getEmployees as any);

// Get employee by ID (with access control)
router.get('/:id', canAccessEmployee as any, getEmployeeById as any);

// Get employee allocations
router.get('/:id/allocations', canAccessEmployee as any, getEmployeeAllocations as any);

// Get employee change history
router.get('/:id/history', canAccessEmployee as any, authorize('ADMIN', 'HR'), getEmployeeHistory as any);

// Create employee (HR and Admin only)
router.post('/', authorize('ADMIN', 'HR'), auditLog('employee'), createEmployee as any);

// Update employee (HR, Admin, and Managers for their team)
router.put('/:id', canAccessEmployee as any, auditLog('employee'), updateEmployee as any);

// Delete employee (HR and Admin only)
router.delete('/:id', authorize('ADMIN', 'HR'), auditLog('employee'), deleteEmployee as any);

export default router;

// Made with Bob
