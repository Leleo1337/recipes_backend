import Joi from 'joi';

export const recipeSchema = Joi.object({
	image: Joi.string().uri(),
	title: Joi.string().trim().min(3).required(),
	instructions: Joi.string().trim().min(1).required()
}).unknown(false);
