import { UserModel } from '@domain/models'

export interface AddUserResult extends UserModel {
  id: string
}
export interface AddUser {
  add(params: UserModel): Promise<AddUserResult>
}
