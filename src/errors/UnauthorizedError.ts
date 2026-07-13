import { HttpError } from "./HttpError";


export class UnauthorizedError extends HttpError{
    constructor(message: string = 'Authentication required!'){
        super(message, 401);
    }
}