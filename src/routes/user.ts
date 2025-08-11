import express from 'express';
import { getLoggedInUserInfo, getUserInfo, getUserCreatedRecipes, getUserLikedRecipes, updateUser } from '../controllers/user';
import authMiddleware from '../middlewares/auth';
import validate from '../middlewares/validateJoi';
import { userSchema } from '../validators/userSchema';

const router = express.Router();

// api/v1/user/

router.get('/me', authMiddleware, getLoggedInUserInfo);
router.get('/:userID', getUserInfo);
router.patch('/:userID', validate(userSchema), authMiddleware, updateUser);
router.get('/:userID/created', getUserCreatedRecipes);
router.get('/:userID/liked', getUserLikedRecipes);

export default router;
