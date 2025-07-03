import { StatusCodes } from "http-status-codes";
import customApiError from "./customApi";

class NotFound extends customApiError{
    constructor(message: string){
        super(message, StatusCodes.NOT_FOUND)
    }
}

export default NotFound