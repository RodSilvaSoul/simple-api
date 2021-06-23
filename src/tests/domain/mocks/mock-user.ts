import { UserModel } from '@domain/models'
import { AuthenticationParams } from '@domain/useCases'
import faker from 'faker'

export const makeAddAccountParans = (): UserModel => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const makeAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
