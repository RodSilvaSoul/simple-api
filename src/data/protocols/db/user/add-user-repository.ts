import { UserModel } from '@domain/models'

export interface AddUserRepositoryResult {
  id: string
  firstName:string
  lastName:string
  password:string
  email:string
}
export interface AddUserRepository {
  add(user: UserModel): Promise<AddUserRepositoryResult>
}
