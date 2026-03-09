import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import prisma from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Headcount Management API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      employees: '/api/employees',
      projects: '/api/projects',
      allocations: '/api/allocations',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   Headcount Management API Server                    ║
║                                                       ║
║   Status: Running                                     ║
║   Port: ${PORT}                                        ║
║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
║                                                       ║
║   API Documentation: http://localhost:${PORT}/         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\nShutting down gracefully...');
  
  server.close(async () => {
    console.log('HTTP server closed');
    
    try {
      await prisma.$disconnect();
      console.log('Database connection closed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default app;

// Made with Bob
