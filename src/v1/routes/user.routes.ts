import express from 'express';
import {

  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

  createUser, getUserById, updateUser, deleteUser
} from '../controllers/user.controller';
import { validateBody } from '../middleware/validate.middleware';
import { userSchema } from '../../validators/user.validator';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management

 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created

 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User data returned
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: User deleted
 */

router.post('/', validateBody(userSchema), createUser);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, validateBody(userSchema), updateUser);
router.delete('/:id', verifyToken, deleteUser);


export default router;
