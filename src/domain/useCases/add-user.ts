import { UserModel } from '@domain/models'

export interface AddUserResult {
  id: string
  firstName: string
  lastName: string
  email: string
  tokens: {
    accesToken: string
    refreshToken: string
  }
}
export interface AddUser {
  add(params: UserModel): Promise<AddUserResult>
}
