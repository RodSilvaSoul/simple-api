import {
  EmailValidator,
  ValidationSuite,
  RequiredFieldValidator
} from '@validation/validators'

import { TestSuite, Validate } from '@presentation/procols'
import { EmailValidatorAdapter } from '@infra/validation'

export const makeSignValidation = (): TestSuite => {
  const validations: Validate[] = []
  for (const field of ['firstName', 'lastName', 'email', 'password']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()))
  return new ValidationSuite(validations)
}
