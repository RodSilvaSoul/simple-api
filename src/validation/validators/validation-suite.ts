import { TestSuite, Validate } from '@presentation/procols'

export class ValidationSuite implements TestSuite {
  constructor (private readonly validators: Validate[]) {}

  start (input: any): Error[] {
    const erros = this.validators.map((test) => {
      const error = test.validate(input)
      if (error) {
        return error
      }
      return null
    })
    const existsSomeError = erros.some(error => error instanceof Error)
    if (existsSomeError) {
      return erros
    }

    return null
  }
}
