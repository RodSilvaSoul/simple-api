import { ServerError, UnauthorizedError } from '@presentation/errors'
import { HttpResonse } from '@presentation/procols'

export const badRequest = (error: Error): HttpResonse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResonse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const unauthorizedError = (): HttpResonse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const ok = (body:any) : HttpResonse => ({
  statusCode: 201,
  body
})
