import {
  EmailValidator,
  ValidationComposite,
  RequiredFieldValidator
} from '@validation/validators'

import { Validate } from '@presentation/procols'
import { EmailValidatorAdapter } from '@infra/validation'

export const makeSignValidation = (): ValidationComposite => {
  const validations: Validate[] = []
  for (const field in ['firstName', 'lastName', 'email', 'password']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
