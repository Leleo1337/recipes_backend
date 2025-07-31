import express from 'express';
import { getUserInfo,getUserCreatedRecipes,getUserLikedRecipes } from '../controllers/user';

const router = express.Router();

// api/v1/user/

router.get('/:userID', getUserInfo);
router.get('/:userID/my-recipes', getUserCreatedRecipes);
router.get('/:userID/liked-recipes', getUserLikedRecipes);

export default router;
