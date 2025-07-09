import Joi from 'joi';

export const recipeSchema = Joi.object({
	image: Joi.string().uri().optional(),
	title: Joi.string().trim().min(3).required(),
	description: Joi.string().trim().min(10).required(),
	category: Joi.string().valid('Café da manha', 'Almoço', 'Jantar', 'Entrada', 'Sobremesa', 'Bebida', 'Lanche', 'Outro').required(),
	difficulty: Joi.string().valid('Facil', 'Medio', 'Dificil').required(),
	visibility: Joi.string().valid('Public', 'Private').optional(),
	cookingTime: Joi.number().required(),
	portions: Joi.number().optional(),
	ingredients: Joi.array()
		.items(
			Joi.object({
				name: Joi.string().trim().required(),
				quantity: Joi.string().trim().required(),
				unit: Joi.string().trim().optional(),
			}),
		)
		.min(1)
		.required(),
	instructions: Joi.array()
		.items(
			Joi.object({
				step: Joi.number().integer().min(1).required(),
				description: Joi.string().trim().min(5).required(),
			}),
		)
		.min(1)
		.required(),
}).unknown(false);
