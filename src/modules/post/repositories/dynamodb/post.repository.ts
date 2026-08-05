import 'dotenv/config';
import { DynamoDBRepository } from '../../../../infrastructure/database/ddb.repository';
import { dynamoDb } from '../../../../infrastructure/aws/dynamodb.client';
import type { Post } from '../../types/post.types';
import type { IPostRepository } from '../interfaces/IPostRepository';

export class PostRepository 
    extends DynamoDBRepository<Post>
    implements IPostRepository
    {
    constructor(){
        super(dynamoDb,process.env.POST_TABLE_NAME as string);
    }

    async create(post: Post){
        const result = await this.put(post);
        return post;
    }

    async getByKey(key: Record<string, unknown>){
        const result = await this.get(key);
        return result;
    }

    async getall(){
        return super.getAll(10);
    }
}