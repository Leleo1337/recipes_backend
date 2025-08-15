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
			ref: 'User',
		},
		text: {
			type: String,
			required: true,
			maxLength: 300,
		},
	},
	{ timestamps: true },
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
