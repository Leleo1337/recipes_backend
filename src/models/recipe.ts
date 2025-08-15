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
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ['cafe da manha', 'almoço', 'jantar', 'entrada', 'sobremesa', 'bebida', 'lanche', 'outro'],
			default: 'Outro',
			required: true,
		},
		difficulty: {
			type: String,
			enum: ['facil', 'medio', 'dificil'],
			default: 'medio',
			required: true,
		},
		visibility: {
			type: String,
			enum: ['Public', 'Private'],
			default: 'Public',
		},
		cookingTime: {
			type: Number,
			required: true,
		},
		portions: {
			type: Number,
			required: false,
		},
		ingredients: {
			type: [
				{
					name: { type: String, required: true },
					quantity: { type: String, required: true },
					unit: { type: String, required: false },
				},
			],
			required: true,
		},
		instructions: {
			type: [
				{
					step: { type: Number, required: true },
					description: { type: String, required: true },
				},
			],
			required: true,
		},
		likesCount: {
			type: Number,
			default: 0,
		},
		commentsCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true, versionKey: false },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
