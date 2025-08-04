import express from 'express';
import { getLoggedInUserInfo, getUserInfo, getUserCreatedRecipes, getUserLikedRecipes } from '../controllers/user';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

// api/v1/user/

router.get('/me', authMiddleware, getLoggedInUserInfo);
router.get('/:userID', getUserInfo);
router.get('/:userID/my-recipes', getUserCreatedRecipes);
router.get('/:userID/liked-recipes', getUserLikedRecipes);

export default router;
