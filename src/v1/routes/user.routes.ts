import express from 'express';
import {
  createUser, getUserById, updateUser, deleteUser
} from '../controllers/user.controller';
import { validateBody } from '../middleware/validate.middleware';
import { userSchema } from '../../validators/user.validator';

const router = express.Router();

router.post('/', validateBody(userSchema), createUser);
router.get('/:id', getUserById);
router.put('/:id', validateBody(userSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
