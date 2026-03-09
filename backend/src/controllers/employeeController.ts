import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { Prisma } from '@prisma/client';

/**
 * Get all employees with filtering and pagination
 */
export const getEmployees = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      department, 
      location, 
      status, 
      search, 
      page = '1', 
      limit = '20' 
    } = req.query;
    
    const where: Prisma.EmployeeWhereInput = {};
    
    // Apply filters
    if (department) where.department = department as string;
    if (location) where.location = location as string;
    if (status) where.employmentStatus = status as any;
    
    // Search across multiple fields
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { employeeId: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Apply role-based filtering
    if (req.user?.role === 'MANAGER') {
      where.managerId = req.user.employeeId || undefined;
    } else if (req.user?.role === 'EMPLOYEE') {
      where.id = req.user.employeeId || undefined;
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              employeeId: true,
            },
          },
          allocations: {
            where: { isActive: true },
            include: {
              project: {
                select: {
                  id: true,
                  projectName: true,
                  projectCode: true,
                },
              },
            },
          },
        },
        orderBy: { lastName: 'asc' },
      }),
      prisma.employee.count({ where }),
    ]);

    res.json({
      data: employees,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

/**
 * Get employee by ID
 */
export const getEmployeeById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
            email: true,
          },
        },
        subordinates: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
            jobTitle: true,
          },
        },
        allocations: {
          include: {
            project: true,
          },
          orderBy: { effectiveFrom: 'desc' },
        },
      },
    });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

/**
 * Create new employee
 */
export const createEmployee = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      department,
      location,
      managerId,
      jobTitle,
      costCenter,
      salaryBand,
      performanceRating,
      joinDate,
      employmentStatus,
      skills,
      certifications,
    } = req.body;

    // Check if employee ID already exists
    const existing = await prisma.employee.findUnique({
      where: { employeeId },
    });

    if (existing) {
      res.status(400).json({ error: 'Employee ID already exists' });
      return;
    }

    const employee = await prisma.employee.create({
      data: {
        employeeId,
        firstName,
        lastName,
        email,
        department,
        location,
        managerId,
        jobTitle,
        costCenter,
        salaryBand,
        performanceRating,
        joinDate: new Date(joinDate),
        employmentStatus: employmentStatus || 'ACTIVE',
        skills,
        certifications,
      },
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

/**
 * Update employee
 */
export const updateEmployee = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Convert joinDate to Date if provided
    if (updateData.joinDate) {
      updateData.joinDate = new Date(updateData.joinDate);
    }

    const employee = await prisma.employee.update({
      where: { id },
      data: updateData,
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        allocations: {
          where: { isActive: true },
          include: {
            project: {
              select: {
                id: true,
                projectName: true,
                projectCode: true,
              },
            },
          },
        },
      },
    });

    res.json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    if ((error as any).code === 'P2025') {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

/**
 * Delete (deactivate) employee
 */
export const deleteEmployee = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Soft delete by setting status to INACTIVE
    const employee = await prisma.employee.update({
      where: { id },
      data: { employmentStatus: 'INACTIVE' },
    });

    res.json({ message: 'Employee deactivated successfully', employee });
  } catch (error) {
    console.error('Error deleting employee:', error);
    if ((error as any).code === 'P2025') {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

/**
 * Get employee allocations
 */
export const getEmployeeAllocations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const allocations = await prisma.allocation.findMany({
      where: { employeeId: id },
      include: {
        project: true,
      },
      orderBy: { effectiveFrom: 'desc' },
    });

    // Calculate total allocation percentage
    const activeAllocations = allocations.filter(a => a.isActive);
    const totalAllocation = activeAllocations.reduce(
      (sum, a) => sum + Number(a.allocationPercentage),
      0
    );

    res.json({
      allocations,
      summary: {
        total: allocations.length,
        active: activeAllocations.length,
        totalAllocation,
        isFullyAllocated: totalAllocation === 100,
        isOverAllocated: totalAllocation > 100,
        isUnderAllocated: totalAllocation < 100,
      },
    });
  } catch (error) {
    console.error('Error fetching employee allocations:', error);
    res.status(500).json({ error: 'Failed to fetch employee allocations' });
  }
};

/**
 * Get employee change history
 */
export const getEmployeeHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const history = await prisma.auditLog.findMany({
      where: {
        entityType: 'employee',
        entityId: id,
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    res.json(history);
  } catch (error) {
    console.error('Error fetching employee history:', error);
    res.status(500).json({ error: 'Failed to fetch employee history' });
  }
};

// Made with Bob
