import { Request, Response } from 'express';
import User from '../models/user';
import { StatusCodes } from 'http-status-codes';

export async function register(req: Request, res: Response) {
	const { name, email, password } = req.body;

	const user = await User.create({ name, email, password });

	const token = user.createToken();

	res.status(StatusCodes.OK).json({ success: true, createdUser: { userID: user._id, username: user.name }, token });
}
