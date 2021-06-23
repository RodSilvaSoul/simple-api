import { LoginController } from '@presentation/controllers'
import { Controller } from '@presentation/procols'
import { makeDbAuthenticaion } from '../useCases'
import { makeLoginValidation } from './login-validation'

export const makeLoginController = ():Controller => {
  return new LoginController(makeDbAuthenticaion(), makeLoginValidation())
}
