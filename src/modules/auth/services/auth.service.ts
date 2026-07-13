import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { ConflictError } from "../../../errors/ConflictError";
import { NotFoundError } from "../../../errors/NotFoundError";
import { ValidationError } from "../../../errors/ValidationError";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { verifyRefreshToken } from "../../../utils/jwt";
import type { IUserRepository } from "../../user/repositories/interfaces/IUserRepository";

export class AuthService {
    constructor(
        private readonly userRepository: IUserRepository
    ){}

    async createUser(email: string, password: string){

    const existingUser = await this.userRepository.getbyEmail(email)
    if(existingUser){
        throw new ConflictError('Email already exist')
    }
    const createdDate = new Date()
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await this.userRepository.create({
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

    async handleLogin(email: string, password: string){
    const existingUser = await this.userRepository.getbyEmail(email)
    if(!existingUser){
        throw new NotFoundError('There is no such user')
    }
    const isMatch = await bcrypt.compare(
        password,
        existingUser.password
    )
    if(!isMatch) {
        throw new ValidationError(
            'Invalid email or password',{}
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

    async refreshToken(token?: string): Promise<string> {
    if (!token) {
        throw new UnauthorizedError("Refresh token is missing");
    }

    const decoded = verifyRefreshToken(token);

    return generateAccessToken({
            userId: (decoded as any).userId
        });
    }
}




