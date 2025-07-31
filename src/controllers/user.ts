import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Like from '../models/like';
import User from '../models/user';
import Recipe from '../models/recipe';
import NotFound from '../errors/notFound';

export async function getUserInfo(req: Request, res: Response) {
	const { userID } = req.params;

	const user = await User.findById(userID).select('-password -__v -email');
	if (!user) throw new NotFound('User not found');

	res.status(StatusCodes.OK).json({ user });
}

export async function getUserCreatedRecipes(req: Request, res: Response) {
	const { userID } = req.params;

	const user = await User.findById(userID);
	if (!user) throw new NotFound('User not found');

	const created = await Recipe.find({ createdBy: userID });

	res.status(StatusCodes.OK).json({ created });
}

export async function getUserLikedRecipes(req: Request, res: Response) {
	const { userID } = req.params;

	const user = await User.findById(userID);
	if (!user) throw new NotFound('User not found');

	const likes = await Like.find({ likedBy: userID }).populate('recipeID');

	res.status(StatusCodes.OK).json({ likes });
}
