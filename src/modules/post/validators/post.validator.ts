import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    userId: z.string().min(3),
})