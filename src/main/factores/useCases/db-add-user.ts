import { DbAddUser } from '@data/useCases'
import { AddUser } from '@domain/useCases'
import { BcryptAdapter } from '@infra/cryptografy/bcrypt-adapter'
import { JwtAdapter } from '@infra/cryptografy/jwt-adapter'
import { UserMongoRepository } from '@infra/db/mongodb'

export const makeDbAddUser = (): AddUser => {
  const userMongoRepository = new UserMongoRepository()
  const bcrypt = new BcryptAdapter(12)
  const jwt = new JwtAdapter(process.env.JWT_SECRET)
  return new DbAddUser(userMongoRepository, bcrypt, userMongoRepository, jwt)
}
