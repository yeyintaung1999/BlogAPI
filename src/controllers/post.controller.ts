import type { Response, Request } from "express";
import { getAllPosts, createPost, getPostById } from "../services/post.service.js";
import { createPostSchema } from "../validators/post.validator.js"
import { treeifyError } from "zod";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js";

export async function getPosts(req: Request, res: Response) {
    const posts = await getAllPosts()
    return res.status(200).json(posts)
}

export function getPost(req: Request, res: Response){
    const post = getPostById(req.params.id as string)
    
    res.json(post);
}

export async function addPost(req: Request, res: Response) {
    
    const result = createPostSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json(treeifyError(result.error));
    }
    const createdAt = new Date()
    const post = await createPost(result.data.userId, result.data.title, result.data.content)
    return res.status(201).json({
        message: 'Successfully uploaded.',
        post: post
    });
}

