import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Unauthenticated from '../errors/unauthenticated';
import env from '../config/env';
import User from '../models/user';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader?.startsWith('Bearer ')) {
			throw new Unauthenticated('You must be logged to access this');
		}
		const authorization = authHeader.split(' ')[1];

		const payload = jwt.verify(authorization, env.JWT_SECRET!) as JwtPayload;
		const { userID } = payload;

		const user = await User.findById(userID).select('-password -email');
		if (!user) {
			throw new Unauthenticated('You must be logged to access this');
		}
		req.user = user;
		next();
	} catch (error) {
		throw new Unauthenticated('You must be logged to access this');
	}
}

export default authMiddleware;
