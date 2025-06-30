import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		recipeId: {
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
			required: [true, 'comment may not be empty'],
		},
	},
	{ timestamps: true },
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
