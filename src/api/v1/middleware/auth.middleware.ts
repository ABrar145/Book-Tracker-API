import { Request, Response, NextFunction } from 'express';
import auth from '../../../config/firebase';

interface AuthRequest extends Request {
  user?: {
    uid: string;
    role?: string;
  };
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => { // ✅ Set return type to void
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  auth.verifyIdToken(token)
    .then((decodedToken) => {
      req.user = {
        uid: decodedToken.uid,
        role: decodedToken.role || '',
      };
      next();
    })
    .catch((error) => {
      res.status(401).json({
        error: 'Invalid or expired token',
        details: error,
      });
    });
};

export default authMiddleware;
