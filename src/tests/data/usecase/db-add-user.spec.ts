import { DbAddUser } from '@data/useCases'
import {
  AddUserRepositorySpy,
  CheckUserByEmailRepositorySpy,
  HasherSpy
} from '@tests/data/mocks'
import { makeAddAccountParans } from '@tests/domain/mocks'
import { throwError } from '@tests/domain/mocks/test-helpers'

interface TypeSut {
  sut: DbAddUser
  addUserRepositorySpy: AddUserRepositorySpy
  checkUserByEmailRepositorySpy: CheckUserByEmailRepositorySpy
  hasherSpy: HasherSpy
}

const makeSut = (): TypeSut => {
  const addUserRepositorySpy = new AddUserRepositorySpy()
  const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const sut = new DbAddUser(
    addUserRepositorySpy,
    hasherSpy,
    checkUserByEmailRepositorySpy
  )

  return {
    addUserRepositorySpy,
    checkUserByEmailRepositorySpy,
    hasherSpy,
    sut
  }
}

describe('DbAddAcount Usecase', () => {
  it('Should call Hasher with correct plainText', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParans = makeAddAccountParans()
    await sut.add(addAccountParans)
    expect(hasherSpy.plainText).toBe(addAccountParans.password)
  })

  it('Should throws if hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementation(throwError)
    const promise = sut.add(makeAddAccountParans())
    await expect(promise).rejects.toThrow()
  })

  it('Should call addUserRepository with correct params', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    const addAccountParans = makeAddAccountParans()
    await sut.add(addAccountParans)
    expect(addUserRepositorySpy.result).toBe(addUserRepositorySpy.result)
  })

  it('Should throws if addUserRepository throws', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    jest.spyOn(addUserRepositorySpy, 'add').mockImplementation(throwError)
    const promise = sut.add(makeAddAccountParans())
    await expect(promise).rejects.toThrow()
  })

  it('Should call checkUserByEmailRepository with correct params', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    const addAccountParans = makeAddAccountParans()
    await sut.add(addAccountParans)
    expect(checkUserByEmailRepositorySpy.email).toBe(addAccountParans.email)
  })

  it('Should throws if checkUserByEmailRepository throws', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    jest
      .spyOn(checkUserByEmailRepositorySpy, 'checkUserByEmail')
      .mockImplementation(throwError)
    const promise = sut.add(makeAddAccountParans())
    await expect(promise).rejects.toThrow()
  })

  it('Should DbAddAcount returns null if checkUserByEmailRepository returns true', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut()
    checkUserByEmailRepositorySpy.result = true
    const result = await sut.add(makeAddAccountParans())
    expect(result).toBeFalsy()
  })
  it('Should DbAddAcount returns a new user if checkUserByEmailRepository returns false', async () => {
    const { sut } = makeSut()
    const result = await sut.add(makeAddAccountParans())
    expect(result).toBeTruthy()
  })
})
