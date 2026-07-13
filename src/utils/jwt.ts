import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export function generateAccessToken(payload: object){
    console.log("jwtsecret =====>",JWT_SECRET);
    return jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: '15m'
        }
    );
}

export function verityToken(token: string){
    return jwt.verify(
        token,
        JWT_SECRET,
    );
}

export function generateRefreshToken(
    payload: object
) {

    return jwt.sign(
        payload,
        REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
    );
}

export function verifyRefreshToken(
    token:string
){
    return jwt.verify(
        token,
        REFRESH_SECRET
    );
}