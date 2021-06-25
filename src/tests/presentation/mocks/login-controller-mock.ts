import { Authentication, AuthenticationParams, AuthenticationResult } from '@domain/useCases'
import fake from 'faker'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams
  result: AuthenticationResult = {
    accesToken: fake.datatype.uuid(),
    refreshToken: fake.datatype.uuid()
  }

  async auth (params: AuthenticationParams): Promise<AuthenticationResult> {
    this.params = params
    return this.result
  }
}
