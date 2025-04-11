import { Request, Response, NextFunction } from "express";

interface AuthorizationOptions {
  hasRole?: string[]; // Roles that are allowed
  allowSameUser?: boolean; // Allow access if UID matches req.params.id
}

interface AuthRequest extends Request {
  user?: {
    uid: string;
    role?: string;
  };
}

const isAuthorized = (options: AuthorizationOptions) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { hasRole = [], allowSameUser = false } = options;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: No user info found" });
    }

    const { uid, role } = user;

    const hasRequiredRole = role && hasRole.includes(role);
    const isSameUser = allowSameUser && req.params.id === uid;

    if (hasRequiredRole || isSameUser) {
      return next();
    }

    return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
  };
};

export default isAuthorized;
