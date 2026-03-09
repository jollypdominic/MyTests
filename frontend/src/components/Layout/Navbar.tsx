import { Link, useNavigate } from 'react-router-dom';
import { Users, FolderKanban, PieChart, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

export function Navbar() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      await api.logout();
      clearAuth();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      clearAuth();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600">
                Headcount Management
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/employees"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <Users className="w-4 h-4 mr-2" />
                Employees
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <FolderKanban className="w-4 h-4 mr-2" />
                Projects
              </Link>
              <Link
                to="/allocations"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Allocations
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Made with Bob
