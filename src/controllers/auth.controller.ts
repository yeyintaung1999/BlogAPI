import type { Request,Response } from "express";
import { createUserSchema } from "../validators/auth.validator";
import { createUser, handleLogin } from "../services/auth.service";
import { treeifyError } from "zod/v4/core";
import { verifyRefreshToken } from "../utils/jwt";
import { generateAccessToken } from "../utils/jwt";

export async function register(req: Request, res: Response){
    const result = createUserSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json(treeifyError(result.error))
    }
    const user = await createUser(result.data.email, result.data.password)
    return res.status(201).json(user)
}

export async function login(req: Request, res:Response){
    const result = createUserSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json(treeifyError(result.error));
    }
    const response = await handleLogin(result.data.email, result.data.password);
    const refToken = response.refreshToken;
    res.cookie(
        'refresh_token',
        refToken,
        {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7*24*60*60*1000
        }
    )
    res.status(200).json({
        accessToken: response.accessToken,
        user: response.user
    });
}

export async function refreshToken(req: Request,res: Response){
    const token = req.cookies.refresh_token;
    
    if(!token){
        return res.status(404).json({message:"no refresh token"});
    }

    try{
        const decoded = verifyRefreshToken(token);

        const accessToken = generateAccessToken({
            userId: (decoded as any).userId
        })
        res.status(200).json({
            accessToken:accessToken
        });
    }catch(error){
        res.status(403).json({message:"Invalid refresh Token"})
    }
}