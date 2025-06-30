import express from 'express';
import validate from '../middlewares/validateJoi';
import { getAllRecipes } from '../controllers/recipes';

const router = express.Router();

router.get('/', getAllRecipes);

export default router;
