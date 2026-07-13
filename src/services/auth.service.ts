import { UserRepository } from "../repositories/user.repository";
import { randomUUID } from "crypto";
import { HttpError } from "../utils/httpError";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const userRepo = new UserRepository()

export async function createUser(email: string, password: string){

    const existingUser = await userRepo.getbyEmail(email)
    if(existingUser){
        throw new HttpError('Email already exist',409)
    }
    const createdDate = new Date()
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await userRepo.create({
            userId: randomUUID(),
            email: email,
            username: "",
            password: passwordHash,
            createdAt: createdDate.toISOString(),
            postList: []
        })
    console.log('auth.service return',user)
    return user
}

export async function handleLogin(email: string, password: string){
    const existingUser = await userRepo.getbyEmail(email)
    if(!existingUser){
        throw new HttpError('There is no such user', 404)
    }
    const isMatch = await bcrypt.compare(
        password,
        existingUser.password
    )
    if(!isMatch) {
        throw new HttpError(
            'Invalid email or password',
            401
        );
    }
    const token = generateAccessToken({
        userId: existingUser.userId,
        email: existingUser.email
    });

    const refreshToken = generateRefreshToken({
        userId: existingUser.userId,
        email: existingUser.email
    })

    return {
        'accessToken': token,
        'refreshToken': refreshToken,
        'user': existingUser
    };
}

