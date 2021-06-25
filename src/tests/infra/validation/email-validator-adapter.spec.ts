import { EmailValidatorAdapter } from '@infra/validation'
import validator from 'validator'

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('EmailValidatorAdapter', () => {
  it('Should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should retuns false with a invalid email', () => {
    const sut = makeSut()
    const result = sut.isValid('rodrigo_gmail.com')
    expect(result).toBe(false)
  })

  it('Should retuns true with a correct email', () => {
    const sut = makeSut()
    const result = sut.isValid('rodrigo@gmail.com')
    expect(result).toBe(true)
  })
})
