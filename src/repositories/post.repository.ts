import 'dotenv/config';
import { DynamoDBRepository } from "../infrastructure/dynamodb/ddb.repository";
import { dynamoDb } from "../infrastructure/clients/dynamodb.client";
import type { Post } from "../types/post";


export class PostRepository extends DynamoDBRepository<Post>{
    constructor(){
        super(dynamoDb,process.env.POST_TABLE_NAME as string)
    }

    async create(post: Post){
        const result = await this.put(post)
        return post
    }

    async getbyKey(key: Record<string,unknown>){
        const result = await this.get(key)
        return result
    }

    async getall(){
        const result = await this.getAll(10)

        return result
    }
}