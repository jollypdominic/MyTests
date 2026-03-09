import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { Prisma } from '@prisma/client';

/**
 * Get all allocations with filtering
 */
export const getAllocations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      employeeId, 
      projectId, 
      isActive,
      page = '1', 
      limit = '50' 
    } = req.query;
    
    const where: Prisma.AllocationWhereInput = {};
    
    if (employeeId) where.employeeId = employeeId as string;
    if (projectId) where.projectId = projectId as string;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const [allocations, total] = await Promise.all([
      prisma.allocation.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          employee: {
            select: {
              id: true,
              employeeId: true,
              firstName: true,
              lastName: true,
              department: true,
            },
          },
          project: {
            select: {
              id: true,
              projectCode: true,
              projectName: true,
              status: true,
            },
          },
        },
        orderBy: { effectiveFrom: 'desc' },
      }),
      prisma.allocation.count({ where }),
    ]);

    res.json({
      data: allocations,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching allocations:', error);
    res.status(500).json({ error: 'Failed to fetch allocations' });
  }
};

/**
 * Get allocation by ID
 */
export const getAllocationById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const allocation = await prisma.allocation.findUnique({
      where: { id },
      include: {
        employee: true,
        project: true,
      },
    });

    if (!allocation) {
      res.status(404).json({ error: 'Allocation not found' });
      return;
    }

    res.json(allocation);
  } catch (error) {
    console.error('Error fetching allocation:', error);
    res.status(500).json({ error: 'Failed to fetch allocation' });
  }
};

/**
 * Create new allocation
 */
export const createAllocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      employeeId,
      projectId,
      allocationPercentage,
      effectiveFrom,
      effectiveTo,
    } = req.body;

    // Validate allocation percentage
    if (allocationPercentage <= 0 || allocationPercentage > 100) {
      res.status(400).json({ 
        error: 'Allocation percentage must be between 0 and 100' 
      });
      return;
    }

    // Check if this would cause over-allocation
    const validation = await validateAllocation(
      employeeId,
      allocationPercentage,
      effectiveFrom,
      effectiveTo
    );

    if (!validation.isValid) {
      res.status(400).json({ 
        error: 'Allocation would exceed 100%',
        details: validation,
      });
      return;
    }

    const allocation = await prisma.allocation.create({
      data: {
        employeeId,
        projectId,
        allocationPercentage,
        effectiveFrom: new Date(effectiveFrom),
        effectiveTo: effectiveTo ? new Date(effectiveTo) : null,
        isActive: true,
        createdBy: req.user!.id,
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
          },
        },
        project: {
          select: {
            id: true,
            projectCode: true,
            projectName: true,
          },
        },
      },
    });

    res.status(201).json(allocation);
  } catch (error) {
    console.error('Error creating allocation:', error);
    res.status(500).json({ error: 'Failed to create allocation' });
  }
};

/**
 * Update allocation
 */
export const updateAllocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.createdBy;

    // Validate allocation percentage if being updated
    if (updateData.allocationPercentage) {
      if (updateData.allocationPercentage <= 0 || updateData.allocationPercentage > 100) {
        res.status(400).json({ 
          error: 'Allocation percentage must be between 0 and 100' 
        });
        return;
      }

      // Get current allocation to check employee
      const current = await prisma.allocation.findUnique({
        where: { id },
      });

      if (!current) {
        res.status(404).json({ error: 'Allocation not found' });
        return;
      }

      // Validate new allocation wouldn't cause over-allocation
      const validation = await validateAllocation(
        current.employeeId,
        updateData.allocationPercentage,
        updateData.effectiveFrom || current.effectiveFrom,
        updateData.effectiveTo || current.effectiveTo,
        id // Exclude current allocation from validation
      );

      if (!validation.isValid) {
        res.status(400).json({ 
          error: 'Allocation would exceed 100%',
          details: validation,
        });
        return;
      }
    }

    // Convert dates if provided
    if (updateData.effectiveFrom) {
      updateData.effectiveFrom = new Date(updateData.effectiveFrom);
    }
    if (updateData.effectiveTo) {
      updateData.effectiveTo = new Date(updateData.effectiveTo);
    }

    const allocation = await prisma.allocation.update({
      where: { id },
      data: updateData,
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
          },
        },
        project: {
          select: {
            id: true,
            projectCode: true,
            projectName: true,
          },
        },
      },
    });

    res.json(allocation);
  } catch (error) {
    console.error('Error updating allocation:', error);
    if ((error as any).code === 'P2025') {
      res.status(404).json({ error: 'Allocation not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to update allocation' });
  }
};

