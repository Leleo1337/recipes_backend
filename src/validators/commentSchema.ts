import Joi from 'joi';

export const commentSchema = Joi.object({
	text: Joi.string().min(1).max(30).trim(),
});
