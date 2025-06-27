import customApiError from '../errors/customApi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';

function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction): any {
	const customError = {
		msg: 'Algo deu errado, ,tente novamente mais tarde',
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
		customError.msg = `Nenhum item com id: ${err.value} encontrado`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.cause && err.cause.code === 11000) {
		customError.msg = 'Usuario já cadastrado';
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	console.log(err);
	return res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandlerMiddleware;