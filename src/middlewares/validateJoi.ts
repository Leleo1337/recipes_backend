import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

function validate(schema: any): any {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);

		if (error) {
			const errors = error.details.map((d: any) => ({
				msg: d.message,
				field: d.path[d.path.length - 1],
				type: d.type,
				limit: d.context?.limit ?? null,
			}));
			return res.status(StatusCodes.BAD_REQUEST).json({ errors });
		}

		next();
	};
}

export default validate;
