import { SignController } from '@presentation/controllers'
import { Controller } from '@presentation/procols'
import { makeDbAddUser, makeDbAuthenticaion } from '@main/factores/useCases'
import { makeSignValidation } from './sign-validation-suite'

export const makeSignController = (): Controller => {
  return new SignController(makeSignValidation(), makeDbAddUser(), makeDbAuthenticaion())
}
