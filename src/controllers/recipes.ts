import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/recipe';
import NotFound from '../errors/notFound';
import Forbidden from '../errors/Forbidden';
import User from '../models/user';

export async function getAllRecipes(req: Request, res: Response) {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 12;
	const skip = (page - 1) * limit;

	const featuredRecipes = await Recipe.find({ visibility: 'public' }).sort('-likesCount -createdAt').limit(3);
	const featuredIds = featuredRecipes.map((recipe) => recipe._id);

	const recipes = await Recipe.find({ visibility: 'public', _id: { $nin: featuredIds } }) // $nin para tirar os featured, já que vão ficar na seção de cima do layout do myrecipes
		.populate('createdBy', 'name profilePicture')
		.sort('-likesCount -createdAt')
		.skip(skip)
		.limit(limit);

	const totalRecipes = (await Recipe.countDocuments({ visibility: 'public' })) - 3; // -3 por causa do featured.

	res.status(StatusCodes.OK).json({ success: true, page, limit, total: totalRecipes, data: recipes });
}

export async function searchRecipes(req: Request, res: Response) {
	const { query, category } = req.query;
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 12;
	const skip = (page - 1) * limit;

	const searchQuery: any = { visibility: 'public' };

	if (query) {
		searchQuery.title = { $regex: query, $options: 'i' };
	}
	if (category) {
		searchQuery.category = category;
	}
	const recipes = await Recipe.find(searchQuery).populate('createdBy').limit(limit).skip(skip);
	res.status(StatusCodes.OK).json({ success: true, data: recipes });
}

export async function getFeaturedRecipes(req: Request, res: Response) {
	const recipes = await Recipe.find().sort('-likesCount -createdAt').populate('createdBy', 'name profilePicture').limit(3);
	res.status(StatusCodes.OK).json({ success: true, length: recipes.length, data: recipes });
}

export async function getRecipe(req: Request, res: Response) {
	const { recipeID } = req.params;

	const recipe = await Recipe.findById(recipeID).populate('createdBy', 'name profilePicture');

	if (!recipe) {
		throw new NotFound('Recipe not found');
	}

	res.status(StatusCodes.OK).json({ success: true, data: recipe });
}

export async function createRecipe(req: Request, res: Response) {
	const { userID } = req.user;
	const user = await User.findById(userID);
	const { image, title, description, category, difficulty, visibility, cookingTime, portions, ingredients, instructions } = req.body;

	if (!user) throw new NotFound('User not found!');
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

export async function deleteRecipe(req: Request, res: Response) {
	const { recipeID } = req.params;
	const { userID } = req.user;

	const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeID, createdBy: userID });

	if (!deletedRecipe) {
		throw new Forbidden('You dont own this recipe');
	}

	res.status(StatusCodes.OK).json({ success: true, deleted: deletedRecipe });
}
