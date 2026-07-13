import type { Request,Response } from "express";
import { GenerateContentSchema } from "../validators/ai.validator";
import { treeifyError } from "zod/v4/core";
import { generate } from "../services/ai.service";

export async function generateContent(req:Request, res: Response) {
    const result = GenerateContentSchema.safeParse(req.body);
    if(!result.success){
        return res.status(422).json(treeifyError(result.error))
    }
    const response = await generate(result.data.title)
    return res.status(201).json({
        message: 'Successfully generated',
        ...response
    })
}