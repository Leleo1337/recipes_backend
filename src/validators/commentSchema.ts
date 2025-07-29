import Joi from 'joi';

export const commentSchema = Joi.object({
	profilePicture: Joi.string().uri(),
	username: Joi.string().trim(),
	text: Joi.string().min(1).max(30).trim(),
});
