import express from 'express';
import validate from '../middlewares/validateJoi';
import authMiddleware from '../middlewares/auth';
import { commentSchema } from '../validators/commentSchema';
import { getComments, createComment, updateComment, deleteComment } from '../controllers/comments';

const router = express.Router({mergeParams: true});

// - /api/v1/recipes/:recipeID/comments
router.get('/', getComments);
router.post('/', authMiddleware, validate(commentSchema), createComment);
router.patch('/:commentID', authMiddleware, validate(commentSchema), updateComment);
router.delete('/:commentID', authMiddleware, deleteComment);

export default router;
