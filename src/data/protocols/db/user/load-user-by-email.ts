import { UserModel } from '@domain/models'

export interface LoadUserByEmalResult extends UserModel {
  id: string
  refreshToken?: string
}

export interface LoadUserByEmail {
  loadByEmail: (email: string) => Promise<LoadUserByEmalResult>
}
