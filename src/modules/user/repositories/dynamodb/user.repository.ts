import type { User } from '../../types/user.types';
import 'dotenv/config';
import { DynamoDBRepository } from '../../../../infrastructure/database/ddb.repository';
import { dynamoDb } from '../../../../infrastructure/aws/dynamodb.client';
import type { IUserRepository } from '../interfaces/IUserRepository';


export class UserRepository 
    extends DynamoDBRepository<User>
    implements IUserRepository
    {
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