import Joi from 'joi';

export const userSchema = Joi.object({
	profilePicture: Joi.string(),
	name: Joi.string().optional(),
	email: Joi.string().email(),
	bio: Joi.string().optional(),
	newPassword: Joi.string().optional(),
	currentPassword: Joi.string().optional(),
	socialLinks: Joi.optional(),
});
