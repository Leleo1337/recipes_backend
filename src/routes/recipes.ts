import express from 'express';
import validate from '../middlewares/validateJoi';
import { recipeSchema } from '../validators/recipeSchema';
import { createRecipe, getAllRecipes, getFeaturedRecipes, getRecipe, editRecipe, deleteRecipe, likeRecipe } from '../controllers/recipes';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

// - /api/v1/recipes

// public
router.get('/', getAllRecipes);
router.get('/featured', getFeaturedRecipes);
router.get('/:recipeID', getRecipe);

// private
router.post('/', authMiddleware, validate(recipeSchema), createRecipe);
router.patch('/:recipeID', authMiddleware, validate(recipeSchema), editRecipe);
router.patch('/:recipeID/like', authMiddleware, likeRecipe);
router.delete('/:recipeID', authMiddleware, deleteRecipe);

export default router;
