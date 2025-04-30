import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  loginUser 
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;