import {
  LoadUserByEmail,
  UpdateRefreshtokenRepository,
  JwtEncripter,
  JwtEncripterParams,
  JwtEncripterResult,
  LoadUserByEmalResult,
  UpdateRefreshTokenParams,
  HashComparer,
  HashComparerParams
} from '@data/protocols'

import faker from 'faker'

export class LoadUserByEmailSpy implements LoadUserByEmail {
  email: string
  result: LoadUserByEmalResult = {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadUserByEmalResult> {
    this.email = email
    return this.result
  }
}

export class JwtEncripterSpy implements JwtEncripter {
  params: JwtEncripterParams
  result: JwtEncripterResult = {
    accesToken: faker.datatype.uuid(),
    refreshToken: faker.datatype.uuid()
  }

  async encript (params: JwtEncripterParams): Promise<JwtEncripterResult> {
    this.params = params
    return this.result
  }
}

export class UpdateRefreshtokenRepositorySpy
implements UpdateRefreshtokenRepository {
  params: UpdateRefreshTokenParams

  async updateRefashtoken (params: UpdateRefreshTokenParams): Promise<void> {
    this.params = params
  }
}

export class HashCompareSpy implements HashComparer {
  params: HashComparerParams
  result = true
  async compare (params: HashComparerParams): Promise<boolean> {
    this.params = params
    return this.result
  }
}
