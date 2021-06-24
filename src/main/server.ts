import { mongoHelper } from '@infra/db/mongodb'
import { config } from 'dotenv'
config()
mongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    const app = (await import('./config/app')).app
    app.listen(8080, () =>
      console.log(
        `Server running at http://localhost:${process.env.SERVER_PORT}`
      )
    )
  })
  .catch(console.error)
