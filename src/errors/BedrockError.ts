import { HttpError } from "./HttpError";


export class BedrockError extends HttpError{
    constructor(message: string = 'Resource Not Found!', statusCode: number = 501){
        super(message, statusCode);
    }
}