import { Authentication } from '@domain/useCases'
import { badRequest, ok, serverError, unauthorizedError } from '@presentation/helpers/http-helper'
import { Controller, HttpResonse, Validate } from '@presentation/procols'

interface handleLoginContollerParams {
    email: string
    password: string
}

export class LoginController implements Controller<handleLoginContollerParams> {
  constructor (
    private readonly authentication: Authentication,
    private readonly validate: Validate
  ) {}

  async handle (params: handleLoginContollerParams): Promise<HttpResonse> {
    try {
      const error = this.validate.validate(params)
      if (error) {
        return badRequest(error)
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
