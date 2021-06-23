import { SignController } from '@presentation/controllers'
import { Controller } from '@presentation/procols'
import { makeDbAddUser } from '@main/factores/useCases'
import { makeSignValidation } from './sign-validation'

export const makeSignController = (): Controller => {
  return new SignController(makeSignValidation(), makeDbAddUser())
}
