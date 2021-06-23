import isEmail from 'validator/lib/isEmail'

import { EmailValidation } from '@validation/protocls'

export class EmailValidatorAdapter implements EmailValidation {
  isValid (email: string): boolean {
    return isEmail(email)
  }
}
