import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/recipe';
import Comment from '../models/comment';
import Like from '../models/like';

export async function getUserRecipes(req: Request, res: Response) {
	const { userID } = req.user;
	const recipes = await Recipe.find({ createdBy: userID }).sort('-createdAt');

	res.status(StatusCodes.OK).json({ success: true, data: recipes });
}

export async function getUserComments(req: Request, res: Response) {
	const { userID } = req.user;

	const comments = await Comment.find({ createdBy: userID });

	res.status(StatusCodes.OK).json({ success: true, length: comments.length, data: comments });
}

export async function getUserLikedRecipes(req: Request, res: Response) {
	const { userID } = req.user;

	const likes = await Like.find({ likedBy: userID }).populate('recipeID');
	const likedRecipes = likes.map((like) => like.recipeID).filter((recipe) => recipe !== null);

	res.status(StatusCodes.OK).json({ success: true, length: likedRecipes.length, data: likedRecipes });
}
