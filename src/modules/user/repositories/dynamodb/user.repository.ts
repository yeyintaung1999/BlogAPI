import type { User } from '../../types/user.types.js';
import 'dotenv/config';
import { DynamoDBRepository } from '../../../../infrastructure/database/ddb.repository.js';
import { dynamoDb } from '../../../../infrastructure/aws/dynamodb.client.js';
import type { IUserRepository } from '../interfaces/IUserRepository.js';


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