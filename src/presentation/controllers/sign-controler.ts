import { AddUser } from '@domain/useCases'
import { UserModel } from '@domain/models'
import { Controller, HttpResonse, TestSuite } from '@presentation/procols'
import { badRequest, ok, serverError, mergerErros } from '@presentation/helpers'
import { EmailInUseError } from '@presentation/errors/email-in-use-error'

export class SignController implements Controller<UserModel> {
  constructor (
    private readonly testSuie: TestSuite,
    private readonly AddUser: AddUser
  ) {}

  async handle (params: UserModel): Promise<HttpResonse> {
    try {
      const error = this.testSuie.start(params)
      if (error) {
        return badRequest(mergerErros(error))
      }

      const tokens = await this.AddUser.add(params)

      if (!tokens) {
        return badRequest(new EmailInUseError().message)
      }

      return ok(tokens)
    } catch (error) {
      serverError(error)
    }
  }
}
