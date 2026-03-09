import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api';
import { formatDate, formatPercentage, getAllocationStatusColor } from '@/lib/utils';
import type { Allocation } from '@/types';

export function AllocationList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['allocations', page],
    queryFn: () => api.getAllocations({ page, limit: 20 }),
  });

  const { data: conflicts } = useQuery({
    queryKey: ['allocation-conflicts'],
    queryFn: () => api.checkAllocationConflicts(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error loading allocations. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Allocations</h1>
        <Link
          to="/allocations/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Allocation
        </Link>
      </div>

      {conflicts && conflicts.total > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Allocation Conflicts Detected
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {conflicts.overAllocated} employees are over-allocated (over 100%)
                </p>
                <p>
                  {conflicts.underAllocated} employees are under-allocated (under 100%)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allocation %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Effective From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Effective To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data.map((allocation: Allocation) => (
              <tr key={allocation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {allocation.employee?.firstName} {allocation.employee?.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {allocation.employee?.employeeId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {allocation.project?.projectName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {allocation.project?.projectCode}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm font-semibold ${getAllocationStatusColor(
                      allocation.allocationPercentage
                    )}`}
                  >
                    {formatPercentage(allocation.allocationPercentage)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(allocation.effectiveFrom)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {allocation.effectiveTo ? formatDate(allocation.effectiveTo) : 'Ongoing'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      allocation.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {allocation.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/allocations/${allocation.id}/edit`}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.pagination.pages > 1 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {(page - 1) * 20 + 1} to{' '}
            {Math.min(page * 20, data.pagination.total)} of{' '}
            {data.pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === data.pagination.pages}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
