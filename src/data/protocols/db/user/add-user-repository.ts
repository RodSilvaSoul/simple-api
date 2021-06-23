import { UserModel } from '@domain/models'
import { AddUserResult } from '@domain/useCases'

export interface AddUserRepository {
  add(user: UserModel): Promise<AddUserResult>
}
