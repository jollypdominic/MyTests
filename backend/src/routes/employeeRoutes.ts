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
router.use(authenticate);

// Get all employees (with role-based filtering)
router.get('/', getEmployees);

// Get employee by ID (with access control)
router.get('/:id', canAccessEmployee, getEmployeeById);

// Get employee allocations
router.get('/:id/allocations', canAccessEmployee, getEmployeeAllocations);

// Get employee change history
router.get('/:id/history', canAccessEmployee, authorize('ADMIN', 'HR'), getEmployeeHistory);

// Create employee (HR and Admin only)
router.post('/', authorize('ADMIN', 'HR'), auditLog('employee'), createEmployee);

// Update employee (HR, Admin, and Managers for their team)
router.put('/:id', canAccessEmployee, auditLog('employee'), updateEmployee);

// Delete employee (HR and Admin only)
router.delete('/:id', authorize('ADMIN', 'HR'), auditLog('employee'), deleteEmployee);

export default router;

// Made with Bob
