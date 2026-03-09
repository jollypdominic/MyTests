# Headcount Management System - Implementation Guide

## Quick Start Summary

This guide provides step-by-step instructions for implementing the headcount management system based on the architecture defined in [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Prerequisites

### Required Software
- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Redis 6+
- Git
- Docker (optional, for containerization)
- VS Code or preferred IDE

### Required Access
- LDAP/Active Directory credentials for SSO integration
- Cloud provider account (AWS/Azure/GCP) for deployment
- Email service credentials (for report scheduling)

## Project Structure

```
headcount-management/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── store/           # State management
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── App.tsx          # Main application component
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── config/          # Configuration files
│   │   ├── utils/           # Utility functions
│   │   └── server.ts        # Application entry point
│   ├── prisma/              # Database schema and migrations
│   │   └── schema.prisma
│   ├── tests/               # Test files
│   └── package.json
│
├── docs/                     # Documentation
│   ├── api/                 # API documentation
│   └── user-guide/          # User documentation
│
├── docker/                   # Docker configuration
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
├── .github/                  # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
└── README.md
```

## Phase 1: Foundation Setup (Weeks 1-3)

### Step 1: Initialize Project Structure

```bash
# Create project directory
mkdir headcount-management
cd headcount-management

# Initialize Git repository
git init

# Create frontend application
npx create-react-app frontend --template typescript
cd frontend
npm install @mui/material @emotion/react @emotion/styled
npm install react-router-dom react-query axios
npm install @reduxjs/toolkit react-redux
cd ..

# Create backend application
mkdir backend
cd backend
npm init -y
npm install express typescript ts-node @types/node @types/express
npm install prisma @prisma/client
npm install passport passport-ldapauth passport-saml
npm install jsonwebtoken bcrypt
npm install express-validator
npm install dotenv cors helmet
npm install --save-dev jest @types/jest ts-jest
npm install --save-dev nodemon
cd ..
```

### Step 2: Configure TypeScript

**Backend tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 3: Set Up Database Schema

**backend/prisma/schema.prisma:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String    @id @default(uuid())
  username    String    @unique
  email       String    @unique
  role        Role
  employeeId  String?   @unique @map("employee_id")
  employee    Employee? @relation(fields: [employeeId], references: [id])
  isActive    Boolean   @default(true) @map("is_active")
  lastLogin   DateTime? @map("last_login")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  reports     Report[]
  auditLogs   AuditLog[]

  @@map("users")
}

model Employee {
  id                String            @id @default(uuid())
  employeeId        String            @unique @map("employee_id")
  firstName         String            @map("first_name")
  lastName          String            @map("last_name")
  email             String            @unique
  department        String
  location          String
  managerId         String?           @map("manager_id")
  manager           Employee?         @relation("ManagerSubordinates", fields: [managerId], references: [id])
  subordinates      Employee[]        @relation("ManagerSubordinates")
  jobTitle          String            @map("job_title")
  costCenter        String            @map("cost_center")
  salaryBand        String            @map("salary_band")
  performanceRating String?           @map("performance_rating")
  joinDate          DateTime          @map("join_date")
  employmentStatus  EmploymentStatus  @map("employment_status")
  skills            Json?
  certifications    Json?
  createdAt         DateTime          @default(now()) @map("created_at")
  updatedAt         DateTime          @updatedAt @map("updated_at")
  
  user              User?
  allocations       Allocation[]
  ownedProjects     Project[]

  @@map("employees")
}

model Project {
  id          String        @id @default(uuid())
  projectCode String        @unique @map("project_code")
  projectName String        @map("project_name")
  description String?
  startDate   DateTime      @map("start_date")
  endDate     DateTime?     @map("end_date")
  status      ProjectStatus
  location    String
  ownerId     String        @map("owner_id")
  owner       Employee      @relation(fields: [ownerId], references: [id])
  createdAt   DateTime      @default(now()) @map("created_at")
  updatedAt   DateTime      @updatedAt @map("updated_at")
  
  allocations Allocation[]

  @@map("projects")
}

model Allocation {
  id                    String   @id @default(uuid())
  employeeId            String   @map("employee_id")
  employee              Employee @relation(fields: [employeeId], references: [id])
  projectId             String   @map("project_id")
  project               Project  @relation(fields: [projectId], references: [id])
  allocationPercentage  Decimal  @map("allocation_percentage") @db.Decimal(5, 2)
  effectiveFrom         DateTime @map("effective_from")
  effectiveTo           DateTime? @map("effective_to")
  isActive              Boolean  @default(true) @map("is_active")
  createdBy             String   @map("created_by")
  createdAt             DateTime @default(now()) @map("created_at")
  updatedAt             DateTime @updatedAt @map("updated_at")

  @@map("allocations")
}

