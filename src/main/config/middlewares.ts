import { Express } from 'express'
import { BodyPaser, Cors } from '../middlewares'

export const setUpMiddlewares = (app:Express):void => {
  const middlewares = [BodyPaser, Cors]
  middlewares.forEach(middleware => app.use(middleware))
}
