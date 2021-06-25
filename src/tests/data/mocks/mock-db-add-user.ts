import { AddUserRepository, AddUserRepositoryResult, CheckUserByEmailRepository } from '@data/protocols'
import { UserModel } from '@domain/models'

import faker from 'faker'

export class AddUserRepositorySpy implements AddUserRepository {
  params: UserModel
  result: AddUserRepositoryResult
  async add (params: UserModel): Promise<AddUserRepositoryResult> {
    this.params = params
    const res: AddUserRepositoryResult = {
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
