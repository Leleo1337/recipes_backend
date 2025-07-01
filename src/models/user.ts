import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import { compareValue, hashValue } from '../utils/bcrypt';
import env from '../config/env';
import notFound from '../errors/notFound';

const userSchema = new mongoose.Schema<IUser>({
	name: {
		type: String,
		required: [true, 'You must insert a name'],
		unique: true,
	},
	email: {
		type: String,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Insert a valid email',
		],
		unique: [true, 'Email already in use'],
	},
	password: {
		type: String,
		required: [true, 'Insert a password'],
		minLength: [6, 'password too short'],
	},
});

userSchema.pre('save', async function () {
	return (this.password = await hashValue(this.password));
});

userSchema.methods.createToken = function () {
	if (!env.JWT_SECRET) {
		throw new notFound('Please enter a JWT_SECRET in your .env file');
	}

	return jwt.sign({ userID: this._id, name: this.name }, env.JWT_SECRET, { expiresIn: '30d' });
};

userSchema.methods.comparePassword = function (password: string) {
	if (!env.JWT_SECRET) {
		return;
	}
	return compareValue(password, this.password);
};

const User = mongoose.model('User', userSchema)

export default User