import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Comment from '../models/comment';
import Recipe from '../models/recipe';
import BadRequest from '../errors/badRequest';
import Forbidden from '../errors/Forbidden';
import User from '../models/user';

export async function getComments(req: Request, res: Response) {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 6;
	const skip = (page - 1) * limit;

	const { recipeID } = req.params;

	const recipe = await Recipe.findById(recipeID);
	if (!recipe) {
		throw new BadRequest('Recipe not found!');
	}
	const comments = await Comment.find({ recipeID: recipeID })
		.skip(skip)
		.limit(limit)
		.populate({ path: 'createdBy', select: 'name profilePicture' })
		.sort('-createdAt');
	const totalComments = await Comment.countDocuments({ recipeID });

	res.status(StatusCodes.OK).json({ success: true, page: page, limit, total: totalComments, data: comments });
}

export async function createComment(req: Request, res: Response) {
	const { userID } = req.user;
	const { recipeID } = req.params;
	const { text } = req.body;

	const recipe = await Recipe.findById(recipeID);
	if (!recipe) throw new BadRequest('Recipe not found!');

	const user = await User.findById(userID);
	if (!user) throw new BadRequest('User not found!');

	const comment = await Comment.create({ recipeID: recipeID, createdBy: userID, profilePicture: user.profilePicture, username: user.name, text: text });
	await Recipe.findByIdAndUpdate(recipeID, { $inc: { commentsCount: 1 } });

	res.status(StatusCodes.CREATED).json({ success: true, created: comment });
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
		{ _id: commentID, createdBy: userID, recipeID: recipeID },
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

	const deletedComment = await Comment.findOneAndDelete({ _id: commentID, recipeID: recipeID, createdBy: userID });
	if (!deletedComment) {
		throw new Forbidden('You dont own this comment');
	}

	await Recipe.findByIdAndUpdate(recipeID, { $inc: { likesCount: -1 } });

	res.status(StatusCodes.OK).json({ success: true, deleted: deletedComment });
}
