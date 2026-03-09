import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  Employee,
  Project,
  Allocation,
  PaginatedResponse,
  AllocationValidation,
  AllocationConflict,
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Employee endpoints
  async getEmployees(params?: {
    department?: string;
    employmentStatus?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Employee>> {
    const { data } = await this.client.get('/employees', { params });
    return data;
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const { data } = await this.client.get(`/employees/${id}`);
    return data;
  }

  async createEmployee(employee: Partial<Employee>): Promise<Employee> {
    const { data } = await this.client.post('/employees', employee);
    return data;
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    const { data } = await this.client.put(`/employees/${id}`, employee);
    return data;
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.client.delete(`/employees/${id}`);
  }

  async getEmployeeAllocations(id: string): Promise<Allocation[]> {
    const { data } = await this.client.get(`/employees/${id}/allocations`);
    return data;
  }

  // Project endpoints
  async getProjects(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Project>> {
    const { data } = await this.client.get('/projects', { params });
    return data;
  }

  async getProjectById(id: string): Promise<Project> {
    const { data } = await this.client.get(`/projects/${id}`);
    return data;
  }

  async createProject(project: Partial<Project>): Promise<Project> {
    const { data } = await this.client.post('/projects', project);
    return data;
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const { data } = await this.client.put(`/projects/${id}`, project);
    return data;
  }

  async deleteProject(id: string): Promise<void> {
    await this.client.delete(`/projects/${id}`);
  }

  async getProjectAllocations(id: string): Promise<Allocation[]> {
    const { data } = await this.client.get(`/projects/${id}/allocations`);
    return data;
  }

  // Allocation endpoints
  async getAllocations(params?: {
    employeeId?: string;
    projectId?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Allocation>> {
    const { data } = await this.client.get('/allocations', { params });
    return data;
  }

  async getAllocationById(id: string): Promise<Allocation> {
    const { data } = await this.client.get(`/allocations/${id}`);
    return data;
  }

  async createAllocation(allocation: {
    employeeId: string;
    projectId: string;
    allocationPercentage: number;
    effectiveFrom: string;
    effectiveTo?: string;
  }): Promise<Allocation> {
    const { data } = await this.client.post('/allocations', allocation);
    return data;
  }

  async updateAllocation(
    id: string,
    allocation: Partial<Allocation>
  ): Promise<Allocation> {
    const { data } = await this.client.put(`/allocations/${id}`, allocation);
    return data;
  }

  async deleteAllocation(id: string): Promise<void> {
    await this.client.delete(`/allocations/${id}`);
  }

  async validateAllocation(params: {
    employeeId: string;
    allocationPercentage: number;
    effectiveFrom: string;
    effectiveTo?: string;
    excludeAllocationId?: string;
  }): Promise<AllocationValidation> {
    const { data } = await this.client.post('/allocations/validate', params);
    return data;
  }

  async checkAllocationConflicts(): Promise<{
    total: number;
    overAllocated: number;
    underAllocated: number;
    conflicts: AllocationConflict[];
  }> {
    const { data } = await this.client.get('/allocations/conflicts');
    return data;
  }

  // Auth endpoints
  async login(credentials: { username: string; password: string }): Promise<{
    token: string;
    user: any;
  }> {
    const { data } = await this.client.post('/auth/login', credentials);
    return data;
  }

  async logout(): Promise<void> {
    await this.client.post('/auth/logout');
    localStorage.removeItem('token');
  }
}

export const api = new ApiClient();

// Made with Bob
