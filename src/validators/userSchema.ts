import Joi from 'joi';

export const userSchema = Joi.object({
	profilePicture: Joi.string().messages({
		'string.empty': 'O campo e-mail não pode estar vazio',
	}),
	name: Joi.string().optional(),
	email: Joi.string().email(),
	bio: Joi.string().optional(),
	newPassword: Joi.string().optional(),
	currentPassword: Joi.string().optional(),
	socialLinks: Joi.object({
		tiktok: Joi.string().uri().optional().allow(''),
		instagram: Joi.string().uri().optional().allow(''),
		facebook: Joi.string().uri().optional().allow(''),
	}),
});
