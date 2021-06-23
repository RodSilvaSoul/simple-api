import { Hasher } from '@data/protocols/cryptografy'

import faker from 'faker'

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid()
  plainText: string
  async hash (plainText: string): Promise<string> {
    this.plainText = plainText
    return this.digest
  }
}
