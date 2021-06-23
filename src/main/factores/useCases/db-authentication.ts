import { DbAuthentication } from '@data/useCases'
import { Authentication } from '@domain/useCases'
import { BcryptAdapter } from '@infra/cryptografy/bcrypt-adapter'
import { JwtAdapter } from '@infra/cryptografy/jwt-adapter'
import { UserMongoRepository } from '@infra/db/mongodb'

export const makeDbAuthenticaion = ():Authentication => {
  const bcrypt = new BcryptAdapter(12)
  const jwt = new JwtAdapter(process.env.JWT_SECRET)
  const useMongoRepository = new UserMongoRepository()
  return new DbAuthentication(useMongoRepository, useMongoRepository, jwt, bcrypt)
}
