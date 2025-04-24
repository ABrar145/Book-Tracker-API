import { Request, Response, NextFunction, RequestHandler } from "express";

interface AuthorizationOptions {
  hasRole?: string[];
  allowSameUser?: boolean;
}

interface AuthRequest extends Request {
  user?: {
    uid: string;
    role?: string;
  };
}

const isAuthorized = (options: AuthorizationOptions): RequestHandler => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const { hasRole = [], allowSameUser = false } = options;
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized: No user info found" });
      return;
    }

    const { uid, role } = user;
    const hasRequiredRole = role && hasRole.includes(role);
    const isSameUser = allowSameUser && req.params.id === uid;

    if (hasRequiredRole || isSameUser) {
      next();
      return;
    }

    res.status(403).json({ error: "Forbidden: Insufficient permissions" });
  };
};

export default isAuthorized;
