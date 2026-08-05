import { HttpError } from "./HttpError.js";


export class UnauthorizedError extends HttpError{
    constructor(message: string = 'Authentication required!'){
        super(message, 401);
    }
}