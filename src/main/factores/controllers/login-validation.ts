import { EmailValidatorAdapter } from '@infra/validation'
import { Validate } from '@presentation/procols'
import {
  EmailValidator,
  ValidationComposite,
  RequiredFieldValidator
} from '@validation/validators'

export const makeLoginValidation = ():ValidationComposite => {
  const validations:Validate[] = []
  for (const field in ['email', 'password']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
