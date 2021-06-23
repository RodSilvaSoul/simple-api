import { HashComparer, Hasher, HashComparerParams } from '@data/protocols/cryptografy'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {

  }

  async hash (plaintText:string): Promise<string> {
    return await bcrypt.hash(plaintText, this.salt)
  }

  async compare ({ plaintText, digest }:HashComparerParams): Promise<boolean> {
    return await bcrypt.compare(plaintText, digest)
  }
}
