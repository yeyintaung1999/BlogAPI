import {minLength, string, z} from "zod";

export const GenerateContentSchema = z.object({
    title: z.string().min(5)
})