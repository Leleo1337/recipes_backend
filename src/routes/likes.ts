import express from 'express';
import authMiddleware from '../middlewares/auth';
import { getRecipeLikesCount, likeRecipe } from '../controllers/Likes';

const router = express.Router({mergeParams: true});

// - /api/v1/recipes/:recipeID/like

router.get('/count', getRecipeLikesCount);
router.post('/', authMiddleware, likeRecipe);

export default router;
