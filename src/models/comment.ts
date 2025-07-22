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
