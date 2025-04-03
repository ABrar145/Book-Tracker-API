import { Request, Response, NextFunction } from 'express';
import { auth } from '../../config/firebase';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = decodedToken; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
