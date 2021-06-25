import { SignController } from '@presentation/controllers'
import { EmailInUseError } from '@presentation/errors/email-in-use-error'
import { badRequest, ok, serverError } from '@presentation/helpers'
import { makeAddAccountParans } from '@tests/domain/mocks'
import { throwError } from '@tests/domain/mocks/test-helpers'
import { AdduserSpy, TestSuiteSpy } from '../mocks'

const makeSut = () => {
  const addUserSpy = new AdduserSpy()
  const testSuiteSpy = new TestSuiteSpy()
  const sut = new SignController(testSuiteSpy, addUserSpy)

  return {
    addUserSpy,
    testSuiteSpy,
    sut
  }
}

describe('SignController', () => {
  it('Should call testsuite.start with corrects params', async () => {
    const { sut, testSuiteSpy } = makeSut()
    const params = makeAddAccountParans()
    await sut.handle(params)
    expect(testSuiteSpy.input).toEqual(params)
  })

  it('Should call adduser.add() with corrects params', async () => {
    const { sut, addUserSpy } = makeSut()
    const params = makeAddAccountParans()
    await sut.handle(params)
    expect(addUserSpy.params).toEqual(params)
  })

  it('Should SignControler.handle() retruns valids accesToken and RefashToken with correts params', async () => {
    const { sut, addUserSpy } = makeSut()
    const result = await sut.handle(makeAddAccountParans())
    expect(result).toEqual(ok(addUserSpy.result))
  })
  it('Should returns a bad Request error if an error occurred in test validation', async () => {
    const { sut, testSuiteSpy } = makeSut()
    jest
      .spyOn(testSuiteSpy, 'start')
      .mockResolvedValueOnce([new Error('any_error')])
    const result = await sut.handle(makeAddAccountParans())
    expect(result).toEqual(badRequest([new Error('any_error').message]))
  })
  it('Should returns a email in use error  if alredy exists a user with the same email', async () => {
    const { sut, addUserSpy } = makeSut()
    jest.spyOn(addUserSpy, 'add').mockResolvedValueOnce(null)
    const result = await sut.handle(makeAddAccountParans())
    expect(result).toEqual(badRequest(new EmailInUseError().message))
  })

  it('Should returns a server error if testsuite.start() thorws a error', async () => {
    const { sut, testSuiteSpy } = makeSut()
    jest.spyOn(testSuiteSpy, 'start').mockImplementationOnce(throwError)
    const result = await sut.handle(makeAddAccountParans())
    expect(result).toEqual(serverError(new Error()))
  })

  it('Should returns a server error if addUser.add thorws a error', async () => {
    const { sut, addUserSpy } = makeSut()
    jest.spyOn(addUserSpy, 'add').mockImplementationOnce(throwError)
    const result = await sut.handle(makeAddAccountParans())
    expect(result).toEqual(serverError(new Error()))
  })
})
