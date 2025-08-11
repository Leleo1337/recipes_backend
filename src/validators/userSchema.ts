import Joi from 'joi';

export const userSchema = Joi.object({
	profilePicture: Joi.string(),
	name: Joi.string(),
	email: Joi.string(),
	bio: Joi.string(),
	password: Joi.string(),
});
