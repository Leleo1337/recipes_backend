import Joi from 'joi';

export const recipeSchema = Joi.object({
	image: Joi.string().uri().optional(),

	title: Joi.string().trim().min(3).required(),
	description: Joi.string().trim().required(),
	category: Joi.string().valid('cafe da manha', 'almoço', 'jantar', 'entrada', 'sobremesa', 'bebida', 'lanche', 'outro').required(),
	difficulty: Joi.string().valid('facil', 'medio', 'dificil').required(),
	visibility: Joi.string().valid('public', 'private').optional(),
	cookingTime: Joi.number().required(),
	portions: Joi.number().optional(),
	ingredients: Joi.array()
		.items(
			Joi.object({
				name: Joi.string().trim().required(),
				quantity: Joi.string().trim().required(),
			}),
		)
		.min(1)
		.required(),
	instructions: Joi.array()
		.items(
			Joi.object({
				step: Joi.number().integer().min(1).required(),
				description: Joi.string().trim().min(1).required(),
			}),
		)
		.min(1)
		.required(),
}).unknown(false);
