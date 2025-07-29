import { required, string } from 'joi';
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		recipeID: {
			type: mongoose.Types.ObjectId,
			ref: 'Recipe',
			required: true,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		profilePicture: {
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			maxLength: 30,
			required: true,
		},
	},
	{ timestamps: true },
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
