import { EmailValidatorAdapter } from '@infra/validation'
import { TestSuite, Validate } from '@presentation/procols'
import {
  EmailValidator,
  ValidationSuite,
  RequiredFieldValidator
} from '@validation/validators'

export const makeLoginValidation = ():TestSuite => {
  const validations:Validate[] = []
  for (const field in ['email', 'password']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()))

  return new ValidationSuite(validations)
}
