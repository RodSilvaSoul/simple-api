import { AddUser, AddUserResult } from '@domain/useCases'
import { UserModel } from '@domain/models'

import {
  AddUserRepository,
  Hasher,
  CheckUserByEmailRepository,
  JwtEncripter
} from '@data/protocols'

export class DbAddUser implements AddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly hasher: Hasher,
    private readonly chekUserByEmailRepository: CheckUserByEmailRepository,
    private readonly jwtEncripter : JwtEncripter
  ) {}

  async add (params: UserModel): Promise<AddUserResult> {
    const exists = await this.chekUserByEmailRepository.checkUserByEmail(params.email)
    if (!exists) {
      const passowrdHash = await this.hasher.hash(params.password)
      const newUser = await this.addUserRepository.add({
        ...params,
        password: passowrdHash
      })
      const { email, firstName, lastName, id } = newUser

      const { accesToken, refreshToken } = await this.jwtEncripter.encript({
        email,
        payload: {
          id,
          firstName,
          lastName,
          email
        }
      })

      delete newUser.password

      return {
        ...newUser,
        tokens: {
          accesToken,
          refreshToken
        }
      }
    }
    return null
  }
}
