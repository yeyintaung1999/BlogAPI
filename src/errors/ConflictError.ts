import { HttpError } from "./HttpError.js";

export class ConflictError extends HttpError{
    constructor(message: string = 'Data Conflict'){
        super(message,509);
    }
}