import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(6)
})