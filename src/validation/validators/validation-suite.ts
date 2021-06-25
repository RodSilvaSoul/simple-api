import { TestSuite, Validate } from '@presentation/procols'

export class ValidationSuite implements TestSuite {
  constructor (private readonly validators: Validate[]) {}

  async start (input: any): Promise<Error[] | null> {
    const erros: Error[] = []
    for (const test of this.validators) {
      const error = test.validate(input)
      if (error) {
        erros.push(error)
      }
    }
    const existsSomeError = erros.length > 0
    if (existsSomeError) {
      return erros
    }

    return null
  }
}
