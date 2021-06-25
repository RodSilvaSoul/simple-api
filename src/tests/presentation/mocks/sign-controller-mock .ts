import { UserModel } from '@domain/models'
import { AddUser, AddUserResult } from '@domain/useCases'
import { makeAddAccountParans } from '@tests/domain/mocks'
import fake from 'faker'

export class AdduserSpy implements AddUser {
  params: UserModel
  result: AddUserResult = {
    ...makeAddAccountParans(),
    id: fake.datatype.uuid(),
    tokens: {
      accesToken: fake.datatype.uuid(),
      refreshToken: fake.datatype.uuid()
    }
  }

  async add (params: UserModel): Promise<AddUserResult> {
    this.params = params
    return this.result
  }
}
