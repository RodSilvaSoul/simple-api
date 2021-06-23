import { BcryptAdapter } from '@infra/cryptografy/bcrypt-adapter'
import { throwError } from '@tests/domain/mocks/test-helpers'
import { makeComparePrams } from '@tests/infra/mocks/cryptografy'

import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  },
  async compare (): Promise<boolean> {
    return true
  }
}))

const makeSut = ():BcryptAdapter => new BcryptAdapter(12)

describe('BcryptAdapter', () => {
  describe('hash', () => {
    it('Should call hash with corrects params', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_plaintext')
      expect(hashSpy).toBeCalledWith('any_plaintext', 12)
    })

    it('Shoul return a valid hash', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_plaintext')
      expect(hash).toBe('hash')
    })

    it('Should throws if hash from brcypt throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash('any_hash')
      expect(promise).rejects.toThrow()
    })
  })

  describe('compare', () => {
    it('Should call compare with corrects params', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(makeComparePrams())
      expect(hashSpy).toBeCalledWith('any_plaintet', 'any_digest')
    })

    it('Should compare and return true', async () => {
      const sut = makeSut()
      const reult = await sut.compare(makeComparePrams())
      expect(reult).toBe(true)
    })

    it('Should throws if compare from brcypt throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare(makeComparePrams())
      expect(promise).rejects.toThrow()
    })
  })
})
