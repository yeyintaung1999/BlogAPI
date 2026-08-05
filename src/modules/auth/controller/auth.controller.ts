import type { Request,Response } from "express";
import { createUserSchema } from "../validators/auth.validator.js";
import { AuthService } from "../services/auth.service.js";
import { treeifyError } from "zod/v4/core";
import { UserRepository } from "../../user/repositories/dynamodb/user.repository.js";

const userRepo = new UserRepository()
const authservice = new AuthService(userRepo)

export async function register(req: Request, res: Response){
    const result = createUserSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json(treeifyError(result.error))
    }
    const user = await authservice.createUser(result.data.email, result.data.password)
    return res.status(201).json(user)
}

export async function login(req: Request, res:Response){
    console.log("??")
    const result = createUserSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json(treeifyError(result.error));
    }
    const response = await authservice.handleLogin(result.data.email, result.data.password);
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
    try{
        const accessToken = await authservice.refreshToken(req.cookies.refresh_token);
        res.json({accessToken});
        
    }catch(error){
        res.status(502).json({message:"Invalid refresh Token"})
    }
}