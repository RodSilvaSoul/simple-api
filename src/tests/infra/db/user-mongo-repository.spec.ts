import { UserMongoRepository, mongoHelper } from '@infra/db/mongodb'
import { makeAddAccountParans } from '@tests/domain/mocks'

import { Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

let userCollection: Collection

describe('UserMongoRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await mongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  it('Should call add() and add a user without erros', async () => {
    const sut = makeSut()
    const newUser = makeAddAccountParans()
    await sut.add(newUser)
    const result = await sut.checkUserByEmail(newUser.email)
    expect(result).toBe(true)
  })

  it('Should call LoadByEmail() and return a valid user', async () => {
    const sut = makeSut()
    const newUser = makeAddAccountParans()
    await sut.add(newUser)
    const result = await sut.loadByEmail(newUser.email)
    const { id, ...rest } = result
    expect(rest).toEqual(newUser)
  })

  it('Shoul call checkUserByEmal() and verify if a users exists', async () => {
    const sut = makeSut()
    const result = await sut.checkUserByEmail('any_email')
    expect(result).toBe(false)
  })

  it('Shoul call updateRefashtoken and update reashToken', async () => {
    const sut = makeSut()
    const newUser = makeAddAccountParans()
    const userInDb = await sut.add(newUser)
    const fakeRefashToken = faker.datatype.uuid()
    await sut.updateRefashtoken({ id: userInDb.id, refreshToken: fakeRefashToken })
    const userWithRefashToken = await sut.loadByEmail(newUser.email)
    expect(userWithRefashToken.refreshToken).toBe(fakeRefashToken)
  })
})
