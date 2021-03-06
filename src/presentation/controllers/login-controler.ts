import { Authentication } from '@domain/useCases'
import { badRequest, ok, serverError, unauthorizedError } from '@presentation/helpers/http-helper'
import { mergerErros } from '@presentation/helpers/merger-erros'
import { Controller, HttpResonse, TestSuite } from '@presentation/procols'

interface handleLoginContollerParams {
    email: string
    password: string
}

export class LoginController implements Controller<handleLoginContollerParams> {
  constructor (
    private readonly authentication: Authentication,
    private readonly testSuite: TestSuite
  ) {}

  async handle (params: handleLoginContollerParams): Promise<HttpResonse> {
    try {
      const error = await this.testSuite.start(params)
      if (error) {
        return badRequest(mergerErros(error))
      }

      const tokens = await this.authentication.auth(params)
      if (!tokens) {
        return unauthorizedError()
      }
      return ok(tokens)
    } catch (error) {
      return serverError(error)
    }
  }
}
