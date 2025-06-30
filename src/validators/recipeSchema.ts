import Joi from 'joi';

export const createRecipe = Joi.object({
	title: Joi.string().trim().min(3).required(),
	instructions: Joi.string().trim().min(1).required(),
}).unknown(false);
