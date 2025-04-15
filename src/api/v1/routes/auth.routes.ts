import express, { Request, Response } from "express";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { uid: string };
}
/**
 * @swagger
 * /api/v1/auth/test:
 *   get:
 *     summary: Test Firebase token authentication
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 */
router.get("/test", authMiddleware, (req: AuthRequest, res: Response) => {
    res.status(200).json({
      message: "Token verified successfully",
      uid: req.user?.uid,
    });
  });
  
  export default router;