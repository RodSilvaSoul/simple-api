import { Request, Response } from 'express'
import { Controller } from '@presentation/procols'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req:Request, res:Response):Promise<Record<string, any>> => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
    }

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body
    })
  }
}
