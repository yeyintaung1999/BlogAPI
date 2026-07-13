import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface JwtPayload{
    userId: string,
    email: string
}

declare global{
    namespace Express{
        interface Request{
            userId?: string;
            email?: string;
        }
    }
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
){
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader||!authHeader.startsWith('Bearer')){
            return res.status(401).json({
                message: "unauthourized",
            })
        }
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET

        if(token && secret){
            const payload = jwt.verify(
                token,
                secret
            ) as JwtPayload
            
            req.userId = payload.userId;
            req.email = payload.email;

            next();
        }
    }catch(error){
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }

}