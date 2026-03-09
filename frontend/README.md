# Headcount Management System - Frontend

A modern React-based frontend application for managing employee headcount, project allocations, and resource planning.

## Features

- **Employee Management**: View, create, edit, and manage employee records
- **Project Management**: Track projects with status, timelines, and client information
- **Allocation Management**: Manage employee-project allocations with percentage tracking
- **Conflict Detection**: Automatically detect over-allocation and under-allocation issues
- **Dashboard**: Overview of key metrics and recent activities
- **Authentication**: Secure login system with JWT tokens

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:5000`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   └── Layout/      # Layout components (Navbar, Layout)
│   ├── lib/            # Utilities and configurations
│   │   ├── api.ts      # API client
│   │   └── utils.ts    # Helper functions
│   ├── pages/          # Page components
│   │   ├── Auth/       # Authentication pages
│   │   ├── Dashboard/  # Dashboard page
│   │   ├── Employees/  # Employee management pages
│   │   ├── Projects/   # Project management pages
│   │   └── Allocations/ # Allocation management pages
│   ├── store/          # State management
│   │   └── authStore.ts # Authentication state
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts    # Shared types
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config
└── tailwind.config.js  # Tailwind config
```

## Key Features

### Employee Management
- List all employees with filtering by department and status
- Search employees by name or ID
- View detailed employee information
- Create and edit employee records
- Track employment status and allocations

### Project Management
- List all projects with status filtering
- Search projects by name or code
- View project details and allocations
- Create and edit project records
- Track project timelines and status

### Allocation Management
- View all employee-project allocations
- Create new allocations with validation
- Edit existing allocations
- Automatic conflict detection
- Prevent over-allocation (>100%)
- Track allocation periods

### Dashboard
- Overview of key metrics
- Quick access to recent employees and projects
- Allocation conflict alerts
- Visual statistics

## API Integration

The frontend communicates with the backend API using Axios. All API calls are centralized in `src/lib/api.ts`.

### Authentication
- JWT tokens are stored in localStorage
- Automatic token injection in API requests
- Automatic redirect to login on 401 errors

### Error Handling
- Global error interceptor
- User-friendly error messages
- Loading states for async operations

## State Management

### Server State (TanStack Query)
- Caching and synchronization of server data
- Automatic refetching and invalidation
- Optimistic updates

### Client State (Zustand)
- Authentication state
- User preferences
- Persisted to localStorage

## Styling

The application uses Tailwind CSS for styling with a custom color palette:

- Primary: Blue shades for main actions
- Status colors: Green (active), Yellow (warning), Red (error)
- Responsive design with mobile-first approach

## TypeScript

The project is fully typed with TypeScript:
- Strict mode enabled
- Type definitions for all API responses
- Shared types in `src/types/index.ts`

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Keep components small and focused

### File Naming
- Components: PascalCase (e.g., `EmployeeList.tsx`)
- Utilities: camelCase (e.g., `api.ts`)
- Types: PascalCase for interfaces (e.g., `Employee`)

### Component Structure
```tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function ComponentName() {
  // Hooks
  const [state, setState] = useState();
  const { data } = useQuery(...);

  // Handlers
  const handleAction = () => {};

  // Render
  return <div>...</div>;
}
```

## Troubleshooting

### TypeScript Errors
All TypeScript errors shown are due to missing `node_modules`. Run `npm install` to resolve.

### API Connection Issues
- Ensure backend is running on `http://localhost:5000`
- Check CORS configuration in backend
- Verify API_URL in `.env` file

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## License

MIT