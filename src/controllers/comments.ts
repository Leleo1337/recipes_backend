import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Comment from '../models/comment';
import Recipe from '../models/recipe';
import BadRequest from '../errors/badRequest';
import Forbidden from '../errors/Forbidden';

export async function getComments(req: Request, res: Response) {
	const { recipeID } = req.params;

	const recipe = await Recipe.findById(recipeID);
	if (!recipe) {
		throw new BadRequest('Recipe not found!');
	}

	const comments = await Comment.find({ recipeId: recipeID });

	res.status(StatusCodes.OK).json({ success: true, length: comments.length, data: comments });
}

export async function createComment(req: Request, res: Response) {
	const { text } = req.body;
	const { recipeID } = req.params;
	const { userID } = req.user;

	const recipe = await Recipe.findById(recipeID);

	if (!recipe) {
		throw new BadRequest('Recipe not found!');
	}

	const createdComment = await Comment.create({ recipeId: recipeID, createdBy: userID, text: text });

	res.status(StatusCodes.CREATED).json({ success: true, created: createdComment });
}

export async function updateComment(req: Request, res: Response) {
	const { text } = req.body;
	const { recipeID, commentID } = req.params;
	const { userID } = req.user;

	const recipe = await Recipe.findById(recipeID);

	if (!recipe) {
		throw new BadRequest('Recipe not found!');
	}

	const updatedComment = await Comment.findOneAndUpdate(
		{ _id: commentID, createdBy: userID, recipeId: recipeID },
		{ text },
		{
			new: true,
			runValidators: true,
		},
	);
	if (!updatedComment) {
		throw new Forbidden('You dont own this comment');
	}

	res.status(StatusCodes.OK).json({ success: true, updated: updatedComment });
}

export async function deleteComment(req: Request, res: Response) {
	const { recipeID, commentID } = req.params;
	const { userID } = req.user;

	const recipe = await Recipe.findById(recipeID);

	if (!recipe) {
		throw new BadRequest('Recipe not found');
	}

	const deletedComment = await Comment.findOneAndDelete({ _id: commentID, recipeId: recipeID, createdBy: userID });
	if (!deletedComment) {
		throw new Forbidden('You dont own this comment');
	}

	res.status(StatusCodes.OK).json({ success: true, deleted: deletedComment });
}
