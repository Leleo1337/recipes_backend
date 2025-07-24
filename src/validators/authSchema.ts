import Joi from 'joi';

export const registerSchema = Joi.object({
	profilePicture: Joi.string().uri(),
	name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
	name: Joi.string().min(3).messages({ 'string.empty': '"User" is not allowed to be empty' }),
	email: Joi.string().email().messages({ 'string.empty': '"User" is not allowed to be empty' }),
	password: Joi.string().required(),
})
	.or('name', 'email')
	.messages({
		'object.missing': 'You must provide either a username or an email along with the password.',
	});
