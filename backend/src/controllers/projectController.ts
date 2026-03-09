import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { Prisma } from '@prisma/client';

/**
 * Get all projects with filtering and pagination
 */
export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      status, 
      location, 
      search, 
      page = '1', 
      limit = '20' 
    } = req.query;
    
    const where: Prisma.ProjectWhereInput = {};
    
    // Apply filters
    if (status) where.status = status as any;
    if (location) where.location = location as string;
    
    // Search across multiple fields
    if (search) {
      where.OR = [
        { projectName: { contains: search as string, mode: 'insensitive' } },
        { projectCode: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          owner: {
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
              employee: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  employeeId: true,
                },
              },
            },
          },
        },
        orderBy: { projectName: 'asc' },
      }),
      prisma.project.count({ where }),
    ]);

    res.json({
      data: projects,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

/**
 * Get project by ID
 */
export const getProjectById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
            email: true,
          },
        },
        allocations: {
          include: {
            employee: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                employeeId: true,
                jobTitle: true,
                department: true,
              },
            },
          },
          orderBy: { effectiveFrom: 'desc' },
        },
      },
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    // Calculate total allocation
    const activeAllocations = project.allocations.filter(a => a.isActive);
    const totalAllocation = activeAllocations.reduce(
      (sum, a) => sum + Number(a.allocationPercentage),
      0
    );

    res.json({
      ...project,
      summary: {
        totalTeamMembers: activeAllocations.length,
        totalAllocation,
      },
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

/**
 * Create new project
 */
export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      projectCode,
      projectName,
      description,
      startDate,
      endDate,
      status,
      location,
      ownerId,
    } = req.body;

    // Check if project code already exists
    const existing = await prisma.project.findUnique({
      where: { projectCode },
    });

    if (existing) {
      res.status(400).json({ error: 'Project code already exists' });
      return;
    }

    const project = await prisma.project.create({
      data: {
        projectCode,
        projectName,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status: status || 'ACTIVE',
        location,
        ownerId,
      },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
          },
        },
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

/**
 * Update project
 */
export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Convert dates if provided
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        allocations: {
          where: { isActive: true },
          include: {
            employee: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                employeeId: true,
              },
            },
          },
        },
      },
    });

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    if ((error as any).code === 'P2025') {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to update project' });
  }
};

/**
 * Delete (archive) project
 */
export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Soft delete by setting status to CANCELLED
    const project = await prisma.project.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    res.json({ message: 'Project archived successfully', project });
  } catch (error) {
    console.error('Error deleting project:', error);
    if ((error as any).code === 'P2025') {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

/**
 * Get project team members
 */
export const getProjectTeam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const allocations = await prisma.allocation.findMany({
      where: { 
        projectId: id,
        isActive: true,
      },
      include: {
        employee: {
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
            email: true,
            jobTitle: true,
            department: true,
            location: true,
          },
        },
      },
      orderBy: { allocationPercentage: 'desc' },
    });

    const totalAllocation = allocations.reduce(
      (sum, a) => sum + Number(a.allocationPercentage),
      0
    );

    res.json({
      team: allocations,
      summary: {
        totalMembers: allocations.length,
        totalAllocation,
      },
    });
  } catch (error) {
    console.error('Error fetching project team:', error);
    res.status(500).json({ error: 'Failed to fetch project team' });
  }
};

// Made with Bob
