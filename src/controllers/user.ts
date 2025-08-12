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
	const loggedUserID = req.user.userID.toString();

	const user = await User.findById(userID);
	if (!user) throw new NotFound('User not found');

	if (userID !== loggedUserID) throw new Unauthenticated('You cannot update another user profile.');

	const updatedUser = await User.findByIdAndUpdate(userID, { name, profilePicture, bio, email, password }, { new: true });

	res.status(StatusCodes.OK).json({ data: updatedUser });
}

export async function getUserCreatedRecipes(req: Request, res: Response) {
	const { userID } = req.params;
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 8;
	const skip = (page - 1) * limit;

	const user = await User.findById(userID);
	if (!user) throw new NotFound('User not found');

	const created = await Recipe.find({ createdBy: userID }).populate('createdBy').skip(skip).limit(limit);
	const totalCreated = await Recipe.countDocuments({ createdBy: userID });

	res.status(StatusCodes.OK).json({ success: true, page, limit, total: totalCreated, data: created });
}

export async function getUserLikedRecipes(req: Request, res: Response) {
	const { userID } = req.params;

	const user = await User.findById(userID);
	if (!user) throw new NotFound('User not found');

	const likes = await Like.find({ likedBy: userID });
	const recipesIds = likes.map(recipe => recipe.recipeID)

	const recipes = await Recipe.find({_id: {$in: recipesIds}}).populate('createdBy')
	res.status(StatusCodes.OK).json({ success:true, length: recipes.length, data: recipes });
}
