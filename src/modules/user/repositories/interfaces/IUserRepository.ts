import type { User } from "../../types/user.types"

export interface IUserRepository {
    create(user: User): Promise<User>
    
    getbyKey(key: Record<string,unknown>): Promise<User|undefined>
    
    getbyEmail(email: string): Promise<User|undefined>
}