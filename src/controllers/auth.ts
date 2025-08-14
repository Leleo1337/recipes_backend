import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user';
import BadRequest from '../errors/badRequest';

export async function register(req: Request, res: Response) {
	const { profilePicture, name, email, password } = req.body;
	const user = await User.create({ name, profilePicture, email, password });
	const token = user.createToken();

	res.status(StatusCodes.CREATED).json({ success: true, createdUser: { userID: user._id, username: user.name }, token });
}

export async function login(req: Request, res: Response) {
	const { name, email, password } = req.body;

	const user = await User.findOne({ $or: [{ name }, { email }] });
	if (!user) {
		throw new BadRequest('Incorrect user or password!');
	}

	const matchesPassword = await user.comparePassword(password);
	if (!matchesPassword) {
		throw new BadRequest('Incorrect user or password!');
	}

	const token = user.createToken();

	res.status(StatusCodes.OK).json({ success: true, token });
}
