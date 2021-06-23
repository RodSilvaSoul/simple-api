import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { resolve } from 'path'

export const setUpRoutes = (app:Express):void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(resolve(`${__dirname}`, '..', 'routes')).map(async file => {
    if (file.endsWith('-router.ts')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
