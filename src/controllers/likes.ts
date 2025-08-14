import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Like from '../models/like';
import Recipe from '../models/recipe';
import NotFound from '../errors/notFound';

export async function likeRecipe(req: Request, res: Response) {
	const { userID, username } = req.user;
	const { recipeID } = req.params;
    console.log(recipeID)
	const recipe = await Recipe.findById(recipeID);
	if (!recipe) {
		throw new NotFound('Recipe not found');
	}

	const hasLiked = await Like.findOne({ likedBy: userID, recipeID });

	if (!hasLiked) {
		await Recipe.findByIdAndUpdate(recipeID, { $inc: { likesCount: 1 } });
		await Like.create({ likedBy: userID, recipeID });
		res.status(StatusCodes.OK).json({ success: true, msg: `User ${username} liked this post!` });
	} else {
		await Recipe.findByIdAndUpdate(recipeID, { $inc: { likesCount: -1 } });
		await Like.deleteOne({ likedBy: userID, recipeID });
		res.status(StatusCodes.OK).json({ success: true, msg: `User ${username} removed his like from this post!` });
	}
}

export async function getRecipeLikesCount(req: Request, res: Response) {
	const { recipeID } = req.params;
    console.log(req.params)

	const recipe = await Recipe.findById(recipeID);
	if (!recipe) throw new NotFound('Recipe not found!');

	const likesCount = await Like.countDocuments({ recipeID: recipeID });

	res.status(StatusCodes.OK).json({ likesCount });
}
