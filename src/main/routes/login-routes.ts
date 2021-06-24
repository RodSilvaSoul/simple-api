import { Router } from 'express'
import { expressRouteAdapter } from '@main/adapters/'
import { makeSignController, makeLoginController } from '@main/factores/controllers'

export default (router:Router):void => {
  router.post('/sign', expressRouteAdapter(makeSignController()))
  router.post('/login', expressRouteAdapter(makeLoginController()))
}
