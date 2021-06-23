import { AddUserRepository, CheckUserByEmailRepository } from '@data/protocols'
import { UserModel } from '@domain/models'
import { AddUserResult } from '@domain/useCases'

import faker from 'faker'

export class AddUserRepositorySpy implements AddUserRepository {
  params: UserModel
  result: AddUserResult
  async add (params: UserModel): Promise<AddUserResult> {
    this.params = params
    const res = {
      ...params,
      id: faker.datatype.uuid()
    }
    this.result = res
    return this.result
  }
}

export class CheckUserByEmailRepositorySpy
implements CheckUserByEmailRepository {
  email: string
  result: true
  async checkUserByEmail (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}
