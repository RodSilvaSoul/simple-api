import { AddUser } from '@domain/useCases'
import { UserModel } from '@domain/models'
import { Controller, HttpResonse, Validate } from '@presentation/procols'
import { badRequest, ok, serverError } from '@presentation/helpers'

export class SignController implements Controller<UserModel> {
  constructor (
    private readonly validate: Validate,
    private readonly AddUser: AddUser
  ) {}

  async handle (params:UserModel): Promise<HttpResonse> {
    try {
      const error = this.validate.validate(params)
      if (error) {
        return badRequest(error)
      }

      const newUser = await this.AddUser.add(params)
      return ok(newUser)
    } catch (error) {
      serverError(error)
    }
  }
}