/**
 * Delete allocation
 */
export const deleteAllocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Soft delete by setting isActive to false
    const allocation = await prisma.allocation.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({ message: 'Allocation removed successfully', allocation });
  } catch (error) {
    console.error('Error deleting allocation:', error);
    if ((error as any).code === 'P2025') {
      res.status(404).json({ error: 'Allocation not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to delete allocation' });
  }
};

/**
 * Validate allocation to ensure employee doesn't exceed 100%
 */
export const validateAllocationEndpoint = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      employeeId,
      allocationPercentage,
      effectiveFrom,
      effectiveTo,
      excludeAllocationId,
    } = req.body;

    const validation = await validateAllocation(
      employeeId,
      allocationPercentage,
      effectiveFrom,
      effectiveTo,
      excludeAllocationId
    );

    res.json(validation);
  } catch (error) {
    console.error('Error validating allocation:', error);
    res.status(500).json({ error: 'Failed to validate allocation' });
  }
};

/**
 * Check for allocation conflicts
 */
export const checkAllocationConflicts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Find all employees with over-allocation
    const employees = await prisma.employee.findMany({
      where: {
        employmentStatus: 'ACTIVE',
      },
      include: {
        allocations: {
          where: { isActive: true },
          include: {
            project: {
              select: {
                projectCode: true,
                projectName: true,
              },
            },
          },
        },
      },
    });

    const conflicts = employees
      .map(employee => {
        const totalAllocation = employee.allocations.reduce(
          (sum, a) => sum + Number(a.allocationPercentage),
          0
        );

        return {
          employee: {
            id: employee.id,
            employeeId: employee.employeeId,
            name: `${employee.firstName} ${employee.lastName}`,
          },
          totalAllocation,
          allocations: employee.allocations,
          isOverAllocated: totalAllocation > 100,
          isUnderAllocated: totalAllocation < 100,
        };
      })
      .filter(e => e.isOverAllocated || e.isUnderAllocated);

    res.json({
      total: conflicts.length,
      overAllocated: conflicts.filter(c => c.isOverAllocated).length,
      underAllocated: conflicts.filter(c => c.isUnderAllocated).length,
      conflicts,
    });
  } catch (error) {
    console.error('Error checking allocation conflicts:', error);
    res.status(500).json({ error: 'Failed to check allocation conflicts' });
  }
};

/**
 * Helper function to validate allocation
 */
async function validateAllocation(
  employeeId: string,
  newAllocationPercentage: number,
  effectiveFrom: Date | string,
  effectiveTo: Date | string | null,
  excludeAllocationId?: string
): Promise<{
  isValid: boolean;
  currentTotal: number;
  newTotal: number;
  availablePercentage: number;
}> {
  const fromDate = new Date(effectiveFrom);
  const toDate = effectiveTo ? new Date(effectiveTo) : null;

  // Get all active allocations for this employee
  const allocations = await prisma.allocation.findMany({
    where: {
      employeeId,
      isActive: true,
      id: excludeAllocationId ? { not: excludeAllocationId } : undefined,
    },
  });

  // Filter allocations that overlap with the new allocation period
  const overlappingAllocations = allocations.filter(a => {
    const aFrom = new Date(a.effectiveFrom);
    const aTo = a.effectiveTo ? new Date(a.effectiveTo) : null;

    // Check if date ranges overlap
    if (!toDate && !aTo) return true; // Both are open-ended
    if (!toDate) return !aTo || aTo >= fromDate; // New is open-ended
    if (!aTo) return aFrom <= toDate; // Existing is open-ended
    return aFrom <= toDate && aTo >= fromDate; // Both have end dates
  });

  const currentTotal = overlappingAllocations.reduce(
    (sum, a) => sum + Number(a.allocationPercentage),
    0
  );

  const newTotal = currentTotal + newAllocationPercentage;

  return {
    isValid: newTotal <= 100,
    currentTotal,
    newTotal,
    availablePercentage: 100 - currentTotal,
  };
}

// Made with Bob
