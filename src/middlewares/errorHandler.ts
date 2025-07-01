import customApiError from '../errors/customApi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';

function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction): any {
	const customError = {
		msg: 'Something went wrong!, try again later.',
		statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
	};

	if (err instanceof customApiError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}

	if (err instanceof MongooseError.ValidationError) {
		customError.msg = Object.values(err.errors)
			.map((item: any) => item.message)
			.join(', ');
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err instanceof MongooseError.CastError) {
		customError.msg = `Invalid ID: ${err.value} is not a valid identifier`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.code === 11000) {
		const duplicatedField = Object.keys(err.keyValue)[0];
		customError.msg = `The ${duplicatedField} '${err.keyValue[duplicatedField]}' is already in use.`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	console.log(err);
	return res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandlerMiddleware;