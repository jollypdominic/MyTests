import { useQuery } from '@tanstack/react-query';
import { Users, FolderKanban, PieChart, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { data: employees } = useQuery({
    queryKey: ['employees', 1],
    queryFn: () => api.getEmployees({ page: 1, limit: 10 }),
  });

  const { data: projects } = useQuery({
    queryKey: ['projects', 1],
    queryFn: () => api.getProjects({ page: 1, limit: 10 }),
  });

  const { data: conflicts } = useQuery({
    queryKey: ['allocation-conflicts'],
    queryFn: () => api.checkAllocationConflicts(),
  });

  const stats = [
    {
      name: 'Total Employees',
      value: employees?.pagination.total || 0,
      icon: Users,
      color: 'bg-blue-500',
      link: '/employees',
    },
    {
      name: 'Active Projects',
      value: projects?.data.filter((p) => p.status === 'ACTIVE').length || 0,
      icon: FolderKanban,
      color: 'bg-green-500',
      link: '/projects',
    },
    {
      name: 'Total Allocations',
      value: employees?.pagination.total || 0,
      icon: PieChart,
      color: 'bg-purple-500',
      link: '/allocations',
    },
    {
      name: 'Allocation Conflicts',
      value: conflicts?.total || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
      link: '/allocations',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your headcount management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.link}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Allocation Conflicts */}
      {conflicts && conflicts.total > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">
              Allocation Conflicts
            </h2>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {conflicts.overAllocated} employees are over-allocated (>100%)
            </p>
            <p className="text-sm text-gray-600">
              {conflicts.underAllocated} employees are under-allocated (<100%)
            </p>
            <Link
              to="/allocations"
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View all conflicts →
            </Link>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Employees
          </h2>
          <div className="space-y-3">
            {employees?.data.slice(0, 5).map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {emp.firstName} {emp.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{emp.department}</p>
                </div>
                <Link
                  to={`/employees/${emp.id}`}
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Active Projects
          </h2>
          <div className="space-y-3">
            {projects?.data
              .filter((p) => p.status === 'ACTIVE')
              .slice(0, 5)
              .map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {project.projectName}
                    </p>
                    <p className="text-xs text-gray-500">{project.projectCode}</p>
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-sm text-primary-600 hover:text-primary-500"
                  >
                    View
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
