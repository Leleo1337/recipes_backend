import { StatusCodes } from "http-status-codes";
import customApiError from "./customApi";

class BadRequest extends customApiError{
    constructor(message: string){
        super(message, StatusCodes.BAD_REQUEST)
    }
}

export default BadRequest