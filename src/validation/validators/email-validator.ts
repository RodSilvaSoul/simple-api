import { InvalidParamError } from '@presentation/errors/invalid-param-error'
import { Validate } from '@presentation/procols'
import { EmailValidation } from '@validation/protocls/email-validation'

export class EmailValidator implements Validate {
  constructor (
      private readonly fildName: string,
      private readonly emailValidaion: EmailValidation
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidaion.isValid(input[this.fildName])
    if (!isValid) {
      return new InvalidParamError(input[this.fildName])
    }
  }
}
