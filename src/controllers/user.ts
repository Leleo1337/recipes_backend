import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/recipe';
import Comment from '../models/comment';

export async function getUserRecipes(req: Request, res: Response) {
	const { userID } = req.user;
	const recipe = await Recipe.find({ createdBy: userID }).sort('-date');

	res.status(StatusCodes.OK).json({ success: true, data: recipe });
}

export async function getUserComments(req: Request, res: Response) {
	const { userID } = req.user;

	const comments = await Comment.find({ createdBy: userID });

	res.status(StatusCodes.OK).json({ success: true, length: comments.length, data: comments });
}

export async function getUserLikedRecipes(req: Request, res: Response){
    // PLACEHOLDER
}