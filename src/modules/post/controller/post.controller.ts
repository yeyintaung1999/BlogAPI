import type { Response, Request } from "express";
import { createPostSchema } from "../validators/post.validator.js"
import { treeifyError } from "zod";
import { generateAccessToken, verifyRefreshToken } from "../../../utils/jwt.js";
import { PostService } from "../services/post.service.js";
import { PostRepository } from "../repositories/dynamodb/post.repository.js";
import { UserRepository } from "../../user/repositories/dynamodb/user.repository.js";

const postRepo = new PostRepository()
const userRepo = new UserRepository()
const postService = new PostService(postRepo,userRepo)

export async function getPosts(req: Request, res: Response) {
    const posts = await postService.getAllPosts()
    return res.status(200).json(posts)
}

export function getPost(req: Request, res: Response){
    const post = postService.getPostById(req.params.id as string)
    
    res.json(post);
}

export async function addPost(req: Request, res: Response) {
    
    const result = createPostSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json(treeifyError(result.error));
    }
    const post = await postService.createPost(result.data.userId, result.data.title, result.data.content)
    return res.status(201).json({
        message: 'Successfully uploaded.',
        post: post
    });
}

