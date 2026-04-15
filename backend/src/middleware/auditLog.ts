import { Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from './auth';
import prisma from '../config/database';

/**
 * Middleware to log data changes for audit purposes
 */
export const auditLog = (entityType: string): RequestHandler => {
  return (async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const originalJson = res.json.bind(res);
    const user = req.user;

    if (!user) {
      next();
      return;
    }

    // Capture the response
    res.json = function (data: any) {
      // Only log successful modifications (POST, PUT, DELETE)
      if (
        res.statusCode >= 200 &&
        res.statusCode < 300 &&
        ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)
      ) {
        const action = getActionFromMethod(req.method);
        const entityId = req.params.id || data?.id || 'unknown';

        // Log asynchronously without blocking the response
        prisma.auditLog
          .create({
            data: {
              userId: user.id,
              action,
              entityType,
              entityId,
              oldValues: req.body.oldValues || null,
              newValues: req.body,
              ipAddress: req.ip || req.socket.remoteAddress || null,
            },
          })
          .catch((error: any) => {
            console.error('Failed to create audit log:', error);
          });
      }

      return originalJson(data);
    };

    next();
  }) as RequestHandler;
};

function getActionFromMethod(method: string): string {
  switch (method) {
    case 'POST':
      return 'CREATE';
    case 'PUT':
    case 'PATCH':
      return 'UPDATE';
    case 'DELETE':
      return 'DELETE';
    default:
      return 'UNKNOWN';
  }
}

// Made with Bob
