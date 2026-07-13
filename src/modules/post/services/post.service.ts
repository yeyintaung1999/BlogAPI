import type { Post } from "../types/post.types.js";
import { id } from "zod/locales";
import { randomUUID } from "node:crypto";
import { PostRepository } from "../repositories/dynamodb/post.repository.js";
import { UserRepository } from "../../user/repositories/dynamodb/user.repository.js";
import type { IPostRepository } from "../repositories/interfaces/IPostRepository.js";
import type { IUserRepository } from "../../user/repositories/interfaces/IUserRepository.js";

export class PostService{
    constructor(
        private readonly postrepo: IPostRepository,
        private readonly userrepo: IUserRepository
    ){}

    async getAllPosts(){
        const posts = await this.postrepo.getall()
        return posts
    }

    async getPostById(postId: string){
}

    async createPost(userId: string, title: string, content: string){
        const user = await  this.userrepo.getbyKey({'userId':userId})
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
        const newPost = await this.postrepo.create(post)
        return newPost
    }
}






