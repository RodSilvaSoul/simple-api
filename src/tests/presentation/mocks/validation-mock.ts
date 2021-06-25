import { TestSuite } from '@presentation/procols'

export class TestSuiteSpy implements TestSuite {
  input: any
  result = null
  async start (input: any): Promise<Error[] | null> {
    this.input = input
    return this.result
  }
}
