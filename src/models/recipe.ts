import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
	{
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
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
