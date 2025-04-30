import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);

export default router;

