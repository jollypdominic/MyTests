import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout/Layout';
import { EmployeeList } from './pages/Employees/EmployeeList';
import { ProjectList } from './pages/Projects/ProjectList';
import { AllocationList } from './pages/Allocations/AllocationList';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Auth/Login';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="allocations" element={<AllocationList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

// Made with Bob
