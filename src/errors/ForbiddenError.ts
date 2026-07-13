import { HttpError } from "./HttpError";

export class ForbiddenError extends HttpError{
    constructor(message: string = "You don't have permission to do this action."){
        super(message, 403
        )
    }
}