import { LoginController } from '@presentation/controllers'
import { badRequest, ok, serverError, unauthorizedError } from '@presentation/helpers'
import { makeAuthenticationParams } from '@tests/domain/mocks'
import { throwError } from '@tests/domain/mocks/test-helpers'
import { AuthenticationSpy, TestSuiteSpy } from '../mocks'

const makeSut = () => {
  const authenticationSpy = new AuthenticationSpy()
  const testSuiteSpy = new TestSuiteSpy()
  const sut = new LoginController(authenticationSpy, testSuiteSpy)

  return {
    authenticationSpy,
    testSuiteSpy,
    sut
  }
}

describe('LoginController', () => {
  it('Should call testsuite.start with corrects params', async () => {
    const { sut, testSuiteSpy } = makeSut()
    const params = makeAuthenticationParams()
    await sut.handle(params)
    expect(testSuiteSpy.input).toEqual(params)
  })

  it('Should call authentication.auth with corrects params', async () => {
    const { sut, authenticationSpy } = makeSut()
    const params = makeAuthenticationParams()
    await sut.handle(params)
    expect(authenticationSpy.params).toEqual(params)
  })

  it('Should longinControler.handle() retruns valids accesToken and RefashToken with correts params', async () => {
    const { sut, authenticationSpy } = makeSut()
    const result = await sut.handle(makeAuthenticationParams())
    expect(result).toEqual(ok(authenticationSpy.result))
  })
  it('Should returns a bad Request error if an error occurred in test validation', async () => {
    const { sut, testSuiteSpy } = makeSut()
    jest
      .spyOn(testSuiteSpy, 'start')
      .mockResolvedValueOnce([new Error('any_error')])
    const result = await sut.handle(makeAuthenticationParams())
    expect(result).toEqual(badRequest([new Error('any_error').message]))
  })
  it('Should returns a unauthorized error if an error occurr in a auth validation', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockResolvedValueOnce(null)
    const result = await sut.handle(makeAuthenticationParams())
    expect(result).toEqual(unauthorizedError())
  })

  it('Should returns a server error if testsuite.start() thorws a error', async () => {
    const { sut, testSuiteSpy } = makeSut()
    jest.spyOn(testSuiteSpy, 'start').mockImplementationOnce(throwError)
    const result = await sut.handle(makeAuthenticationParams())
    expect(result).toEqual(serverError(new Error()))
  })

  it('Should returns a server error if authenticaion.auth thorws a error', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const result = await sut.handle(makeAuthenticationParams())
    expect(result).toEqual(serverError(new Error()))
  })
})
