import { ServerError, UnauthorizedError } from '@presentation/errors'
import { HttpResonse } from '@presentation/procols'

export const badRequest = (error:any): HttpResonse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResonse => ({
  statusCode: 500,
  body: new ServerError(error.stack).message
})

export const unauthorizedError = (): HttpResonse => ({
  statusCode: 401,
  body: new UnauthorizedError().message
})

export const ok = (body:any) : HttpResonse => ({
  statusCode: 201,
  body
})
