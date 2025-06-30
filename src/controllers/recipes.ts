import { Request, Response } from 'express';

export function getAllRecipes(req: Request, res: Response) {
	res.send('oi');
}
