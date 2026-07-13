import type { Post } from "../types/post.js";
import { id } from "zod/locales";
import { randomUUID } from "node:crypto";
import { PostRepository } from "../repositories/post.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

const postrepo = new PostRepository()
const userRepo = new UserRepository()

export async function getAllPosts(){
    const posts = await postrepo.getall()
    return posts
}

export function getPostById(postId: string){
    
}

export async function createPost(userId: string, title: string, content: string){
    const user = await  userRepo.getbyKey({'userId':userId})
    if(!user){
        console.log('no user found in creatpost service')
        return
    }
    const date = new Date()
    const post = {
        postId: randomUUID(),
        title: title,
        content: content,
        userId: user.userId as string,
        username: (user.username as string) ?? "",
        createdAt: date.toISOString()
    }
    const newPost = await postrepo.create(post)
    console.log(newPost)
    return newPost
}