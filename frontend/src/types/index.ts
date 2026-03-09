export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
  dateOfJoining: string;
  employmentStatus: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
  location: string;
  reportingManager?: string;
  skills?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  projectCode: string;
  projectName: string;
  description?: string;
  clientName?: string;
  startDate: string;
  endDate?: string;
  status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  projectManager?: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Allocation {
  id: string;
  employeeId: string;
  projectId: string;
  allocationPercentage: number;
  effectiveFrom: string;
  effectiveTo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  employee?: {
    id: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    department: string;
  };
  project?: {
    id: string;
    projectCode: string;
    projectName: string;
    status: string;
  };
}

export interface AllocationValidation {
  isValid: boolean;
  currentTotal: number;
  newTotal: number;
  availablePercentage: number;
}

export interface AllocationConflict {
  employee: {
    id: string;
    employeeId: string;
    name: string;
  };
  totalAllocation: number;
  allocations: Allocation[];
  isOverAllocated: boolean;
  isUnderAllocated: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  error: string;
  details?: any;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Made with Bob
