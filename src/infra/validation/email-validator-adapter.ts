import validator from 'validator'

import { EmailValidation } from '@validation/protocls'

export class EmailValidatorAdapter implements EmailValidation {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
