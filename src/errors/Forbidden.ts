import { StatusCodes } from "http-status-codes";
import CustomApiError from "./customApi";

class Forbidden extends CustomApiError{
    constructor(message: string){
        super(message, StatusCodes.FORBIDDEN)
    }
}

export default Forbidden