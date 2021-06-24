import { AddUser, Authentication } from '@domain/useCases'
import { UserModel } from '@domain/models'
import { Controller, HttpResonse, TestSuite } from '@presentation/procols'
import { badRequest, ok, serverError, mergerErros } from '@presentation/helpers'

export class SignController implements Controller<UserModel> {
  constructor (
    private readonly testSuie: TestSuite,
    private readonly AddUser: AddUser,
    private readonly authentication: Authentication
  ) {}

  async handle (params: UserModel): Promise<HttpResonse> {
    try {
      const error = this.testSuie.start(params)
      if (error) {
        return badRequest(mergerErros(error))
      }

      const newUser = await this.AddUser.add(params)
      const tokens = await this.authentication.auth(newUser)

      return ok(tokens)
    } catch (error) {
      serverError(error)
    }
  }
}
