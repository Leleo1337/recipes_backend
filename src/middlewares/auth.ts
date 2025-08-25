import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Unauthorized from '../errors/unauthorized';
import env from '../config/env';
import User from '../models/user';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader?.startsWith('Bearer ')) {
			throw new Unauthorized('You must be logged to access this');
		}
		const authorization = authHeader.split(' ')[1];

		const payload = jwt.verify(authorization, env.JWT_SECRET!) as JwtPayload;
		const { userID } = payload;

		const user = await User.findById(userID).select('-password -email');
		if (!user) {
			throw new Unauthorized('You must be logged to access this');
		}
		req.user = { userID: user._id, username: user.name };
		next();
	} catch (error) {
		throw new Unauthorized('You must be logged to access this');
	}
}

export default authMiddleware;
