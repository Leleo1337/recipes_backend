import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/badRequest';

function validate(schema: any) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);

		if (error) {
			throw new BadRequest(error.details[0].message);
		}

		next();
	};
}

export default validate