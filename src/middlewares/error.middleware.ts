import type { Request,Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
){
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message,
        statusCode: err.statusCode || 500,
    });

    if(err instanceof HttpError){
        const responsePayload: Record<string,any>={
            status: 'fail',
            message: err.message
        };

        res.status(err.statusCode).json(responsePayload);
        return
    }

    console.error('Unhandled Internal Error:',err)

    res.status(500).json({
        status: 'error',
        message: 'Something went wrong on our server.'
    })
}