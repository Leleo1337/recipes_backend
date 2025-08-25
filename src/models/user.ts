import mongoose, { Mongoose, Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import { compareValue, hashValue } from '../utils/bcrypt';
import env from '../config/env';
import NotFound from '../errors/notFound';

const userSchema = new mongoose.Schema<IUser>({
	profilePicture: {
		type: String,
		default: '',
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Insira um E-mail válido',
		],
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	bio: {
		type: String,
		default: '',
	},
	socialLinks: {
		discord: {
			type: String,
		},
		instagram: {
			type: String,
			match: [/^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/, 'URL do Instagram inválida'],
		},
		facebook: {
			type: String,
			match: [/^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.]+\/?$/, 'URL do Facebook inválida'],
		},
	},
});

userSchema.pre('save', async function () {
	return (this.password = await hashValue(this.password));
});

userSchema.pre('findOneAndUpdate', async function () {
	const update = this.getUpdate() as any;

	if (update.password) {
		const hashed = await hashValue(update.password);
		update.password = hashed;
		this.setUpdate(update);
	}
});

userSchema.methods.createToken = function () {
	if (!env.JWT_SECRET) {
		throw new NotFound('Please enter a JWT_SECRET in your .env file');
	}

	return jwt.sign({ userID: this._id, name: this.name }, env.JWT_SECRET, { expiresIn: '30d' });
};

userSchema.methods.comparePassword = function (password: string) {
	if (!env.JWT_SECRET) {
		return;
	}
	return compareValue(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
