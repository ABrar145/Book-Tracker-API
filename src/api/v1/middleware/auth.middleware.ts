import { Request, Response, NextFunction } from 'express';
import auth from '../../../config/firebase';

interface AuthRequest extends Request {
  user?: {
    uid: string;
    role?: string; // ✅ Add role
  };
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);

    // ✅ Attach uid and role (if exists) from custom claims
    req.user = {
      uid: decodedToken.uid,
      role: decodedToken.role || '', // role from Firebase custom claims
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token',
      details: error,
    });
  }
};

export default authMiddleware;
