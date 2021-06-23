import { MissingParamError } from '@presentation/errors'
import { Validate } from '@presentation/procols'

export class RequiredFieldValidator implements Validate {
  constructor (private readonly fildName: string) {}

  validate (input: any): Error {
    if (!input[this.fildName]) {
      return new MissingParamError(input[this.fildName])
    }
  }
}
