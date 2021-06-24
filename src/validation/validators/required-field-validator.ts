import { MissingParamError } from '@presentation/errors'
import { Validate } from '@presentation/procols'

export class RequiredFieldValidator implements Validate {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
