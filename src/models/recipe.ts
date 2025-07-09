import { required, string } from 'joi';
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
		description: {
			type: String,
			required: [true, 'You must insert a description'],
		},
		category: {
			type: String,
			enum: ['Café da manha', 'Almoço', 'Jantar', 'Entrada', 'Sobremesa', 'Bebida', 'Lanche', 'Outro'],
			default: 'Outro',
			required: true,
		},
		difficulty: {
			type: String,
			enum: ['Facil', 'Medio', 'Dificil'],
			default: 'Medio',
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
			required: true,
		},
		ingredients: {
			type: [
				{
					name: { type: String, required: true },
					quantity: { type: String, required: true },
					unit: { type: String, required: true },
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
	},
	{ timestamps: true, versionKey: false },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
