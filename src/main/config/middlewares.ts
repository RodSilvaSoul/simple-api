import { Express, urlencoded } from 'express'
import { BodyPaser, Cors } from '../middlewares'

export const setUpMiddlewares = (app:Express):void => {
  const middlewares = [BodyPaser, Cors, urlencoded({ extended: true })]
  middlewares.forEach(middleware => app.use(middleware))
}
