import type { Request,Response, NextFunction } from "express";

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
}