import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

function routeNotFound(req: Request, res: Response): any {
	return res.status(StatusCodes.NOT_FOUND).send('route not found');
}

export default routeNotFound