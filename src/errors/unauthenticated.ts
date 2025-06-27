import { StatusCodes } from 'http-status-codes';
import customApiError from './customApi';

class Unauthenticated extends customApiError {
	constructor(message: string) {
		super(message, StatusCodes.UNAUTHORIZED);
	}
}

export default Unauthenticated;