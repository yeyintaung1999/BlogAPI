import { HttpError } from "./HttpError";

export class ValidationError extends HttpError {

    errors?: Record<string,string>

    constructor(message: string, errors: Record<string,string>){
        super(message, 422);
        this.errors=errors;
    }
}