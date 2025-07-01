import Joi from 'joi';

export const registerSchema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
	name: Joi.string().min(3),
	email: Joi.string().email(),
	password: Joi.string().min(6).required(),
}).or('name', 'email').messages({
    'object.missing': 'You must provide either a username or an email along with the password.'
});
