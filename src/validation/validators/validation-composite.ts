import { Validate } from '@presentation/procols'

export class ValidationComposite implements Validate {
  constructor (private readonly validators: Validate[]) {}

  validate (input: any): Error {
    for (const validation of this.validators) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
