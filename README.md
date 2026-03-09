# Headcount Management System

A comprehensive web-based system for managing employee headcount, project allocations, and organizational data across multiple geographies with role-based access control.

## 🎯 Overview

This system enables organizations to:
- Track employees across multiple projects and locations
- Manage percentage-based project allocations
- Generate custom reports with scheduling capabilities
- Maintain audit trails for compliance
- Control access based on user roles (Admin, HR, Manager, Employee)

## 📋 Features

### Core Functionality
- **Employee Management**: Complete CRUD operations with extended employee information
- **Project Management**: Track projects, teams, and ownership
- **Allocation Management**: Percentage-based allocation with automatic validation (ensures total ≤ 100%)
- **Multi-Geography Support**: Track employees across different locations
- **Custom Reporting**: Build, save, schedule, and export reports
- **Audit Logging**: Complete change history for compliance

### Access Control
- **Role-Based Permissions**: Admin, HR, Manager, Employee roles
- **Hierarchical Access**: Managers can access their team's data
- **Data Privacy**: Employees can only view their own information

### Data Tracked
- Employee: Name, ID, Email, Department, Location, Manager, Job Title, Skills, Cost Center, Salary Band, Performance Rating, Certifications
- Projects: Code, Name, Description, Dates, Status, Location, Owner
- Allocations: Employee-Project assignments with percentage and date ranges

## 🏗️ Architecture

### Technology Stack

**Backend:**
- Node.js 18+ with Express.js
- TypeScript for type safety
- PostgreSQL database
- Prisma ORM
- JWT authentication (SSO/LDAP ready)
- Redis for caching (optional)

**Frontend:**
- React 18+ with TypeScript
- Material-UI (MUI) for components
- React Query for data fetching
- Redux Toolkit for state management
- React Router for navigation

### Project Structure

```
headcount-management/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth, logging, validation
│   │   ├── routes/         # API endpoints
│   │   ├── config/         # Configuration
│   │   └── server.ts       # Entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
│
├── frontend/               # React application (to be created)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.tsx
│   └── package.json
│
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md    # System architecture
│   └── IMPLEMENTATION_GUIDE.md
│
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd headcount-management
```

2. **Set up the backend**:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run prisma:generate
npm run prisma:migrate
```

3. **Start the backend server**:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

4. **Set up the frontend** (coming soon):
```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Complete system architecture, database schema, API design, and deployment strategy
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)**: Step-by-step implementation instructions with code examples
- **[backend/README.md](./backend/README.md)**: Backend API documentation and usage

## 🔐 Authentication

The system uses JWT-based authentication with support for:
- Local authentication (development)
- LDAP/Active Directory integration (production)
- SSO via SAML (production)

Default roles:
- **ADMIN**: Full system access
- **HR**: Full access to employee and project data
- **MANAGER**: Access to their team's data
- **EMPLOYEE**: Access to their own data only

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Employees
- `GET /api/employees` - List employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `GET /api/employees/:id/allocations` - Get allocations

### Projects
- `GET /api/projects` - List projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project
- `GET /api/projects/:id/team` - Get team members

### Allocations
- `GET /api/allocations` - List allocations
- `POST /api/allocations` - Create allocation
- `POST /api/allocations/validate` - Validate allocation
- `GET /api/allocations/conflicts/check` - Check conflicts

See [backend/README.md](./backend/README.md) for complete API documentation.

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test
npm run test:coverage

# Frontend tests (coming soon)
cd frontend
npm test
```

## 📦 Deployment

### Development
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

### Production

1. **Build the applications**:
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

2. **Deploy using Docker** (recommended):
```bash
docker-compose up -d
```

3. **Or deploy manually**:
- Set up PostgreSQL database
- Configure environment variables
- Run database migrations
- Start the backend server
- Serve frontend static files

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed deployment instructions.

## 🔧 Configuration

### Environment Variables

**Backend (.env)**:
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/headcount_db
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=production
LDAP_URL=ldap://your-ldap-server:389
```

**Frontend (.env)**:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## 📈 Implementation Status

### ✅ Completed
- System architecture and design
- Database schema with Prisma
- Backend API structure
- Authentication middleware
- Employee management API
- Project management API
- Allocation management API with validation
- Audit logging middleware
- Role-based access control
- API documentation

### 🚧 In Progress
- Frontend React application
- Dashboard with visualizations
- Custom report builder
- Report scheduling and export

### 📋 Planned
- Mobile application
- Advanced analytics
- Integration with time tracking systems
- Multi-language support
- Automated allocation recommendations

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Team

This project is designed for organizations managing headcount across multiple projects and geographies.

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation in `/docs`
- Review the implementation guide

## 🎯 Roadmap

### Phase 1: Foundation (Weeks 1-3) ✅
- ✅ Project setup and architecture
- ✅ Database schema
- ✅ Authentication system
- ✅ Core API endpoints

### Phase 2: Core Features (Weeks 4-6)
- Frontend application setup
- Employee management UI
- Project management UI
- Allocation management UI
- Dashboard

### Phase 3: Reporting (Weeks 7-8)
- Report builder UI
- Report execution engine
- Export functionality
- Report scheduling

### Phase 4: Polish & Testing (Weeks 9-10)
- Comprehensive testing
- Performance optimization
- Security audit
- Documentation

### Phase 5: Deployment (Weeks 11-12)
- UAT environment
- Production deployment
- User training
- Go-live support

## 🌟 Key Highlights

- **Allocation Validation**: Automatic validation ensures employees are never over-allocated (>100%)
- **Audit Trail**: Complete change history for compliance and accountability
- **Flexible Reporting**: Build custom reports with filters, grouping, and scheduling
- **Multi-Geography**: Support for distributed teams across multiple locations
- **Role-Based Security**: Granular access control based on organizational hierarchy
- **Scalable Architecture**: Designed to handle 1000+ employees and growing

---

**Built with ❤️ for efficient headcount management**