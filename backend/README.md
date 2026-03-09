# Headcount Management System - Backend API

A comprehensive REST API for managing employee headcount, project allocations, and organizational data with role-based access control.

## Features

- **Employee Management**: CRUD operations for employee data with extended information
- **Project Management**: Track projects and their team compositions
- **Allocation Management**: Percentage-based allocation tracking with validation
- **Role-Based Access Control**: Admin, HR, Manager, and Employee roles
- **Audit Logging**: Complete change tracking for compliance
- **Multi-Geography Support**: Track employees across multiple locations
- **Authentication**: JWT-based authentication (SSO/LDAP ready)

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with passport.js
- **Caching**: Redis (optional)

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm or yarn

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Set up the database**:
```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view/edit data
npm run prisma:studio
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/headcount_db"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3001
NODE_ENV=development
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
# Build the application
npm run build

# Start the server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh access token

### Employees
- `GET /api/employees` - List employees (with filters)
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create employee (HR/Admin)
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Deactivate employee (HR/Admin)
- `GET /api/employees/:id/allocations` - Get employee allocations
- `GET /api/employees/:id/history` - Get employee change history

### Projects
- `GET /api/projects` - List projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project (HR/Admin)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Archive project (HR/Admin)
- `GET /api/projects/:id/team` - Get project team members

### Allocations
- `GET /api/allocations` - List allocations
- `GET /api/allocations/:id` - Get allocation details
- `POST /api/allocations` - Create allocation (HR/Admin/Manager)
- `PUT /api/allocations/:id` - Update allocation
- `DELETE /api/allocations/:id` - Remove allocation
- `POST /api/allocations/validate` - Validate allocation
- `GET /api/allocations/conflicts/check` - Check allocation conflicts

## Database Schema

### Core Tables
- **users**: User accounts with roles
- **employees**: Employee information
- **projects**: Project details
- **allocations**: Employee-project allocations with percentages
- **reports**: Saved report configurations
- **audit_logs**: Change tracking

### Relationships
- Users have one Employee profile
- Employees have a Manager (self-referential)
- Employees can own multiple Projects
- Employees have multiple Allocations
- Projects have multiple Allocations

## Role-Based Access Control

### Roles
- **ADMIN**: Full system access
- **HR**: Full access to employee and project data
- **MANAGER**: Access to their team's data
- **EMPLOYEE**: Access to their own data only

### Access Rules
- Admins and HR can view/edit all data
- Managers can view/edit their subordinates' data
- Employees can only view their own data
- Allocations can be managed by HR, Admin, and Managers

## Allocation Validation

The system ensures employees are not over-allocated:
- Total allocation must not exceed 100%
- Validates overlapping date ranges
- Provides real-time validation endpoint
- Conflict detection across all employees

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── server.ts        # Application entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── tests/               # Test files
└── package.json
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use async/await for asynchronous operations
- Implement proper error handling

### Database Migrations
```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy
```

### Adding New Endpoints
1. Create controller in `src/controllers/`
2. Define routes in `src/routes/`
3. Add middleware for authentication/authorization
4. Update this README with new endpoints

## Security Considerations

- All endpoints require authentication (except login)
- Role-based authorization on sensitive operations
- Input validation using express-validator
- SQL injection prevention via Prisma
- XSS protection via helmet
- CORS configuration
- Rate limiting (recommended for production)

## Deployment

### Using Docker
```bash
# Build image
docker build -t headcount-api .

# Run container
docker run -p 3001:3001 --env-file .env headcount-api
```

### Manual Deployment
1. Build the application: `npm run build`
2. Set environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Start the server: `npm start`

## Monitoring

- Health check endpoint: `GET /api/health`
- Logs are written to console (configure log aggregation in production)
- Audit logs stored in database

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL in .env
- Ensure PostgreSQL is running
- Check network connectivity

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration
- Ensure user is active in database

### TypeScript Errors
- Run `npm install` to ensure all dependencies are installed
- The TypeScript errors shown are expected until dependencies are installed
- Run `npm run prisma:generate` to generate Prisma client types

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please create an issue in the repository.