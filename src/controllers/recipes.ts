import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/recipe';
import Like from '../models/like';
import NotFound from '../errors/notFound';
import Forbidden from '../errors/Forbidden';

export async function getAllRecipes(req: Request, res: Response) {
	const recipes = (await Recipe.find().sort('-likesCount -createdAt')).splice(3);
	res.status(StatusCodes.OK).json({ success: true, length: recipes.length, data: recipes });
}

export async function getFeaturedRecipes(req: Request, res: Response) {
	const recipes = (await Recipe.find().sort('-likesCount -createdAt')).splice(0, 3);
	res.status(StatusCodes.OK).json({ success: true, length: recipes.length, data: recipes });
}

export async function getRecipe(req: Request, res: Response) {
	const { recipeID } = req.params;

	const recipe = await Recipe.findById(recipeID);

	if (!recipe) {
		throw new NotFound('Recipe not found');
	}

	res.status(StatusCodes.OK).json({ success: true, data: recipe });
}

export async function createRecipe(req: Request, res: Response) {
	const { userID } = req.user;
	const { image, title, description, category, difficulty, visibility, cookingTime, portions, ingredients, instructions } = req.body;
	const newRecipe = await Recipe.create({
		createdBy: userID,
		image,
		title,
		description,
		category,
		difficulty,
		visibility,
		cookingTime,
		portions,
		ingredients,
		instructions,
	});

	res.status(StatusCodes.CREATED).json({ success: true, created: newRecipe });
}

export async function editRecipe(req: Request, res: Response) {
	const { image, title, description, category, difficulty, visibility, cookingTime, portions, ingredients, instructions } = req.body;
	const { recipeID } = req.params;
	const { userID } = req.user;

	const editedRecipe = await Recipe.findOneAndUpdate(
		{ _id: recipeID, createdBy: userID },
		{ image, title, description, category, difficulty, visibility, cookingTime, portions, ingredients, instructions },
		{ new: true, runValidators: true },
	);

	if (!editedRecipe) {
		throw new Forbidden('You dont own this recipe');
	}

	res.status(StatusCodes.OK).json({ success: true, updatedRecipe: editedRecipe });
}

export async function likeRecipe(req: Request, res: Response) {
	const { userID, username } = req.user;
	const { recipeID } = req.params;

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

export async function deleteRecipe(req: Request, res: Response) {
	const { recipeID } = req.params;
	const { userID } = req.user;

	const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeID, createdBy: userID });

	if (!deletedRecipe) {
		throw new Forbidden('You dont own this recipe');
	}

	res.status(StatusCodes.OK).json({ success: true, deleted: deletedRecipe });
}
