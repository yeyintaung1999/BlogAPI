import type { User } from "../types/user";
import 'dotenv/config';
import { DynamoDBRepository } from "../infrastructure/dynamodb/ddb.repository";
import { dynamoDb } from "../infrastructure/clients/dynamodb.client";


export class UserRepository extends DynamoDBRepository<User>{
    constructor(){
        super(dynamoDb,process.env.USER_TABLE_NAME as string)
    }

    async create(user: User){
        const createdDate = new Date()
        this.put(user)
        console.log('user repo got',user)
        return user
    }

    async getbyKey(key: Record<string,unknown>){
        const result = await this.get(key)
        return result
    }

    async getbyEmail(email: string){
        const result = await this.getByIndex("GSI_Email","email",email)
        return result
    }
}