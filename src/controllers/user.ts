import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Like from '../models/like';
import User from '../models/user';
import Recipe from '../models/recipe';
import NotFound from '../errors/notFound';
import Unauthenticated from '../errors/unauthenticated';

export async function getLoggedInUserInfo(req: Request, res: Response) {
	const { userID } = req.user;

	const user = await User.findById(userID).select('-password -__v -email');

	if (!user) throw new Unauthenticated('You must be logged!');

	res.status(StatusCodes.OK).json({ user });
}

export async function getUserInfo(req: Request, res: Response) {
	const { userID } = req.params;

	const user = await User.findById(userID).select('-password -__v');
	if (!user) throw new NotFound('User not found');

	res.status(StatusCodes.OK).json({ user });
}

export async function updateUser(req: Request, res: Response) {
	const { userID } = req.params;
	const { name, profilePicture, bio, email, password } = req.body;

	const user = await User.findById(userID);

	if (!user) throw new NotFound('User not found');

	const updatedUser = await User.findByIdAndUpdate(userID, { name, profilePicture, bio, email, password }, { new: true });

	res.status(StatusCodes.OK).json({ updatedUser });
}

export async function getUserCreatedRecipes(req: Request, res: Response) {
	const { userID } = req.params;

	const user = await User.findById(userID);
	if (!user) throw new NotFound('User not found');

	const data = await Recipe.find({ createdBy: userID }).populate('createdBy');

	res.status(StatusCodes.OK).json({ data });
}

export async function getUserLikedRecipes(req: Request, res: Response) {
	const { userID } = req.params;

	const user = await User.findById(userID);
	if (!user) throw new NotFound('User not found');

	const data = await Like.find({ likedBy: userID }).populate('recipeID createdBy');

	res.status(StatusCodes.OK).json({ data });
}
