import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/recipe';
import notFound from '../errors/notFound';
import Forbidden from '../errors/Forbidden';

export async function getAllRecipes(req: Request, res: Response) {
	const recipes = await Recipe.find().sort("-likesCount");

	res.status(StatusCodes.OK).json({ success: true, length: recipes.length, data: recipes });
}

export async function getRecipe(req: Request, res: Response) {
	const { recipeID } = req.params;

	const recipe = await Recipe.findById(recipeID);

	if (!recipe) {
		throw new notFound('Recipe not found');
	}

	res.status(StatusCodes.OK).json({ success: true, data: recipe });
}

export async function createRecipe(req: Request, res: Response) {
	const { userID } = req.user;
	const { image, title, instructions } = req.body;

	const newRecipe = await Recipe.create({ createdBy: userID, image, title, instructions });

	res.status(StatusCodes.CREATED).json({ success: true, created: newRecipe });
}

export async function editRecipe(req: Request, res: Response) {
	const { image, title, instructions } = req.body;
	const { recipeID } = req.params;
	const { userID } = req.user;

	const editedRecipe = await Recipe.findOneAndUpdate(
		{ _id: recipeID, createdBy: userID },
		{ image, title, instructions },
		{ new: true, runValidators: true },
	);

	if (!editedRecipe) {
		throw new Forbidden('You dont own this recipe');
	}

	res.status(StatusCodes.OK).json({ success: true, updatedRecipe: editedRecipe });
}

export async function deleteRecipe(req: Request, res: Response) {
	const { recipeID } = req.params;
	const { userID } = req.user;

	const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeID, createdBy: userID });

	console.log(deletedRecipe)
	if (!deletedRecipe) {
		throw new Forbidden('You dont own this recipe');
	}

	res.status(StatusCodes.OK).json({ success: true, deleted: deletedRecipe });
}
