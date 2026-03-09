# Quick Start Guide - Headcount Management System

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **PostgreSQL** - [Download here](https://www.postgresql.org/download/)
- **Git** (optional) - [Download here](https://git-scm.com/)

## 🚀 One-Command Setup & Start

### On macOS/Linux:

```bash
chmod +x start-all.sh
./start-all.sh
```

### On Windows:

```bash
start-all.bat
```

This will:
1. ✅ Install all backend dependencies
2. ✅ Install all frontend dependencies
3. ✅ Generate Prisma client
4. ✅ Create .env files
5. ✅ Start both servers

## 📋 Manual Setup (Alternative)

If you prefer to set up manually:

### Step 1: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and update:
# - DATABASE_URL with your PostgreSQL connection string
# - JWT_SECRET with a secure random string

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### Step 2: Setup Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start frontend server
npm run dev
```

Frontend will run on: **http://localhost:3000**

## 🗄️ Database Setup

### Create PostgreSQL Database

```sql
CREATE DATABASE headcount_management;
```

### Update Backend .env

```env
DATABASE_URL="postgresql://username:password@localhost:5432/headcount_management"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=5000
```

### Run Migrations

```bash
cd backend
npx prisma migrate dev
```

## 🔐 Default Login

After setup, you'll need to create a user. You can do this by:

1. Using the backend API directly
2. Or adding a seed script to create default users

Example seed data (add to `backend/prisma/seed.ts`):

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

Run seed:
```bash
npx prisma db seed
```

## 🌐 Access the Application

Once both servers are running:

1. **Frontend**: http://localhost:3000
2. **Backend API**: http://localhost:5000
3. **API Documentation**: http://localhost:5000/api

## 📱 Using the Application

### 1. Login
- Navigate to http://localhost:3000
- Enter your credentials
- You'll be redirected to the dashboard

### 2. Manage Employees
- Click "Employees" in the navigation
- Add new employees with the "Add Employee" button
- Search and filter employees
- View employee details and allocations

### 3. Manage Projects
- Click "Projects" in the navigation
- Create new projects
- Track project status and timelines
- View project allocations

### 4. Manage Allocations
- Click "Allocations" in the navigation
- Create employee-project allocations
- Set allocation percentages
- View conflict warnings for over-allocation

### 5. Dashboard
- View key metrics
- Monitor allocation conflicts
- Quick access to recent data

## 🛠️ Development Commands

### Backend

```bash
cd backend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio (database GUI)
npm run prisma:studio

# Run tests
npm test
```

### Frontend

```bash
cd frontend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🔧 Troubleshooting

### Backend won't start

**Problem**: Database connection error
**Solution**: 
- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database exists

**Problem**: Port 5000 already in use
**Solution**: 
- Change PORT in backend/.env
- Or kill the process using port 5000

### Frontend won't start

**Problem**: Port 3000 already in use
**Solution**: 
- Vite will automatically suggest another port
- Or change port in frontend/vite.config.ts

**Problem**: API connection failed
**Solution**: 
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Verify CORS settings in backend

### TypeScript Errors

**Problem**: Cannot find module errors
**Solution**: 
- Run `npm install` in the respective directory
- Delete node_modules and reinstall

### Database Issues

**Problem**: Prisma migration errors
**Solution**: 
```bash
cd backend
npx prisma migrate reset
npx prisma migrate dev
```

## 📚 Additional Resources

- **Backend README**: `backend/README.md`
- **Frontend README**: `frontend/README.md`
- **Architecture**: `ARCHITECTURE.md`
- **Implementation Guide**: `IMPLEMENTATION_GUIDE.md`
- **Frontend Setup**: `FRONTEND_SETUP.md`

## 🎯 Next Steps

1. ✅ Set up the database
2. ✅ Run the startup script
3. ✅ Create your first user
4. ✅ Login to the application
5. ✅ Start managing your headcount!

## 💡 Tips

- Use Prisma Studio to view/edit database: `npm run prisma:studio`
- Check browser console for frontend errors
- Check terminal for backend errors
- Use React DevTools for debugging components
- Enable Redux DevTools for state inspection

## 🆘 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review the error messages in terminal/console
3. Ensure all prerequisites are installed
4. Verify environment variables are set correctly
5. Check that PostgreSQL is running

## 🎉 Success!

If you see:
- Backend: "Server is running on port 5000"
- Frontend: "Local: http://localhost:3000"

You're all set! Open http://localhost:3000 and start using the application.