model Report {
  id            String   @id @default(uuid())
  reportName    String   @map("report_name")
  reportType    String   @map("report_type")
  configuration Json
  schedule      Json?
  createdBy     String   @map("created_by")
  creator       User     @relation(fields: [createdBy], references: [id])
  isActive      Boolean  @default(true) @map("is_active")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  @@map("reports")
}

model AuditLog {
  id         String   @id @default(uuid())
  userId     String   @map("user_id")
  user       User     @relation(fields: [userId], references: [id])
  action     String
  entityType String   @map("entity_type")
  entityId   String   @map("entity_id")
  oldValues  Json?    @map("old_values")
  newValues  Json?    @map("new_values")
  ipAddress  String?  @map("ip_address")
  timestamp  DateTime @default(now())

  @@map("audit_logs")
}

enum Role {
  ADMIN
  HR
  MANAGER
  EMPLOYEE
}

enum EmploymentStatus {
  ACTIVE
  INACTIVE
  ON_LEAVE
}

enum ProjectStatus {
  ACTIVE
  COMPLETED
  ON_HOLD
  CANCELLED
}
```

### Step 4: Initialize Database

```bash
cd backend

# Create .env file
cat > .env << EOF
DATABASE_URL="postgresql://username:password@localhost:5432/headcount_db"
JWT_SECRET="your-secret-key-change-in-production"
LDAP_URL="ldap://your-ldap-server:389"
LDAP_BIND_DN="cn=admin,dc=example,dc=com"
LDAP_BIND_PASSWORD="admin-password"
REDIS_URL="redis://localhost:6379"
PORT=3001
EOF

# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev --name init
```

### Step 5: Create Backend Core Structure

**backend/src/server.ts:**
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes will be added here

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
```

### Step 6: Set Up Authentication Middleware

**backend/src/middleware/auth.ts:**
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
    employeeId?: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        role: true,
        employeeId: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};
```

## Phase 2: Core Features Implementation (Weeks 4-6)

### Step 7: Implement Employee API

**backend/src/controllers/employeeController.ts:**
```typescript
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getEmployees = async (req: AuthRequest, res: Response) => {
  try {
    const { department, location, status, search, page = 1, limit = 20 } = req.query;
    
    const where: any = {};
    
    if (department) where.department = department;
    if (location) where.location = location;
    if (status) where.employmentStatus = status;
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { employeeId: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Apply role-based filtering
    if (req.user?.role === 'MANAGER') {
      where.managerId = req.user.employeeId;
    } else if (req.user?.role === 'EMPLOYEE') {
      where.id = req.user.employeeId;
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          allocations: {
            where: { isActive: true },
            include: {
              project: {
                select: {
                  id: true,
                  projectName: true,
                  projectCode: true,
                },
              },
            },
          },
        },
        orderBy: { lastName: 'asc' },
      }),
      prisma.employee.count({ where }),
    ]);

    res.json({
      data: employees,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

export const getEmployeeById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        manager: true,
        subordinates: true,
        allocations: {
          include: {
            project: true,
          },
          orderBy: { effectiveFrom: 'desc' },
        },
      },
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Check access permissions
    if (req.user?.role === 'EMPLOYEE' && employee.id !== req.user.employeeId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

// Additional CRUD operations would follow similar patterns
```

### Step 8: Create Frontend Components

**frontend/src/components/EmployeeList.tsx:**
```typescript
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { useQuery } from 'react-query';
import { employeeService } from '../services/employeeService';

export const EmployeeList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['employees', { search, page }],
    () => employeeService.getEmployees({ search, page }),
    { keepPreviousData: true }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />
        <Button variant="contained">Add Employee</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((employee: any) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.location}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.employmentStatus}
                    color={employee.employmentStatus === 'ACTIVE' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
```

## Key Implementation Notes

### Security Best Practices
1. Always validate and sanitize user input
2. Use parameterized queries (Prisma handles this)
3. Implement rate limiting on API endpoints
4. Store sensitive data encrypted
5. Use HTTPS in production
6. Implement CSRF protection
7. Regular security audits

### Performance Optimization
1. Implement database indexing on frequently queried fields
2. Use Redis caching for frequently accessed data
3. Implement pagination for large datasets
4. Use database connection pooling
5. Optimize N+1 queries with proper includes
6. Implement lazy loading for large lists

### Testing Strategy
1. Unit tests for business logic
2. Integration tests for API endpoints
3. E2E tests for critical user flows
4. Load testing for performance validation
5. Security testing for vulnerabilities

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring and logging set up
- [ ] Backup strategy implemented
- [ ] CI/CD pipeline configured
- [ ] Load balancer configured
- [ ] CDN set up for static assets
- [ ] Error tracking enabled
- [ ] Performance monitoring active

## Next Steps

After completing the foundation:
1. Continue with Phase 2 implementation (Project and Allocation APIs)
2. Build out remaining frontend components
3. Implement the report builder
4. Add comprehensive testing
5. Prepare for deployment

Refer to [`ARCHITECTURE.md`](ARCHITECTURE.md) for detailed specifications and the complete system design.