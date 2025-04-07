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

router.post('/', validateBody(userSchema), createUser);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, validateBody(userSchema), updateUser);
router.delete('/:id', verifyToken, deleteUser);


export default router;
