import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
	{
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		image: {
			type: String,
			required: false,
			trim: true,
		},
		title: {
			type: String,
			required: [true, 'You must insert a title'],
		},
		instructions: {
			type: String,
			required: [true, 'Instructions may not be empty'],
			trim: true,
		},
		likesCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true, versionKey: false },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
