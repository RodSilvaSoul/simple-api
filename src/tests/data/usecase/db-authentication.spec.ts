import { DbAuthentication } from '@data/useCases'
import {
  HashCompareSpy,
  JwtEncripterSpy,
  LoadUserByEmailSpy,
  UpdateRefreshtokenRepositorySpy
} from '@tests/data/mocks'
import { makeAuthenticationParams } from '@tests/domain/mocks'
import { throwError } from '@tests/domain/mocks/test-helpers'

interface TypeSut {
  sut: DbAuthentication
  hashComparerSpy: HashCompareSpy
  jwtEncripterSpy: JwtEncripterSpy
  loadUserByEmailSpy: LoadUserByEmailSpy
  updateRefreshtokenRepositorySpy: UpdateRefreshtokenRepositorySpy
}

const makeSut = (): TypeSut => {
  const hashComparerSpy = new HashCompareSpy()
  const jwtEncripterSpy = new JwtEncripterSpy()
  const loadUserByEmailSpy = new LoadUserByEmailSpy()
  const updateRefreshtokenRepositorySpy = new UpdateRefreshtokenRepositorySpy()
  const sut = new DbAuthentication(
    loadUserByEmailSpy,
    updateRefreshtokenRepositorySpy,
    jwtEncripterSpy,
    hashComparerSpy
  )
  return {
    hashComparerSpy,
    jwtEncripterSpy,
    loadUserByEmailSpy,
    updateRefreshtokenRepositorySpy,
    sut
  }
}

describe('DbAuthentication useCase', () => {
  it('Should call loadUserByEmail with correct email', async () => {
    const { sut, loadUserByEmailSpy } = makeSut()
    const accountParams = makeAuthenticationParams()
    await sut.auth(accountParams)
    expect(loadUserByEmailSpy.email).toBe(accountParams.email)
  })

  it('Should throws if loadUserByEmail throws', async () => {
    const { sut, loadUserByEmailSpy } = makeSut()
    jest
      .spyOn(loadUserByEmailSpy, 'loadByEmail')
      .mockImplementationOnce(throwError)
    const promise = sut.auth(makeAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should call hashCompare with corrects params', async () => {
    const { sut, hashComparerSpy, loadUserByEmailSpy } = makeSut()
    const accounParams = makeAuthenticationParams()
    await sut.auth(accounParams)
    expect(hashComparerSpy.params).toEqual({
      plaintText: loadUserByEmailSpy.result.password,
      digest: accounParams.password
    })
  })

  it('Should throws if hashCompare throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(makeAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should call jwtEncripter with corrects params', async () => {
    const { sut, jwtEncripterSpy, loadUserByEmailSpy } = makeSut()
    const accounParams = makeAuthenticationParams()
    await sut.auth(accounParams)
    const { email, firstName, lastName } = loadUserByEmailSpy.result
    expect(jwtEncripterSpy.params).toEqual({
      email,
      payload: {
        firstName,
        lastName,
        email
      }
    })
  })

  it('Should throws if jwtEncripter throws', async () => {
    const { sut, jwtEncripterSpy } = makeSut()
    jest.spyOn(jwtEncripterSpy, 'encript').mockImplementationOnce(throwError)
    const promise = sut.auth(makeAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should call updateRefreshtokenRepository with corrects params', async () => {
    const {
      sut,
      updateRefreshtokenRepositorySpy,
      loadUserByEmailSpy,
      jwtEncripterSpy
    } = makeSut()
    const accounParams = makeAuthenticationParams()
    await sut.auth(accounParams)
    const { id } = loadUserByEmailSpy.result
    const { refreshToken } = jwtEncripterSpy.result
    expect(updateRefreshtokenRepositorySpy.params).toEqual({
      id,
      refreshToken
    })
  })

  it('Should throws if jwtEncripter throws', async () => {
    const { sut, updateRefreshtokenRepositorySpy } = makeSut()
    jest
      .spyOn(updateRefreshtokenRepositorySpy, 'updateRefashtoken')
      .mockImplementationOnce(throwError)
    const promise = sut.auth(makeAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should DbAuthentication returns null if hashComparer by returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    const accounParams = makeAuthenticationParams()
    hashComparerSpy.result = false
    const result = await sut.auth(accounParams)
    expect(result).toBeNull()
  })

  it('Should DbAuthentication returns null if loadByEmail by returns null', async () => {
    const { sut, loadUserByEmailSpy } = makeSut()
    loadUserByEmailSpy.result = null
    const accounParams = makeAuthenticationParams()
    const result = await sut.auth(accounParams)
    expect(result).toBeNull()
  })
})
