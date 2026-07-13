import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email('Invalid Email Address').trim().toLowerCase(),
    password: z.string().min(6, 'Password must be at least 6 characters').max(20, 'password too long')
})