import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../errors/UnauthorizedError";

interface JwtPayload {
    userId: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            email?: string;
        }
    }
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next(new UnauthorizedError('Unauthorized!'))
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET!

    try {
        if (token && secret) {
            const payload = jwt.verify(
                token,
                secret
            ) as JwtPayload

            req.userId = payload.userId;
            req.email = payload.email;

            next();
        }
    } catch {
        next(new UnauthorizedError('Invalid or expired token'));
    }
}