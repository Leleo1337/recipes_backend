import express from 'express';
import { getLoggedInUserInfo, getUserInfo, getUserCreatedRecipes, getUserLikedRecipes } from '../controllers/user';

const router = express.Router();

// api/v1/user/

router.get('/me', getLoggedInUserInfo);
router.get('/:userID', getUserInfo);
router.get('/:userID/my-recipes', getUserCreatedRecipes);
router.get('/:userID/liked-recipes', getUserLikedRecipes);

export default router;
