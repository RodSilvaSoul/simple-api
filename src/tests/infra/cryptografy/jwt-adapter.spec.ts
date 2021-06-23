import { JwtAdapter } from '@infra/cryptografy/jwt-adapter'
import { makeEncriptParams } from '@tests/infra/mocks/cryptografy'

import { throwError } from '@tests/domain/mocks/test-helpers'

import jwt from 'jsonwebtoken'
import uuid from 'uuid'

const makeSut = () => new JwtAdapter('secret')

jest.mock('jsonwebtoken', () => ({
  sign ():string {
    return 'jwt_token'
  }
}))

jest.mock('uuid', () => ({
  v4 ():string {
    return 'refash_token'
  }
}))

describe('JwtAdapter', () => {
  it('Should call encript with valids params', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encript(makeEncriptParams())
    expect(signSpy).toBeCalledWith({}, 'secret', {
      subject: 'any_email',
      expiresIn: 60 * 15
    })
  })

  it('Should  encript return a valid accesToken and refashToken', async () => {
    const sut = makeSut()
    const token = await sut.encript(makeEncriptParams())
    expect(token.accesToken).toBe('jwt_token')
    expect(token.refreshToken).toBe('refash_token')
  })

  it('Shoud throws if jwt.sign thorws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
    const promise = sut.encript(makeEncriptParams())
    expect(promise).rejects.toThrow()
  })
  it('Shoud throws if uuid.v4 thorws', async () => {
    const sut = makeSut()
    jest.spyOn(uuid, 'v4').mockImplementationOnce(throwError)
    const promise = sut.encript(makeEncriptParams())
    expect(promise).rejects.toThrow()
  })
})
