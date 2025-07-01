import Joi from 'joi';

export const recipeSchema = Joi.object({
	title: Joi.string().trim().min(3).required(),
	instructions: Joi.string().trim().min(1).required(),
}).unknown(false);
