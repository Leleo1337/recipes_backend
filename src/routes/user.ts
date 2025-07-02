import express from 'express';
import authMiddleware from '../middlewares/auth';
import { getUserComments, getUserRecipes, getUserLikedRecipes } from '../controllers/user';

const router = express.Router();

router.get('/recipes', authMiddleware, getUserRecipes);
router.get('/comments', authMiddleware, getUserComments);
router.get('/liked', authMiddleware, getUserLikedRecipes);

export default router;
