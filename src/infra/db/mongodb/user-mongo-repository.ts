import {
  AddUserRepository,
  CheckUserByEmailRepository,
  LoadUserByEmail,
  LoadUserByEmalResult,
  UpdateRefreshtokenRepository,
  UpdateRefreshTokenParams,
  AddUserRepositoryResult
} from '@data/protocols/db'

import { UserModel } from '@domain/models'
import { mongoHelper } from '@infra/db/mongodb/mongo-helper'

export class UserMongoRepository
implements
    AddUserRepository,
    CheckUserByEmailRepository,
    LoadUserByEmail,
    UpdateRefreshtokenRepository {
  async add (params: UserModel): Promise<AddUserRepositoryResult> {
    const collection = await mongoHelper.getCollection('users')
    const result = await collection.insertOne(params)
    return mongoHelper.map(result.ops[0]) as unknown as AddUserRepositoryResult
  }

  async checkUserByEmail (email: string): Promise<boolean> {
    const collection = await mongoHelper.getCollection('users')
    const result = await collection.findOne({ email })
    if (result) {
      return true
    }
    return false
  }

  async loadByEmail (email: string): Promise<LoadUserByEmalResult> {
    const collection = await mongoHelper.getCollection('users')
    const result = await collection.findOne({ email })
    return result
  }

  async updateRefashtoken ({
    id,
    refreshToken
  }: UpdateRefreshTokenParams): Promise<void> {
    const collection = await mongoHelper.getCollection('users')
    collection.updateOne(
      {
        _id: id
      },
      {
        $set: {
          refreshToken
        }
      }
    )
  }
}
