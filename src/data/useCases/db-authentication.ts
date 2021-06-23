import {
  Authentication,
  AuthenticationParams,
  AuthenticationResult
} from '@domain/useCases'

import {
  LoadUserByEmail,
  UpdateRefreshtokenRepository,
  JwtEncripter,
  HashComparer
} from '@data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmail: LoadUserByEmail,
    private readonly updateRefreshtokenRepository: UpdateRefreshtokenRepository,
    private readonly jwtEncripter: JwtEncripter,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (params: AuthenticationParams): Promise<AuthenticationResult> {
    const account = await this.loadUserByEmail.loadByEmail(params.email)
    if (account) {
      const isValid = await this.hashComparer.compare({
        plaintText: account.password,
        digest: params.password
      })
      if (isValid) {
        const { id, email, firstName, lastName } = account

        const { accesToken, refreshToken } = await this.jwtEncripter.encript({
          email,
          payload: {
            firstName,
            lastName,
            email
          }
        })
        await this.updateRefreshtokenRepository.updateRefashtoken({
          id,
          refreshToken
        })

        return {
          accesToken,
          refreshToken
        }
      }
    }
    return null
  }
}
