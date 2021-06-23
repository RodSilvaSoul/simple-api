import { JwtEncripterParams, JwtEncripter, JwtEncripterResult } from '@data/protocols/cryptografy'
import { sign } from 'jsonwebtoken'
import { v4 } from 'uuid'

export class JwtAdapter implements JwtEncripter {
  constructor (private readonly secret:string) {}

  async encript ({ email, payload }:JwtEncripterParams): Promise<JwtEncripterResult> {
    const accesToken = sign(payload, this.secret, {
      subject: email,
      expiresIn: 60 * 15 // 15minutes
    })
    const refreshToken = v4()
    return {
      accesToken,
      refreshToken
    }
  }
}
